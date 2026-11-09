"use client";

import React from "react";
import dynamic from "next/dynamic";

const CloudShader = dynamic(
  () => import("@/components/ui/cloud-shader").then((mod) => mod.CloudShader),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 bg-radial from-[#0c1424] via-[#050814] to-[#040711] opacity-70" />
    ),
  }
);

export function AtmosphericCloudBackground() {
  return (
    <div className="fixed inset-0 z-0 h-screen w-screen pointer-events-none">
      <CloudShader
        className="h-full w-full"
        speed={0.35}
        count={5}
        skyTopColor="#040711"
        skyBottomColor="#0c1424"
        cloudColor="#22375e"
      />
      {/* Subtle radial/vertical vignette preserving deep navy readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050814]/15 to-[#050814]/40" />
    </div>
  );
}

export default AtmosphericCloudBackground;

