# Knowlytics Hub — Project Documentation

## Overview

**Knowlytics Hub** is a premium bilingual (Arabic & English) training and consulting website for data analytics, business intelligence, and AI courses. Built for **Mohamed Abdelfattah**, the platform showcases courses, student projects, testimonials, and enables enrollment with payment via InstaPay and Vodafone Cash.

- **Live domain:** knowlyticshub.com
- **Local dev:** http://localhost:3000
- **Arabic route:** http://localhost:3000/ar
- **English route:** http://localhost:3000/en

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 3 |
| Animations | Framer Motion 11 |
| i18n | next-intl 3.17 |
| Dark Mode | next-themes |
| ORM | Prisma 5 |
| Database | PostgreSQL |
| Forms | React Hook Form + Zod |
| UI Primitives | Radix UI |
| Icons | Lucide React |
| Notifications | Sonner |
| Video | React Player |
| Sliders | Swiper.js |
| Counters | React CountUp |

---

## Project Structure

```
knowlytics-hub/
├── middleware.ts                    # next-intl locale routing
├── prisma/
│   └── schema.prisma               # Database models
├── messages/
│   ├── en.json                     # English translations
│   └── ar.json                     # Arabic translations
├── public/
│   └── profile.JPG                 # Founder photo
└── src/
    ├── app/
    │   ├── globals.css             # Global styles + design tokens
    │   ├── [locale]/               # All pages under locale prefix
    │   │   ├── layout.tsx          # Root layout (providers, header, footer)
    │   │   ├── page.tsx            # Home page
    │   │   ├── about/page.tsx
    │   │   ├── blog/
    │   │   │   ├── page.tsx        # Blog listing
    │   │   │   └── [slug]/page.tsx # Blog post detail
    │   │   ├── companies/page.tsx
    │   │   ├── contact/page.tsx
    │   │   ├── courses/
    │   │   │   ├── page.tsx        # Course listing
    │   │   │   ├── CoursesPageClient.tsx
    │   │   │   └── [slug]/page.tsx # Course detail + enrollment
    │   │   ├── excel-assessment/page.tsx
    │   │   ├── interview-assessment/page.tsx
    │   │   ├── lms/page.tsx
    │   │   ├── services/page.tsx
    │   │   ├── student-projects/page.tsx
    │   │   └── testimonials/page.tsx
    │   ├── admin/
    │   │   └── projects/page.tsx
    │   └── api/
    │       ├── chat/route.ts       # AI chatbot endpoint
    │       ├── contact/route.ts    # Contact form handler
    │       ├── newsletter/route.ts # Newsletter subscription
    │       └── admin/projects/route.ts
    ├── components/
    │   ├── home/                   # Homepage sections
    │   │   ├── HeroSlider.tsx      # 5-slide animated hero with consultation form
    │   │   ├── StatsCounter.tsx    # Animated statistics (CountUp)
    │   │   ├── CoursesSlider.tsx   # Featured courses carousel
    │   │   ├── FounderSection.tsx  # Founder bio + achievements
    │   │   ├── VideoSection.tsx    # YouTube embed section
    │   │   ├── TestimonialsSlider.tsx
    │   │   ├── ProjectsSlider.tsx  # Student projects carousel
    │   │   ├── CompaniesSlider.tsx # Trained companies logos
    │   │   ├── ServicesPreview.tsx
    │   │   ├── LMSSection.tsx      # LMS portal teaser
    │   │   ├── AssessmentSection.tsx
    │   │   └── AIAssistantSection.tsx
    │   ├── layout/
    │   │   ├── Header.tsx          # Sticky glass nav with dropdowns
    │   │   ├── Footer.tsx          # Full footer with newsletter
    │   │   ├── FloatingWhatsApp.tsx # Fixed WhatsApp CTA button
    │   │   └── ChatbotWidget.tsx   # AI chatbot UI
    │   └── shared/
    │       ├── CourseCard.tsx      # Reusable course card
    │       ├── TestimonialCard.tsx # Reusable testimonial card
    │       ├── ProjectCard.tsx     # Reusable project card
    │       └── SectionTitle.tsx
    ├── data/                       # Static JSON content
    │   ├── courses.json
    │   ├── testimonials.json
    │   ├── projects.json
    │   ├── companies.json
    │   ├── faq.json
    │   └── blog.json
    ├── i18n/
    │   ├── routing.ts              # Locale config (en, ar)
    │   └── request.ts              # getRequestConfig for next-intl
    ├── lib/
    │   ├── prisma.ts               # Prisma client singleton
    │   └── utils.ts                # cn() helper
    └── types/
        └── index.ts                # Shared TypeScript types
```

