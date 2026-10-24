export const dynamic = "force-dynamic";

import { NextRequest } from "next/server";
import { escapeHtml } from "@/lib/signedToken";
import { page } from "@/lib/templateOrders";
import { adminKeyOk } from "@/lib/adminKey";
import { WaClick, WaTableMissing, createWaTable, listWaClicks } from "@/lib/waClicks";
import { LEAD_STATUSES, Lead, LeadsTableMissing, createLeadsTable, listLeads, phoneKey, updateLead } from "@/lib/leads";

// Admin dashboard for course leads: who is interested, where they came from, and who paid.
const input = "padding:8px;border-radius:8px;border:1px solid #334155;background:#0f1a30;color:#e2e8f0;font-size:14px";
const wide = (inner: string) => `<style>main{max-width:1100px!important}td{vertical-align:top}</style>${inner}`;

function login(msg = "") {
  return page("متابعة المهتمين", `<h1>لوحة متابعة المهتمين</h1>${msg}
    <form method="post"><input type="hidden" name="action" value="view">
    <label>كلمة سر الأدمن</label><br><input name="key" type="password" autocomplete="current-password" required style="${input};width:100%;box-sizing:border-box;margin:6px 0 14px">
    <p style="text-align:center"><button type="submit">دخول</button></p></form>`);
}

const PAID = new Set(["دفع مقدم", "دفع كامل"]);

// Test rows (my checks, "tracking_test" campaigns, "تجربة/اختبار" names) are kept in Airtable but left out of the numbers.
const TEST_RE = /test|تجرب|اختبار/i;
const isTestLead = (l: Lead) => [l.name, l.source, l.campaign, l.ad].some((v) => TEST_RE.test(v)) || phoneKey(l.phone) === "201000000000";
const isTestClick = (c: WaClick) => [c.source, c.campaign, c.ad].some((v) => TEST_RE.test(v));

type View = { key: string; from: string; to: string; showTests: boolean };
const inPeriod = (date: string, v: View) => { const d = date.slice(0, 10); return (!v.from || d >= v.from) && (!v.to || d <= v.to); };

// Hidden fields so every button on the page keeps the same login, period and test toggle.
const keep = (v: View) => `<input type="hidden" name="key" value="${escapeHtml(v.key)}"><input type="hidden" name="from" value="${escapeHtml(v.from)}"><input type="hidden" name="to" value="${escapeHtml(v.to)}">${v.showTests ? '<input type="hidden" name="tests" value="1">' : ""}`;

function countBy(leads: Lead[], key: (l: Lead) => string) {
  const m = new Map<string, { leads: number; paid: number; revenue: number }>();
  for (const l of leads) {
    const k = key(l) || "—";
    const e = m.get(k) || { leads: 0, paid: 0, revenue: 0 };
    e.leads++;
    if (PAID.has(l.status)) { e.paid++; e.revenue += l.paid; }
    m.set(k, e);
  }
  return Array.from(m.entries()).sort((a, b) => b[1].leads - a[1].leads);
}

const LOCATION_LABELS: Record<string, string> = {
  course_sidebar: "صفحة الكورس — جنب السعر", floating_button: "الزرار العائم", lead_form_thanks: "بعد فورم المهتمين",
  home_hero: "الصفحة الرئيسية — السلايدر", course_card_enroll: "كارت الكورس — سجّل الآن", course_card_pay: "كارت الكورس — الدفع", other: "أماكن تانية",
};

function tally(clicks: WaClick[], key: (c: WaClick) => string, label: (k: string) => string = (k) => k) {
  const m = new Map<string, number>();
  for (const c of clicks) { const k = key(c) || "—"; m.set(k, (m.get(k) || 0) + 1); }
  const rows = Array.from(m.entries()).sort((a, b) => b[1] - a[1])
    .map(([k, n]) => `<tr><td>${escapeHtml(label(k))}</td><td>${n}</td></tr>`).join("");
  return `<table><tr><td></td><td>ضغطات</td></tr>${rows || '<tr><td colspan="2">لسه مفيش</td></tr>'}</table>`;
}

