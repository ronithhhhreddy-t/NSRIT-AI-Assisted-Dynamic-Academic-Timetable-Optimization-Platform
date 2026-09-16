'use client';
import React, { useEffect, useState } from 'react';

const stages = [
  { id: '01', label: 'The Start', target: 0 },
  { id: '02', label: 'The Platform', target: 0.18 },
  { id: '03', label: 'Features', target: 0.35 },
  { id: '04', label: 'Modules', target: 0.52 },
  { id: '05', label: 'Campus', target: 0.72 },
  { id: '06', label: 'Impact', target: 0.88 },
];

export default function ProgressRail() {
  const [progress, setProgress] = useState(0);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const total = document.body.scrollHeight - window.innerHeight;
      const p = total > 0 ? window.scrollY / total : 0;
      setProgress(p);
      // Dark background sections
      setIsDark(p > 0.18 && p < 0.32);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToStage = (targetProgress: number) => {
    const total = document.body.scrollHeight - window.innerHeight;
    window.scrollTo({ top: targetProgress * total, behavior: 'smooth' });
  };

  const activeIdx = stages.reduce((acc, s, i) => (progress >= s.target ? i : acc), 0);

  const textColor = isDark ? 'rgba(255,255,255,0.5)' : 'rgba(15,30,60,0.5)';
  const activeTextColor = isDark ? '#fff' : '#0F1E3C';
  const dotBorder = isDark ? 'rgba(255,255,255,0.3)' : 'rgba(15,30,60,0.3)';
  const activeDotBg = isDark ? '#fff' : '#0F1E3C';
  const lineColor = isDark ? 'rgba(255,255,255,0.15)' : 'rgba(15,30,60,0.15)';

  return (
    <div className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col" style={{ gap: '0' }}>
      {stages.map((stage, i) => {
        const isActive = i === activeIdx;
        return (
          <div key={stage.id} className="flex flex-col items-start">
            <button
              onClick={() => scrollToStage(stage.target)}
              className="flex items-center gap-3 group py-1 transition-all duration-300"
              aria-label={`Go to ${stage.label}`}
            >
              {/* Dot */}
              <div
                className="w-3 h-3 rounded-full transition-all duration-500 shrink-0"
                style={{
                  background: isActive ? activeDotBg : 'transparent',
                  border: `2px solid ${isActive ? activeDotBg : dotBorder}`,
                  boxShadow: isActive ? `0 0 8px ${isDark ? 'rgba(255,255,255,0.4)' : 'rgba(15,30,60,0.3)'}` : 'none',
                }}
              />
              {/* Label */}
              <div className="text-left">
                <div
                  className="text-xs font-bold leading-none transition-colors duration-300"
                  style={{ color: isActive ? activeTextColor : textColor }}
                >
                  {stage.id}
                </div>
                <div
                  className="text-xs leading-none mt-0.5 transition-colors duration-300"
                  style={{ color: isActive ? activeTextColor : textColor, fontWeight: isActive ? 600 : 400 }}
                >
                  {stage.label}
                </div>
              </div>
            </button>

            {/* Connecting line */}
            {i < stages.length - 1 && (
              <div
                className="ml-1.5 transition-colors duration-300"
                style={{
                  width: '1px',
                  height: '24px',
                  background: lineColor,
                }}
              />
            )}
          </div>
        );
      })}

      {/* Bottom tagline */}
      <div className="mt-6 ml-0">
        <div className="text-xs leading-relaxed" style={{ color: textColor, maxWidth: '100px' }}>
          One Campus.<br />
          One Platform.<br />
          A Smarter Tomorrow.
        </div>
      </div>
    </div>
  );
}