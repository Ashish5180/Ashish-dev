"use client";

import React from 'react';
import CoreHero from '@/components/core-with-ashish/CoreHero';
import POVBlogGrid from '@/components/core-with-ashish/POVBlogGrid';
import Gallery from '@/components/core-with-ashish/Gallery';
import './core-page.css';

export default function CoreWithAshishPage() {
  return (
    <main className="core-container">


      <CoreHero />
      {/* <POVBlogGrid /> */}
      <Gallery />


    </main>
  );
}
