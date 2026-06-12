import Link from "next/link";
import Navbar from "@/components/Navbar";
import { COURSES } from "@/lib/data";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden px-6 pt-40 pb-24 text-center">
          {/* Background blobs */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full opacity-20 blur-[80px] pointer-events-none"
            style={{ background: "radial-gradient(circle, #7c3aed, transparent)" }}
          />
          <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center gap-6">
            <span
              className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold"
              style={{ background: "rgba(124,58,237,0.2)", color: "var(--primary-light)" }}
            >
              🚀 เรียนรู้แบบใหม่ — สนุกกว่าที่คิด
            </span>

            <h1 className="text-5xl md:text-6xl font-black leading-tight">
              เรียน. เล่น.{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, var(--primary-light), var(--accent))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                เก่งขึ้น.
              </span>
            </h1>

            <p className="text-lg max-w-xl" style={{ color: "var(--text-muted)" }}>
              AbcdeGo เปลี่ยนการเรียนให้เป็นเกม เก็บ XP ลุ้นเลเวล
              เรียนทีละขั้นตอนในเวลาของคุณเอง
            </p>

            <div className="flex gap-4 mt-2">
              <Link
                href="/courses"
                className="px-8 py-3 rounded-full font-bold text-white transition-all hover:scale-105 glow"
                style={{ background: "linear-gradient(135deg, var(--primary), var(--primary-light))" }}
              >
                เริ่มเรียนเลย →
              </Link>
              <Link
                href="/dashboard"
                className="px-8 py-3 rounded-full font-bold transition-all hover:scale-105"
                style={{
                  border: "1px solid var(--border)",
                  color: "var(--text-muted)",
                }}
              >
                ดูความก้าวหน้า
              </Link>
            </div>

            {/* Stats */}
            <div className="flex gap-8 mt-8 pt-8" style={{ borderTop: "1px solid var(--border)" }}>
              {[
                { num: "3", label: "วิชา" },
                { num: "9", label: "บทเรียน" },
                { num: "750+", label: "XP รวม" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-2xl font-black" style={{ color: "var(--primary-light)" }}>
                    {s.num}
                  </div>
                  <div className="text-sm" style={{ color: "var(--text-muted)" }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Courses preview */}
        <section className="px-6 py-16 max-w-5xl mx-auto">
          <h2 className="text-3xl font-black mb-2">คอร์สยอดนิยม</h2>
          <p className="mb-10" style={{ color: "var(--text-muted)" }}>
            เลือกหัวข้อที่คุณสนใจ แล้วเริ่มเลย
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {COURSES.map((course) => (
              <Link
                key={course.id}
                href={`/course/${course.id}`}
                className="glass rounded-2xl p-6 flex flex-col gap-3 transition-all hover:scale-[1.02] hover:glow cursor-pointer group"
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl animate-float"
                  style={{ background: `${course.color}22` }}
                >
                  {course.icon}
                </div>
                <span
                  className="text-xs font-semibold px-2 py-0.5 rounded-full w-fit"
                  style={{ background: `${course.color}22`, color: course.color }}
                >
                  {course.tag}
                </span>
                <h3 className="font-bold text-lg leading-tight">{course.title}</h3>
                <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                  {course.description}
                </p>
                <div className="flex items-center justify-between mt-auto pt-3" style={{ borderTop: "1px solid var(--border)" }}>
                  <span className="text-sm" style={{ color: "var(--text-muted)" }}>
                    {course.totalLessons} บทเรียน
                  </span>
                  <span
                    className="text-sm font-bold"
                    style={{ color: "var(--accent)" }}
                  >
                    ⚡ {course.xpReward} XP
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section className="px-6 py-16" style={{ background: "var(--surface)" }}>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-black mb-12">เรียนอย่างไร?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: "📚", title: "เลือกวิชา", desc: "เลือกคอร์สที่สนใจ ไม่ต้องสมัครก็เริ่มได้เลย" },
                { icon: "🎮", title: "เรียนทีละขั้น", desc: "บทเรียนสั้น ทำแบบฝึกหัดได้ทันที รับ feedback ทุกข้อ" },
                { icon: "🏆", title: "เก็บ XP", desc: "ทำถูกได้ XP สะสมเลเวล แข่งกับตัวเองหรือคนอื่น" },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center gap-4">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center text-3xl"
                    style={{ background: "var(--surface-2)" }}
                  >
                    {item.icon}
                  </div>
                  <h3 className="font-bold text-lg">{item.title}</h3>
                  <p style={{ color: "var(--text-muted)" }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 py-20 text-center">
          <div className="max-w-lg mx-auto">
            <h2 className="text-4xl font-black mb-4">พร้อมแล้วใช่ไหม?</h2>
            <p className="mb-8" style={{ color: "var(--text-muted)" }}>
              เรียนฟรี ไม่ต้องสมัคร ความก้าวหน้าบันทึกอัตโนมัติ
            </p>
            <Link
              href="/courses"
              className="inline-block px-10 py-4 rounded-full font-black text-xl text-white transition-all hover:scale-105 glow"
              style={{ background: "linear-gradient(135deg, var(--primary), var(--primary-light))" }}
            >
              เริ่มต้นเลย 🚀
            </Link>
          </div>
        </section>
      </main>

      <footer className="py-6 text-center text-sm" style={{ color: "var(--text-muted)", borderTop: "1px solid var(--border)" }}>
        © 2026 AbcdeGo — Learn. Play. Level Up.
      </footer>
    </>
  );
}
