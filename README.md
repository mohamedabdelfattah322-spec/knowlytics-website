# 🎓 Knowlytics Hub

A **premium, bilingual (Arabic & English)** training and consulting website for Knowlytics Hub — the #1 Data Analytics platform in the Arab World.

Built with **Next.js 14 App Router**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, **next-intl**, and **Prisma + PostgreSQL**.

---

## ✨ Features

- 🌐 **Bilingual** — Full Arabic/English support with RTL/LTR switching
- 🌙 **Dark/Light Mode** — Elegant dark-first design with theme toggle
- 📱 **Fully Responsive** — Mobile-first, looks great on all screen sizes
- ⚡ **Animated** — Framer Motion page transitions, scroll animations, counters
- 🎠 **Sliders** — Hero slider, courses, testimonials, projects, companies
- 🤖 **AI Chatbot** — Built-in AI assistant widget (mock + API-ready)
- 💬 **WhatsApp Float** — Floating WhatsApp CTA button
- 📊 **Assessments** — Interactive Excel & Interview assessments with scoring
- 🏫 **LMS Portal** — Login-ready LMS gateway
- 💳 **Payment-Ready** — Paymob integration scaffold in place
- 🔍 **SEO Optimized** — Metadata, OG tags, sitemap-ready

---

## 📁 Project Structure

```
knowlytics-hub/
├── messages/                  ← Translation files
│   ├── en.json
│   └── ar.json
├── prisma/
│   └── schema.prisma          ← Full DB schema
├── public/
│   └── images/                ← Static assets
├── src/
│   ├── app/
│   │   ├── [locale]/          ← All pages (locale-prefixed)
│   │   │   ├── layout.tsx     ← Root layout with i18n, themes
│   │   │   ├── page.tsx       ← Home page
│   │   │   ├── courses/
│   │   │   ├── services/
│   │   │   ├── about/
│   │   │   ├── testimonials/
│   │   │   ├── companies/
│   │   │   ├── excel-assessment/
│   │   │   ├── interview-assessment/
│   │   │   ├── student-projects/
│   │   │   ├── lms/
│   │   │   ├── blog/
│   │   │   └── contact/
│   │   └── globals.css
│   ├── components/
│   │   ├── home/              ← Home page sections
│   │   ├── layout/            ← Header, Footer, WhatsApp, Chatbot
│   │   └── shared/            ← Reusable cards and UI
│   ├── data/                  ← JSON content files
│   │   ├── courses.json
│   │   ├── testimonials.json
│   │   ├── projects.json
│   │   ├── companies.json
│   │   └── faq.json
│   ├── i18n/
│   │   ├── routing.ts
│   │   └── request.ts
│   ├── lib/
│   │   ├── prisma.ts
│   │   └── utils.ts
│   └── types/
│       └── index.ts
├── middleware.ts              ← next-intl middleware
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Create a `.env.local` file in the root:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/knowlytics_hub"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
NEXT_PUBLIC_WHATSAPP_NUMBER="+201000000000"
```

### 3. Set Up the Database

```bash
# Push schema to database (dev)
npm run db:push

# Open Prisma Studio (optional)
npm run db:studio
```

### 4. Start the Dev Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — it will redirect to `/en/` by default.

**Arabic version:** [http://localhost:3000/ar/](http://localhost:3000/ar/)

---

## 🌐 Pages

| Page | EN Route | AR Route |
|------|----------|----------|
| Home | `/en` | `/ar` |
| Courses | `/en/courses` | `/ar/courses` |
| Services | `/en/services` | `/ar/services` |
| About | `/en/about` | `/ar/about` |
| Testimonials | `/en/testimonials` | `/ar/testimonials` |
| Companies | `/en/companies` | `/ar/companies` |
| Excel Assessment | `/en/excel-assessment` | `/ar/excel-assessment` |
| Interview Assessment | `/en/interview-assessment` | `/ar/interview-assessment` |
| Student Projects | `/en/student-projects` | `/ar/student-projects` |
| LMS Portal | `/en/lms` | `/ar/lms` |
| Blog | `/en/blog` | `/ar/blog` |
| Contact | `/en/contact` | `/ar/contact` |

---

## 🎨 Customization Guide

### Update Content

All static content lives in `src/data/*.json`. Edit these files to update:

- **Courses** — `src/data/courses.json`
- **Testimonials** — `src/data/testimonials.json`
- **Student Projects** — `src/data/projects.json`
- **Company Logos** — `src/data/companies.json`
- **FAQ** — `src/data/faq.json`

### Update Translations

Edit `messages/en.json` and `messages/ar.json` for all UI text.

### Update Colors / Theme

Edit `tailwind.config.ts` to change the primary/accent color palette.

### Add Company Logos

Replace the placeholder company cards in `src/data/companies.json` — add a `logo` path and place the image in `public/images/companies/`.

---

## 💳 Paymob Integration

1. Get your API key from [Paymob Dashboard](https://accept.paymob.com)
2. Add to `.env.local`:
   ```env
   PAYMOB_API_KEY="your_api_key"
   PAYMOB_IFRAME_ID="your_iframe_id"
   ```
3. Create `/src/app/api/payments/create-order/route.ts`:
   ```ts
   // 1. Authenticate → get auth token
   // 2. Create order → get order ID
   // 3. Create payment key → get iframe URL
   // 4. Return iframe URL to client
   ```

---

## 🤖 Real AI Chatbot Integration

Replace the mock bot in `src/components/layout/ChatbotWidget.tsx`:

```ts
// Replace getBotResponse() with:
const response = await fetch("/api/chat", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ message: userMessage, locale }),
});
const { reply } = await response.json();
```

Create `/src/app/api/chat/route.ts` using OpenAI or Anthropic:

```ts
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

export async function POST(req: Request) {
  const { message } = await req.json();
  const response = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 500,
    system: "You are Knowlytics AI, a helpful data analytics tutor...",
    messages: [{ role: "user", content: message }],
  });
  return Response.json({ reply: response.content[0].text });
}
```

---

## 🚢 Deployment (Vercel)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard:
# DATABASE_URL, NEXT_PUBLIC_SITE_URL, etc.
```

Or connect your GitHub repo to Vercel for automatic deployments.

---

## 📦 Tech Stack

| Tool | Version | Purpose |
|------|---------|---------|
| Next.js | 14.2 | Framework (App Router) |
| React | 18 | UI Library |
| TypeScript | 5.5 | Type Safety |
| Tailwind CSS | 3.4 | Styling |
| next-intl | 3.17 | i18n (AR/EN) |
| next-themes | 0.3 | Dark/Light Mode |
| Framer Motion | 11 | Animations |
| Prisma | 5.17 | ORM |
| PostgreSQL | — | Database |
| sonner | 1.5 | Toast Notifications |
| react-countup | 6.5 | Animated Counters |
| lucide-react | 0.414 | Icons |

---

## 📄 License

© 2025 Knowlytics Hub. All rights reserved.

---

## 🙋 Support

- **WhatsApp:** +20 100 000 0000
- **Email:** hello@knowlyticshub.com
- **Website:** [knowlyticshub.com](https://knowlyticshub.com)