function waSection(v: View, clicks: WaClick[] | "missing") {
  if (clicks === "missing") {
    return `<h2 style="font-size:17px;margin-top:26px">ضغطات واتساب</h2>
      <p class="muted">جدول «WhatsApp Clicks» لسه مش موجود في Airtable.</p>
      <form method="post">${keep(v)}<input type="hidden" name="action" value="setup_wa"><button type="submit">اعمل جدول ضغطات واتساب</button></form>`;
  }
  const course = clicks.filter((c) => c.course);
  const half = (inner: string) => `<div style="flex:1;min-width:240px">${inner}</div>`;
  return `<h2 style="font-size:17px;margin-top:26px">ضغطات واتساب <span class="muted">(اهتمام بس — مش حجز ولا مهتم مسجّل)</span></h2>
    <p>الإجمالي: <b>${clicks.length}</b> ضغطة (مش بالضرورة أشخاص مختلفين) · منهم على كورس Excel + Power BI: <b>${course.length}</b> · من غير اسم حملة: <b>${clicks.filter((c) => !c.campaign).length}</b></p>
    <div style="display:flex;gap:14px;flex-wrap:wrap">
      ${half(`<h3 style="font-size:14px">حسب الحملة</h3>${tally(clicks, (c) => c.campaign || (c.source === "direct" ? "بدون حملة" : ""))}`)}
      ${half(`<h3 style="font-size:14px">حسب مصدر الزيارة</h3>${tally(clicks, (c) => [c.source, c.medium].filter(Boolean).join(" / "))}`)}
      ${half(`<h3 style="font-size:14px">حسب مكان الزرار</h3>${tally(clicks, (c) => c.location, (k) => LOCATION_LABELS[k] || k)}`)}
    </div>`;
}