---

## Pages & Routes

| Route | Page | Description |
|---|---|---|
| `/[locale]` | Home | Hero slider, stats, courses, founder, testimonials, projects |
| `/[locale]/courses` | Courses | Search + filter grid of all courses |
| `/[locale]/courses/[slug]` | Course Detail | Full course info + enrollment card with payment |
| `/[locale]/services` | Services | Corporate training, consulting, dashboards |
| `/[locale]/about` | About | Mission, vision, values, founder story |
| `/[locale]/testimonials` | Testimonials | Full student reviews grid |
| `/[locale]/companies` | Companies | Trained organizations logos |
| `/[locale]/blog` | Blog | Articles with search and category filter |
| `/[locale]/blog/[slug]` | Blog Post | Full article with author info |
| `/[locale]/excel-assessment` | Excel Quiz | Interactive Excel skill assessment |
| `/[locale]/interview-assessment` | Interview Quiz | Data analyst interview prep quiz |
| `/[locale]/student-projects` | Projects | Student project showcase |
| `/[locale]/lms` | LMS Portal | Learning management system landing |
| `/[locale]/contact` | Contact | Contact form + social links |

---

## Internationalization (i18n)

- **Locales:** `en` (default) and `ar`
- **Routing:** `localePrefix: "always"` — every URL has `/en/` or `/ar/` prefix
- **RTL:** `dir="rtl"` set on `<html>` tag for Arabic; Cairo font switches in automatically
- **Translations:** `messages/en.json` and `messages/ar.json`
- **Critical rule:** Every page and layout **must** call `setRequestLocale(locale)` at the top — without it, next-intl v3 falls back to English

### Translation Namespaces

| Namespace | Used in |
|---|---|
| `nav` | Header navigation links |
| `hero` | Hero slider content |
| `stats` | Statistics counter labels |
| `courses` | Courses page and cards |
| `founder` | Founder section |
| `testimonials` | Testimonials section |
| `services` | Services page |
| `footer` | Footer links and newsletter |
| `contact` | Contact form |
| `chatbot` | AI chatbot UI |

---

## Design System

### Color Palette

| Token | Value | Usage |
|---|---|---|
| Primary Blue | `#3b82f6` (blue-500) | Buttons, links, highlights |
| Primary Dark | `#1d4ed8` (blue-700) | Hover states |
| Accent Purple | `#7c3aed` (violet-600) | Gradient accents |
| Gold | `#f59e0b` (amber-500) | Stars, awards, badges |
| Dark BG | `#0f172a` (slate-950) | Page background |
| Card BG | `#1e293b` (slate-900) | Card backgrounds |
| Border | `rgba(255,255,255,0.1)` | Card borders |

### CSS Utility Classes

```css
.glass          /* Glassmorphism: blur(20px) + semi-transparent border */
.gradient-text  /* Blue → Purple → Pink gradient text */
.card-hover     /* translateY(-8px) + glow shadow on hover */
.animated-gradient  /* Animated gradient background */
.dots-bg        /* Dot grid pattern background */
.section-padding    /* Consistent vertical padding for sections */
```

---

## Database Schema (Prisma / PostgreSQL)

### Models

| Model | Purpose |
|---|---|
| `User` | Students and admins (roles: ADMIN, INSTRUCTOR, STUDENT, COMPANY) |
| `Course` | Course catalogue with bilingual titles and pricing |
| `Enrollment` | User ↔ Course enrollments with payment status |
| `Testimonial` | Student reviews (bilingual, with optional video) |
| `Project` | Student portfolio projects |
| `Company` | Trained organizations |
| `BlogPost` | Bilingual blog articles |
| `FAQ` | Frequently asked questions |
| `AssessmentQuestion` | Quiz questions for Excel and Interview assessments |
| `AssessmentResult` | Stored quiz results per session/user |
| `ContactSubmission` | Contact form entries |
| `Newsletter` | Email subscriber list |
| `Offer` | Promotional offers |

