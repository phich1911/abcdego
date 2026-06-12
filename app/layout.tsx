import type { Metadata } from "next";
import { Prompt } from "next/font/google";
import "./globals.css";
import StarField from "@/components/StarField";
import { Analytics } from "@vercel/analytics/next";

const prompt = Prompt({ subsets: ["latin", "thai"], weight: ["300", "400", "500", "600", "700", "800", "900"] });

export const metadata: Metadata = {
  title: "AbcdeGo — Learn. Play. Level Up.",
  description: "แพลตฟอร์มการเรียนรู้แบบ gamified สำหรับนักศึกษาและผู้ใหญ่",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th" className="h-full">
      <body className={`${prompt.className} min-h-full flex flex-col`}>
        <StarField />
        <div className="relative z-10 flex flex-col flex-1">
          {children}
        </div>
        <Analytics />
      </body>
    </html>
  );
}
