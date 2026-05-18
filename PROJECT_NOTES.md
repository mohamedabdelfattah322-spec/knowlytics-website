# Knowlytics Hub — Landing Page Project Notes

## Project Overview
**Client:** Mohamed Abdelfattah  
**Company:** Knowlytics Hub  
**Project:** Landing Page for Data Analysis Courses  
**Location:** `D:\caude websites\landing-page\`

---

## Tech Stack
- **Single file:** `index.html` (HTML + CSS + JS)
- **Fonts:** Google Fonts — Cairo (Arabic)
- **Icons:** Font Awesome 6.5
- **Local Server:** Python HTTP Server on port 3030
- **Hosting:** Netlify / Vercel (free)
- **Color Theme:** Blue (`--blue-900` to `--blue-300`)

---

## Page Sections

| Section | ID | Notes |
|---|---|---|
| Navbar | `nav` | Logo + links + CTA |
| Hero | `.hero` | Main headline + CTA |
| Course Content | `#course` | 5 modules with topics |
| Companies Trained | `#companies-trained` | 8 companies with logos |
| Pricing | `#pricing` | 2 cards + analyst tip |
| Quiz | `#quiz` | 10 Excel questions |
| Trainees' Work | `#work` | 14 images slider |
| Groups | `#groups` | 8 group photos slider |
| Promo Video | — | YouTube Shorts embed |
| About | `#about` | Bio + stats |
| Feedback | `#testimonials` | 5 screenshots slider |
| FAQ | `#faq` | Links to chatbot |
| Contact | `#book` | WhatsApp + InstaPay + Vodafone Cash |
| Footer | `footer` | Social links |

---

## Files & Folders

```
landing-page/
├── index.html              ← Main page (all-in-one)
├── logo.png                ← Navbar logo (PNG transparent)
├── Logo.jpeg               ← Old logo (backup)
├── profile.JPG             ← Trainer photo
├── feedback/
│   ├── f1.jpeg ... f5.png  ← Feedback screenshots
├── work/
│   ├── w1.jpeg ... w300.jpeg ← 14 trainees' work images
├── groups/
│   ├── g1.jpeg ... g8.jpeg ← Group training photos
└── company logo/
    ├── Saint-Gobain.png
    ├── AFRAS KSA.jfif
    ├── Alyoum.png
    ├── Cinnabon.png
    ├── EFS.jfif
    ├── Asfour.jfif
    ├── Apleona.png
    └── Symphony Development.webp
```

---

## Companies Trained

| Company | Info |
|---|---|
| Saint-Gobain | French Company |
| AFRAS | KSA |
| Alyoum | Newspaper KSA |
| Cinnabon | Egypt |
| EFS | Egypt |
| Asfour | Egypt |
| Apleona | Egypt |
| Symphony Development | Egypt |

---

## Courses & Pricing

### Course 1: Excel + Power BI + AI + Freelance
- **Price:** 2,500 ج.م (بدل 4,000)
- **Start:** 9 مايو 2026
- **Duration:** 39 ساعة — 13 محاضرة
- **Format:** Online Live via Zoom + Recordings

### Course 2: الباقة الكاملة — تحليل البيانات
- **Tools:** Excel + Power BI + SQL + Python + AI + Tableau + Looker Studio + تقارير العمل
- **Price:** 6,000 ج.م (بدل 10,000)

---

## Key Features Built

### Slider Engine (RTL Fix)
```js
// JS pixel-based slider (not CSS percentage — fixes RTL bug)
function goTo(trackId, idx) {
  const s = SL[trackId];
  const offset = s.index * (s.slideW + s.gap);
  document.getElementById(trackId).style.transform = `translateX(-${offset}px)`;
}
```

### Excel Quiz
- 10 questions with 4 options each
- Immediate feedback + explanation per question
- 4-tier scoring system
- Back/Forward navigation

### Lightbox
- Click any work image to enlarge
- Navigate between images

---

## Important Links
- **Chatbot:** https://knowlytics-hub-coach-chatbot.netlify.app/
- **LMS Frontend:** https://knowlytics-frontend.vercel.app
- **YouTube:** https://youtube.com/shorts/xRp7_p7shhk
- **InstaPay:** (booking link in page)
- **Vodafone Cash:** 00201020945719
- **WhatsApp:** Contact button in page

---

## Social Media
- YouTube
- Instagram
- Facebook
- LinkedIn
- TikTok

---

## Key Bugs Fixed

| Bug | Fix |
|---|---|
| Slider too wide (1082px) | JS pixel calculation instead of CSS % |
| Slider not moving in RTL | `translateX(-offset)` + `direction: ltr` on track |
| Logo showing "Hub Knowlytics" | `direction: ltr` on `.logo` |
| Flag emojis showing as letters | Removed flag emojis from company cards |
| تجليل → تحليل typo | Global replace |
| Google Drive video blocked | Switched to YouTube embed |
| Company card flex layout | Added `flex-direction: column` |

---

## Future Plans
1. **Publish** on Hostinger with custom domain (`knowlyticshub.com`)
2. **Connect LMS** (knowlytics-frontend.vercel.app) to landing page
3. **WordPress** on Hostinger for full website
4. **Paymob** integration for online payments
5. **SEO** + Google Search Console

---

## Local Development
```bash
# Start server
python -m http.server 3030 --directory "D:/caude websites/landing-page"

# Open in browser
http://localhost:3030
```

---

## Hosting Options Used
| Platform | URL | Status |
|---|---|---|
| Netlify | knowlyticshub.netlify.app | Paused (credit limit) |
| Vercel | — | Deployed (404 issue) |
| Hostinger | — | Recommended for production |
