"use client";

import { useEffect, useState } from "react";
import { getVisitorCount, getLeaderboard } from "@/lib/supabase";

type Entry = { name: string; xp: number };

const MEDALS = ["🥇", "🥈", "🥉"];

export default function SiteStats() {
  const [visitors, setVisitors] = useState<number | null>(null);
  const [board, setBoard] = useState<Entry[]>([]);

  useEffect(() => {
    getVisitorCount().then(setVisitors);
    getLeaderboard(5).then(setBoard);
  }, []);

  return (
    <section className="px-6 py-16" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">

          {/* Visitor count */}
          <div className="glass rounded-2xl p-8 flex flex-col items-center justify-center text-center gap-3">
            <span className="text-4xl">👥</span>
            <div>
              <p className="text-xs font-semibold tracking-widest mb-1" style={{ color: "var(--text-muted)" }}>ยอดผู้เข้าชมทั้งหมด</p>
              <p className="text-5xl font-black" style={{ color: "var(--primary-light)" }}>
                {visitors === null ? "—" : visitors.toLocaleString()}
              </p>
              <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>ครั้ง</p>
            </div>
          </div>

          {/* Leaderboard */}
          <div className="glass rounded-2xl p-6">
            <h3 className="font-black text-lg mb-4 flex items-center gap-2">
              🏆 <span>ผู้นำตาราง XP</span>
            </h3>
            {board.length === 0 ? (
              <p className="text-sm text-center py-6" style={{ color: "var(--text-muted)" }}>ยังไม่มีข้อมูล — เป็นคนแรกได้เลย!</p>
            ) : (
              <div className="flex flex-col gap-2">
                {board.map((entry, i) => (
                  <div key={i} className="flex items-center gap-3 px-3 py-2.5 rounded-xl" style={{ background: i === 0 ? "rgba(245,158,11,0.1)" : "rgba(255,255,255,0.03)" }}>
                    <span className="text-lg w-7 text-center">{MEDALS[i] ?? `${i + 1}.`}</span>
                    <span className="flex-1 font-semibold text-sm truncate" style={{ color: "#fff" }}>{entry.name}</span>
                    <span className="text-sm font-black" style={{ color: "var(--accent)" }}>⚡ {entry.xp.toLocaleString()} XP</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
