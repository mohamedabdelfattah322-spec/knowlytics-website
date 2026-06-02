# 🎓 Knowlytics Hub — Website

الموقع الرسمي لـ **Knowlytics Hub** — منصة تحليل البيانات الرائدة في العالم العربي.  
أكثر من **7,000 متدرب** و **+100,000 مشترك** على يوتيوب.

🌐 **الموقع:** [knowlyticshub.com](https://knowlyticshub.com)  
🎓 **منصة التعلم:** [learn.knowlyticshub.com](https://learn.knowlyticshub.com)  
📦 **GitHub:** [mohamedabdelfattah322-spec/knowlytics-website](https://github.com/mohamedabdelfattah322-spec/knowlytics-website)

---

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
| 🎠 Sliders | Hero slider، كورسات، testimonials، مشاريع، شركات |

---

## ⚙️ Tech Stack

| الطبقة | التقنية |
|--------|---------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Animations | Framer Motion |
| i18n | next-intl (AR / EN) |
| Data (assessments & reviews) | Airtable |
| Email | Resend |
| Hosting | Vercel |
| DNS | Cloudflare |

---

## 🏗️ Project Structure

```
src/
├── app/
│   ├── [locale]/                   # جميع الصفحات (AR/EN)
│   │   ├── page.tsx                # الرئيسية
│   │   ├── courses/                # قائمة الكورسات + تفاصيل كل كورس
│   │   │   └── [slug]/page.tsx
│   │   ├── blog/                   # المدونة + مقالات
│   │   │   └── [slug]/page.tsx
│   │   ├── student-projects/       # معرض مشاريع الطلاب
│   │   ├── excel-assessment/       # اختبار مهارات Excel
│   │   ├── interview-assessment/   # اختبار المقابلات
│   │   ├── lms/                    # صفحة منصة التعلم (redirect)
│   │   ├── testimonials/           # آراء العملاء
│   │   ├── about/                  # من نحن
│   │   ├── services/               # الخدمات
│   │   ├── instructor/             # صفحة المدرب
│   │   └── contact/                # تواصل معنا
│   └── api/
│       ├── assessment-result/      # حفظ نتيجة الاختبار → Airtable + إيميل
│       ├── testimonial/            # حفظ رأي جديد → Airtable + إشعار
│       └── testimonials/           # جلب الآراء المنشورة من Airtable
├── components/
│   ├── home/                       # أقسام الصفحة الرئيسية
│   │   ├── HeroSlider.tsx
│   │   ├── CoursesSlider.tsx
│   │   ├── ProjectsSlider.tsx
│   │   ├── LMSSection.tsx
│   │   ├── TestimonialsSlider.tsx
│   │   ├── AssessmentSection.tsx
│   │   ├── StatsCounter.tsx
│   │   └── ...
│   ├── layout/
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   └── shared/
│       ├── ProjectCard.tsx
│       ├── CourseCard.tsx
│       ├── ReviewForm.tsx
│       └── TestimonialCard.tsx
├── data/
│   ├── courses.json                # بيانات الكورسات
│   ├── blog.json                   # metadata المقالات
│   ├── projects.json               # مشاريع الطلاب
│   ├── testimonials.json           # آراء fallback
│   ├── companies.json              # لوجوهات الشركات
│   └── faq.json                    # الأسئلة الشائعة
└── public/
    ├── work/                       # صور مشاريع الطلاب الحقيقية
    ├── logo.png
    └── my-pic.jpg                  # صورة المدرب
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
| منصة التعلم | `/lms` → `learn.knowlyticshub.com` | `/en/lms` |
| آراء العملاء | `/testimonials` | `/en/testimonials` |
| من نحن | `/about` | `/en/about` |
| المدرب | `/instructor` | `/en/instructor` |
| الخدمات | `/services` | `/en/services` |
| تواصل معنا | `/contact` | `/en/contact` |

---

## 🚀 Quick Start

```bash
# 1. تثبيت الـ dependencies
npm install

# 2. إنشاء ملف البيئة
cp .env.example .env.local
# ثم أضف المتغيرات (اطلع على قسم Environment Variables)

# 3. تشغيل الـ dev server
npm run dev
```

الموقع يشتغل على: [http://localhost:3000](http://localhost:3000)

---

## 🔐 Environment Variables

أنشئ ملف `.env.local` وأضف:

```env
# Airtable
AIRTABLE_TOKEN=your_airtable_personal_access_token
AIRTABLE_BASE_ID=your_airtable_base_id

# Resend (Email)
RESEND_API_KEY=your_resend_api_key
```

---

## 🗄️ Airtable Tables

### `Assessment Results` — نتائج الاختبارات
| Field | Type | Notes |
|-------|------|-------|
| Name | Text | اسم المتدرب |
| Email | Email | |
| Phone | Phone | |
| Assessment Type | Text | Excel / Interview |
| Score | Number | الدرجة |
| Level | Text | المستوى + النسبة |
| Weak Areas | Long Text | المجالات الضعيفة |
| Question Details | Long Text | JSON تفاصيل الأسئلة |
| Interests | Text | الاهتمامات |
| Date | Date | |
| Status | Select | Completed |

### `Reviews` — آراء العملاء
| Field | Type | Notes |
|-------|------|-------|
| Full Name | Text | |
| title | Text | المسمى الوظيفي |
| rating | Number | 1–5 |
| Your Review | Long Text | |
| Course You Completed | Text | |
| LinkedIn Profile | URL | |
| Date | Date | |
| Status | Select | `Pending` / `Published` / `Rejected` |

> ⚠️ الآراء بتظهر على الموقع بس لو Status = **Published**

---

## 📧 Email Flow

```
اختبار مكتمل → POST /api/assessment-result
  ├── حفظ في Airtable (Assessment Results)
  ├── إرسال شهادة للمتدرب (Resend)
  └── إرسال إشعار للـ Sales@knowlyticshub.com

رأي جديد → POST /api/testimonial
  ├── حفظ في Airtable (Reviews) → Status: Pending
  └── إرسال إشعار بزرار "فتح Airtable للموافقة"
```

---

## 🚢 Deployment

الموقع بيتـ deploy تلقائياً على **Vercel** عند كل push على `main`:

```bash
git add .
git commit -m "your message"
git push origin main
# ✅ Vercel auto-deploys
```

---

## 📦 Dependencies الأساسية

| Package | الغرض |
|---------|--------|
| `next` 14 | Framework |
| `next-intl` | AR/EN i18n |
| `framer-motion` | Animations |
| `tailwindcss` | Styling |
| `lucide-react` | Icons |
| `resend` | Email sending |
| `sonner` | Toast notifications |
| `react-countup` | Animated counters |

---

---

## 🏠 الصفحة الرئيسية — Sections

الصفحة الرئيسية مقسمة لـ sections متسلسلة:

| # | Component | المحتوى |
|---|-----------|---------|
| 1 | `HeroSlider` | سلايدر رئيسي بـ 3 شرائح مع CTAs |
| 2 | `StatsCounter` | إحصائيات متحركة (7,000+ متدرب، 9 كورسات، إلخ) |
| 3 | `CoursesSlider` | أبرز الكورسات (featured فقط) |
| 4 | `CompaniesSlider` | لوجوهات الشركات المدرّبة |
| 5 | `ServicesPreview` | معاينة الخدمات الأربع الرئيسية |
| 6 | `OffersSlider` | العروض والخصومات الحالية |
| 7 | `LMSSection` | تشجيع على منصة التعلم + redirect |
| 8 | `AssessmentSection` | تشجيع على تجربة الاختبارات |
| 9 | `FAQSection` | الأسئلة الشائعة (accordion) |
| 10 | `TestimonialsSlider` | آراء العملاء المنشورة |
| 11 | `ProjectsSlider` | أحدث مشاريع الطلاب (6 مشاريع) |
| 12 | `FounderSection` | قسم تعريف بالمؤسس |
| 13 | `VideoSection` | فيديو يوتيوب تعريفي |
| 14 | `AIAssistantSection` | قسم الـ AI Chatbot |
| 15 | `ContactSection` | نموذج تواصل مدمج |

---

## 📚 الكورسات (9 كورسات)

| الكورس | السعر | المدة | نوع |
|--------|-------|-------|-----|
| Excel من الصفر للاحتراف | مجاني | 20 ساعة | Live |
| **Excel + Power BI + AI + Freelance** ⭐ | 2,500 ج.م | 39 ساعة | Live |
| SQL Server لتحليل البيانات | 2,000 ج.م | 16 ساعة | Live |
| Python لتحليل البيانات | 2,000 ج.م | 16 ساعة | Live |
| Tableau للمبتدئين | 1,000 ج.م | 10 ساعات | Live |
| Looker Studio للمبتدئين | 1,000 ج.م | 8 ساعات | Live |
| كتابة التقارير الاحترافية | 3,000 ج.م | 12 ساعة | Live |
| أدوات AI وهندسة البرومبت | 1,500 ج.م | 20 ساعة | Live |
| **الباقة الكاملة** 🔥 | 6,000 ج.م | 120+ ساعة | Live |

كل الكورسات **Live على Zoom** — التسجيلات تُرسل بعد كل محاضرة.

---

## 📝 المدونة (8 مقالات)

| المقال | الفئة | وقت القراءة |
|--------|-------|------------|
| كيف تبدأ مسيرتك كمحلل بيانات 2025 | Career | 4 دقائق |
| Excel vs Power BI: أيهما تختار؟ | Tools | 3 دقائق |
| أهم 10 دوال SQL لتحليل البيانات | SQL | 4 دقائق |
| مقدمة في DAX لمستخدمي Power BI | Power BI | 4 دقائق |
| تنظيف البيانات باستخدام Python Pandas | Python | 4 دقائق |
| مبادئ تصميم الداشبوردات الاحترافية | Design | 4 دقائق |
| الإحصاء الذي يحتاجه كل محلل بيانات | Statistics | 4 دقائق |
| Tableau vs Looker Studio: المقارنة الكاملة | Tools | 4 دقائق |

كل مقال بمحتوى عربي وإنجليزي كامل مع صور توضيحية.

---

## 🎓 نظام الاختبارات

### Excel Assessment
- **40 سؤال** مقسمة على **6 فئات**: Basic Functions, Pivot Tables, Power Query, Data Visualization, Statistical Analysis, Advanced Formulas
- تصحيح فوري مع نسبة مئوية
- عرض الأسئلة التي أخطأ فيها المتدرب
- تحديد المستوى: Beginner / Intermediate / Advanced / Expert
- حفظ النتيجة في Airtable
- إرسال **شهادة PDF** بالإيميل
- إرسال إشعار للـ Sales

### Interview Assessment
- اختبار تفاعلي لمهارات المقابلات
- نفس نظام الحفظ والإيميل

---

## ⭐ نظام الآراء (Reviews)

```
المستخدم يملأ نموذج ReviewForm
        ↓
POST /api/testimonial
        ↓
حفظ في Airtable (Reviews) — Status: Pending
        ↓
إيميل إشعار لـ Sales@knowlyticshub.com
  (فيه زرار "فتح Airtable للموافقة")
        ↓
تغيير Status → Published
        ↓
يظهر في صفحة التقييمات وعلى الهوم
```

---

## 🤖 AI Chatbot

الـ Chatbot يشتغل بـ **طريقتين**:

1. **Anthropic API (Claude Haiku)** — لو `ANTHROPIC_API_KEY` متحط في الـ env
2. **Rule-Based Engine** — fallback بدون API key

يعرف يجاوب على:
- أسعار وتفاصيل كل كورس
- طرق الدفع والحجز
- معلومات المدرب والشركة
- التدريب المؤسسي
- الشهادات والفريلانس
- روابط واتساب ويوتيوب

---

## 👨‍🎓 مشاريع الطلاب (14 مشروع)

صور حقيقية لمشاريع طلاب Knowlytics Hub:
- **Sales Dashboards** (Fatma Ibrahim, Mazen Sabry)
- **HR Dashboards** (5 مشاريع مختلفة)
- **E-Commerce Analytics** (Fatma Ibrahim — 5 صفحات)
- **Coffee Shop Report** (Swilam Coffee)

كل مشروع فيه: اسم الطالب، وصف عربي وإنجليزي، الأدوات المستخدمة.

---

## 📧 API Routes

| Route | Method | الوظيفة |
|-------|--------|---------|
| `/api/assessment-result` | POST | حفظ نتيجة اختبار → Airtable + إيميل شهادة |
| `/api/testimonial` | POST | حفظ رأي جديد → Airtable (Pending) + إشعار |
| `/api/testimonials` | GET | جلب الآراء Status=Published من Airtable |
| `/api/chat` | POST | AI Chatbot (Claude أو Rule-Based) |
| `/api/contact` | POST | نموذج التواصل → إيميل |
| `/api/newsletter` | POST | الاشتراك في النشرة البريدية |
| `/api/service-request` | POST | طلب خدمة → إيميل |
| `/api/admin/projects` | GET/POST | إدارة مشاريع الطلاب (Admin) |

---

## 🔐 Environment Variables

```env
# Airtable
AIRTABLE_TOKEN=pat_xxxxxxxxxxxxxxxx
AIRTABLE_BASE_ID=appxxxxxxxxxxxxxxxx

# Resend
RESEND_API_KEY=re_xxxxxxxxxxxxxxxx

# Anthropic (اختياري - للـ AI Chatbot)
ANTHROPIC_API_KEY=sk-ant-xxxxxxxx
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
| Level | Text (مستوى + نسبة + درجة) |
| Weak Areas | Long Text |
| Question Details | Long Text (JSON) |
| Interests | Text |
| Date | Date |
| Status | Select: Completed |

### `Reviews`
| Field | Type |
|-------|------|
| Full Name | Text |
| title | Text (المسمى الوظيفي) |
| rating | Number (1-5) |
| Your Review | Long Text |
| Course You Completed | Text |
| LinkedIn Profile | URL |
| Date | Date |
| Status | Select: `Pending` / `Published` / `Rejected` |

---

## 🚀 Quick Start

```bash
# 1. Clone
git clone https://github.com/mohamedabdelfattah322-spec/knowlytics-website.git
cd knowlytics-website

# 2. Install
npm install

# 3. Environment
cp .env.example .env.local
# أضف AIRTABLE_TOKEN, AIRTABLE_BASE_ID, RESEND_API_KEY

# 4. Run
npm run dev
# → http://localhost:3000 (عربي)
# → http://localhost:3000/en (إنجليزي)
```

---

## 🚢 Deployment

```bash
git add .
git commit -m "your change"
git push origin main
# ✅ Vercel auto-deploys في أقل من دقيقتين
```

---

## 🌍 Infrastructure

| الخدمة | المزود |
|--------|--------|
| 🖥️ Website Hosting | Vercel |
| 🗄️ Data (Reviews & Assessments) | Airtable |
| 📧 Email Sending | Resend |
| 🌐 DNS | Cloudflare |
| 📨 Email Hosting | Hostinger (MX) |
| 🎓 LMS Platform | DigitalOcean + Supabase + PM2 |

---

## 📄 License

© 2025 Knowlytics Hub. All rights reserved.

---

## 🙋 Support

- **WhatsApp:** [+201226929392](https://wa.me/201226929392)
- **Email:** Sales@knowlyticshub.com
- **Website:** [knowlyticshub.com](https://knowlyticshub.com)
