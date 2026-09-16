'use client';
import React, { useEffect, useRef, useState } from 'react';

const orbitModules = [
  { label: 'Students', icon: '👥', angle: 0, r: 180 },
  { label: 'Academics', icon: '📚', angle: 40, r: 190 },
  { label: 'Attendance', icon: '✓', angle: 80, r: 175 },
  { label: 'Timetable', icon: '📅', angle: 120, r: 185 },
  { label: 'Examinations', icon: '📝', angle: 160, r: 180 },
  { label: 'Seating', icon: '💺', angle: 200, r: 188 },
  { label: 'Fees', icon: '₹', angle: 240, r: 175 },
  { label: 'Results', icon: '📊', angle: 280, r: 185 },
  { label: 'Library', icon: '📖', angle: 310, r: 180 },
  { label: 'Hostel', icon: '🏠', angle: 340, r: 190 },
  { label: 'Communication', icon: '💬', angle: 20, r: 178 },
  { label: 'Reports', icon: '📈', angle: 60, r: 183 },
];

export default function ERPOrbit() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    let animFrame: number;
    let angle = 0;
    const animate = () => {
      angle += 0.15;
      setRotation(angle);
      animFrame = requestAnimationFrame(animate);
    };
    animFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrame);
  }, [visible]);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 px-6 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0A1628 0%, #0D1F3C 50%, #0A1628 100%)' }}
    >
      <div className="absolute inset-0 ambient-glow-blue" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <span className="eyebrow text-accent block mb-4">Complete ERP</span>
          <h2 className="editorial-md text-white mb-4">
            EVERYTHING<br /><span className="text-primary">CONNECTED.</span>
          </h2>
          <p className="text-white/50 text-base max-w-md mx-auto">
            Twelve modules. One platform. Every campus process connected and visible from a single dashboard.
          </p>
        </div>

        {/* Orbit visualization */}
        <div className="relative flex items-center justify-center" style={{ height: '480px' }}>
          {/* Orbit rings */}
          <div className="absolute rounded-full border border-white/5" style={{ width: '380px', height: '380px' }} />
          <div className="absolute rounded-full border border-white/3" style={{ width: '480px', height: '480px' }} />

          {/* Center */}
          <div className={`relative z-10 w-32 h-32 rounded-full bg-primary/20 border-2 border-primary/40 flex flex-col items-center justify-center transition-all duration-1000 ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-white font-bold text-lg mb-1">L</div>
            <div className="text-white text-xs font-bold">LendiERP</div>
            <div className="text-white/40 text-[9px]">Core Platform</div>
          </div>

          {/* Orbiting modules — client-only to prevent hydration mismatch */}
          {mounted && orbitModules.map((mod, i) => {
            const angleRad = ((mod.angle + rotation) * Math.PI) / 180;
            const x = Math.cos(angleRad) * (mod.r * 0.85);
            const y = Math.sin(angleRad) * (mod.r * 0.55);

            return (
              <div
                key={mod.label}
                className={`orbit-module absolute flex flex-col items-center gap-1 transition-all duration-700`}
                style={{
                  transform: `translate(${x}px, ${y}px)`,
                  opacity: visible ? 0.85 : 0,
                  transitionDelay: `${i * 60}ms`,
                }}
              >
                <div className="w-10 h-10 rounded-xl glass-dark border border-white/10 flex items-center justify-center text-lg shadow-lg">
                  {mod.icon}
                </div>
                <span className="text-white/60 text-[8px] font-semibold whitespace-nowrap">{mod.label}</span>
              </div>
            );
          })}

          {/* Connection lines — client-only to prevent hydration mismatch */}
          {mounted && (
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.1 }}>
              {orbitModules.map((mod, i) => {
                const angleRad = ((mod.angle + rotation) * Math.PI) / 180;
                const cx = 240;
                const cy = 240;
                const x = cx + Math.cos(angleRad) * (mod.r * 0.85);
                const y = cy + Math.sin(angleRad) * (mod.r * 0.55);
                return (
                  <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="#2D7DD2" strokeWidth="1" />
                );
              })}
            </svg>
          )}
        </div>
      </div>
    </section>
  );
}