"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { MousePointer2 } from 'lucide-react';
import './Core.css';

const blogPosts = [
  {
    id: 1,
    title: "Scalable Micro-Frontend Architecture for High-Traffic Apps",
    category: "Architecture",
    excerpt: "Exploring the nuances of managing state across isolated frontend environments while maintaining fluid user experiences.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "The Zero-Latency Mindset: Engineering for High Performance",
    category: "Performance",
    excerpt: "How to eliminate bottlenecks at every layer of the stack, from database indexing to edge caching strategies.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Designing for Resilience: Building Fault-Tolerant Distributed Systems",
    category: "System Design",
    excerpt: "Key strategies for implementing circuit breakers, retries, and data consistency patterns in large-scale clouds.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"
  }
];

const POVBlogGrid = () => {
  return (
    <section className="core-section" id="pov">
      <div style={{ marginBottom: '60px' }}>
        <span className="text-premium-mono">The POV Blog</span>
        <h2 className="text-premium-title" style={{ marginTop: '10px' }}>Engineering <span style={{ color: 'var(--core-red)' }}>Diaries</span></h2>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px' }}>
        {blogPosts.map((post) => (
          <div key={post.id} className="core-card-wrapper animate-reveal">
            <div className="core-card">
              <div className="core-card-image">
                <img src={post.image} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }} />
              </div>
              <div className="core-card-content">
                <span className="core-tag">{post.category}</span>
                <h3 className="core-card-title">{post.title}</h3>
                <p className="core-card-excerpt">{post.excerpt}</p>
                <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', fontSize: '0.8rem', fontWeight: 600, gap: '8px', cursor: 'pointer' }}>
                  Read Insights <MousePointer2 size={14} style={{ transform: 'rotate(-45deg)', color: 'var(--core-red)' }} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default POVBlogGrid;
