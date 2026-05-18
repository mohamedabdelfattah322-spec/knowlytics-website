import { NextRequest, NextResponse } from "next/server";

// ─── System prompt with full knowledge base ───────────────────────────────────
const SYSTEM_PROMPT = `أنت مساعد Knowlytics Hub الذكي. مهمتك الرد على أسئلة المتدربين والعملاء المحتملين.

معلومات عن Knowlytics Hub:
- المؤسس: محمد عبدالفتاح — خبير تحليل بيانات بخبرة +8 سنوات، +100,000 مشترك على يوتيوب
- تدرّب معنا: أكثر من 7,000 متدرب
- دربنا موظفي: Saint-Gobain, AFRAS, Cinnabon, EFS, Asfour, Apleona, Symphony Development وغيرهم

الكورسات المتاحة (جميعها لايف أون لاين على Zoom):
1. Excel + Power BI + AI + Freelance — السعر: 2,500 ج.م (الأصلي 4,000) — 13 محاضرة — هدية مجانية: كورس Tableau + Looker Studio
2. SQL Server لتحليل البيانات — السعر: 2,000 ج.م (الأصلي 3,000)
3. Python لتحليل البيانات — السعر: 2,000 ج.م (الأصلي 3,000) — 5 محاضرات × 3 ساعات — يشمل: Pandas, NumPy, Matplotlib, Seaborn
4. Tableau للمبتدئين — السعر: 1,000 ج.م
5. Looker Studio للمبتدئين — السعر: 1,000 ج.م (أداة مجانية من Google)
6. كيفية كتابة التقارير الاحترافية — السعر: 3,000 ج.م (باللغة الإنجليزية)
7. أدوات الذكاء الاصطناعي وهندسة البرومبت — السعر: 4,000 ج.م — يشمل: ChatGPT, Claude, Gemini, Gamma
8. Excel من الصفر للاحتراف — السعر: تواصل معنا
9. الباقة الكاملة (كل الكورسات) — السعر: 6,000 ج.م (الأصلي 12,000)

طرق الدفع: InstaPay أو Vodafone Cash
للحجز والاستفسار: واتساب +201226929392

الخدمات:
- تطوير لوحات معلومات (Power BI, Excel, Python)
- تدريب مؤسسي للشركات
- حلول الذكاء الاصطناعي والأتمتة
- استشارات فردية 1-on-1

قواعد الرد:
- رد بنفس لغة السؤال (عربي أو إنجليزي)
- كن ودوداً ومفيداً ومختصراً
- اذكر رقم واتساب للتواصل دائماً: +201226929392
- الردود قصيرة (3-5 جمل كحد أقصى)`;

