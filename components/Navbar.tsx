"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getProgress } from "@/lib/progress";

export default function Navbar() {
  const pathname = usePathname();
  const [xp, setXp] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setXp(getProgress().xp);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "/courses", label: "COURSES" },
    { href: "/dashboard", label: "PROGRESS" },
  ];

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
        <Link href="/" className="flex items-center gap-1 group">
          <span
            className="text-xl font-black tracking-widest uppercase transition-opacity group-hover:opacity-80"
            style={{ color: "#fff", letterSpacing: "0.15em" }}
          >
            ABCDE<span style={{ color: "var(--accent)" }}>GO</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-xs font-semibold tracking-widest transition-colors duration-200"
              style={{
                color: pathname === l.href ? "#fff" : "rgba(255,255,255,0.45)",
                letterSpacing: "0.18em",
              }}
            >
              {l.label}
            </Link>
          ))}
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
          <span
            className="block w-6 h-px transition-all duration-300"
            style={{
              background: "rgba(255,255,255,0.7)",
              transform: menuOpen ? "rotate(45deg) translateY(4px)" : "none",
            }}
          />
          <span
            className="block w-6 h-px transition-all duration-300"
            style={{
              background: "rgba(255,255,255,0.7)",
              opacity: menuOpen ? 0 : 1,
            }}
          />
          <span
            className="block w-6 h-px transition-all duration-300"
            style={{
              background: "rgba(255,255,255,0.7)",
              transform: menuOpen ? "rotate(-45deg) translateY(-4px)" : "none",
            }}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden px-6 py-4 flex flex-col gap-4"
          style={{ background: "rgba(10,9,20,0.96)", borderTop: "1px solid rgba(124,58,237,0.1)" }}
        >
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="text-xs font-semibold tracking-widest"
              style={{ color: pathname === l.href ? "#fff" : "rgba(255,255,255,0.5)", letterSpacing: "0.18em" }}
            >
              {l.label}
            </Link>
          ))}
          <span className="text-xs font-bold" style={{ color: "var(--accent)" }}>⚡ {xp} XP</span>
        </div>
      )}
    </nav>
  );
}
