"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import CourseIcon from "@/components/CourseIcon";
import { getCourse, getLessonsForCourse } from "@/lib/data";
import { isLessonCompleted, getCourseProgress } from "@/lib/progress";

export default function CoursePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const course = getCourse(id);
  if (!course) notFound();

  const lessons = getLessonsForCourse(id);
  const [completed, setCompleted] = useState<boolean[]>([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setCompleted(lessons.map((l) => isLessonCompleted(l.id)));
    setProgress(getCourseProgress(id, course.totalLessons));
  }, [id]);

  const firstIncomplete = lessons.findIndex((_, i) => !completed[i]);
  const nextLesson = firstIncomplete >= 0 ? lessons[firstIncomplete] : null;

  return (
    <>
      <Navbar />
      <main className="max-w-3xl mx-auto px-6 pt-28 pb-12">
        {/* Header */}
        <div className="glass rounded-2xl p-8 mb-8">
          <div className="flex items-center gap-4 mb-4">
            <CourseIcon icon={course.icon} icon3d={course.icon3d} color={course.color} size={64} />
            <div>
              <span
                className="text-xs font-semibold px-2 py-0.5 rounded-full"
                style={{ background: `${course.color}22`, color: course.color }}
              >
                {course.tag}
              </span>
              <h1 className="text-2xl font-black mt-1">{course.title}</h1>
            </div>
          </div>
          <p style={{ color: "var(--text-muted)" }}>{course.description}</p>

          <div className="mt-6">
            <div className="flex justify-between text-sm mb-2">
              <span style={{ color: "var(--text-muted)" }}>ความก้าวหน้า</span>
              <span className="font-bold" style={{ color: "var(--primary-light)" }}>{progress}%</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progress}%` }} />
            </div>
          </div>

          {nextLesson && (
            <Link
              href={`/lesson/${nextLesson.id}`}
              className="inline-block mt-6 px-6 py-3 rounded-full font-bold text-white glow transition-all hover:scale-105"
              style={{ background: "linear-gradient(135deg, var(--primary), var(--primary-light))" }}
            >
              {progress === 0 ? "เริ่มเรียน →" : "เรียนต่อ →"}
            </Link>
          )}
          {progress === 100 && (
            <div
              className="inline-block mt-6 px-6 py-3 rounded-full font-bold"
              style={{ background: "rgba(16,185,129,0.15)", color: "var(--accent-green)" }}
            >
              🎉 เรียนจบแล้ว!
            </div>
          )}
        </div>

        {/* Lesson list */}
        <h2 className="text-xl font-black mb-4">บทเรียน</h2>
        <div className="flex flex-col gap-3">
          {lessons.map((lesson, i) => {
            const done = completed[i];
            const locked = !done && i > 0 && !completed[i - 1];

            return (
              <div key={lesson.id} className={`glass rounded-xl p-5 flex items-center gap-4 transition-all ${locked ? "opacity-40" : "hover:scale-[1.01]"}`}>
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-black text-sm flex-shrink-0"
                  style={{
                    background: done ? "rgba(16,185,129,0.2)" : "var(--surface-2)",
                    color: done ? "var(--accent-green)" : "var(--text-muted)",
                  }}
                >
                  {done ? "✓" : i + 1}
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-bold">{lesson.title}</h3>
                  <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                    {lesson.steps.length} ขั้นตอน · ⚡ {lesson.xpReward} XP
                  </p>
                </div>

                {!locked && (
                  <Link
                    href={`/lesson/${lesson.id}`}
                    className="px-4 py-2 rounded-full text-sm font-bold transition-all hover:scale-105"
                    style={
                      done
                        ? { background: "rgba(16,185,129,0.15)", color: "var(--accent-green)" }
                        : { background: "var(--primary)", color: "white" }
                    }
                  >
                    {done ? "ทบทวน" : "เริ่ม"}
                  </Link>
                )}
                {locked && (
                  <span className="text-lg">🔒</span>
                )}
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
}
