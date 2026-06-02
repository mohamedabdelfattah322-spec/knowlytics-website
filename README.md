# 🎓 Knowlytics Hub — Website

الموقع الرسمي لـ **Knowlytics Hub** — منصة تحليل البيانات الرائدة في العالم العربي.

🌐 **الموقع:** [knowlyticshub.com](https://knowlyticshub.com)
🎓 **منصة التعلم (LMS):** [learn.knowlyticshub.com](https://learn.knowlyticshub.com)
📦 **GitHub:** [mohamedabdelfattah322-spec/knowlytics-website](https://github.com/mohamedabdelfattah322-spec/knowlytics-website)

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

## 📄 License

© 2025 Knowlytics Hub. All rights reserved.

---

## 🙋 Support

- **WhatsApp:** [+201226929392](https://wa.me/201226929392)
- **Email:** Sales@knowlyticshub.com
- **Website:** [knowlyticshub.com](https://knowlyticshub.com)