function dashboard(v: View, allLeads: Lead[], flash = "", allClicks: WaClick[] | "missing" = []) {
  const leads = allLeads.filter((l) => inPeriod(l.date, v) && (v.showTests || !isTestLead(l)));
  const hiddenTests = v.showTests ? 0 : allLeads.filter((l) => inPeriod(l.date, v) && isTestLead(l)).length;
  const clicks = allClicks === "missing" ? allClicks : allClicks.filter((c) => inPeriod(c.date, v) && (v.showTests || !isTestClick(c)));
  const hiddenTestClicks = allClicks === "missing" || v.showTests ? 0 : allClicks.filter((c) => inPeriod(c.date, v) && isTestClick(c)).length;
  const paid = leads.filter((l) => PAID.has(l.status));
  const revenue = paid.reduce((s, l) => s + l.paid, 0);
  const card = (label: string, value: string) =>
    `<div style="flex:1;min-width:130px;background:#0f1a30;border:1px solid #1e293b;border-radius:12px;padding:12px"><div class="muted">${label}</div><div style="font-size:24px;font-weight:bold">${value}</div></div>`;
  const statusCounts = LEAD_STATUSES.map((s) => `${s}: <b>${leads.filter((l) => l.status === s).length}</b>`).join(" · ");

  const sourceRows = countBy(leads, (l) => [l.source, l.campaign].filter(Boolean).join(" / ")).map(([src, e]) =>
    `<tr><td>${escapeHtml(src)}</td><td>${e.leads}</td><td>${e.paid}</td><td>${e.leads ? Math.round((e.paid / e.leads) * 100) : 0}%</td><td>${e.revenue.toLocaleString()}</td></tr>`).join("");

  const campaigns = countBy(leads, (l) => l.campaign || (l.source && l.source !== "مباشر" ? l.source : "بدون حملة"));
  const spendRows = campaigns.map(([name, e]) =>
    `<tr data-leads="${e.leads}" data-paid="${e.paid}" data-rev="${e.revenue}"><td>${escapeHtml(name)}</td><td>${e.leads}</td><td>${e.paid}</td><td>${e.revenue.toLocaleString()}</td>
      <td><input type="number" min="0" step="1" class="spend" data-camp="${escapeHtml(name)}" placeholder="الصرف" style="${input};width:110px"></td>
      <td class="cpl">—</td><td class="cpb">—</td><td class="roas">—</td></tr>`).join("");

  const leadRows = leads.map((l) => {
    const options = LEAD_STATUSES.map((s) => `<option${s === l.status ? " selected" : ""}>${s}</option>`).join("");
    return `<tr>
      <td style="white-space:nowrap">${escapeHtml(l.date)}</td>
      <td>${escapeHtml(l.name)}<div class="muted">${escapeHtml(l.level)}</div></td>
      <td dir="ltr"><a style="color:#5eead4" href="https://wa.me/${phoneKey(l.phone)}" target="_blank" rel="noopener">${escapeHtml(l.phone)}</a></td>
      <td>${escapeHtml(l.course)}</td>
      <td>${escapeHtml([l.source, l.campaign, l.ad].filter(Boolean).join(" / "))}</td>
      <td><form method="post" style="display:flex;gap:6px;margin:0">${keep(v)}<input type="hidden" name="action" value="status"><input type="hidden" name="id" value="${escapeHtml(l.id)}">
        <select name="status" style="${input}">${options}</select><button type="submit" style="padding:6px 12px;font-size:13px">حفظ</button></form></td>
    </tr>`;
  }).join("");

  return page("متابعة المهتمين", wide(`<h1>لوحة متابعة المهتمين</h1>${flash}
    <form method="post" style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin:8px 0">
      <input type="hidden" name="key" value="${escapeHtml(v.key)}"><input type="hidden" name="action" value="view">
      <label>من <input type="date" name="from" value="${escapeHtml(v.from)}" style="${input}"></label>
      <label>إلى <input type="date" name="to" value="${escapeHtml(v.to)}" style="${input}"></label>
      <label><input type="checkbox" name="tests" value="1"${v.showTests ? " checked" : ""}> اعرض بيانات الاختبار</label>
      <button type="submit" style="padding:8px 16px;font-size:14px">عرض</button></form>
    <div style="display:flex;gap:10px;flex-wrap:wrap;margin:12px 0">
      ${card("المهتمين", String(leads.length))}${card("حجوزات (دفعوا)", String(paid.length))}
      ${card("منهم دفع مقدم بس", String(leads.filter((l) => l.status === "دفع مقدم").length))}
      ${card("نسبة التحويل", `${leads.length ? Math.round((paid.length / leads.length) * 100) : 0}%`)}${card("المحصّل فعلاً (جنيه)", revenue.toLocaleString())}
    </div>
    <p class="muted">${statusCounts}</p>
    <p class="muted">${hiddenTests || hiddenTestClicks ? `مستبعد من الأرقام: ${hiddenTests} سجل اختبار و${hiddenTestClicks} ضغطة اختبار. ` : ""}المقدّم وباقي المبلغ لنفس الطالب = حجز واحد. المحصّل = الفلوس اللي وصلت فعلاً.</p>
    <h2 style="font-size:17px;margin-top:22px">الصرف وتكلفة الحجز</h2>
    <p class="muted">اكتب صرف كل حملة من Ads Manager لنفس الفترة. تكلفة الحجز = الصرف ÷ الحجوزات المدفوعة. العائد = المحصّل ÷ الصرف (مش صافي ربح).</p>
    <div style="overflow-x:auto"><table id="spend"><tr><td>الحملة</td><td>مهتمين</td><td>حجوزات</td><td>المحصّل</td><td>الصرف (جنيه)</td><td>تكلفة المهتم</td><td>تكلفة الحجز</td><td>العائد</td></tr>${spendRows || '<tr><td colspan="8">لسه مفيش بيانات</td></tr>'}</table></div>
    <script>(function(){var per='${escapeHtml(v.from)}_${escapeHtml(v.to)}';
      function fmt(n){return isFinite(n)?Math.round(n).toLocaleString():'—'}
      document.querySelectorAll('#spend tr[data-leads]').forEach(function(r){var i=r.querySelector('.spend'),k='kh_spend_'+per+'_'+i.dataset.camp;
        function calc(){var s=+i.value;try{localStorage.setItem(k,i.value)}catch(e){}
          r.querySelector('.cpl').textContent=s&&+r.dataset.leads?fmt(s/r.dataset.leads):'—';
          r.querySelector('.cpb').textContent=s&&+r.dataset.paid?fmt(s/r.dataset.paid):(s?'مفيش حجوزات':'—');
          r.querySelector('.roas').textContent=s?(r.dataset.rev/s).toFixed(2)+'x':'—'}
        try{i.value=localStorage.getItem(k)||''}catch(e){} i.addEventListener('input',calc);calc()})})()</script>
    <h2 style="font-size:17px;margin-top:22px">حسب المصدر / الحملة</h2>
    <div style="overflow-x:auto"><table><tr><td>المصدر</td><td>مهتمين</td><td>دفعوا</td><td>تحويل</td><td>المحصّل</td></tr>${sourceRows || '<tr><td colspan="5">لسه مفيش بيانات</td></tr>'}</table></div>
    <h2 style="font-size:17px;margin-top:22px">كل المهتمين (الأحدث الأول)</h2>
    <div style="overflow-x:auto"><table style="font-size:13px"><tr><td>التاريخ</td><td>الاسم</td><td>واتساب</td><td>الكورس</td><td>المصدر</td><td>الحالة</td></tr>${leadRows || '<tr><td colspan="6">لسه مفيش مهتمين</td></tr>'}</table></div>
    ${waSection(v, clicks)}
    <form method="post" style="text-align:center;margin-top:16px">${keep(v)}<input type="hidden" name="action" value="view"><button type="submit">تحديث</button></form>`));
}

