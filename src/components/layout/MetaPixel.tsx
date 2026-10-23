"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export const META_PIXEL_ID = "1687611866220606";
// GA4 property "Knowlytics Hub Website" (stream: knowlyticshub.com).
const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-EQZVH0Z7H2";

type Fn = (...args: unknown[]) => void;

// Meta standard events -> GA4 recommended events.
const GA_EVENTS: Record<string, string> = {
  ViewContent: "view_item", InitiateCheckout: "begin_checkout", AddPaymentInfo: "add_payment_info",
  Lead: "generate_lead", CompleteRegistration: "generate_lead", Contact: "contact",
};

// Events fired before the base snippet runs (e.g. ViewContent on first load) retry briefly.
export function trackPixel(event: string, params?: Record<string, unknown>, tries = 20) {
  const w = window as unknown as { fbq?: Fn; gtag?: Fn };
  if (w.fbq) sendEvent(w, event, params);
  else if (tries > 0) setTimeout(() => trackPixel(event, params, tries - 1), 250);
}

function sendEvent(w: { fbq?: Fn; gtag?: Fn }, event: string, params?: Record<string, unknown>) {
  w.fbq?.("track", event, params);
  const ga = GA_EVENTS[event];
  if (ga && w.gtag) w.gtag("event", ga, { ...params, meta_event: event });
}

// Where the visitor came from (UTM tags from ads, or the referrer), kept for the lead form.
const ATTR_KEY = "kh_attribution";
export type Attribution = { source?: string; medium?: string; campaign?: string; content?: string; landing?: string };

function captureAttribution() {
  try {
    // Ads that link to ".../page#booking" get their tags appended after the hash ("#booking?utm_source=…").
    const hash = window.location.hash;
    const q = new URLSearchParams(window.location.search || (hash.includes("?") ? hash.slice(hash.indexOf("?")) : ""));
    const utm = { source: q.get("utm_source"), medium: q.get("utm_medium"), campaign: q.get("utm_campaign"), content: q.get("utm_content") };
    let next: Attribution | null = null;
    if (utm.source) next = { ...Object.fromEntries(Object.entries(utm).filter(([, v]) => v)) };
    else if (q.get("fbclid")) next = { source: "facebook", medium: "paid" };
    else if (!localStorage.getItem(ATTR_KEY) && document.referrer && !document.referrer.includes(window.location.host)) {
      next = { source: new URL(document.referrer).hostname.replace(/^www\./, ""), medium: "referral" };
    }
    if (next) localStorage.setItem(ATTR_KEY, JSON.stringify({ ...next, landing: window.location.pathname }));
  } catch { /* storage blocked: lead just shows as direct */ }
}

export function getAttribution(): Attribution {
  try { return JSON.parse(localStorage.getItem(ATTR_KEY) || "{}"); } catch { return {}; }
}

// Pick the Meta standard event for a clicked link. Elements can opt in
// explicitly with data-pixel="EventName"; common links are detected by href.
function eventForClick(target: Element): { event: string; params?: Record<string, unknown> } | null {
  const tagged = target.closest<HTMLElement>("[data-pixel]");
  if (tagged?.dataset.pixel) return { event: tagged.dataset.pixel };
  const link = target.closest("a");
  const href = link?.getAttribute("href") || "";
  if (href.endsWith("#booking")) return { event: "InitiateCheckout" };
  if (href.includes("easykash.net")) return { event: "AddPaymentInfo", params: { payment_method: "EasyKash" } };
  if (href.includes("ipn.eg")) return { event: "AddPaymentInfo", params: { payment_method: "InstaPay" } };
  if (href.includes("wa.me")) return { event: "Contact" };
  return null;
}

export default function MetaPixel() {
  const pathname = usePathname();
  const firstView = useRef(true);

  // The base snippet sends the first PageView; later client-side navigations send their own.
  useEffect(() => {
    if (firstView.current) { firstView.current = false; return; }
    trackPixel("PageView");
  }, [pathname]);

  useEffect(() => {
    const m = pathname.match(/\/courses\/([^/]+)$/);
    if (m) trackPixel("ViewContent", { content_type: "course", content_ids: [m[1]] });
  }, [pathname]);

  useEffect(() => {
    captureAttribution();
    const onClick = (e: MouseEvent) => {
      if (!(e.target instanceof Element)) return;
      const hit = eventForClick(e.target);
      if (hit) trackPixel(hit.event, { page: window.location.pathname, ...hit.params });
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init','${META_PIXEL_ID}');fbq('track','PageView');`}
      </Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img height="1" width="1" style={{ display: "none" }} alt=""
          src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`} />
      </noscript>
      {GA_ID && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
          <Script id="ga4" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${GA_ID}');`}
          </Script>
        </>
      )}
    </>
  );
}
