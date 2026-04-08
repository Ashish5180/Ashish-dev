"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
} from 'lucide-react';
import './Core.css';

const blogPosts = [
  {
    id: 1,
    author: "Ashish Yaduvanshi",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ashish",
    title: "Scalable Micro-Frontend Architecture",
    excerpt: "Exploring the nuances of managing state across isolated frontend environments. Resilience is key.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop",
    likes: "1.2k"
  },
  {
    id: 2,
    author: "Ashish Yaduvanshi",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ashish",
    title: "The Zero-Latency Mindset",
    excerpt: "How to eliminate bottlenecks at every layer of the stack. Speed is a feature.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop",
    likes: "856"
  },
  {
    id: 3,
    author: "Ashish Yaduvanshi",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ashish",
    title: "Designing for Resilience",
    excerpt: "Key strategies for building circuit breakers and consistency patterns in large-scale clouds.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop",
    likes: "2.4k"
  },
  {
    id: 4,
    author: "Ashish Yaduvanshi",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ashish",
    title: "The Future of AI Systems",
    excerpt: "Integrating large language models into existing architectural workflows seamlessly.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2072&auto=format&fit=crop",
    likes: "1.9k"
  }
];

const POVBlogGrid = () => {
  const [isPaused, setIsPaused] = React.useState(false);

  return (
    <section className="news-premium-section" id="pov">
      {/* Newspaper Header - More Minimal */}
      <div className="news-minimal-masthead">
        <div className="news-meta-row">
          <span>VOL. XXXI ... NO. 12</span>
          <span>THE DAILY ARCHITECT</span>
          <span>APRIL 2026</span>
        </div>
        <div className="news-divider-heavy" />
      </div>

      {/* Modern Marquee Container */}
      <div className="news-modern-marquee-wrapper">
        <motion.div 
          className="news-marquee-track-motion"
          drag="x"
          dragConstraints={{ left: -3000, right: 0 }}
          animate={isPaused ? { x: undefined } : { x: [0, -1500] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 50,
              ease: "linear",
            },
          }}
          whileTap={{ cursor: "grabbing" }}
        >
          {[...blogPosts, ...blogPosts, ...blogPosts, ...blogPosts].map((post, index) => (
            <div 
              key={`${post.id}-${index}`} 
              className={`news-premium-card ${index % 2 === 0 ? 'card-up' : 'card-down'} ${isPaused ? 'reading-mode' : ''}`}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              onClick={() => setIsPaused(!isPaused)}
            >
              <div className="news-card-top-info">
                <span className="news-card-num">0{post.id}</span>
                <span className="news-card-topic">Engineering POV</span>
              </div>
              
              <div className="news-card-img-box">
                <Image src={post.image} alt={post.title} width={400} height={300} unoptimized className="grayscale-hover w-full h-full object-cover" />
              </div>

              <div className="news-card-text">
                <h3 className="news-card-h">{post.title}</h3>
                <p className="news-card-p">{post.excerpt}</p>
              </div>

              <div className="news-card-btm">
                <div className="news-card-user">
                  <Image src={post.avatar} alt="Ashish" width={32} height={32} unoptimized />
                  <span>{post.author}</span>
                </div>
                <div className="news-card-stats">{post.likes}</div>
              </div>

              {/* Pause Indicator Overlay */}
              {isPaused && (
                <div className="pause-indicator">
                  <span className="pause-dot"></span>
                  Reading POV
                </div>
              )}
            </div>
          ))}
        </motion.div>
      </div>

      <div className="news-divider-bottom" />
    </section>
  );
};

export default POVBlogGrid;
