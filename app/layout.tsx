import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StarField from "@/components/StarField";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AbcdeGo — Learn. Play. Level Up.",
  description: "แพลตฟอร์มการเรียนรู้แบบ gamified สำหรับนักศึกษาและผู้ใหญ่",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th" className="h-full">
      <body className={`${inter.className} min-h-full flex flex-col`}>
        <StarField />
        <div className="relative z-10 flex flex-col flex-1">
          {children}
        </div>
      </body>
    </html>
  );
}
