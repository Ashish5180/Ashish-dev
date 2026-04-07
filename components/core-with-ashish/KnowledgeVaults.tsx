"use client";

import React from 'react';
import { Cpu, Layout, Server, Database, Code, Globe } from 'lucide-react';
import './Core.css';

const KnowledgeVaults = () => {
  return (
    <section className="core-section" id="vaults" style={{ paddingTop: '0' }}>
      <div style={{ marginBottom: '60px' }}>
        <span className="text-premium-mono">Knowledge Vaults</span>
        <h2 className="text-premium-title" style={{ marginTop: '10px' }}>The <span style={{ color: 'var(--core-red)' }}>Core</span> Components</h2>
      </div>
      
      <div className="split-sections">
        {/* DSA Hub */}
        <div className="split-section-card">
          <div style={{ marginBottom: '40px', background: 'var(--core-red)', width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Cpu size={24} color="#fff" />
          </div>
          <h3 className="text-premium-title" style={{ fontSize: '1.75rem', marginBottom: '24px' }}>DSA Hub</h3>
          <p style={{ color: 'var(--core-gray-600)', marginBottom: '32px' }}>
            Logic at its most efficient. My specialized vault for advanced data structures, complex algorithmic problem solving, and computational efficiency optimizations.
          </p>
          <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            {['Graph Theory', 'Dynamic Programming', 'B-Trees', 'Sorting & Searching', 'Complexity Analysis', 'Bit Manipulation'].map(item => (
              <li key={item} style={{ fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '4px', height: '4px', background: 'var(--core-red)', borderRadius: '50%' }}></span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        
        {/* System Design */}
        <div className="split-section-card">
          <div style={{ marginBottom: '40px', background: 'var(--core-black)', width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Server size={24} color="#fff" />
          </div>
          <h3 className="text-premium-title" style={{ fontSize: '1.75rem', marginBottom: '24px' }}>System Design</h3>
          <p style={{ color: 'var(--core-gray-600)', marginBottom: '32px' }}>
            Architecture at scale. Deep dives into high-level system blueprints, distributed systems, availability patterns, and scalable backend infrastructure.
          </p>
          <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            {['Microservices', 'Load Balancing', 'Data Consistency', 'Global Caching', 'Event Sourcing', 'CAP Theorem'].map(item => (
              <li key={item} style={{ fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '4px', height: '4px', background: 'var(--core-black)', borderRadius: '50%' }}></span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default KnowledgeVaults;
