"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import { COURSES } from "@/lib/data";
import { getCourseProgress } from "@/lib/progress";
import { useEffect, useRef, useState } from "react";

function CourseCard({ course, pct }: { course: (typeof COURSES)[0]; pct: number }) {
  return (
    <Link
      href={`/course/${course.id}`}
      className="glass rounded-2xl p-6 flex flex-col gap-4 transition-all hover:scale-[1.02] hover:glow"
    >
      <div className="flex items-start justify-between">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl"
          style={{ background: `${course.color}22` }}
        >
          {course.icon}
        </div>
        {pct === 100 && (
          <span className="text-sm px-2 py-1 rounded-full font-bold" style={{ background: "rgba(16,185,129,0.15)", color: "var(--accent-green)" }}>
            ✓ เสร็จแล้ว
          </span>
        )}
      </div>
      <div>
        <span
          className="text-xs font-semibold px-2 py-0.5 rounded-full"
          style={{ background: `${course.color}22`, color: course.color }}
        >
          {course.tag}
        </span>
        <h2 className="font-black text-xl mt-2">{course.title}</h2>
        <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
          {course.description}
        </p>
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
  const [aiResults, setAiResults] = useState<string[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [aiLabel, setAiLabel] = useState("");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const p: Record<string, number> = {};
    COURSES.forEach((c) => { p[c.id] = getCourseProgress(c.id, c.totalLessons); });
    setProgresses(p);
  }, []);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    const q = query.trim();
    if (!q) { setAiResults(null); setAiLabel(""); return; }

    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      setAiLabel("");
      try {
        const res = await fetch("/api/search", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query: q }),
        });
        const data = await res.json();
        setAiResults(data.ids ?? []);
        setAiLabel(data.ids?.length > 0 ? `AI พบ ${data.ids.length} คอร์ส` : "ไม่พบคอร์สที่ตรงกัน");
      } catch {
        // fallback: simple text match
        const lq = q.toLowerCase();
        const ids = COURSES
          .filter((c) =>
            c.title.toLowerCase().includes(lq) ||
            c.description.toLowerCase().includes(lq) ||
            (c.category ?? "").toLowerCase().includes(lq) ||
            c.tag.toLowerCase().includes(lq)
          )
          .map((c) => c.id);
        setAiResults(ids);
        setAiLabel(ids.length > 0 ? `พบ ${ids.length} คอร์ส` : "ไม่พบคอร์สที่ตรงกัน");
      } finally {
        setLoading(false);
      }
    }, 600);
  }, [query]);

  const displayCourses = aiResults !== null
    ? COURSES.filter((c) => aiResults.includes(c.id))
    : null;

  const categorized = (displayCourses ?? COURSES).filter((c) => c.category === "ปลัดอำเภอ");
  const general = (displayCourses ?? COURSES).filter((c) => !c.category);

  return (
    <>
      <Navbar />
      <main className="max-w-5xl mx-auto px-6 pt-28 pb-16">
        <h1 className="text-4xl font-black mb-2">คอร์สทั้งหมด</h1>
        <p className="mb-6" style={{ color: "var(--text-muted)" }}>
          เลือกวิชาที่คุณอยากเรียน แล้วเริ่มได้เลย
        </p>

        {/* AI Search bar */}
        <div className="relative mb-4">
          <div
            className="flex items-center rounded-2xl px-4 py-3.5 gap-3 transition-all"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(124,58,237,0.3)",
              boxShadow: "0 0 20px rgba(124,58,237,0.08)",
            }}
          >
            {loading ? (
              <span className="text-base animate-spin" style={{ color: "#a78bfa" }}>✦</span>
            ) : (
              <span className="text-base" style={{ color: "rgba(167,139,250,0.7)" }}>✦</span>
            )}
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="ถามหรือค้นหาด้วย AI เช่น "อยากเรียนกฎหมาย" หรือ "คอร์สสำหรับปลัดอำเภอ""
              className="flex-1 bg-transparent outline-none text-sm"
              style={{ color: "#fff", caretColor: "#a78bfa" }}
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="text-xs px-2 py-0.5 rounded-full transition-opacity hover:opacity-70"
                style={{ color: "rgba(255,255,255,0.35)" }}
              >
                ✕
              </button>
            )}
          </div>
          {/* AI badge */}
          <span
            className="absolute -top-2.5 left-4 text-xs font-bold px-2 py-0.5 rounded-full"
            style={{ background: "rgba(124,58,237,0.9)", color: "#e9d5ff", fontSize: "0.65rem", letterSpacing: "0.08em" }}
          >
            ✦ AI SEARCH
          </span>
        </div>

        {/* Result label */}
        {aiLabel && (
          <p className="text-xs mb-8 ml-1" style={{ color: aiResults?.length ? "#a78bfa" : "rgba(255,255,255,0.35)" }}>
            {aiLabel}
          </p>
        )}
        {!aiLabel && <div className="mb-8" />}

        {/* No results */}
        {displayCourses !== null && displayCourses.length === 0 && (
          <div className="text-center py-20" style={{ color: "var(--text-muted)" }}>
            <p className="text-4xl mb-3">🔍</p>
            <p className="font-semibold">ไม่พบคอร์สที่ตรงกัน</p>
            <p className="text-sm mt-1">ลองค้นหาด้วยคำอื่น เช่น กฎหมาย, คณิต, โค้ด</p>
          </div>
        )}

        {/* ปลัดอำเภอ section */}
        {categorized.length > 0 && (
          <section className="mb-14">
            <div
              className="flex items-center gap-3 mb-6 pb-4"
              style={{ borderBottom: "1px solid rgba(124,58,237,0.25)" }}
            >
              <span className="text-2xl">🏛️</span>
              <div>
                <h2 className="text-xl font-black tracking-wide" style={{ color: "#fff" }}>
                  หมวด ปลัดอำเภอ
                </h2>
                <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                  กฎหมายและระเบียบที่เกี่ยวข้องกับงานปลัดอำเภอ
                </p>
              </div>
              <span
                className="ml-auto text-xs font-bold px-3 py-1 rounded-full"
                style={{ background: "rgba(124,58,237,0.15)", color: "#a78bfa", border: "1px solid rgba(124,58,237,0.3)" }}
              >
                {categorized.length} วิชา
              </span>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {categorized.map((course) => (
                <CourseCard key={course.id} course={course} pct={progresses[course.id] ?? 0} />
              ))}
            </div>
          </section>
        )}

        {/* General section */}
        {general.length > 0 && (
          <section>
            <div
              className="flex items-center gap-3 mb-6 pb-4"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
            >
              <span className="text-2xl">📚</span>
              <div>
                <h2 className="text-xl font-black tracking-wide" style={{ color: "#fff" }}>
                  วิชาทั่วไป
                </h2>
                <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                  คณิตศาสตร์ ภาษาอังกฤษ และโปรแกรมมิ่ง
                </p>
              </div>
              <span
                className="ml-auto text-xs font-bold px-3 py-1 rounded-full"
                style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.1)" }}
              >
                {general.length} วิชา
              </span>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {general.map((course) => (
                <CourseCard key={course.id} course={course} pct={progresses[course.id] ?? 0} />
              ))}
            </div>
          </section>
        )}
      </main>
    </>
  );
}
