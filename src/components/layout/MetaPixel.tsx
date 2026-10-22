"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export const META_PIXEL_ID = "1687611866220606";

type Fbq = (...args: unknown[]) => void;

export function trackPixel(event: string, params?: Record<string, unknown>) {
  const fbq = (window as unknown as { fbq?: Fbq }).fbq;
  if (fbq) fbq("track", event, params);
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
    </>
  );
}
