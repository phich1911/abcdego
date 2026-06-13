"use client";

import { useState } from "react";
import { setDisplayName, syncLeaderboard } from "@/lib/supabase";
import { getProgress as getLocalProgress } from "@/lib/progress";

interface Props {
  current?: string;
  onDone: (name: string) => void;
  onClose?: () => void;
}

export default function DisplayNameModal({ current, onDone, onClose }: Props) {
  const [name, setName] = useState(current ?? "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isEdit = !!current;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    setLoading(true);
    const err = await setDisplayName(name.trim());
    if (err) { setError(err); setLoading(false); return; }
    const xp = getLocalProgress().xp;
    if (xp > 0) await syncLeaderboard(xp);
    onDone(name.trim());
  }

  return (
    <div
      className="fixed inset-0 z-[300] flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.8)", backdropFilter: "blur(8px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose?.(); }}
    >
      <div
        className="w-full max-w-sm rounded-2xl p-8 relative"
        style={{ background: "rgba(12,10,26,0.98)", border: "1px solid rgba(124,58,237,0.3)", boxShadow: "0 20px 60px rgba(0,0,0,0.6)" }}
      >
        {onClose && (
          <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10" style={{ color: "rgba(255,255,255,0.4)" }}>✕</button>
        )}

        <div className="text-center mb-6">
          <div className="text-4xl mb-3">👤</div>
          <h2 className="text-xl font-black mb-1">{isEdit ? "แก้ไขโปรไฟล์" : "ตั้งชื่อที่แสดง"}</h2>
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
            ชื่อนี้จะแสดงใน Leaderboard{isEdit ? "" : <><br />สามารถเปลี่ยนได้ภายหลัง</>}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-xs font-semibold mb-1.5 block" style={{ color: "rgba(255,255,255,0.5)" }}>ชื่อที่แสดง</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="ชื่อเล่น / นามแฝง"
              maxLength={20}
              autoFocus
              required
              className="w-full px-4 py-3 rounded-xl text-sm outline-none"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.15)", color: "#fff" }}
              onFocus={(e) => (e.target.style.borderColor = "rgba(124,58,237,0.6)")}
              onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.15)")}
            />
            <p className="text-xs mt-1.5" style={{ color: "rgba(255,255,255,0.25)" }}>{name.length}/20 ตัวอักษร</p>
          </div>

          {error && (
            <p className="text-xs text-center px-3 py-2 rounded-lg" style={{ background: "rgba(239,68,68,0.1)", color: "#f87171" }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading || !name.trim() || name.trim() === current}
            className="w-full py-3 rounded-xl font-bold text-sm text-white transition-all hover:opacity-90 disabled:opacity-40"
            style={{ background: "linear-gradient(135deg, var(--primary), var(--primary-light))" }}
          >
            {loading ? "กำลังบันทึก..." : isEdit ? "บันทึกและ Sync Ranking →" : "ยืนยัน →"}
          </button>
        </form>
      </div>
    </div>
  );
}
