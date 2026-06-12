"use client";

import { useState } from "react";
import { signIn, signUp } from "@/lib/supabase";

interface Props {
  onClose: () => void;
  onSuccess: (email: string) => void;
}

export default function AuthModal({ onClose, onSuccess }: Props) {
  const [tab, setTab] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !password) return;
    setLoading(true);
    setError(null);
    if (tab === "login") {
      const { user, error } = await signIn(email, password);
      if (error) { setError(translateError(error)); setLoading(false); return; }
      if (user) { onSuccess(user.email ?? email); onClose(); }
    } else {
      const { user, error } = await signUp(email, password);
      if (error) { setError(translateError(error)); setLoading(false); return; }
      if (user?.identities?.length === 0) {
        setError("อีเมลนี้ถูกใช้งานแล้ว"); setLoading(false); return;
      }
      setDone(true);
    }
    setLoading(false);
  }

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="w-full max-w-sm rounded-2xl p-8 relative"
        style={{ background: "rgba(12,10,26,0.98)", border: "1px solid rgba(124,58,237,0.3)", boxShadow: "0 20px 60px rgba(0,0,0,0.6)" }}
      >
        {/* Close */}
        <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full transition-colors hover:bg-white/10" style={{ color: "rgba(255,255,255,0.4)" }}>
          ✕
        </button>

        {/* Logo */}
        <div className="text-center mb-6">
          <span className="text-xl font-black uppercase" style={{ letterSpacing: "0.15em", color: "#fff" }}>
            ABCDE<span style={{ color: "var(--accent)" }}>GO</span>
          </span>
          <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>เรียน. เล่น. เก่งขึ้น.</p>
        </div>

        {/* Tabs */}
        <div className="flex rounded-xl p-1 mb-6" style={{ background: "rgba(255,255,255,0.05)" }}>
          {(["login", "register"] as const).map((t) => (
            <button
              key={t}
              onClick={() => { setTab(t); setError(null); setDone(false); }}
              className="flex-1 py-2 rounded-lg text-sm font-bold transition-all"
              style={tab === t ? { background: "linear-gradient(135deg, var(--primary), var(--primary-light))", color: "#fff" } : { color: "rgba(255,255,255,0.4)" }}
            >
              {t === "login" ? "เข้าสู่ระบบ" : "สมัครสมาชิก"}
            </button>
          ))}
        </div>

        {done ? (
          <div className="text-center py-4">
            <div className="text-4xl mb-3">📧</div>
            <p className="font-bold mb-1">ตรวจสอบอีเมลของคุณ</p>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>กดลิงก์ยืนยันในอีเมล<br />แล้วกลับมาเข้าสู่ระบบได้เลย</p>
            <button onClick={() => { setTab("login"); setDone(false); }} className="mt-4 text-sm font-bold" style={{ color: "var(--primary-light)" }}>
              ไปหน้าเข้าสู่ระบบ →
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="text-xs font-semibold mb-1.5 block" style={{ color: "rgba(255,255,255,0.5)" }}>อีเมล</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff" }}
                onFocus={(e) => (e.target.style.borderColor = "rgba(124,58,237,0.6)")}
                onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
              />
            </div>
            <div>
              <label className="text-xs font-semibold mb-1.5 block" style={{ color: "rgba(255,255,255,0.5)" }}>รหัสผ่าน</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="อย่างน้อย 6 ตัวอักษร"
                required
                minLength={6}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff" }}
                onFocus={(e) => (e.target.style.borderColor = "rgba(124,58,237,0.6)")}
                onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
              />
            </div>

            {error && (
              <p className="text-xs text-center px-3 py-2 rounded-lg" style={{ background: "rgba(239,68,68,0.1)", color: "#f87171", border: "1px solid rgba(239,68,68,0.2)" }}>
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl font-bold text-sm text-white transition-all hover:opacity-90 disabled:opacity-40 mt-1"
              style={{ background: "linear-gradient(135deg, var(--primary), var(--primary-light))" }}
            >
              {loading ? "กำลังดำเนินการ..." : tab === "login" ? "เข้าสู่ระบบ" : "สมัครสมาชิก"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

function translateError(msg: string): string {
  if (msg.includes("Invalid login credentials")) return "อีเมลหรือรหัสผ่านไม่ถูกต้อง";
  if (msg.includes("Email not confirmed")) return "กรุณายืนยันอีเมลก่อนเข้าสู่ระบบ";
  if (msg.includes("already registered")) return "อีเมลนี้ถูกใช้งานแล้ว";
  if (msg.includes("Password should be")) return "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร";
  if (msg.includes("Unable to validate")) return "รูปแบบอีเมลไม่ถูกต้อง";
  return msg;
}
