"use client";

import HeroSection from "@/components/HeroSection";
import AboutMe from "@/components/AboutMe";

export default function Home() {
  return (
    <div style={{ minHeight: '100vh', background: '#fff' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&display=swap');
      `}</style>
      <section id="home"><HeroSection /></section>
      <section id="about"><AboutMe /></section>
    </div>
  );
}



