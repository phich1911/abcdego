"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { notFound } from "next/navigation";
import { getLesson, getCourse, LESSONS } from "@/lib/data";
import { completeLesson } from "@/lib/progress";
import Navbar from "@/components/Navbar";

export default function LessonPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const lessonData = getLesson(id);
  if (!lessonData) notFound();
  const lesson = lessonData;

  const course = getCourse(lesson.courseId);
  const nextLesson = LESSONS.find(
    (l) => l.courseId === lesson.courseId && l.order === lesson.order + 1
  );
  const [stepIndex, setStepIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [fillInput, setFillInput] = useState("");
  const [answered, setAnswered] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [shake, setShake] = useState(false);
  const [done, setDone] = useState(false);

  const step = lesson.steps[stepIndex];
  const progress = Math.round((stepIndex / lesson.steps.length) * 100);

  function nextStep() {
    setSelected(null);
    setFillInput("");
    setAnswered(false);
    setCorrect(false);
    if (stepIndex + 1 >= lesson.steps.length) {
      completeLesson(lesson.id, lesson.xpReward);
      setDone(true);
    } else {
      setStepIndex((s) => s + 1);
    }
  }

  function checkQuiz(idx: number) {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
    if (step.type === "quiz" && idx === step.correct) {
      setCorrect(true);
    } else {
      setCorrect(false);
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  }

  function checkFill() {
    if (answered || step.type !== "fill") return;
    setAnswered(true);
    const isCorrect = fillInput.trim().toLowerCase() === step.answer.toLowerCase();
    setCorrect(isCorrect);
    if (!isCorrect) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  }

  if (done) {
    return (
      <>
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-[80vh] px-6 text-center">
          <div className="animate-bounce-in">
            <div className="text-8xl mb-6">🎉</div>
            <h1 className="text-4xl font-black mb-3">ยอดเยี่ยม!</h1>
            <p className="text-xl mb-2" style={{ color: "var(--text-muted)" }}>
              คุณผ่านบทเรียน <strong style={{ color: "var(--text)" }}>{lesson.title}</strong>
            </p>
            <div
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xl font-black my-6"
              style={{ background: "rgba(245,158,11,0.15)", color: "var(--accent)" }}
            >
              ⚡ +{lesson.xpReward} XP
            </div>
            <div className="flex flex-col items-center gap-3 mt-4 w-full max-w-xs mx-auto">
              {nextLesson && (
                <button
                  onClick={() => router.push(`/lesson/${nextLesson.id}`)}
                  className="w-full px-6 py-3 rounded-full font-bold text-white glow transition-all hover:scale-105"
                  style={{ background: "linear-gradient(135deg, var(--primary), var(--primary-light))" }}
                >
                  บทเรียนถัดไป → {nextLesson.title}
                </button>
              )}
              <div className="flex gap-3 w-full">
                <button
                  onClick={() => router.push(`/course/${lesson.courseId}`)}
                  className="flex-1 px-4 py-3 rounded-full font-bold"
                  style={{
                    background: nextLesson ? "transparent" : "linear-gradient(135deg, var(--primary), var(--primary-light))",
                    border: nextLesson ? "1px solid var(--border)" : "none",
                    color: nextLesson ? "var(--text-muted)" : "#fff",
                  }}
                >
                  กลับไปที่คอร์ส
                </button>
                <button
                  onClick={() => router.push("/courses")}
                  className="flex-1 px-4 py-3 rounded-full font-bold"
                  style={{ border: "1px solid var(--border)", color: "var(--text-muted)" }}
                >
                  ดูคอร์สอื่น
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="max-w-2xl mx-auto px-6 pt-24 pb-10">
        {/* Top bar */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => router.push(`/course/${lesson.courseId}`)}
            className="text-xl p-2 rounded-full transition-colors hover:bg-white/5"
            style={{ color: "var(--text-muted)" }}
          >
            ←
          </button>
          <div className="flex-1 progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <span className="text-sm font-bold" style={{ color: "var(--text-muted)" }}>
            {stepIndex + 1}/{lesson.steps.length}
          </span>
        </div>

        {/* Lesson title */}
        <p className="text-sm mb-2" style={{ color: "var(--text-muted)" }}>
          {course?.icon} {course?.title} · {lesson.title}
        </p>

        {/* Step card */}
        <div className={`glass rounded-2xl p-8 min-h-[300px] ${shake ? "animate-shake" : ""}`}>
          {step.type === "info" && (
            <div className="flex flex-col gap-4 animate-bounce-in">
              <h2 className="text-2xl font-black">{step.title}</h2>
              <p
                className="text-base leading-relaxed whitespace-pre-line"
                style={{ color: "var(--text-muted)" }}
              >
                {step.content}
              </p>
              <button
                onClick={nextStep}
                className="mt-6 self-end px-8 py-3 rounded-full font-bold text-white glow transition-all hover:scale-105"
                style={{ background: "linear-gradient(135deg, var(--primary), var(--primary-light))" }}
              >
                ต่อไป →
              </button>
            </div>
          )}

          {step.type === "quiz" && (
            <div className="flex flex-col gap-5 animate-bounce-in">
              <div
                className="text-xs font-bold uppercase tracking-wider"
                style={{ color: "var(--primary-light)" }}
              >
                คำถาม
              </div>
              <h2 className="text-xl font-black whitespace-pre-line">{step.question}</h2>
              <div className="grid gap-3">
                {step.choices.map((c, i) => {
                  let bg = "var(--surface-2)";
                  let border = "var(--border)";
                  let color = "var(--text)";
                  if (answered) {
                    if (i === step.correct) {
                      bg = "rgba(16,185,129,0.15)";
                      border = "var(--accent-green)";
                      color = "var(--accent-green)";
                    } else if (i === selected && i !== step.correct) {
                      bg = "rgba(239,68,68,0.15)";
                      border = "var(--accent-red)";
                      color = "var(--accent-red)";
                    }
                  }
                  return (
                    <button
                      key={i}
                      onClick={() => checkQuiz(i)}
                      disabled={answered}
                      className="text-left px-5 py-4 rounded-xl font-medium transition-all hover:scale-[1.01] disabled:cursor-default"
                      style={{ background: bg, border: `1px solid ${border}`, color }}
                    >
                      <span className="font-bold mr-3" style={{ color: "var(--text-muted)" }}>
                        {String.fromCharCode(65 + i)}.
                      </span>
                      {c}
                    </button>
                  );
                })}
              </div>

              {answered && (
                <div
                  className="rounded-xl p-4 animate-bounce-in"
                  style={{
                    background: correct ? "rgba(16,185,129,0.1)" : "rgba(239,68,68,0.1)",
                    border: `1px solid ${correct ? "var(--accent-green)" : "var(--accent-red)"}`,
                    color: correct ? "var(--accent-green)" : "var(--accent-red)",
                  }}
                >
                  <p className="font-bold mb-1">{correct ? "✓ ถูกต้อง!" : "✗ ยังไม่ถูก"}</p>
                  <p className="text-sm opacity-90">{step.explanation}</p>
                </div>
              )}

              {answered && (
                <button
                  onClick={nextStep}
                  className="self-end px-8 py-3 rounded-full font-bold text-white glow transition-all hover:scale-105"
                  style={{ background: "linear-gradient(135deg, var(--primary), var(--primary-light))" }}
                >
                  ต่อไป →
                </button>
              )}
            </div>
          )}

          {step.type === "fill" && (
            <div className="flex flex-col gap-5 animate-bounce-in">
              <div
                className="text-xs font-bold uppercase tracking-wider"
                style={{ color: "var(--accent)" }}
              >
                เติมคำ
              </div>
              <h2 className="text-xl font-black">{step.question}</h2>
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                💡 {step.hint}
              </p>
              <input
                type="text"
                value={fillInput}
                onChange={(e) => setFillInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !answered && checkFill()}
                disabled={answered}
                placeholder="พิมพ์คำตอบ..."
                className="px-5 py-4 rounded-xl text-base outline-none transition-all disabled:opacity-70"
                style={{
                  background: "var(--surface-2)",
                  border: answered
                    ? `2px solid ${correct ? "var(--accent-green)" : "var(--accent-red)"}`
                    : "2px solid var(--border)",
                  color: "var(--text)",
                }}
              />

              {answered && (
                <div
                  className="rounded-xl p-4 animate-bounce-in"
                  style={{
                    background: correct ? "rgba(16,185,129,0.1)" : "rgba(239,68,68,0.1)",
                    border: `1px solid ${correct ? "var(--accent-green)" : "var(--accent-red)"}`,
                    color: correct ? "var(--accent-green)" : "var(--accent-red)",
                  }}
                >
                  {correct ? "✓ ถูกต้อง!" : `✗ คำตอบที่ถูกคือ: ${step.answer}`}
                </div>
              )}

              <div className="flex gap-3 self-end">
                {!answered && (
                  <button
                    onClick={checkFill}
                    disabled={!fillInput.trim()}
                    className="px-8 py-3 rounded-full font-bold text-white disabled:opacity-40 transition-all hover:scale-105"
                    style={{ background: "var(--primary)" }}
                  >
                    ตรวจ
                  </button>
                )}
                {answered && (
                  <button
                    onClick={nextStep}
                    className="px-8 py-3 rounded-full font-bold text-white glow transition-all hover:scale-105"
                    style={{ background: "linear-gradient(135deg, var(--primary), var(--primary-light))" }}
                  >
                    ต่อไป →
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* XP preview */}
        <div className="mt-4 text-right text-sm" style={{ color: "var(--text-muted)" }}>
          ⚡ ทำเสร็จรับ {lesson.xpReward} XP
        </div>
      </main>
    </>
  );
}
