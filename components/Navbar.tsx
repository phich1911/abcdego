"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { getProgress } from "@/lib/progress";

const COURSE_ITEMS = [
  { href: "/courses", label: "ดูทั้งหมด", group: null },
  { href: "/course/palad-amphoe", label: "⚖️ ลักษณะปกครองท้องที่", group: "ปลัดอำเภอ" },
  { href: "/course/asr-2497", label: "🛡️ กองอาสารักษาดินแดน", group: "ปลัดอำเภอ" },
  { href: "/course/math-101", label: "📐 คณิตศาสตร์", group: "ทั่วไป" },
  { href: "/course/eng-101", label: "🌏 English", group: "ทั่วไป" },
  { href: "/course/code-101", label: "💻 Coding", group: "ทั่วไป" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [xp, setXp] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [coursesOpen, setCoursesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setXp(getProgress().xp);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setCoursesOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? "rgba(10, 9, 20, 0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(124,58,237,0.15)" : "1px solid transparent",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="group">
          <span
            className="text-xl font-black uppercase transition-opacity group-hover:opacity-80"
            style={{ color: "#fff", letterSpacing: "0.15em" }}
          >
            ABCDE<span style={{ color: "var(--accent)" }}>GO</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-10">

          {/* COURSES dropdown */}
          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setCoursesOpen((v) => !v)}
              className="flex items-center gap-1.5 text-xs font-semibold tracking-widest transition-colors duration-200"
              style={{
                color: pathname.startsWith("/course") ? "#fff" : "rgba(255,255,255,0.45)",
                letterSpacing: "0.18em",
              }}
            >
              COURSES
              <svg
                width="10" height="10" viewBox="0 0 10 10" fill="currentColor"
                style={{ transition: "transform 0.2s", transform: coursesOpen ? "rotate(180deg)" : "rotate(0deg)", opacity: 0.6 }}
              >
                <path d="M1 3l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
              </svg>
            </button>

            {coursesOpen && (
              <div
                className="absolute top-8 left-1/2 -translate-x-1/2 w-52 rounded-xl overflow-hidden"
                style={{
                  background: "rgba(12,10,26,0.97)",
                  border: "1px solid rgba(124,58,237,0.25)",
                  backdropFilter: "blur(16px)",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
                }}
              >
                {(() => {
                  let lastGroup: string | null = undefined as unknown as string;
                  return COURSE_ITEMS.map((item, i) => {
                    const showHeader = item.group !== null && item.group !== lastGroup;
                    lastGroup = item.group ?? null;
                    return (
                      <div key={item.href}>
                        {showHeader && (
                          <div className="px-4 pt-3 pb-1 text-xs font-bold tracking-widest uppercase" style={{ color: "rgba(124,58,237,0.8)", borderTop: i > 0 ? "1px solid rgba(124,58,237,0.15)" : undefined }}>
                            {item.group}
                          </div>
                        )}
                        <Link
                          href={item.href}
                          onClick={() => setCoursesOpen(false)}
                          className="flex items-center px-4 py-2.5 text-sm transition-colors hover:bg-white/5"
                          style={{
                            color: pathname === item.href ? "#fff" : "rgba(255,255,255,0.55)",
                            borderTop: i === 1 ? "1px solid rgba(124,58,237,0.15)" : undefined,
                            fontWeight: i === 0 ? 600 : 400,
                            letterSpacing: i === 0 ? "0.1em" : "0.03em",
                            fontSize: i === 0 ? "0.7rem" : "0.85rem",
                          }}
                        >
                          {item.label}
                        </Link>
                      </div>
                    );
                  });
                })()}
              </div>
            )}
          </div>

          {/* PROGRESS */}
          <Link
            href="/dashboard"
            className="text-xs font-semibold tracking-widest transition-colors duration-200"
            style={{
              color: pathname === "/dashboard" ? "#fff" : "rgba(255,255,255,0.45)",
              letterSpacing: "0.18em",
            }}
          >
            PROGRESS
          </Link>

          {/* XP badge */}
          <div
            className="text-xs font-bold px-3 py-1.5 rounded-full tracking-wider"
            style={{
              background: "rgba(245,158,11,0.12)",
              color: "var(--accent)",
              border: "1px solid rgba(245,158,11,0.2)",
              letterSpacing: "0.1em",
            }}
          >
            ⚡ {xp} XP
          </div>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="block w-6 h-px transition-all duration-300"
              style={{
                background: "rgba(255,255,255,0.7)",
                transform: menuOpen && i === 0 ? "rotate(45deg) translateY(6px)" : menuOpen && i === 2 ? "rotate(-45deg) translateY(-6px)" : "none",
                opacity: menuOpen && i === 1 ? 0 : 1,
              }}
            />
          ))}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden px-6 py-4 flex flex-col gap-1"
          style={{ background: "rgba(10,9,20,0.97)", borderTop: "1px solid rgba(124,58,237,0.1)" }}
        >
          <p className="text-xs tracking-widest mb-2" style={{ color: "rgba(255,255,255,0.3)", letterSpacing: "0.18em" }}>COURSES</p>
          {COURSE_ITEMS.slice(1).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="py-2 pl-3 text-sm"
              style={{ color: "rgba(255,255,255,0.6)" }}
            >
              {item.label}
            </Link>
          ))}
          <div style={{ height: 1, background: "rgba(124,58,237,0.15)", margin: "8px 0" }} />
          <Link
            href="/dashboard"
            onClick={() => setMenuOpen(false)}
            className="text-xs font-semibold tracking-widest py-2"
            style={{ color: pathname === "/dashboard" ? "#fff" : "rgba(255,255,255,0.5)", letterSpacing: "0.18em" }}
          >
            PROGRESS
          </Link>
          <span className="text-xs font-bold pt-1" style={{ color: "var(--accent)" }}>⚡ {xp} XP</span>
        </div>
      )}
    </nav>
  );
}
