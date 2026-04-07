"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import './Core.css';

const CoreHero = () => {
  return (
    <section className="core-section" style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div className="animate-reveal">
        <span className="text-premium-mono">Engineering Mastery</span>
        <h1 className="text-premium-display" style={{ marginTop: '20px', marginBottom: '30px' }}>
          CoreWith<span style={{ color: 'var(--core-red)' }}>Ashish</span>
        </h1>
        <p style={{ fontSize: '1.25rem', maxWidth: '600px', color: 'var(--core-gray-600)', marginBottom: '40px' }}>
          Architecting scalable systems and mastering high-performance computation. A deep dive into the core of technical excellence.
        </p>
        <div style={{ display: 'flex', gap: '20px' }}>
          <button className="core-btn">
            Read My POV <ArrowRight size={18} />
          </button>
          <button className="core-btn-outline core-btn">
            Explore Vaults
          </button>
        </div>
      </div>
    </section>
  );
};

export default CoreHero;
