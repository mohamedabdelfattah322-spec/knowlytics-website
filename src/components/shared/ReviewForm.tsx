"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Star, Send } from "lucide-react";
import { toast } from "sonner";

interface ReviewFormProps {
  locale: string;
}

const COURSES = ["Excel", "SQL", "Power BI", "Python", "AI & Machine Learning", "Data Analytics"];

export default function ReviewForm({ locale }: ReviewFormProps) {
  const isAr = locale === "ar";
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState(5);
  const [hovered, setHovered] = useState(0);
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [courseName, setCourseName] = useState("");
  const [linkedin, setLinkedin] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/testimonial", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, title, rating, content, courseName, linkedin }),
      });

      if (res.ok) {
        toast.success(
          isAr
            ? "شكراً! سيتم مراجعة رأيك ونشره قريباً ✅"
            : "Thank you! Your review will be published soon ✅"
        );
        setName(""); setTitle(""); setContent(""); setCourseName(""); setLinkedin(""); setRating(5);
      } else {
        toast.error(isAr ? "حدث خطأ. حاول مرة أخرى." : "Something went wrong.");
      }
    } catch {
      toast.error(isAr ? "حدث خطأ. حاول مرة أخرى." : "Something went wrong.");
    }

    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="max-w-2xl mx-auto mt-16"
    >
      <div className="glass border border-white/10 rounded-3xl p-8">
        <div className="text-center mb-8">
          <span className="inline-block mb-3 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
            ✍️ {isAr ? "شارك رأيك" : "Share Your Review"}
          </span>
          <h3 className="text-2xl font-bold text-white mb-2">
            {isAr ? "ما رأيك في Knowlytics Hub؟" : "What do you think of Knowlytics Hub?"}
          </h3>
          <p className="text-slate-400 text-sm">
            {isAr ? "رأيك يساعد المتدربين الجدد في اتخاذ قرارهم" : "Your review helps new students make their decision"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Star Rating */}
          <div className="flex flex-col items-center gap-2">
            <p className="text-slate-400 text-sm">{isAr ? "تقييمك" : "Your Rating"}</p>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHovered(star)}
                  onMouseLeave={() => setHovered(0)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className={`w-8 h-8 transition-colors ${
                      star <= (hovered || rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-slate-600"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Name & Title */}
          <div className="grid sm:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder={isAr ? "اسمك *" : "Your Name *"}
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/5 text-white placeholder-slate-400 focus:outline-none focus:border-yellow-500 transition-colors text-sm"
            />
            <input
              type="text"
              placeholder={isAr ? "مسماك الوظيفي" : "Your Job Title"}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/5 text-white placeholder-slate-400 focus:outline-none focus:border-yellow-500 transition-colors text-sm"
            />
          </div>

          {/* Course */}
          <select
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-white/20 bg-slate-800 text-white focus:outline-none focus:border-yellow-500 transition-colors text-sm"
          >
            <option value="">{isAr ? "الدورة اللي اتدربت عليها (اختياري)" : "Course you took (optional)"}</option>
            {COURSES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>

          {/* Review */}
          <textarea
            placeholder={isAr ? "اكتب رأيك هنا... *" : "Write your review here... *"}
            required
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/5 text-white placeholder-slate-400 focus:outline-none focus:border-yellow-500 transition-colors text-sm resize-none"
          />

          {/* LinkedIn (optional) */}
          <input
            type="url"
            placeholder={isAr ? "رابط LinkedIn (اختياري)" : "LinkedIn URL (optional)"}
            value={linkedin}
            onChange={(e) => setLinkedin(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/5 text-white placeholder-slate-400 focus:outline-none focus:border-yellow-500 transition-colors text-sm"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold hover:from-yellow-400 hover:to-orange-400 transition-all shadow-lg disabled:opacity-60"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
            {loading
              ? (isAr ? "جاري الإرسال..." : "Sending...")
              : (isAr ? "إرسال رأيي" : "Submit Review")}
          </button>
        </form>
      </div>
    </motion.div>
  );
}
