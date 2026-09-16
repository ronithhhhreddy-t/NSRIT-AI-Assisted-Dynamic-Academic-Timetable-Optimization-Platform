'use client';
import React, { useState, useEffect } from 'react';
import AppLogo from '@/components/ui/AppLogo';

export default function Footer() {
  const [year, setYear] = useState('');
  useEffect(() => { setYear(new Date()?.getFullYear()?.toString()); }, []);

  return (
    <footer className="border-t border-white/10 bg-secondary py-16 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <AppLogo size={28} />
          <span className="font-bold text-white tracking-tight">LendiERP</span>
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-6">
          {['Features', 'Modules', 'Campus', 'Privacy', 'Terms']?.map((item) => (
            <a
              key={item}
              href={`#${item?.toLowerCase()}`}
              className="text-sm font-medium text-white/50 hover:text-white transition-colors"
            >
              {item}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          {[
            { icon: 'twitter', href: '#' },
            { icon: 'linkedin', href: '#' },
          ]?.map(({ icon, href }) => (
            <a
              key={icon}
              href={href}
              aria-label={icon}
              className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-all"
            >
              {icon === 'twitter' && (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.258 5.629 5.906-5.629zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              )}
              {icon === 'linkedin' && (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z M4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
                </svg>
              )}
            </a>
          ))}
          <span className="text-white/30 text-sm ml-2">© {year} LendiERP</span>
        </div>
      </div>
    </footer>
  );
}