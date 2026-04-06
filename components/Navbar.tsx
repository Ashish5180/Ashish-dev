'use client';

import React, { useState, useEffect, useCallback } from 'react';

const NAV_ITEMS = [
    { label: 'Home', link: '/', ariaLabel: 'Go to Home page' },
    { label: 'About', link: '/#about', ariaLabel: 'Go to About section' },
    { label: 'Projects', link: '/projects', ariaLabel: 'Go to Projects page' },
    { label: 'Experience', link: '/experience', ariaLabel: 'Go to Experience page' },
    { label: 'Contact', link: '/contact', ariaLabel: 'Go to Contact page' },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    /* Lock body scroll when mobile menu is open */
    useEffect(() => {
        if (menuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [menuOpen]);

    const closeMenu = useCallback(() => setMenuOpen(false), []);

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

                @keyframes nb-drop {
                    from { opacity: 0; transform: translateY(-12px) translateX(-50%); }
                    to   { opacity: 1; transform: translateY(0)      translateX(-50%); }
                }
                @keyframes nb-drop-right {
                    from { opacity: 0; transform: translateY(-12px); }
                    to   { opacity: 1; transform: translateY(0); }
                }

                /* ── Desktop glass pill (centered) ── */
                .nb-glass-pill {
                    display: flex;
                }

                /* ── Desktop nav links ── */
                .nb-desktop-links {
                    display: flex;
                    align-items: center;
                    gap: 2px;
                }

                /* ── Hamburger wrapper — hidden on desktop, top-right on mobile ── */
                .nb-hamburger-wrap {
                    display: none;
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    z-index: 52;
                    pointer-events: auto;
                    animation: nb-drop-right .8s cubic-bezier(.16,1,.3,1) both;
                }
                .nb-hamburger {
                    appearance: none;
                    border: none;
                    cursor: pointer;
                    position: relative;
                    width: 44px;
                    height: 44px;
                    border-radius: 14px;
                    padding: 0;
                    transition: all .3s cubic-bezier(.16,1,.3,1);

                    /* glass styling matching the pill */
                    background: rgba(255,255,255,0.65);
                    backdrop-filter: blur(24px) saturate(180%);
                    -webkit-backdrop-filter: blur(24px) saturate(180%);
                    border: 1px solid rgba(255,255,255,0.35);
                    box-shadow: 0 4px 20px -5px rgba(0,0,0,0.08), 0 1px 0 rgba(255,255,255,0.6) inset;
                }
                .nb-hamburger:hover {
                    background: rgba(255,255,255,0.85);
                    box-shadow: 0 8px 28px -6px rgba(0,0,0,0.12), 0 1px 0 rgba(255,255,255,0.8) inset;
                }
                .nb-hamburger span {
                    display: block;
                    position: absolute;
                    left: 50%;
                    width: 18px;
                    height: 1.5px;
                    background: #1a1a1a;
                    border-radius: 2px;
                    transform: translateX(-50%);
                    transition: all .3s cubic-bezier(.16,1,.3,1);
                }
                .nb-hamburger span:nth-child(1) { top: 14px; }
                .nb-hamburger span:nth-child(2) { top: 21px; }
                .nb-hamburger span:nth-child(3) { top: 28px; }

                /* hamburger → X morph */
                .nb-hamburger.open span:nth-child(1) {
                    top: 21px;
                    transform: translateX(-50%) rotate(45deg);
                }
                .nb-hamburger.open span:nth-child(2) {
                    opacity: 0;
                    transform: translateX(-50%) scaleX(0);
                }
                .nb-hamburger.open span:nth-child(3) {
                    top: 21px;
                    transform: translateX(-50%) rotate(-45deg);
                }

                /* ── Fullscreen mobile overlay ── */
                .nb-mobile-overlay {
                    position: fixed;
                    inset: 0;
                    z-index: 51;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    background: rgba(255,255,255,0.88);
                    backdrop-filter: blur(40px) saturate(200%);
                    -webkit-backdrop-filter: blur(40px) saturate(200%);
                    opacity: 0;
                    pointer-events: none;
                    transition: opacity .35s cubic-bezier(.16,1,.3,1);
                }
                .nb-mobile-overlay.open {
                    opacity: 1;
                    pointer-events: auto;
                }

                .nb-mobile-overlay a {
                    font-family: 'Inter', sans-serif;
                    font-size: 14px;
                    font-weight: 600;
                    letter-spacing: .12em;
                    text-transform: uppercase;
                    color: #1a1a1a;
                    text-decoration: none;
                    padding: 16px 40px;
                    border-radius: 12px;
                    transition: all .25s ease;
                    opacity: 0;
                    transform: translateY(16px);
                }
                .nb-mobile-overlay.open a {
                    opacity: 1;
                    transform: translateY(0);
                }
                .nb-mobile-overlay a:hover {
                    background: rgba(0,0,0,.04);
                }

                /* staggered link entrance */
                .nb-mobile-overlay a:nth-child(1) { transition-delay: .08s; }
                .nb-mobile-overlay a:nth-child(2) { transition-delay: .14s; }
                .nb-mobile-overlay a:nth-child(3) { transition-delay: .20s; }
                .nb-mobile-overlay a:nth-child(4) { transition-delay: .26s; }
                .nb-mobile-overlay a:nth-child(5) { transition-delay: .32s; }

                /* ── Responsive ── */
                @media (max-width: 768px) {
                    .nb-glass-pill { display: none !important; }
                    .nb-hamburger-wrap { display: block !important; }
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
                {/* ── Glass Pill (desktop) ── */}
                <div
                    className="nb-glass-pill"
                    style={{
                        position: 'absolute',
                        top: '24px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        pointerEvents: 'auto',
                        zIndex: 51,

                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '4px',
                        padding: '6px 10px',
                        borderRadius: '100px',
                        whiteSpace: 'nowrap',

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
                    <div className="nb-desktop-links">
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

                {/* ── Hamburger (mobile – top right) ── */}
                <div className="nb-hamburger-wrap">
                    <button
                        className={`nb-hamburger${menuOpen ? ' open' : ''}`}
                        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                        aria-expanded={menuOpen}
                        onClick={() => setMenuOpen(prev => !prev)}
                    >
                        <span />
                        <span />
                        <span />
                    </button>
                </div>
            </nav>

            {/* ── Fullscreen Mobile Overlay ── */}
            <div
                className={`nb-mobile-overlay${menuOpen ? ' open' : ''}`}
                aria-hidden={!menuOpen}
            >
                {NAV_ITEMS.map((item) => (
                    <a
                        key={item.label}
                        href={item.link}
                        aria-label={item.ariaLabel}
                        onClick={closeMenu}
                    >
                        {item.label}
                    </a>
                ))}
            </div>
        </>
    );
}