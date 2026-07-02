# 🎓 Knowlytics Hub — Website

الموقع الرسمي لـ **Knowlytics Hub** — منصة تحليل البيانات الرائدة في العالم العربي.  
أكثر من **7,000 متدرب** و **+100,000 مشترك** على يوتيوب.

🌐 **الموقع:** [knowlyticshub.com](https://knowlyticshub.com)  
🎓 **منصة التعلم:** [learn.knowlyticshub.com](https://learn.knowlyticshub.com)  
📦 **GitHub:** [mohamedabdelfattah322-spec/knowlytics-website](https://github.com/mohamedabdelfattah322-spec/knowlytics-website)

---

## ⚙️ Tech Stack

| الطبقة | التقنية |
|--------|---------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Animations | Framer Motion |
| i18n | next-intl (AR default / EN) |
| Data (assessments & reviews) | Airtable |
| Email | Resend |
| Hosting | Vercel (auto-deploy on push to main) |
| DNS | Cloudflare |
| Domain | Hostinger |

---

## 🌐 اللغة والـ Routing

- اللغة الافتراضية **العربي** — كل زائر يشوف العربي تلقائياً
- `localeDetection: false` — الموقع مش بيقرأ لغة المتصفح
- العربي على `/` (بدون prefix) — الإنجليزي على `/en/`
- المستخدم يقدر يغير اللغة من زرار "English" في الـ navbar

```
src/i18n/routing.ts
  defaultLocale: "ar"
  localePrefix: "as-needed"
  localeDetection: false   ← مهم: دايماً عربي
```

---

## ✨ المميزات الرئيسية

| الميزة | التفاصيل |
|--------|---------|
| 🌐 ثنائي اللغة | عربي + إنجليزي مع RTL/LTR تلقائي |
| 🌙 Dark Mode | تصميم dark-first مع theme toggle |
| 📱 Responsive | يعمل على الموبايل والتابلت والديسكتوب |
| ⚡ Animations | Framer Motion في كل الأقسام والكروت |
| 🤖 AI Chatbot | يرد على أسئلة العملاء بالعربي والإنجليزي |
| 📊 Assessments | اختبار Excel + اختبار المقابلات مع نتائج فورية |
| 📧 Certificates | شهادات بالإيميل بعد الاختبارات |
| ⭐ Reviews System | نظام تقييم كامل مع موافقة يدوية |
| 🎓 LMS Redirect | ربط مباشر بـ learn.knowlyticshub.com |
| 💬 WhatsApp Float | زرار واتساب عائم في كل الصفحات |
| 🔍 SEO | Sitemap + robots.txt + JSON-LD + hreflang |

---

## 🏗️ Project Structure

```
src/
├── app/
│   ├── [locale]/                   # جميع الصفحات (AR/EN)
│   │   ├── page.tsx                # الرئيسية
│   │   ├── layout.tsx              # Layout + SEO metadata
│   │   ├── courses/
│   │   │   ├── page.tsx            # قائمة الكورسات (Live / Recorded)
│   │   │   └── [slug]/
│   │   │       ├── page.tsx        # تفاصيل الكورس الكاملة
│   │   │       └── layout.tsx      # Course JSON-LD per course
│   │   ├── blog/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── student-projects/       # معرض مشاريع الطلاب (بدون فلتر)
│   │   ├── excel-assessment/       # اختبار مهارات Excel
│   │   ├── interview-assessment/   # اختبار المقابلات
│   │   ├── lms/                    # redirect → learn.knowlyticshub.com
│   │   ├── testimonials/           # آراء العملاء
│   │   ├── about/                  # من نحن
│   │   ├── services/               # الخدمات
│   │   ├── instructor/             # صفحة المدرب
│   │   └── contact/                # تواصل معنا
│   ├── page.tsx                    # Root → return null (next-intl handles routing)
│   ├── sitemap.ts                  # Dynamic sitemap.xml
│   ├── robots.ts                   # robots.txt
│   └── api/
│       ├── assessment-result/      # حفظ نتيجة → Airtable + إيميل شهادة
│       ├── testimonial/            # رأي جديد → Airtable (Pending) + إشعار
│       ├── testimonials/           # جلب الآراء Published من Airtable
│       ├── chat/                   # AI Chatbot (Claude أو Rule-Based)
│       ├── contact/                # نموذج تواصل → إيميل
│       ├── newsletter/             # اشتراك نشرة بريدية
│       └── service-request/        # طلب خدمة → إيميل
├── components/
│   ├── home/
│   │   ├── HeroSlider.tsx          # سلايدر رئيسي 3 شرائح
│   │   ├── CoursesSlider.tsx
│   │   ├── ProjectsSlider.tsx
│   │   ├── LMSSection.tsx          # → learn.knowlyticshub.com
│   │   ├── TestimonialsSlider.tsx
│   │   ├── AssessmentSection.tsx
│   │   ├── StatsCounter.tsx
│   │   ├── CompaniesSlider.tsx
│   │   └── ...
│   ├── layout/
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   └── shared/
│       ├── CourseCard.tsx
│       ├── ReviewForm.tsx
│       └── TestimonialCard.tsx
├── data/
│   ├── courses.json                # بيانات الكورسات التسعة
│   ├── blog.json                   # 8 مقالات
│   ├── projects.json               # 14 مشروع طالب حقيقي
│   ├── companies.json              # 9 شركات مدرّبة
│   └── faq.json                    # الأسئلة الشائعة
└── public/
    ├── work/                       # صور مشاريع الطلاب (14 صورة)
    ├── company-logo/               # لوجوهات الشركات المدرّبة
    ├── group-photos/               # صور جروبات التدريب
    ├── course-excel-powerbi.png    # صورة كورس Excel+PowerBI
    ├── profile.JPG                 # صورة المدرب
    └── logo.png
```

---

## 🌐 الصفحات

| الصفحة | الرابط العربي | الرابط الإنجليزي |
|--------|--------------|-----------------|
| الرئيسية | `/` | `/en` |
| الكورسات | `/courses` | `/en/courses` |
| تفاصيل كورس | `/courses/[slug]` | `/en/courses/[slug]` |
| المدونة | `/blog` | `/en/blog` |
| مقال | `/blog/[slug]` | `/en/blog/[slug]` |
| مشاريع الطلاب | `/student-projects` | `/en/student-projects` |
| اختبار Excel | `/excel-assessment` | `/en/excel-assessment` |
| اختبار المقابلات | `/interview-assessment` | `/en/interview-assessment` |
| منصة التعلم | `/lms` → learn.knowlyticshub.com | — |
| آراء العملاء | `/testimonials` | `/en/testimonials` |
| من نحن | `/about` | `/en/about` |
| المدرب | `/instructor` | `/en/instructor` |
| الخدمات | `/services` | `/en/services` |
| تواصل معنا | `/contact` | `/en/contact` |

---

## 📚 الكورسات (9 كورسات)

| الـ Slug | الكورس | السعر | المدة |
|---------|--------|-------|-------|
| `excel-zero-to-hero` | Excel من الصفر للاحتراف | مجاني | 20 ساعة |
| `excel-powerbi-ai-freelance` ⭐ | Excel + Power BI + AI + Freelance | **3,000 ج.م** (الأصلي 4,000) | 39 ساعة / 13 محاضرة |
| `sql-data-analysis` | SQL Server لتحليل البيانات | 2,000 ج.م | 16 ساعة |
| `python-data-analysis` | Python لتحليل البيانات | 2,000 ج.م | 16 ساعة |
| `tableau-beginners` | Tableau للمبتدئين | 1,000 ج.م | 10 ساعات |
| `looker-studio-beginners` | Looker Studio للمبتدئين | 1,000 ج.م | 8 ساعات |
| `report-writing` | كتابة التقارير الاحترافية | 3,000 ج.م | 12 ساعة |
| `ai-tools-prompt-engineering` | أدوات AI وهندسة البرومبت | 1,500 ج.م | 20 ساعة |
| `full-data-analysis-bundle` | الباقة الكاملة 🔥 | 6,000 ج.م | 120+ ساعة |

كل الكورسات **Live على Zoom** — التسجيلات تُرسل بعد كل محاضرة — أكسيس على منصة التعلم.

### كورس Excel + Power BI + AI + Freelance — تفاصيل

**موعد الجروب القادم:** الاثنين والأربعاء — 8:30 م — يبدأ 8 يوليو 2026

**المحتوى:**
- Excel Fundamentals & Analysis
- Power BI & DAX & Power Query
- AI Tools: ChatGPT, Claude, Gemini, Gamma, Notebook LM, Google App Script
- Freelancing & Portfolio

**مميزات:**
- 🤖 استخدام الذكاء الاصطناعي في التحليل
- 💼 كيف تشتغل فريلانسر كمحلل بيانات
- 🛠️ ممارسة عملية أثناء كل محاضرة
- 📁 مشاريع حقيقية فعلية
- 📊 أكثر من مشروع خلال الكورس
- 🏆 مشروع نهائي شامل في نهاية الكورس

**متطلبات:** خلفية عن Excel

**طرق الدفع:**
- InstaPay: `https://ipn.eg/S/msara/instapay/9Z2HJW`
- Vodafone Cash: `01020945719`
- EasyKash (طرق دفع أخرى): `https://www.easykash.net/Knowlytics Hub /pay`
- بعد الدفع: إرسال صورة التحويل على واتساب `00201226929392`

---

## 🏢 الشركات المدرّبة (9 شركات)

| الشركة | الملف |
|--------|-------|
| Saint-Gobain | `/company-logo/Saint-Gobain.png` |
| AFRAS KSA | `/company-logo/AFRAS KSA.jpg` |
| Alyoum | `/company-logo/Alyoum.png` |
| Cinnabon | `/company-logo/Cinnabon.png` |
| EFS | `/company-logo/EFS.jpg` |
| Asfour Crystal | `/company-logo/ASFOUR.png` |
| Apleona | `/company-logo/Apleona.png` |
| Symphony Development | `/company-logo/Symphony Development.webp` |
| Elsewedy Watanya | `/company-logo/Elsewedy Watanya.png` |

> الـ .jfif files اتحوّلت لـ .jpg عشان Next.js Image component يشتغل معاها.

---

## 👨‍🏫 المدرب — محمد عبدالفتاح

- خبير تحليل البيانات
- أكثر من **17 سنة** خبرة مع شركات Multinational
- درّب أكثر من **7,000 متدرب**
- بيدرّب من **2016**
- درّب أكثر من **8 شركات** كبرى

---

## 📝 المدونة (8 مقالات)

| المقال | الفئة |
|--------|-------|
| كيف تبدأ مسيرتك كمحلل بيانات 2025 | Career |
| Excel vs Power BI: أيهما تختار؟ | Tools |
| أهم 10 دوال SQL لتحليل البيانات | SQL |
| مقدمة في DAX لمستخدمي Power BI | Power BI |
| تنظيف البيانات باستخدام Python Pandas | Python |
| مبادئ تصميم الداشبوردات الاحترافية | Design |
| الإحصاء الذي يحتاجه كل محلل بيانات | Statistics |
| Tableau vs Looker Studio: المقارنة الكاملة | Tools |

---

## 🎓 نظام الاختبارات

### Excel Assessment
- **40 سؤال** — 6 فئات: Basic Functions, Pivot Tables, Power Query, Data Visualization, Statistical Analysis, Advanced Formulas
- تصحيح فوري — عرض الأسئلة الغلط — تحديد المستوى (Beginner → Expert)
- حفظ في Airtable + إرسال شهادة بالإيميل

### Interview Assessment
- اختبار مهارات المقابلات
- نفس نظام الحفظ والإيميل

---

## ⭐ نظام الآراء

```
المستخدم يملأ ReviewForm
        ↓
POST /api/testimonial → Airtable (Status: Pending)
        ↓
إيميل إشعار للـ Sales@knowlyticshub.com
        ↓
تغيير Status → Published في Airtable
        ↓
يظهر على الموقع
```

---

## 🤖 AI Chatbot

- **Anthropic API (Claude Haiku)** — لو `ANTHROPIC_API_KEY` موجود
- **Rule-Based Engine** — fallback بدون API key

---

## 👨‍🎓 مشاريع الطلاب (14 مشروع)

- **Fatma Ibrahim** — Revenue Dashboard, Marketing & Traffic, E-commerce suite
- **Mazen Sabry** — Sales Performance Dashboard
- + 10 مشاريع أخرى متنوعة (HR, Sales, Coffee Shop)

---

## 📧 API Routes

| Route | Method | الوظيفة |
|-------|--------|---------|
| `/api/assessment-result` | POST | نتيجة اختبار → Airtable + شهادة |
| `/api/testimonial` | POST | رأي جديد → Airtable Pending + إشعار |
| `/api/testimonials` | GET | جلب الآراء Published |
| `/api/chat` | POST | AI Chatbot |
| `/api/contact` | POST | نموذج تواصل |
| `/api/newsletter` | POST | اشتراك بريدي |
| `/api/service-request` | POST | طلب خدمة |

---

## 🔐 Environment Variables

```env
AIRTABLE_TOKEN=pat_xxxxxxxxxxxxxxxx
AIRTABLE_BASE_ID=appxxxxxxxxxxxxxxxx
RESEND_API_KEY=re_xxxxxxxxxxxxxxxx
ANTHROPIC_API_KEY=sk-ant-xxxxxxxx     # اختياري
```

---

## 🗄️ Airtable Tables

### `Assessment Results`
| Field | Type |
|-------|------|
| Name | Text |
| Email | Email |
| Phone | Phone |
| Assessment Type | Text |
| Score | Number |
| Level | Text |
| Weak Areas | Long Text |
| Question Details | Long Text |
| Date | Date |
| Status | Select |

### `Reviews`
| Field | Type | Notes |
|-------|------|-------|
| Full Name | Text | |
| title | Text | المسمى الوظيفي |
| rating | Number | 1–5 |
| Your Review | Long Text | |
| Course You Completed | Text | |
| LinkedIn Profile | URL | |
| Date | Date | |
| Status | Select | Pending / **Published** / Rejected |

---

## 🔍 SEO

- **sitemap.xml** — `src/app/sitemap.ts` — يشمل كل الصفحات بالعربي والإنجليزي
- **robots.txt** — `src/app/robots.ts`
- **JSON-LD** — Organization + WebSite + Course schemas في كل صفحة
- **hreflang** — ar / en alternates
- **Google Search Console** — Domain property موثّقة عبر Cloudflare DNS
- **Sitemap مُرسل:** `https://knowlyticshub.com/sitemap.xml`

---

## 🚢 Deployment

```bash
git add .
git commit -m "وصف التغيير"
git push origin main
# ✅ Vercel auto-deploys خلال ~1 دقيقة
```

**البنية التحتية:**

| الخدمة | الغرض |
|--------|-------|
| Vercel | Hosting + auto-deploy |
| Cloudflare | DNS + CDN |
| Hostinger | Domain registration |
| Airtable | Database (assessments + reviews) |
| Resend | Email sending |

---

## 🚀 Quick Start (Local)

```bash
git clone https://github.com/mohamedabdelfattah322-spec/knowlytics-website.git
cd knowlytics-website
npm install
cp .env.example .env.local   # أضف المتغيرات
npm run dev
# → http://localhost:3000
```

---

## 📋 سجل التغييرات المهمة

| التاريخ | التغيير |
|---------|---------|
| 2026-06 | إضافة SEO شامل (sitemap, robots, JSON-LD, hreflang) |
| 2026-06 | تحديث مشاريع الطلاب بأسماء حقيقية (14 مشروع) |
| 2026-06 | حذف فلتر الفئات من صفحة المشاريع |
| 2026-06 | إضافة Course Highlights لكورس Excel+PowerBI |
| 2026-06 | ربط أزرار LMS بـ learn.knowlyticshub.com |
| 2026-06 | إعادة كتابة كل مقالات المدونة (8 مقالات) |
| 2026-06 | تحديث موعد الكورس: الاثنين والأربعاء 8:30 م — 8 يوليو 2026 |
| 2026-06 | تحديث سعر الكورس: 3,000 ج.م (بدل 2,500) |
| 2026-06 | إضافة AI tools في محتوى الكورس (Claude, Gemini, Gamma, Notebook LM) |
| 2026-06 | إضافة EasyKash كطريقة دفع + تعليمات إرسال صورة التحويل |
| 2026-06 | إضافة قسم شركات تم تدريبها في صفحة الكورس (9 شركات) |
| 2026-06 | إضافة لينكات كورسات Python/SQL/Tableau/Looker Studio في أسفل الكورس |
| 2026-06 | إضافة FAQ: سؤال Python وسبب الفصل |
| 2026-06 | إضافة Elsewedy Watanya للشركات المدرّبة |
| 2026-06 | `localeDetection: false` — دايماً عربي بصرف النظر عن لغة المتصفح |
| 2026-06 | تحديث عدد المتدربين: 7,000+ في كل مكان |
| 2026-06 | إضافة صفحة الكورسات المسجّلة (Live / Recorded tabs) |

---

## 📞 التواصل

- **واتساب:** [00201226929392](https://wa.me/201226929392)
- **إيميل:** Sales@knowlyticshub.com
- **يوتيوب:** +100,000 مشترك
