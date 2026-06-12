import Link from "next/link";
import Navbar from "@/components/Navbar";
import CourseIcon from "@/components/CourseIcon";
import { COURSES } from "@/lib/data";

const POPULAR_IDS = ["palad-amphoe", "asr-2497", "kp-general"];

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
            {COURSES.filter((c) => POPULAR_IDS.includes(c.id)).sort((a, b) => POPULAR_IDS.indexOf(a.id) - POPULAR_IDS.indexOf(b.id)).map((course) => (
              <Link
                key={course.id}
                href={`/course/${course.id}`}
                className="glass rounded-2xl p-6 flex flex-col gap-3 transition-all hover:scale-[1.02] hover:glow cursor-pointer group"
              >
                <CourseIcon icon={course.icon} icon3d={course.icon3d} color={course.color} size={56} />
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
                { icon: "📚", icon3d: "https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f4da.png", title: "เลือกวิชา", desc: "เลือกคอร์สที่สนใจ ไม่ต้องสมัครก็เริ่มได้เลย" },
                { icon: "🎮", icon3d: "https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f3ae.png", title: "เรียนทีละขั้น", desc: "บทเรียนสั้น ทำแบบฝึกหัดได้ทันที รับ feedback ทุกข้อ" },
                { icon: "🏆", icon3d: "https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f3c6.png", title: "เก็บ XP", desc: "ทำถูกได้ XP สะสมเลเวล แข่งกับตัวเองหรือคนอื่น" },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center gap-4">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{ background: "var(--surface-2)" }}
                  >
                    <img src={item.icon3d} alt={item.icon} width={44} height={44} style={{ objectFit: "contain" }} />
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

        {/* Contact */}
        <section className="px-6 pb-20" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="max-w-3xl mx-auto pt-16 text-center">
            <h2 className="text-3xl font-black mb-2">ติดต่อเรา</h2>
            <p className="mb-10 text-sm" style={{ color: "var(--text-muted)" }}>มีคำถามหรือข้อเสนอแนะ ติดต่อได้เลย</p>
            <div className="grid md:grid-cols-3 gap-5">
              {[
                {
                  name: "Line Official",
                  handle: "@aqp7051t",
                  href: "https://line.me/R/ti/p/@aqp7051t",
                  bg: "rgba(6,199,85,0.1)",
                  border: "rgba(6,199,85,0.25)",
                  color: "#06c755",
                  svg: (
                    <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
                      <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>
                    </svg>
                  ),
                },
                {
                  name: "Facebook Page",
                  handle: "AbcdeGo",
                  href: "https://www.facebook.com/abcdego/",
                  bg: "rgba(24,119,242,0.1)",
                  border: "rgba(24,119,242,0.25)",
                  color: "#1877f2",
                  svg: (
                    <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  ),
                },
                {
                  name: "YouTube",
                  handle: "@AbcdeGoOfficial",
                  href: "https://www.youtube.com/@AbcdeGoOfficial",
                  bg: "rgba(255,0,0,0.1)",
                  border: "rgba(255,0,0,0.2)",
                  color: "#ff0000",
                  svg: (
                    <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  ),
                },
              ].map((ch) => (
                <a
                  key={ch.name}
                  href={ch.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-3 rounded-2xl p-6 transition-all hover:scale-[1.03]"
                  style={{ background: ch.bg, border: `1px solid ${ch.border}` }}
                >
                  <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ background: `${ch.color}18`, color: ch.color }}>
                    {ch.svg}
                  </div>
                  <div>
                    <p className="font-bold text-sm" style={{ color: "#fff" }}>{ch.name}</p>
                    <p className="text-xs mt-0.5" style={{ color: ch.color }}>{ch.handle}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="py-6 text-center text-sm" style={{ color: "var(--text-muted)", borderTop: "1px solid var(--border)" }}>
        © 2026 AbcdeGo — Learn. Play. Level Up.
      </footer>
    </>
  );
}
