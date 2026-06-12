"use client";

import { useState } from "react";
import { signIn, signUp, signInWithGoogle, signInWithFacebook } from "@/lib/supabase";

interface Props {
  onClose: () => void;
  onSuccess: (email: string) => void;
}

export default function AuthModal({ onClose, onSuccess }: Props) {
  const [tab, setTab] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState<"google" | "facebook" | null>(null);
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

  async function handleGoogle() {
    setOauthLoading("google");
    setError(null);
    await signInWithGoogle();
    setOauthLoading(null);
  }

  async function handleFacebook() {
    setOauthLoading("facebook");
    setError(null);
    await signInWithFacebook();
    setOauthLoading(null);
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
          <>
            {/* OAuth buttons */}
            <div className="flex flex-col gap-3 mb-5">
              <button
                onClick={handleGoogle}
                disabled={!!oauthLoading}
                className="w-full flex items-center justify-center gap-3 py-3 rounded-xl text-sm font-bold transition-all hover:opacity-90 disabled:opacity-40"
                style={{ background: "#fff", color: "#1f1f1f" }}
              >
                {oauthLoading === "google" ? (
                  <span className="w-5 h-5 rounded-full border-2 border-gray-300 border-t-gray-600 animate-spin" />
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                )}
                {oauthLoading === "google" ? "กำลังเชื่อมต่อ..." : "ดำเนินการต่อด้วย Google"}
              </button>

              <button
                onClick={handleFacebook}
                disabled={!!oauthLoading}
                className="w-full flex items-center justify-center gap-3 py-3 rounded-xl text-sm font-bold transition-all hover:opacity-90 disabled:opacity-40"
                style={{ background: "#1877f2", color: "#fff" }}
              >
                {oauthLoading === "facebook" ? (
                  <span className="w-5 h-5 rounded-full border-2 border-blue-300 border-t-white animate-spin" />
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                )}
                {oauthLoading === "facebook" ? "กำลังเชื่อมต่อ..." : "ดำเนินการต่อด้วย Facebook"}
              </button>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3 mb-5">
              <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.08)" }} />
              <span className="text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>หรือใช้อีเมล</span>
              <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.08)" }} />
            </div>

            {/* Email form */}
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
                className="w-full py-3 rounded-xl font-bold text-sm text-white transition-all hover:opacity-90 disabled:opacity-40"
                style={{ background: "linear-gradient(135deg, var(--primary), var(--primary-light))" }}
              >
                {loading ? "กำลังดำเนินการ..." : tab === "login" ? "เข้าสู่ระบบ" : "สมัครสมาชิก"}
              </button>
            </form>
          </>
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
