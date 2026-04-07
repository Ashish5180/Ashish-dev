"use client";

import React from 'react';
import './Core.css';

const galleryImages = [
  { id: 1, title: 'Profile', src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop', height: '400px' },
  { id: 2, title: 'Workspace', src: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop', height: '250px' },
  { id: 3, title: 'Code', src: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2070&auto=format&fit=crop', height: '350px' },
  { id: 4, title: 'Ideation', src: 'https://images.unsplash.com/photo-1454165833741-976552c537d1?q=80&w=2070&auto=format&fit=crop', height: '300px' },
  { id: 5, title: 'Engineering', src: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop', height: '420px' },
  { id: 6, title: 'Hardware', src: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop', height: '280px' },
];

const Gallery = () => {
  return (
    <section className="core-section" id="gallery">
      <div style={{ marginBottom: '60px' }}>
        <span className="text-premium-mono">The Visual Core</span>
        <h2 className="text-premium-title" style={{ marginTop: '10px' }}>Visualizing the <span style={{ color: 'var(--core-red)' }}>Journey</span></h2>
      </div>
      
      <div className="masonry-grid">
        {galleryImages.map((img) => (
          <div key={img.id} className="gallery-item animate-reveal" style={{ height: img.height }}>
            <img 
              src={img.src} 
              alt={img.title} 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div className="overlay" style={{ 
              position: 'absolute', 
              inset: 0, 
              background: 'rgba(0,0,0,0.4)', 
              opacity: 0, 
              transition: 'var(--core-transition)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}>
                <span style={{ color: '#fff', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{img.title}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Gallery;
