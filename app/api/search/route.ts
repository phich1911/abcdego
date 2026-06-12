import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
import { COURSES } from "@/lib/data";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req: NextRequest) {
  const { query } = await req.json();
  if (!query?.trim()) return NextResponse.json({ ids: [] });

  const courseList = COURSES.map((c) =>
    `- id: "${c.id}" | ชื่อ: "${c.title}" | หมวด: "${c.category ?? "ทั่วไป"}" | tag: "${c.tag}" | คำอธิบาย: "${c.description}"`
  ).join("\n");

  const message = await client.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 100,
    messages: [
      {
        role: "user",
        content: `คุณเป็น search engine ของเว็บเรียนออนไลน์ชื่อ AbcdeGo มีคอร์สดังนี้:\n${courseList}\n\nผู้ใช้ค้นหา: "${query}"\n\nตอบเฉพาะ id ของคอร์สที่เกี่ยวข้อง คั่นด้วยจุลภาค เช่น asr-2497,palad-amphoe ถ้าไม่มีที่เกี่ยวข้องตอบว่า none`,
      },
    ],
  });

  const text = (message.content[0] as { type: string; text: string }).text.trim().toLowerCase();
  if (text === "none") return NextResponse.json({ ids: [] });

  const ids = text
    .split(",")
    .map((s) => s.trim())
    .filter((id) => COURSES.some((c) => c.id === id));

  return NextResponse.json({ ids });
}
