"use client";

import dynamic from "next/dynamic";

const SiteStats = dynamic(() => import("./SiteStats"), { ssr: false });

export default function SiteStatsWrapper() {
  return <SiteStats />;
}
