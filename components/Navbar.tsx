'use client';

import React, { useCallback, useState, useEffect } from 'react';
import StaggeredMenu from './StaggeredMenu';

const NAV_ITEMS = [
    { label: 'Home', link: '/', ariaLabel: 'Go to Home page' },
    { label: 'About', link: '/#about', ariaLabel: 'Go to About section' },
    { label: 'Projects', link: '/projects', ariaLabel: 'Go to Projects page' },
    { label: 'Experience', link: '/experience', ariaLabel: 'Go to Experience page' },
    { label: 'My Tools', link: '/tools', ariaLabel: 'Go to Tools page' },
    { label: 'Contact', link: '/contact', ariaLabel: 'Go to Contact page' },
];

const SOCIAL_ITEMS = [
    { label: 'GitHub', link: 'https://github.com' },
    { label: 'LinkedIn', link: 'https://linkedin.com' },
    { label: 'Twitter', link: 'https://twitter.com' },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleMenuOpen = useCallback(() => { document.body.style.overflow = 'hidden'; }, []);
    const handleMenuClose = useCallback(() => { document.body.style.overflow = ''; }, []);

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
                {/* ── Floating pill ── */}
                <div
                    style={{
                        position: 'absolute',
                        top: '20px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        pointerEvents: 'auto',

                        /* pill shape */
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '32px',
                        padding: '10px 10px 10px 24px',
                        borderRadius: '100px',
                        whiteSpace: 'nowrap',

                        /* glass */
                        background: scrolled
                            ? 'rgba(255,255,255,0.88)'
                            : 'rgba(255,255,255,0.72)',
                        backdropFilter: 'blur(18px)',
                        WebkitBackdropFilter: 'blur(18px)',
                        border: scrolled
                            ? '1px solid rgba(0,0,0,0.10)'
                            : '1px solid rgba(0,0,0,0.07)',
                        boxShadow: scrolled
                            ? '0 8px 32px rgba(0,0,0,0.10), 0 1px 0 rgba(255,255,255,0.6) inset'
                            : '0 4px 24px rgba(0,0,0,0.07), 0 1px 0 rgba(255,255,255,0.5) inset',

                        transition: 'background .35s ease, border .35s ease, box-shadow .35s ease',
                        animation: 'nb-drop .6s cubic-bezier(.16,1,.3,1) .1s both',
                    }}
                >
                    {/* Logo */}
                    <span style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '14px',
                        fontWeight: 700,
                        color: '#0a0a0a',
                        letterSpacing: '-.02em',
                        flexShrink: 0,
                    }}>
                        Ashish.
                    </span>

                    {/* Nav links — desktop */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                    }}>
                        {NAV_ITEMS.map((item) => (
                            <a
                                key={item.label}
                                href={item.link}
                                aria-label={item.ariaLabel}
                                style={{
                                    fontFamily: "'Inter', sans-serif",
                                    fontSize: '12px',
                                    fontWeight: 500,
                                    color: '#444',
                                    letterSpacing: '.02em',
                                    textDecoration: 'none',
                                    padding: '6px 14px',
                                    borderRadius: '100px',
                                    transition: 'background .18s, color .18s',
                                }}
                                onMouseEnter={e => {
                                    (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(0,0,0,.06)';
                                    (e.currentTarget as HTMLAnchorElement).style.color = '#0a0a0a';
                                }}
                                onMouseLeave={e => {
                                    (e.currentTarget as HTMLAnchorElement).style.background = 'transparent';
                                    (e.currentTarget as HTMLAnchorElement).style.color = '#444';
                                }}
                            >
                                {item.label}
                            </a>
                        ))}
                    </div>

                    {/* StaggeredMenu burger — right cap
                    <div style={{ flexShrink: 0 }}>
                        <StaggeredMenu
                            position="right"
                            colors={['#f5f5f5', '#e8e8e8']}
                            items={NAV_ITEMS}
                            socialItems={SOCIAL_ITEMS}
                            displaySocials={true}
                            displayItemNumbering={true}
                            menuButtonColor="#111"
                            openMenuButtonColor="#111"
                            accentColor="#111"
                            changeMenuColorOnOpen={false}
                            isFixed={false}
                            closeOnClickAway={true}
                            onMenuOpen={handleMenuOpen}
                            onMenuClose={handleMenuClose}
                        />
                    </div> */}
                </div>
            </nav>
        </>
    );
}