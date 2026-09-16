'use client';
import React, { useEffect, useRef, useState } from 'react';
import AppImage from '@/components/ui/AppImage';

const campusLabels = [
{ label: 'Academic Block', x: '30%', y: '40%' },
{ label: 'Library', x: '55%', y: '55%' },
{ label: 'Hostel', x: '70%', y: '35%' },
{ label: 'Auditorium', x: '45%', y: '28%' },
{ label: 'Sports Complex', x: '20%', y: '62%' }];


export default function CampusAerial() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [labelsVisible, setLabelsVisible] = useState(false);
  const [textVisible, setTextVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef?.current) return;
      const rect = sectionRef?.current?.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, -rect?.top / (rect?.height - window.innerHeight)));

      if (imageRef?.current) {
        // Rise from ground level to aerial
        const scale = 1.3 - progress * 0.3;
        imageRef.current.style.transform = `scale(${scale}) translateY(${(1 - progress) * 60}px)`;
        imageRef.current.style.filter = `brightness(${0.6 + progress * 0.4})`;
      }

      setLabelsVisible(progress > 0.3);
      setTextVisible(progress > 0.55);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="campus"
      className="relative"
      style={{ minHeight: '250vh' }}>
      
      <div className="sticky top-0 h-screen overflow-hidden scene-aerial">
        {/* Aerial campus image */}
        <div ref={imageRef} className="absolute inset-0 will-change-transform">
          <AppImage
            src="https://img.rocket.new/generatedImages/rocket_gen_img_1c3ba2c5d-1784807065553.png"
            alt="Aerial view of NSRIT college campus showing academic blocks, library, hostel, and green landscaping from above in warm golden light"
            fill
            className="object-cover"
            sizes="100vw" />
          
          <div className="absolute inset-0 bg-gradient-to-b from-aerial-sky/30 via-transparent to-secondary/60" />
        </div>

        {/* Campus annotation labels */}
        {campusLabels?.map((lbl, i) =>
        <div
          key={lbl?.label}
          className="absolute transition-all duration-700"
          style={{
            left: lbl?.x,
            top: lbl?.y,
            opacity: labelsVisible ? 1 : 0,
            transform: labelsVisible ? 'translateY(0)' : 'translateY(12px)',
            transitionDelay: `${i * 100}ms`,
            zIndex: 10
          }}>
          
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-accent" />
              <div className="glass-light rounded-lg px-2.5 py-1 border border-white/60 shadow-sm">
                <span className="text-foreground text-xs font-semibold">{lbl?.label}</span>
              </div>
            </div>
          </div>
        )}

        {/* Final CTA text */}
        <div
          id="cta"
          className="absolute inset-0 flex flex-col items-center justify-end pb-20 text-center px-6 z-20 transition-all duration-1000"
          style={{ opacity: textVisible ? 1 : 0, transform: textVisible ? 'translateY(0)' : 'translateY(40px)' }}
          ref={textRef}>
          
          <div className="glass-light rounded-3xl px-8 py-10 max-w-2xl shadow-2xl border border-white/60">
            <span className="eyebrow text-primary block mb-4">NSRIT × LENDI ERP</span>
            <h2 className="editorial-lg text-foreground mb-4">
              A CAMPUS BUILT<br />
              FOR GREATER<br />
              <span className="text-primary">POSSIBILITIES.</span>
            </h2>
            <p className="text-muted-foreground text-base mb-8 max-w-md mx-auto leading-relaxed">
              One campus. One platform. A smarter everyday — for every student, every faculty, every administrator.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="#" className="btn-primary">
                Enter LendiERP
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
              <button className="btn-ghost text-foreground text-sm">
                Explore the platform
              </button>
            </div>

            {/* Metrics */}
            <div className="mt-8 pt-6 border-t border-foreground/10 grid grid-cols-3 gap-4">
              {[
              ['12+', 'Core Modules'],
              ['1', 'Connected Platform'],
              ['24/7', 'Support']]?.
              map(([val, lbl]) =>
              <div key={lbl} className="text-center">
                  <div className="text-foreground font-bold text-xl">{val}</div>
                  <div className="text-muted-foreground text-xs mt-0.5">{lbl}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>);

}