---

## Courses

| Slug | Title (EN) | Price (EGP) |
|---|---|---|
| `excel-zero-to-hero` | Excel — Zero to Hero | 1,499 |
| `excel-powerbi-ai-freelance` | Excel + Power BI + AI + Freelance | 2,999 |
| `sql-data-analysis` | SQL for Data Analysis | 1,299 |
| `python-data-analysis` | Python for Data Analysis | 1,799 |
| `tableau-data-viz` | Tableau — Data Visualization | 1,499 |
| `looker-studio` | Looker Studio (Google Data Studio) | 999 |
| `report-writing` | Professional Report Writing | 799 |
| `ai-tools-business` | AI Tools for Business | 1,199 |
| `full-data-analysis-bundle` | Full Data Analytics Bundle | 5,999 |

---

## Payment Methods

Enrollment payments are accepted via:

- **InstaPay:** https://ipn.eg/S/msara/instapay/9Z2HJW
- **Vodafone Cash:** 01020945719

After payment, students send the receipt screenshot to WhatsApp: **+201226929392**

---

## Social Media & Contact

| Platform | Link |
|---|---|
| YouTube | youtube.com/c/MohamedAbdelfattahYallaNet3alemM |
| Facebook | facebook.com/MohamedabdelfattahYallanet3alem1 |
| Instagram | instagram.com/m._abdelfattah_knowlytics_hub |
| LinkedIn | linkedin.com/in/mohamed-abdelfattah-el-sayed |
| TikTok | tiktok.com/@mohamedabdelfattah23 |
| Website | m-abdelfattah.com |
| WhatsApp | +201226929392 |
| Email | hello@knowlyticshub.com |
| Location | Cairo, Egypt |

---

## Environment Variables

Create a `.env.local` file in the project root:

```env
# Database
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/knowlytics_hub"

# Site
NEXT_PUBLIC_SITE_URL="https://knowlyticshub.com"
NEXT_PUBLIC_WHATSAPP_NUMBER="+201226929392"

# Payment (Paymob — when integrating)
PAYMOB_API_KEY=""
PAYMOB_IFRAME_ID=""

# AI Chatbot (choose one)
OPENAI_API_KEY=""
ANTHROPIC_API_KEY=""
```

---

## Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Sync Prisma schema to database (dev)
npm run db:push

# Run database migrations (production)
npm run db:migrate

# Open Prisma Studio GUI
npm run db:studio
```

---

## Key Integrations (Ready to Wire Up)

### Paymob Payment Gateway
1. Add `PAYMOB_API_KEY` and `PAYMOB_IFRAME_ID` to `.env.local`
2. Create `/api/payments/create-order` route
3. Embed Paymob iframe in the course enrollment flow

### Real AI Chatbot
Replace mock `getBotResponse()` in `ChatbotWidget.tsx` with:
```ts
const res = await fetch("/api/chat", {
  method: "POST",
  body: JSON.stringify({ message: userMessage }),
});
```
Then build `/api/chat` using OpenAI or Anthropic SDK.

### LMS Authentication
The login form in `/lms/page.tsx` is ready. Wire `/api/auth/login` route with Prisma user lookup and JWT tokens.

---

## Developer Notes

- All pages are **server components** by default; use `"use client"` only when interactivity is needed
- Every page under `[locale]/` must call `setRequestLocale(locale)` — this is **required** by next-intl v3 for correct language resolution
- Phone numbers and LTR-only text must use `<span dir="ltr">` to prevent RTL reversal of `+` sign
- `next-themes` is configured with `defaultTheme: "dark"` and no system theme detection
- Framer Motion animations use `viewport={{ once: true }}` for performance
- Images use Next.js `<Image>` with `fill` and `sizes` props
- Toast notifications via `sonner` — position switches based on locale (`bottom-left` for Arabic)
- Static content lives in `src/data/*.json`; dynamic content goes through Prisma models

---

## Owner

**Mohamed Abdelfattah**
Founder & Lead Data Analytics Instructor
Cairo, Egypt
