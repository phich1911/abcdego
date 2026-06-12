"use client";

import { useState } from "react";

type Props = {
  icon: string;
  icon3d?: string;
  color: string;
  size?: number;
  rounded?: string;
};

export default function CourseIcon({ icon, icon3d, color, size = 56, rounded = "1rem" }: Props) {
  const [failed, setFailed] = useState(false);

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: rounded,
        background: `${color}22`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        overflow: "hidden",
      }}
    >
      {icon3d && !failed ? (
        <img
          src={icon3d}
          alt={icon}
          width={size * 0.72}
          height={size * 0.72}
          style={{ objectFit: "contain", display: "block" }}
          onError={() => setFailed(true)}
        />
      ) : (
        <span style={{ fontSize: size * 0.46, lineHeight: 1 }}>{icon}</span>
      )}
    </div>
  );
}
