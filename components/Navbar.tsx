"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { getProgress } from "@/lib/progress";
import { COURSES } from "@/lib/data";
import Fuse from "fuse.js";

const fuse = new Fuse(COURSES, {
  keys: ["title", "description", "tag", "category"],
  threshold: 0.4,
});

const COURSE_GROUPS = [
  {
    label: "🔎 DSI",
    items: [
      { href: "/course/dsi-2547", label: "🔎 การสอบสวนคดีพิเศษ" },
      { href: "/course/dsi-criminal", label: "⚖️ คดีพิเศษและกฎหมายที่เกี่ยวข้อง" },
    ],
  },
  {
    label: "🏛️ ปลัดอำเภอ",
    items: [
      { href: "/course/palad-amphoe", label: "⚖️ ลักษณะปกครองท้องที่ 2457" },
      { href: "/course/asr-2497", label: "🛡️ กองอาสารักษาดินแดน" },
    ],
  },
  {
    label: "📚 วิชาทั่วไป",
    items: [
      { href: "/course/math-101", label: "📐 คณิตศาสตร์" },
      { href: "/course/eng-101", label: "🌏 English" },
      { href: "/course/code-101", label: "💻 Coding" },
    ],
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [xp, setXp] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [coursesOpen, setCoursesOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { setXp(getProgress().xp); }, [pathname]);

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

  // open search overlay with keyboard shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") { e.preventDefault(); openSearch(); }
      if (e.key === "Escape") closeSearch();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  function openSearch() {
    setSearchOpen(true);
    setSearchQuery("");
    setTimeout(() => searchInputRef.current?.focus(), 50);
  }

  function closeSearch() {
    setSearchOpen(false);
    setSearchQuery("");
  }

  const searchResults = searchQuery.trim()
    ? fuse.search(searchQuery).map((r) => r.item)
    : COURSES;

  return (
    <>
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
            <span className="text-xl font-black uppercase transition-opacity group-hover:opacity-80" style={{ color: "#fff", letterSpacing: "0.15em" }}>
              ABCDE<span style={{ color: "var(--accent)" }}>GO</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-10">

            {/* SEARCH — first item */}
            <button
              onClick={openSearch}
              className="flex items-center gap-2 text-xs font-semibold tracking-widest transition-colors duration-200"
              style={{ color: "rgba(255,255,255,0.45)", letterSpacing: "0.18em" }}
            >
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <circle cx="5.5" cy="5.5" r="4" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M8.5 8.5L11.5 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              SEARCH
              <span className="text-xs px-1.5 py-0.5 rounded" style={{ background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.25)", fontSize: "0.6rem", letterSpacing: "0.05em" }}>⌘K</span>
            </button>

            {/* COURSES dropdown */}
            <div ref={dropdownRef} className="relative">
              <button
                onClick={() => setCoursesOpen((v) => !v)}
                className="flex items-center gap-1.5 text-xs font-semibold tracking-widest transition-colors duration-200"
                style={{ color: pathname.startsWith("/course") ? "#fff" : "rgba(255,255,255,0.45)", letterSpacing: "0.18em" }}
              >
                COURSES
                <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor"
                  style={{ transition: "transform 0.2s", transform: coursesOpen ? "rotate(180deg)" : "rotate(0deg)", opacity: 0.6 }}>
                  <path d="M1 3l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                </svg>
              </button>

              {coursesOpen && (
                <div className="absolute top-8 left-1/2 -translate-x-1/2 w-56 rounded-xl overflow-hidden"
                  style={{ background: "rgba(12,10,26,0.97)", border: "1px solid rgba(124,58,237,0.25)", backdropFilter: "blur(16px)", boxShadow: "0 8px 32px rgba(0,0,0,0.5)" }}>
                  {/* ดูทั้งหมด */}
                  <Link href="/courses" onClick={() => setCoursesOpen(false)}
                    className="flex items-center px-4 py-3 text-xs font-bold tracking-widest transition-colors hover:bg-white/5"
                    style={{ color: "rgba(255,255,255,0.5)", letterSpacing: "0.12em" }}>
                    ดูทั้งหมด →
                  </Link>
                  <div style={{ height: 1, background: "rgba(124,58,237,0.15)" }} />
                  {/* Accordion groups */}
                  {COURSE_GROUPS.map((group, gi) => (
                    <div key={group.label} style={{ borderTop: gi > 0 ? "1px solid rgba(124,58,237,0.1)" : undefined }}>
                      <button
                        onClick={() => setOpenGroup(openGroup === group.label ? null : group.label)}
                        className="w-full flex items-center justify-between px-4 py-3 text-xs font-bold tracking-wide transition-colors hover:bg-white/5"
                        style={{ color: openGroup === group.label ? "#c4b5fd" : "rgba(255,255,255,0.7)" }}
                      >
                        <span>{group.label}</span>
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor"
                          style={{ transition: "transform 0.2s", transform: openGroup === group.label ? "rotate(180deg)" : "rotate(0deg)", opacity: 0.5 }}>
                          <path d="M1 3l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                        </svg>
                      </button>
                      {openGroup === group.label && (
                        <div style={{ background: "rgba(124,58,237,0.06)" }}>
                          {group.items.map((item) => (
                            <Link key={item.href} href={item.href}
                              onClick={() => { setCoursesOpen(false); setOpenGroup(null); }}
                              className="flex items-center px-6 py-2.5 text-sm transition-colors hover:bg-white/5"
                              style={{ color: pathname === item.href ? "#fff" : "rgba(255,255,255,0.55)" }}>
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* PROGRESS */}
            <Link href="/dashboard" className="text-xs font-semibold tracking-widest transition-colors duration-200"
              style={{ color: pathname === "/dashboard" ? "#fff" : "rgba(255,255,255,0.45)", letterSpacing: "0.18em" }}>
              PROGRESS
            </Link>

            {/* XP badge */}
            <div className="text-xs font-bold px-3 py-1.5 rounded-full tracking-wider"
              style={{ background: "rgba(245,158,11,0.12)", color: "var(--accent)", border: "1px solid rgba(245,158,11,0.2)", letterSpacing: "0.1em" }}>
              ⚡ {xp} XP
            </div>
          </div>

          {/* Mobile: search icon + hamburger */}
          <div className="md:hidden flex items-center gap-3">
            <button onClick={openSearch} className="p-2" style={{ color: "rgba(255,255,255,0.6)" }}>
              <svg width="16" height="16" viewBox="0 0 13 13" fill="none">
                <circle cx="5.5" cy="5.5" r="4" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M8.5 8.5L11.5 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
            <button className="flex flex-col gap-1.5 p-2" onClick={() => setMenuOpen(!menuOpen)}>
              {[0, 1, 2].map((i) => (
                <span key={i} className="block w-6 h-px transition-all duration-300"
                  style={{ background: "rgba(255,255,255,0.7)", transform: menuOpen && i === 0 ? "rotate(45deg) translateY(6px)" : menuOpen && i === 2 ? "rotate(-45deg) translateY(-6px)" : "none", opacity: menuOpen && i === 1 ? 0 : 1 }} />
              ))}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden px-6 py-4 flex flex-col gap-1"
            style={{ background: "rgba(10,9,20,0.97)", borderTop: "1px solid rgba(124,58,237,0.1)" }}>
            <Link href="/courses" onClick={() => setMenuOpen(false)} className="text-xs font-bold tracking-widest py-2"
              style={{ color: "rgba(255,255,255,0.4)", letterSpacing: "0.18em" }}>COURSES — ดูทั้งหมด</Link>
            {COURSE_GROUPS.map((group) => (
              <div key={group.label}>
                <button
                  onClick={() => setOpenGroup(openGroup === group.label ? null : group.label)}
                  className="w-full flex items-center justify-between py-2 pl-3 text-sm font-semibold"
                  style={{ color: "rgba(255,255,255,0.7)" }}>
                  <span>{group.label}</span>
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor"
                    style={{ transition: "transform 0.2s", transform: openGroup === group.label ? "rotate(180deg)" : "rotate(0deg)", opacity: 0.4 }}>
                    <path d="M1 3l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                  </svg>
                </button>
                {openGroup === group.label && group.items.map((item) => (
                  <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)}
                    className="block py-2 pl-6 text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>
                    {item.label}
                  </Link>
                ))}
              </div>
            ))}
            <div style={{ height: 1, background: "rgba(124,58,237,0.15)", margin: "8px 0" }} />
            <Link href="/dashboard" onClick={() => setMenuOpen(false)} className="text-xs font-semibold tracking-widest py-2"
              style={{ color: pathname === "/dashboard" ? "#fff" : "rgba(255,255,255,0.5)", letterSpacing: "0.18em" }}>
              PROGRESS
            </Link>
            <span className="text-xs font-bold pt-1" style={{ color: "var(--accent)" }}>⚡ {xp} XP</span>
          </div>
        )}
      </nav>

      {/* Search overlay */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-[100] flex flex-col items-center pt-24 px-4"
          style={{ background: "rgba(5,4,15,0.85)", backdropFilter: "blur(12px)" }}
          onClick={(e) => { if (e.target === e.currentTarget) closeSearch(); }}
        >
          <div className="w-full max-w-xl">
            {/* Input */}
            <div className="flex items-center gap-3 rounded-2xl px-4 py-3.5"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(124,58,237,0.4)", boxShadow: "0 0 40px rgba(124,58,237,0.15)" }}>
              <svg width="16" height="16" viewBox="0 0 13 13" fill="none" style={{ color: "rgba(167,139,250,0.8)", flexShrink: 0 }}>
                <circle cx="5.5" cy="5.5" r="4" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M8.5 8.5L11.5 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ค้นหาคอร์ส เช่น กฎหมาย, ปลัดอำเภอ, อส., คณิต..."
                className="flex-1 bg-transparent outline-none text-sm"
                style={{ color: "#fff", caretColor: "#a78bfa" }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && searchResults.length > 0) {
                    router.push(`/course/${searchResults[0].id}`);
                    closeSearch();
                  }
                }}
              />
              <button onClick={closeSearch} className="text-xs px-2 py-0.5 rounded transition-opacity hover:opacity-70" style={{ color: "rgba(255,255,255,0.3)" }}>ESC</button>
            </div>

            {/* Results */}
            <div className="mt-3 rounded-2xl overflow-hidden"
              style={{ background: "rgba(12,10,26,0.97)", border: "1px solid rgba(124,58,237,0.2)", boxShadow: "0 8px 40px rgba(0,0,0,0.6)" }}>
              {searchResults.length === 0 ? (
                <p className="px-5 py-6 text-sm text-center" style={{ color: "rgba(255,255,255,0.3)" }}>ไม่พบคอร์สที่ตรงกัน</p>
              ) : (
                searchResults.map((course, i) => (
                  <Link
                    key={course.id}
                    href={`/course/${course.id}`}
                    onClick={closeSearch}
                    className="flex items-center gap-4 px-5 py-3.5 transition-colors hover:bg-white/5"
                    style={{ borderTop: i > 0 ? "1px solid rgba(255,255,255,0.05)" : undefined }}
                  >
                    <span className="text-2xl w-9 h-9 flex items-center justify-center rounded-xl flex-shrink-0"
                      style={{ background: `${course.color}22` }}>
                      {course.icon}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold truncate" style={{ color: "#fff" }}>{course.title}</p>
                      <p className="text-xs truncate mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>{course.description}</p>
                    </div>
                    <span className="text-xs px-2 py-0.5 rounded-full flex-shrink-0"
                      style={{ background: `${course.color}22`, color: course.color }}>
                      {course.tag}
                    </span>
                  </Link>
                ))
              )}
              <div className="px-5 py-2.5 flex gap-4 text-xs" style={{ borderTop: "1px solid rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.2)" }}>
                <span>↵ เปิดคอร์สแรก</span>
                <span>ESC ปิด</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
