"use client";

import React from "react";
import { FullScreenScrollFX, FullScreenFXAPI } from "@/components/ui/full-screen-scroll-fx";

const sections = [
  {
    leftLabel: "O(1)",
    title: <>Constant</>,
    rightLabel: "Efficiency",
    background: "https://images.pexels.com/photos/3289156/pexels-photo-3289156.jpeg",
  },
  {
    leftLabel: "O(log N)",
    title: <>Scalable</>,
    rightLabel: "Architecture",
    background: "https://images.pexels.com/photos/163790/at-night-under-a-lantern-guy-night-city-163790.jpeg",
  },
  {
    leftLabel: "O(N)",
    title: <>Optimal</>,
    rightLabel: "Solution",
    background: "https://images.pexels.com/photos/9817/pexels-photo-9817.jpeg",
  },
];


const CoreHero = () => {
  const apiRef = React.useRef<FullScreenFXAPI>(null);

  return (
    <div className="core-hero-fullscreen">
      <FullScreenScrollFX
        apiRef={apiRef}
        sections={sections}
        fontFamily="var(--font-outfit), system-ui, sans-serif"
        header={
          <>
            <div>The Core</div>
            <div>Logic</div>
          </>
        }
        footer={<div></div>}
        showProgress
        durations={{ change: 0.9, snap: 1000 }}
      />
    </div>
  );
};

export default CoreHero;



