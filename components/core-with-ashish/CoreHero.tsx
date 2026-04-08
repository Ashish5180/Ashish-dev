"use client";

import React from "react";
import { FullScreenScrollFX, FullScreenFXAPI } from "@/components/ui/full-screen-scroll-fx";

const sections = [
  {
    leftLabel: "Silence",
    title: <>Absence</>,
    rightLabel: "Silence",
    background: "https://images.pexels.com/photos/3289156/pexels-photo-3289156.jpeg",
    audioSrc: "/sfx/click-01.mp3",
  },
  {
    leftLabel: "Essence",
    title: <>Stillness</>,
    rightLabel: "Essence",
    background: "https://images.pexels.com/photos/163790/at-night-under-a-lantern-guy-night-city-163790.jpeg",
    audioSrc: "/sfx/whoosh-02.mp3",
  },
  {
    leftLabel: "Rebirth",
    title: <>Growth</>,
    rightLabel: "Rebirth",
    background: "https://images.pexels.com/photos/9817/pexels-photo-9817.jpeg",
    audioSrc: "/sfx/whoosh-02.mp3",
  },
];


const CoreHero = () => {
  const apiRef = React.useRef<FullScreenFXAPI>(null);

  const handleIndexChange = (index: number) => {
    const section = sections[index];
    if (section?.audioSrc) {
      const audio = new Audio(section.audioSrc);
      audio.volume = 0.3; // Subtle feedback
      audio.play().catch(() => {
        // Ignore autoplay restrictions
      });
    }
  };

  return (
    <div className="core-hero-fullscreen">
      <FullScreenScrollFX
        apiRef={apiRef}
        sections={sections}
        fontFamily="var(--font-outfit), system-ui, sans-serif"
        header={
          <>
            <div>The Creative</div>
            <div>Process</div>
          </>
        }
        footer={<div></div>}
        showProgress
        durations={{ change: 0.9, snap: 1000 }}
        onIndexChange={handleIndexChange}
      />
    </div>
  );
};

export default CoreHero;