function missingTable(key: string, reason = "") {
  return page("متابعة المهتمين", `<h1>جدول المهتمين مش موجود في Airtable</h1>
    <p>محتاجين جدول اسمه <b>Course Leads</b> في نفس الـ Base بتاع الموقع.</p>
    <form method="post"><input type="hidden" name="key" value="${escapeHtml(key)}"><input type="hidden" name="action" value="setup">
    <p style="text-align:center"><button type="submit">اعمل الجدول أوتوماتيك</button></p></form>
    ${reason ? `<p style="color:#fca5a5">ماقدرتش أعمله أوتوماتيك: ${escapeHtml(reason)}</p>
    <p class="muted">اعمله يدوي في Airtable باسم <b>Course Leads</b> وبالأعمدة دي بالظبط: Name, Phone, PhoneKey, Course, Level, Status, Source, Medium, Campaign, Ad, Landing, Paid (Number), Date, Notes.</p>` : ""}`);
}

export async function GET() {
  return login();
}

export async function POST(req: NextRequest) {
  const f = await req.formData();
  const key = String(f.get("key") || "");
  if (!adminKeyOk(key)) return login(`<p style="color:#fca5a5;font-weight:bold">كلمة السر غلط.</p>`);
  const action = String(f.get("action") || "view");
  const date = (k: string) => { const d = String(f.get(k) || ""); return /^\d{4}-\d{2}-\d{2}$/.test(d) ? d : ""; };
  const view: View = { key, from: date("from"), to: date("to"), showTests: f.get("tests") === "1" };

  try {
    let flash = "";
    if (action === "setup") {
      const r = await createLeadsTable();
      if (!r.ok) return missingTable(key, r.reason);
      flash = `<p style="color:#86efac">✅ الجدول اتعمل.</p>`;
    }
    if (action === "setup_wa") {
      const r = await createWaTable();
      flash = r.ok ? `<p style="color:#86efac">✅ جدول ضغطات واتساب اتعمل.</p>` : `<p style="color:#fca5a5">ماقدرتش أعمل جدول واتساب: ${escapeHtml(r.reason)}</p>`;
    }
    if (action === "status") {
      const status = String(f.get("status") || "");
      if ((LEAD_STATUSES as readonly string[]).includes(status)) {
        await updateLead(String(f.get("id") || ""), { Status: status });
        flash = `<p style="color:#86efac">✅ اتحفظت الحالة.</p>`;
      }
    }
    const [leads, clicks] = await Promise.all([
      listLeads(),
      listWaClicks().catch((e) => { if (e instanceof WaTableMissing) return "missing" as const; throw e; }),
    ]);
    return dashboard(view, leads, flash, clicks);
  } catch (e) {
    if (e instanceof LeadsTableMissing) return missingTable(key);
    console.error("leads dashboard error", e);
    return page("خطأ", `<h1>حصل خطأ</h1><p class="muted">${escapeHtml(e instanceof Error ? e.message : "unknown")}</p>`, 502);
  }
}
