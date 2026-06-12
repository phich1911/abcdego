"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import CourseIcon from "@/components/CourseIcon";
import { COURSES } from "@/lib/data";
import { getCourseProgress } from "@/lib/progress";
import { useEffect, useMemo, useState } from "react";
import Fuse from "fuse.js";

const CATEGORY_META: Record<string, { icon: string; description: string; borderColor: string; badgeBg: string; badgeColor: string; badgeBorder: string }> = {
  "สอบ ก.พ.": {
    icon: "📝",
    description: "วิชาความสามารถทั่วไป ภาษาไทย และภาษาอังกฤษ สำหรับสอบ ก.พ.",
    borderColor: "rgba(8,145,178,0.3)",
    badgeBg: "rgba(8,145,178,0.12)",
    badgeColor: "#67e8f9",
    badgeBorder: "rgba(8,145,178,0.3)",
  },
  "เจ้าหน้าที่คดีพิเศษ (DSI)": {
    icon: "🔎",
    description: "กฎหมายและกระบวนการสอบสวนคดีพิเศษ กรมสอบสวนคดีพิเศษ",
    borderColor: "rgba(220,38,38,0.3)",
    badgeBg: "rgba(220,38,38,0.12)",
    badgeColor: "#fca5a5",
    badgeBorder: "rgba(220,38,38,0.3)",
  },
  "ปลัดอำเภอ": {
    icon: "🏛️",
    description: "กฎหมายและระเบียบที่เกี่ยวข้องกับงานปลัดอำเภอ",
    borderColor: "rgba(124,58,237,0.25)",
    badgeBg: "rgba(124,58,237,0.15)",
    badgeColor: "#a78bfa",
    badgeBorder: "rgba(124,58,237,0.3)",
  },
};

const fuse = new Fuse(COURSES, {
  keys: ["title", "description", "tag", "category"],
  threshold: 0.4,
});

function CourseCard({ course, pct }: { course: (typeof COURSES)[0]; pct: number }) {
  return (
    <Link
      href={`/course/${course.id}`}
      className="glass rounded-2xl p-6 flex flex-col gap-4 transition-all hover:scale-[1.02] hover:glow"
    >
      <div className="flex items-start justify-between">
        <CourseIcon icon={course.icon} icon3d={course.icon3d} color={course.color} size={56} />
        {pct === 100 && (
          <span className="text-sm px-2 py-1 rounded-full font-bold" style={{ background: "rgba(16,185,129,0.15)", color: "var(--accent-green)" }}>
            ✓ เสร็จแล้ว
          </span>
        )}
      </div>
      <div>
        <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: `${course.color}22`, color: course.color }}>
          {course.tag}
        </span>
        <h2 className="font-black text-xl mt-2">{course.title}</h2>
        <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>{course.description}</p>
      </div>
      <div className="mt-auto">
        <div className="flex justify-between text-xs mb-1.5" style={{ color: "var(--text-muted)" }}>
          <span>ความก้าวหน้า</span>
          <span style={{ color: pct > 0 ? "var(--primary-light)" : undefined }}>{pct}%</span>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${pct}%` }} />
        </div>
        <div className="flex justify-between mt-3 text-sm">
          <span style={{ color: "var(--text-muted)" }}>{course.totalLessons} บทเรียน</span>
          <span className="font-bold" style={{ color: "var(--accent)" }}>⚡ {course.xpReward} XP</span>
        </div>
      </div>
    </Link>
  );
}

export default function CoursesPage() {
  const [progresses, setProgresses] = useState<Record<string, number>>({});
  const [query, setQuery] = useState("");

  useEffect(() => {
    const p: Record<string, number> = {};
    COURSES.forEach((c) => { p[c.id] = getCourseProgress(c.id, c.totalLessons); });
    setProgresses(p);
  }, []);

  const results = useMemo(() => {
    const q = query.trim();
    if (!q) return COURSES;
    return fuse.search(q).map((r) => r.item);
  }, [query]);

  const categoryOrder = ["สอบ ก.พ.", "เจ้าหน้าที่คดีพิเศษ (DSI)", "ปลัดอำเภอ"];
  const allCategories = categoryOrder.filter((cat) => results.some((c) => c.category === cat));
  const general = results.filter((c) => !c.category);

  return (
    <>
      <Navbar />
      <main className="max-w-5xl mx-auto px-6 pt-28 pb-16">
        <h1 className="text-4xl font-black mb-2">คอร์สทั้งหมด</h1>
        <p className="mb-6" style={{ color: "var(--text-muted)" }}>เลือกวิชาที่คุณอยากเรียน แล้วเริ่มได้เลย</p>

        {/* Search bar */}
        <div className="relative mb-10">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-base pointer-events-none" style={{ color: "rgba(255,255,255,0.3)" }}>
            🔍
          </span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ค้นหาคอร์ส เช่น กฎหมาย, ปลัดอำเภอ, อส., คณิต..."
            className="w-full rounded-2xl py-3.5 pl-11 pr-10 text-sm outline-none transition-all"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#fff",
              caretColor: "var(--primary-light)",
            }}
            onFocus={(e) => {
              e.currentTarget.style.border = "1px solid rgba(124,58,237,0.5)";
              e.currentTarget.style.background = "rgba(255,255,255,0.07)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.border = "1px solid rgba(255,255,255,0.1)";
              e.currentTarget.style.background = "rgba(255,255,255,0.05)";
            }}
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 transition-opacity hover:opacity-70"
              style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.8rem" }}
            >
              ✕
            </button>
          )}
        </div>

        {/* No results */}
        {results.length === 0 && (
          <div className="text-center py-20" style={{ color: "var(--text-muted)" }}>
            <p className="text-4xl mb-3">🔍</p>
            <p className="font-semibold">ไม่พบคอร์สที่ตรงกัน</p>
            <p className="text-sm mt-1 opacity-60">ลองค้นหาด้วยคำอื่น</p>
          </div>
        )}

        {/* Category sections */}
        {allCategories.map((cat) => {
          const meta = CATEGORY_META[cat];
          const courses = results.filter((c) => c.category === cat);
          return (
            <section key={cat} className="mb-14">
              <div className="flex items-center gap-3 mb-6 pb-4" style={{ borderBottom: `1px solid ${meta.borderColor}` }}>
                <span className="text-2xl">{meta.icon}</span>
                <div>
                  <h2 className="text-xl font-black" style={{ color: "#fff" }}>หมวด {cat}</h2>
                  <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{meta.description}</p>
                </div>
                <span className="ml-auto text-xs font-bold px-3 py-1 rounded-full" style={{ background: meta.badgeBg, color: meta.badgeColor, border: `1px solid ${meta.badgeBorder}` }}>
                  {courses.length} วิชา
                </span>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {courses.map((c) => <CourseCard key={c.id} course={c} pct={progresses[c.id] ?? 0} />)}
              </div>
            </section>
          );
        })}

        {/* General section */}
        {general.length > 0 && (
          <section>
            <div className="flex items-center gap-3 mb-6 pb-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
              <span className="text-2xl">📚</span>
              <div>
                <h2 className="text-xl font-black" style={{ color: "#fff" }}>วิชาทั่วไป</h2>
                <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>คณิตศาสตร์ ภาษาอังกฤษ และโปรแกรมมิ่ง</p>
              </div>
              <span className="ml-auto text-xs font-bold px-3 py-1 rounded-full" style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.1)" }}>
                {general.length} วิชา
              </span>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {general.map((c) => <CourseCard key={c.id} course={c} pct={progresses[c.id] ?? 0} />)}
            </div>
          </section>
        )}
      </main>
    </>
  );
}
