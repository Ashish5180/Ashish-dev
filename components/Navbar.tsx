'use client';

import React, { useState, useEffect } from 'react';

const NAV_ITEMS = [
    { label: 'Home', link: '/', ariaLabel: 'Go to Home page' },
    { label: 'About', link: '/#about', ariaLabel: 'Go to About section' },
    { label: 'Projects', link: '/projects', ariaLabel: 'Go to Projects page' },
    { label: 'Experience', link: '/experience', ariaLabel: 'Go to Experience page' },
    { label: 'Contact', link: '/contact', ariaLabel: 'Go to Contact page' },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <style>{`
                @keyframes nb-drop {
                    from { opacity: 0; transform: translateY(-12px) translateX(-50%); }
                    to   { opacity: 1; transform: translateY(0)      translateX(-50%); }
                }
            `}</style>

            <nav
                id="main-navbar"
                aria-label="Main navigation"
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100vh',
                    zIndex: 50,
                    pointerEvents: 'none',
                }}
            >
                {/* ── Minimalist Glass Pill ── */}
                <div
                    style={{
                        position: 'absolute',
                        top: '24px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        pointerEvents: 'auto',

                        /* pill shape */
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '4px',
                        padding: '6px 10px',
                        borderRadius: '100px',
                        whiteSpace: 'nowrap',

                        /* premium glass architecture */
                        background: scrolled
                            ? 'rgba(255,255,255,0.7)'
                            : 'rgba(255,255,255,0.4)',
                        backdropFilter: 'blur(24px) saturate(180%)',
                        WebkitBackdropFilter: 'blur(24px) saturate(180%)',
                        border: '1px solid rgba(255,255,255,0.3)',
                        boxShadow: scrolled
                            ? '0 10px 30px -10px rgba(0,0,0,0.1), 0 1px 0 rgba(255,255,255,0.8) inset'
                            : '0 4px 20px -5px rgba(0,0,0,0.05), 0 1px 0 rgba(255,255,255,0.5) inset',

                        transition: 'all .4s cubic-bezier(.16,1,.3,1)',
                        animation: 'nb-drop .8s cubic-bezier(.16,1,.3,1) both',
                    }}
                >
                    {/* Nav links — desktop focus */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '2px',
                    }}>
                        {NAV_ITEMS.map((item) => (
                            <a
                                key={item.label}
                                href={item.link}
                                aria-label={item.ariaLabel}
                                style={{
                                    fontFamily: "'Inter', sans-serif",
                                    fontSize: '11px',
                                    fontWeight: 600,
                                    color: '#1a1a1a',
                                    letterSpacing: '.04em',
                                    textTransform: 'uppercase',
                                    textDecoration: 'none',
                                    padding: '8px 18px',
                                    borderRadius: '100px',
                                    transition: 'all .25s ease',
                                }}
                                onMouseEnter={e => {
                                    (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(0,0,0,.04)';
                                    (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-1px)';
                                }}
                                onMouseLeave={e => {
                                    (e.currentTarget as HTMLAnchorElement).style.background = 'transparent';
                                    (e.currentTarget as HTMLAnchorElement).style.transform = 'none';
                                }}
                            >
                                {item.label}
                            </a>
                        ))}
                    </div>
                </div>
            </nav>
        </>
    );
}