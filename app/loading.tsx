import React from "react";
import { UniversalLoader } from "@/components/ui/universal-loader";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex min-h-screen w-full flex-col items-center justify-center bg-[#050814] px-6 text-[#f0f0f5]">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-radial from-[#0c1424] via-[#050814] to-[#040711] opacity-70 pointer-events-none" />

      {/* Center Quantum Gyroscope Universal Loader */}
      <div className="relative z-10 flex flex-col items-center">
        <UniversalLoader
          size="xl"
          label="Ashish Yadav"
          sublabel="Software Engineer (Backend · Full-Stack · AI)"
        />

        {/* Micro System Diagnostics */}
        <div className="mt-8 flex items-center gap-3 font-mono text-[11px] text-[#5a6380] border border-[#f0f0f5]/[0.06] bg-[#0c1220]/80 px-4 py-1.5 rounded-full backdrop-blur-md">
          <span className="h-1.5 w-1.5 rounded-full bg-sky-400 animate-pulse" />
          <span>V8 / Epoll Runtime Active</span>
          <span>·</span>
          <span>Hydrating UI Modules</span>
        </div>
      </div>
    </div>
  );
}