// ─── Comprehensive rule-based engine ─────────────────────────────────────────
function getRuleBasedResponse(message: string): string {
  const m = message.toLowerCase();
  const isAr = /[؀-ۿ]/.test(message);

  // Specific courses
  if ((m.includes("excel") && m.includes("power")) || (m.includes("excel") && m.includes("ai")) || (m.includes("excel") && m.includes("freelanc")) || (m.includes("excel") && m.includes("فريلانس"))) {
    return isAr
      ? "كورس Excel + Power BI + AI + Freelance 🔥\n💰 2,500 ج.م (بدلاً من 4,000)\n🎁 هدية: Tableau + Looker Studio مجاناً\n📅 13 محاضرة لايف على Zoom\n\nللحجز: https://wa.me/201226929392"
      : "Excel + Power BI + AI + Freelance Course 🔥\n💰 EGP 2,500 (was 4,000)\n🎁 Gift: Tableau + Looker Studio FREE\n📅 13 live sessions on Zoom\n\nBook: https://wa.me/201226929392";
  }
  if (m.includes("python")) {
    return isAr
      ? "كورس Python لتحليل البيانات 🐍\n💰 2,000 ج.م (بدلاً من 3,000)\n📅 5 محاضرات × 3 ساعات\n📚 Pandas, NumPy, Matplotlib, Seaborn + مشاريع حقيقية\n\nللحجز: https://wa.me/201226929392"
      : "Python for Data Analysis 🐍\n💰 EGP 2,000 (was 3,000)\n📅 5 sessions × 3 hours\n📚 Pandas, NumPy, Matplotlib, Seaborn + real projects\n\nBook: https://wa.me/201226929392";
  }
  if (m.includes("sql")) {
    return isAr
      ? "كورس SQL Server لتحليل البيانات 🗄️\n💰 2,000 ج.م (بدلاً من 3,000)\n📚 Database Design, ERD, Queries, JOINs + ربطه بـ Excel وPower BI\n\nللحجز: https://wa.me/201226929392"
      : "SQL Server for Data Analysis 🗄️\n💰 EGP 2,000 (was 3,000)\n📚 Database Design, ERD, Queries, JOINs + connect to Excel & Power BI\n\nBook: https://wa.me/201226929392";
  }
  if (m.includes("tableau")) {
    return isAr
      ? "كورس Tableau للمبتدئين 📊\n💰 1,000 ج.م فقط\n📚 Charts, Dashboards, Filters, Storytelling with Data\n\nللحجز: https://wa.me/201226929392"
      : "Tableau for Beginners 📊\n💰 EGP 1,000 only\n📚 Charts, Dashboards, Filters, Storytelling with Data\n\nBook: https://wa.me/201226929392";
  }
  if (m.includes("looker")) {
    return isAr
      ? "كورس Looker Studio للمبتدئين 📈\n💰 1,000 ج.م فقط — الأداة مجانية من Google!\n📚 Dashboards, Data Blending, Publishing Reports\n\nللحجز: https://wa.me/201226929392"
      : "Looker Studio for Beginners 📈\n💰 EGP 1,000 only — free tool from Google!\n📚 Dashboards, Data Blending, Publishing Reports\n\nBook: https://wa.me/201226929392";
  }
  if (m.includes("تقرير") || m.includes("report")) {
    return isAr
      ? "كورس كتابة التقارير الاحترافية ✍️\n💰 3,000 ج.م\n📚 Executive Summary, Findings, Recommendations, Formatting\n🌐 باللغة الإنجليزية\n\nللحجز: https://wa.me/201226929392"
      : "Professional Report Writing Course ✍️\n💰 EGP 3,000\n📚 Executive Summary, Findings, Recommendations, Formatting\n\nBook: https://wa.me/201226929392";
  }
  if (m.includes("ai") || m.includes("ذكاء") || m.includes("chatgpt") || m.includes("prompt") || m.includes("claude") || m.includes("gemini")) {
    return isAr
      ? "كورس أدوات AI وهندسة البرومبت 🤖\n💰 4,000 ج.م\n📚 ChatGPT, Claude, Gemini, Gamma + Prompt Engineering\n👥 مناسب لأي شخص يريد توفير وقته وزيادة إنتاجيته\n\nللحجز: https://wa.me/201226929392"
      : "AI Tools & Prompt Engineering Course 🤖\n💰 EGP 4,000\n📚 ChatGPT, Claude, Gemini, Gamma + Prompt Engineering\n\nBook: https://wa.me/201226929392";
  }
  if (m.includes("باقة") || m.includes("bundle") || m.includes("كل الكورس") || m.includes("all course")) {
    return isAr
      ? "الباقة الكاملة — أفضل قيمة 🔥\n💰 6,000 ج.م (بدلاً من 12,000) — وفّر 50%!\n✅ Excel + Power BI + SQL + Python + Tableau + Looker Studio + AI + كتابة التقارير\n\nللحجز: https://wa.me/201226929392"
      : "Full Bundle — Best Value 🔥\n💰 EGP 6,000 (was 12,000) — Save 50%!\n✅ Excel + Power BI + SQL + Python + Tableau + Looker Studio + AI + Report Writing\n\nBook: https://wa.me/201226929392";
  }

  // Price query
  if (m.includes("سعر") || m.includes("أسعار") || m.includes("price") || m.includes("cost") || m.includes("كام") || m.includes("بكم") || m.includes("تكلف")) {
    return isAr
      ? "أسعار كورساتنا 💰\n• Excel + Power BI + AI + Freelance: 2,500 ج.م 🔥\n• SQL Server: 2,000 ج.م\n• Python: 2,000 ج.م\n• Tableau: 1,000 ج.م\n• Looker Studio: 1,000 ج.م\n• كتابة التقارير: 3,000 ج.م\n• AI Tools: 4,000 ج.م\n• الباقة الكاملة: 6,000 ج.م (وفر 6,000!)\n\nالدفع: InstaPay أو Vodafone Cash 💳"
      : "Our Prices 💰\n• Excel + Power BI + AI + Freelance: EGP 2,500 🔥\n• SQL Server: EGP 2,000\n• Python: EGP 2,000\n• Tableau: EGP 1,000\n• Looker Studio: EGP 1,000\n• Report Writing: EGP 3,000\n• AI Tools: EGP 4,000\n• Full Bundle: EGP 6,000 (save 6,000!)\n\nPayment: InstaPay or Vodafone Cash 💳";
  }

  // Payment methods
  if (m.includes("دفع") || m.includes("payment") || m.includes("instapay") || m.includes("vodafone")) {
    return isAr
      ? "طرق الدفع المتاحة 💳\n• InstaPay\n• Vodafone Cash\n\nتواصل على واتساب للحصول على بيانات الدفع:\nhttps://wa.me/201226929392"
      : "Available Payment Methods 💳\n• InstaPay\n• Vodafone Cash\n\nContact us on WhatsApp for payment details:\nhttps://wa.me/201226929392";
  }

  // Courses list
  if (m.includes("دورات") || m.includes("كورسات") || m.includes("courses") || m.includes("ايه") || m.includes("ما هي") || m.includes("what") || m.includes("متاح")) {
    return isAr
      ? "كورساتنا المتاحة 🎓\n1. Excel + Power BI + AI + Freelance (2,500 ج.م)\n2. SQL Server (2,000 ج.م)\n3. Python (2,000 ج.م)\n4. Tableau (1,000 ج.م)\n5. Looker Studio (1,000 ج.م)\n6. كتابة التقارير (3,000 ج.م)\n7. أدوات AI (4,000 ج.م)\n8. الباقة الكاملة (6,000 ج.م)\n\nجميعها لايف على Zoom! للحجز: https://wa.me/201226929392"
      : "Our Available Courses 🎓\n1. Excel + Power BI + AI + Freelance (EGP 2,500)\n2. SQL Server (EGP 2,000)\n3. Python (EGP 2,000)\n4. Tableau (EGP 1,000)\n5. Looker Studio (EGP 1,000)\n6. Report Writing (EGP 3,000)\n7. AI Tools (EGP 4,000)\n8. Full Bundle (EGP 6,000)\n\nAll live on Zoom! Book: https://wa.me/201226929392";
  }

  // Certificate
  if (m.includes("شهادة") || m.includes("certif")) {
    return isAr
      ? "نعم! بعد إنهاء أي كورس ستحصل على شهادة معتمدة من Knowlytics Hub يمكنك إضافتها على LinkedIn 🏆\nالشهادة رقمية ومعترف بها من الشركات."
      : "Yes! After completing any course you'll receive a certified Knowlytics Hub certificate to add on LinkedIn 🏆\nDigital certificate recognized by companies.";
  }

  // Corporate training
  if (m.includes("شركة") || m.includes("مؤسسي") || m.includes("corporate") || m.includes("موظفين") || m.includes("فريق") || m.includes("team")) {
    return isAr
      ? "نقدم تدريباً مؤسسياً مخصصاً للشركات 🏢\nدربنا موظفي Saint-Gobain وAFRAS وCinnabon وEFS وغيرهم.\n\nتواصل معنا لبرنامج مخصص لفريقك:\nhttps://wa.me/201226929392"
      : "We offer customized corporate training 🏢\nWe've trained employees at Saint-Gobain, AFRAS, Cinnabon, EFS and more.\n\nContact us for a custom program:\nhttps://wa.me/201226929392";
  }

  // Freelance
  if (m.includes("فريلانس") || m.includes("freelanc") || m.includes("عمل حر") || m.includes("مستقل")) {
    return isAr
      ? "تعلم الفريلانس في كورس Excel + Power BI + AI + Freelance 💼\nستتعلم: بناء Portfolio، الحصول على أول عميل، تسعير خدماتك.\n\nللحجز: https://wa.me/201226929392"
      : "Learn freelancing in the Excel + Power BI + AI + Freelance course 💼\nYou'll learn: Building a portfolio, getting your first client, pricing your services.\n\nBook: https://wa.me/201226929392";
  }

  // Contact
  if (m.includes("تواصل") || m.includes("واتساب") || m.includes("whatsapp") || m.includes("contact") || m.includes("رقم")) {
    return isAr
      ? "تواصل معنا 📱\n• واتساب: https://wa.me/201226929392\n• YouTube: @Knowlytics_Hub\n• Instagram: @knowlytics_hub"
      : "Contact us 📱\n• WhatsApp: https://wa.me/201226929392\n• YouTube: @Knowlytics_Hub\n• Instagram: @knowlytics_hub";
  }

  // YouTube
  if (m.includes("يوتيوب") || m.includes("youtube") || m.includes("قناة") || m.includes("channel")) {
    return isAr
      ? "قناة Knowlytics Hub على يوتيوب 🎬\n+100,000 مشترك!\nابحث عن: @Knowlytics_Hub\nمحتوى مجاني في تحليل البيانات والذكاء الاصطناعي"
      : "Knowlytics Hub YouTube Channel 🎬\n100K+ subscribers!\nSearch: @Knowlytics_Hub\nFree content in data analytics and AI";
  }

  // Mohamed / founder
  if (m.includes("محمد") || m.includes("مدرب") || m.includes("founder") || m.includes("instructor") || m.includes("مؤسس")) {
    return isAr
      ? "محمد عبدالفتاح — مؤسس Knowlytics Hub 👨‍🏫\n• خبرة +8 سنوات في تحليل البيانات\n• +7,000 متدرب\n• +100,000 مشترك على يوتيوب\n• درّب موظفي كبرى الشركات في مصر والخليج"
      : "Mohamed Abdelfattah — Knowlytics Hub Founder 👨‍🏫\n• 8+ years data analytics experience\n• 7,000+ trainees\n• 100K+ YouTube subscribers\n• Trained employees at major companies across Egypt and the Gulf";
  }

  // Default
  return isAr
    ? "شكراً لتواصلك مع Knowlytics Hub! 😊\nيمكنني مساعدتك في:\n• معلومات الكورسات والأسعار\n• طرق الدفع والحجز\n• التدريب المؤسسي\n\nللتواصل المباشر: https://wa.me/201226929392"
    : "Thanks for reaching out to Knowlytics Hub! 😊\nI can help you with:\n• Course info and pricing\n• Payment and booking\n• Corporate training\n\nDirect contact: https://wa.me/201226929392";
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message } = body;

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    // Try Anthropic API if key is configured
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (apiKey) {
      try {
        const response = await fetch("https://api.anthropic.com/v1/messages", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": apiKey,
            "anthropic-version": "2023-06-01",
          },
          body: JSON.stringify({
            model: "claude-haiku-4-5-20251001",
            max_tokens: 400,
            system: SYSTEM_PROMPT,
            messages: [{ role: "user", content: message }],
          }),
        });

        if (response.ok) {
          const data = await response.json();
          const reply = data.content?.[0]?.text;
          if (reply) {
            return NextResponse.json({ reply });
          }
        }
      } catch {
        // Fall through to rule-based
      }
    }

    // Rule-based response (works without API key)
    await new Promise((r) => setTimeout(r, 600));
    const reply = getRuleBasedResponse(message);
    return NextResponse.json({ reply });

  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { reply: "عذراً، حدث خطأ مؤقت. تواصل معنا مباشرة:\nhttps://wa.me/201226929392" },
      { status: 500 }
    );
  }
}
