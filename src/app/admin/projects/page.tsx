"use client";

import { useEffect, useState } from "react";
import { Save, Linkedin, User, Image as ImageIcon, Plus, Trash2, Check } from "lucide-react";

interface Project {
  id: string;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  student: string;
  linkedinUrl: string;
  category: string;
  image: string;
  tools: string[];
  demoUrl: string;
  githubUrl: string;
}

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [saved, setSaved] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [newProject, setNewProject] = useState(false);
  const [blank] = useState<Project>({
    id: "",
    titleEn: "",
    titleAr: "",
    descriptionEn: "",
    descriptionAr: "",
    student: "",
    linkedinUrl: "",
    category: "Excel",
    image: "",
    tools: [],
    demoUrl: "",
    githubUrl: "",
  });
  const [draft, setDraft] = useState<Project>({ ...blank });

  useEffect(() => {
    fetch("/api/admin/projects")
      .then((r) => r.json())
      .then((data) => { setProjects(data); setLoading(false); });
  }, []);

  async function saveProject(project: Project) {
    const updated = projects.map((p) => (p.id === project.id ? project : p));
    const res = await fetch("/api/admin/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    });
    if (res.ok) {
      setProjects(updated);
      setSaved(project.id);
      setTimeout(() => setSaved(null), 2000);
    }
  }

  async function addProject() {
    const newId = String(Date.now());
    const toAdd = { ...draft, id: newId };
    const updated = [...projects, toAdd];
    const res = await fetch("/api/admin/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    });
    if (res.ok) {
      setProjects(updated);
      setNewProject(false);
      setDraft({ ...blank });
      setSaved(newId);
      setTimeout(() => setSaved(null), 2000);
    }
  }

  async function deleteProject(id: string) {
    if (!confirm("هتمسح المشروع ده؟")) return;
    const updated = projects.filter((p) => p.id !== id);
    await fetch("/api/admin/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    });
    setProjects(updated);
  }

  if (loading) return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="text-white text-xl animate-pulse">جاري التحميل...</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950 py-10 px-4" dir="rtl">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">إدارة مشاريع المتدربين</h1>
            <p className="text-slate-400 mt-1">أضف اسم المتدرب ورابط LinkedIn لكل مشروع</p>
          </div>
          <button
            onClick={() => setNewProject(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            مشروع جديد
          </button>
        </div>

        {/* New Project Form */}
        {newProject && (
          <div className="bg-slate-800 border border-blue-500/40 rounded-2xl p-6 mb-6">
            <h2 className="text-white font-bold text-lg mb-4">مشروع جديد</h2>
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-400 text-sm mb-1 block">العنوان (عربي)</label>
                  <input value={draft.titleAr} onChange={e => setDraft({ ...draft, titleAr: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-600 text-white rounded-lg px-3 py-2 text-sm"
                    placeholder="اسم المشروع بالعربي" />
                </div>
                <div>
                  <label className="text-slate-400 text-sm mb-1 block">Title (English)</label>
                  <input value={draft.titleEn} onChange={e => setDraft({ ...draft, titleEn: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-600 text-white rounded-lg px-3 py-2 text-sm"
                    placeholder="Project title in English" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-400 text-sm mb-1 block">اسم المتدرب</label>
                  <input value={draft.student} onChange={e => setDraft({ ...draft, student: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-600 text-white rounded-lg px-3 py-2 text-sm"
                    placeholder="اسم المتدرب" />
                </div>
                <div>
                  <label className="text-slate-400 text-sm mb-1 block">رابط LinkedIn</label>
                  <input value={draft.linkedinUrl} onChange={e => setDraft({ ...draft, linkedinUrl: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-600 text-white rounded-lg px-3 py-2 text-sm"
                    placeholder="https://linkedin.com/in/..." dir="ltr" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-400 text-sm mb-1 block">التصنيف</label>
                  <select value={draft.category} onChange={e => setDraft({ ...draft, category: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-600 text-white rounded-lg px-3 py-2 text-sm">
                    {["Excel", "Power BI", "SQL", "Python", "AI"].map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-slate-400 text-sm mb-1 block">صورة المشروع (مسار أو رابط)</label>
                  <input value={draft.image} onChange={e => setDraft({ ...draft, image: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-600 text-white rounded-lg px-3 py-2 text-sm"
                    placeholder="/work/w7.jpeg" dir="ltr" />
                </div>
              </div>
              <div className="flex gap-3 mt-2">
                <button onClick={addProject}
                  className="bg-green-600 text-white px-5 py-2 rounded-xl hover:bg-green-700 transition-colors flex items-center gap-2">
                  <Save className="w-4 h-4" /> حفظ
                </button>
                <button onClick={() => { setNewProject(false); setDraft({ ...blank }); }}
                  className="bg-slate-700 text-slate-300 px-5 py-2 rounded-xl hover:bg-slate-600 transition-colors">
                  إلغاء
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Projects List */}
        <div className="space-y-4">
          {projects.map((project) => (
            <ProjectRow
              key={project.id}
              project={project}
              onSave={saveProject}
              onDelete={deleteProject}
              savedId={saved}
            />
          ))}
        </div>

        <p className="text-center text-slate-500 text-sm mt-8">
          الصفحة على: <span className="text-blue-400 font-mono">localhost:3000/admin/projects</span>
        </p>
      </div>
    </div>
  );
}

function ProjectRow({
  project,
  onSave,
  onDelete,
  savedId,
}: {
  project: Project;
  onSave: (p: Project) => void;
  onDelete: (id: string) => void;
  savedId: string | null;
}) {
  const [local, setLocal] = useState(project);
  const isSaved = savedId === project.id;

  return (
    <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-5 hover:border-slate-600 transition-colors">
      <div className="flex items-start gap-4">
        {/* Thumbnail */}
        <div className="w-20 h-16 rounded-xl overflow-hidden bg-slate-700 flex-shrink-0">
          {local.image ? (
            <img src={local.image} alt="" className="w-full h-full object-cover"
              onError={(e) => (e.currentTarget.style.display = "none")} />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <ImageIcon className="w-6 h-6 text-slate-500" />
            </div>
          )}
        </div>

        {/* Fields */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Project title (read-only display) */}
          <div className="md:col-span-2">
            <p className="text-white font-semibold">{local.titleAr || local.titleEn}</p>
            <span className="text-xs text-blue-400 bg-blue-400/10 px-2 py-0.5 rounded-full">{local.category}</span>
          </div>

          {/* Student name */}
          <div>
            <label className="text-slate-400 text-xs mb-1 flex items-center gap-1">
              <User className="w-3 h-3" /> اسم المتدرب
            </label>
            <input
              value={local.student}
              onChange={(e) => setLocal({ ...local, student: e.target.value })}
              className="w-full bg-slate-900 border border-slate-600 focus:border-blue-500 text-white rounded-lg px-3 py-1.5 text-sm outline-none transition-colors"
              placeholder="اكتب اسم المتدرب"
            />
          </div>

          {/* LinkedIn */}
          <div>
            <label className="text-slate-400 text-xs mb-1 flex items-center gap-1">
              <Linkedin className="w-3 h-3" /> رابط LinkedIn
            </label>
            <input
              value={local.linkedinUrl}
              onChange={(e) => setLocal({ ...local, linkedinUrl: e.target.value })}
              className="w-full bg-slate-900 border border-slate-600 focus:border-blue-500 text-white rounded-lg px-3 py-1.5 text-sm outline-none transition-colors"
              placeholder="https://linkedin.com/in/..."
              dir="ltr"
            />
          </div>

          {/* Image path */}
          <div className="md:col-span-2">
            <label className="text-slate-400 text-xs mb-1 flex items-center gap-1">
              <ImageIcon className="w-3 h-3" /> صورة المشروع
            </label>
            <input
              value={local.image}
              onChange={(e) => setLocal({ ...local, image: e.target.value })}
              className="w-full bg-slate-900 border border-slate-600 focus:border-blue-500 text-white rounded-lg px-3 py-1.5 text-sm outline-none transition-colors font-mono"
              placeholder="/work/w1.jpeg أو رابط صورة"
              dir="ltr"
            />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-slate-700">
        <button onClick={() => onDelete(project.id)}
          className="flex items-center gap-1 text-red-400 hover:text-red-300 text-sm px-3 py-1.5 rounded-lg hover:bg-red-400/10 transition-colors">
          <Trash2 className="w-4 h-4" /> حذف
        </button>
        <button onClick={() => onSave(local)}
          className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${
            isSaved
              ? "bg-green-600 text-white"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}>
          {isSaved ? <><Check className="w-4 h-4" /> تم الحفظ!</> : <><Save className="w-4 h-4" /> حفظ</>}
        </button>
      </div>
    </div>
  );
}
