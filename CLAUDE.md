# Knowlytics Hub — Project Memory

## Project Identity
- **Name:** Knowlytics Hub
- **Type:** Premium Bilingual Training & Consulting Website
- **Owner:** Mohamed Abdelfattah (Founder & Lead Instructor)
- **Stack:** Next.js 14 App Router · TypeScript · Tailwind CSS · next-intl · Prisma · PostgreSQL · Framer Motion

---

## Architecture Summary

### App Router Structure
```
src/app/[locale]/          ← All pages live under locale-prefixed routes
├── page.tsx               ← Home (all sections assembled here)
├── courses/               ← Course listing with search & filter
├── services/              ← Services showcase + Service Request Form
├── about/                 ← Mission, vision, values, founder story
├── testimonials/          ← Student reviews grid
├── companies/             ← Companies trained grid
├── excel-assessment/      ← Interactive Excel skill quiz
├── interview-assessment/  ← Data Analyst interview prep quiz
├── student-projects/      ← Projects showcase with category filter
├── lms/                   ← LMS portal landing + login form
├── blog/                  ← Blog listing with search & category filter
└── contact/               ← Contact form + social links
```

### i18n
- **Locales:** `en` (default) and `ar`
- **Library:** `next-intl` with App Router `[locale]` segment
- **Middleware:** `src/middleware.ts` handles locale detection and redirect
- **Translations:** `messages/en.json` and `messages/ar.json`
- **RTL:** handled via `dir="rtl"` on `<html>` tag in layout; Arabic font is Cairo via Google Fonts
- **Font switch:** `[dir="rtl"] body { font-family: var(--font-cairo) }`

### Key Components
| Component | Location | Purpose |
|---|---|---|
| `Header` | `components/layout/Header.tsx` | Sticky, glass-effect, with language switcher, theme toggle, dropdown nav |
| `Footer` | `components/layout/Footer.tsx` | Full footer with newsletter, links, social icons |
| `FloatingWhatsApp` | `components/layout/FloatingWhatsApp.tsx` | Fixed WhatsApp CTA |
| `ChatbotWidget` | `components/layout/ChatbotWidget.tsx` | AI chat UI with mock responses (swap API call for real AI) |
| `HeroSlider` | `components/home/HeroSlider.tsx` | 5-slide animated hero with auto-advance |
| `StatsCounter` | `components/home/StatsCounter.tsx` | CountUp animated statistics |
| `CourseCard` | `components/shared/CourseCard.tsx` | Reusable course card |
| `TestimonialCard` | `components/shared/TestimonialCard.tsx` | Reusable testimonial card |
| `ProjectCard` | `components/shared/ProjectCard.tsx` | Reusable project showcase card |

### Data Layer
- **Static JSON** (in `src/data/`): courses, testimonials, projects, companies, faq, blog posts
- **Prisma ORM** with **PostgreSQL** for dynamic data: enrollments, assessments, contact submissions, newsletter
- Prisma schema at `prisma/schema.prisma` — run `npm run db:push` to sync

---

## Design System

### Colors
- **Primary:** Blue 500–700 (`#3b82f6` → `#1d4ed8`)
- **Accent:** Purple/Violet gradient
- **Gold:** `#f59e0b` (used for stars, awards)
- **Dark bg:** `#0f172a` (slate-950)
- **Card bg (dark):** `#1e293b` (slate-900)

### Effects
- **Glassmorphism:** `.glass` class — `backdrop-filter: blur(20px)` + semi-transparent border
- **Gradient text:** `.gradient-text` class — blue→purple→pink
- **Card hover:** `.card-hover` — `translateY(-8px)` + glow shadow
- **Animated gradient bg:** `.animated-gradient`
- **Dot grid bg:** `.dots-bg`

### Typography
- English: **Inter** (Google Fonts)
- Arabic: **Cairo** (Google Fonts)
- Switched automatically based on `dir` attribute

---

## Environment Variables

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/knowlytics_hub"
NEXT_PUBLIC_SITE_URL="https://knowlyticshub.com"
NEXT_PUBLIC_WHATSAPP_NUMBER="+201000000000"
# Paymob (when integrating)
PAYMOB_API_KEY=""
PAYMOB_IFRAME_ID=""
# AI Chatbot (when integrating)
OPENAI_API_KEY=""
# or
ANTHROPIC_API_KEY=""
```

---

## Content Management

All static content is in `src/data/*.json`. To update:
- **Courses** → `src/data/courses.json`
- **Testimonials** → `src/data/testimonials.json`
- **Projects** → `src/data/projects.json`
- **Companies** → `src/data/companies.json`
- **FAQ** → `src/data/faq.json`

For dynamic content, use Prisma models and build admin API routes.

---

## Key Integrations (Ready to Wire Up)

### Paymob Payment Gateway
- Add `PAYMOB_API_KEY` and `PAYMOB_IFRAME_ID` to `.env`
- Create `/api/payments/create-order` route
- Embed Paymob iframe in course enrollment flow

### Real AI Chatbot
- Replace mock `getBotResponse()` in `ChatbotWidget.tsx` with:
```ts
const res = await fetch("/api/chat", {
  method: "POST",
  body: JSON.stringify({ message: userMessage }),
});
```
- Create `/api/chat` route using OpenAI or Anthropic SDK

### Custom LMS
- The LMS login form in `/lms/page.tsx` is ready for JWT auth
- Wire `/api/auth/login` route with Prisma user lookup

---

## Developer Notes

- All pages are **server components** by default; client interactivity uses `"use client"` directive
- Assessment pages are fully client-side (no DB writes currently; extend with `AssessmentResult` model)
- `next-themes` is configured for **dark mode by default** (`defaultTheme: "dark"`)
- Framer Motion `whileInView` animations use `viewport={{ once: true }}` for performance
- Images use Next.js `<Image>` with `fill` layout and `sizes` prop for optimization
- `sonner` handles all toast notifications

---

## Commands Reference

```bash
npm install            # Install dependencies
npm run dev            # Start dev server at localhost:3000
npm run build          # Production build
npm run db:push        # Sync Prisma schema to DB (dev)
npm run db:migrate     # Run migrations (production)
npm run db:studio      # Open Prisma Studio GUI
```
