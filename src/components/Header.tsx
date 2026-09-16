'use client';
import React, { useState, useEffect } from 'react';

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'Features', href: '#features' },
  { label: 'Modules', href: '#modules' },
  { label: 'Campus', href: '#campus' },
  { label: 'About', href: '#about' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 60);
      const total = document.body?.scrollHeight - window.innerHeight;
      const progress = total > 0 ? y / total : 0;
      // Dark text on light sections (cabin hero, module wall, right wall)
      // Light text on dark sections (corridor, ERP dashboard)
      setDark(progress > 0.18 && progress < 0.32);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const textColor = dark ? 'text-white' : 'text-gray-800';
  const logoColor = dark ? '#fff' : '#0F1E3C';
  const bgColor = scrolled
    ? dark
      ? 'bg-gray-900/85 backdrop-blur-xl border-b border-white/10' :'bg-white/85 backdrop-blur-xl border-b border-gray-200/60' :'bg-transparent border-b border-transparent';

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${bgColor}`}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <div
          className="flex items-center gap-2.5 cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          {/* Hexagon icon */}
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path
              d="M16 2L28 9V23L16 30L4 23V9L16 2Z"
              fill="none"
              stroke={logoColor}
              strokeWidth="2"
            />
            <path
              d="M16 8L22 11.5V18.5L16 22L10 18.5V11.5L16 8Z"
              fill={logoColor}
              opacity="0.15"
            />
            <path
              d="M16 10L21 13V19L16 22L11 19V13L16 10Z"
              fill="none"
              stroke={logoColor}
              strokeWidth="1.5"
            />
          </svg>
          <div>
            <div
              className="font-black text-base leading-none tracking-tight transition-colors duration-300"
              style={{ color: logoColor }}
            >
              LENDI ERP
            </div>
            <div
              className="text-xs font-medium tracking-widest transition-colors duration-300"
              style={{ color: dark ? 'rgba(255,255,255,0.5)' : '#6B7280' }}
            >
              NSRIT
            </div>
          </div>
        </div>

        {/* Center nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks?.map((link) => (
            <a
              key={link?.label}
              href={link?.href}
              className={`text-sm font-medium transition-all duration-300 hover:opacity-100 ${textColor} opacity-70`}
            >
              {link?.label}
            </a>
          ))}
        </nav>

        {/* Right CTA */}
        <div className="flex items-center gap-4">
          <a
            href="#cta"
            className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold text-white transition-all hover:opacity-90"
            style={{ background: '#0F1E3C' }}
          >
            Enter ERP
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>

          <button
            className={`md:hidden p-2 ${textColor}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {menuOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className={`md:hidden border-t ${dark ? 'bg-gray-900/95 border-white/10' : 'bg-white/95 border-gray-200'} backdrop-blur-xl`}>
          <div className="px-6 py-4 flex flex-col gap-4">
            {navLinks?.map((link) => (
              <a
                key={link?.label}
                href={link?.href}
                className={`text-sm font-medium py-2 ${textColor} opacity-70`}
                onClick={() => setMenuOpen(false)}
              >
                {link?.label}
              </a>
            ))}
            <a
              href="#cta"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold text-white mt-2"
              style={{ background: '#0F1E3C' }}
              onClick={() => setMenuOpen(false)}
            >
              Enter ERP →
            </a>
          </div>
        </div>
      )}
    </header>
  );
}