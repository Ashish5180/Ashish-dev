"use client";

import React from 'react';
import POVBlogGrid from '@/components/core-with-ashish/POVBlogGrid';
import Gallery from '@/components/core-with-ashish/Gallery';
import PotterWorld from '@/components/core-with-ashish/PotterWorld';
import './core-page.css';

export default function CoreWithAshishPage() {
  return (
    <main className="core-container">


      <PotterWorld />
      <Gallery />


    </main>
  );
}
