'use client';
import React, { useEffect, useRef, useState } from 'react';
import AppImage from '@/components/ui/AppImage';

export default function RightWall() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [metricsVisible, setMetricsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef?.current) return;
      const rect = sectionRef?.current?.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, -rect?.top / (rect?.height - window.innerHeight)));

      if (sceneRef?.current) {
        const entryProgress = Math.min(1, progress * 3);
        const exitProgress = Math.max(0, (progress - 0.88) / 0.12);
        sceneRef.current.style.opacity = String(Math.max(0, entryProgress - exitProgress * 3));
      }

      if (contentRef?.current) {
        const cp = Math.min(1, Math.max(0, (progress - 0.05) / 0.35));
        contentRef.current.style.opacity = String(cp);
        contentRef.current.style.transform = `translateY(${(1 - cp) * 30}px)`;
      }

      setRevealed(progress > 0.1);
      setMetricsVisible(progress > 0.25);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="campus"
      className="relative"
      style={{ minHeight: '280vh' }}>
      
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Corridor background */}
        <div className="absolute inset-0">
          <AppImage
            src="https://images.unsplash.com/photo-1704983704010-75fc56510e62"
            alt="Modern college corridor with polished floors and natural light"
            fill
            className="object-cover"
            sizes="100vw" />
          
          {/* Right wall overlay — light warm surface */}
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(30,30,40,0.7) 0%, rgba(30,30,40,0.3) 30%, rgba(240,238,232,0.0) 50%, rgba(240,238,232,0.95) 65%, rgba(240,238,232,0.98) 100%)' }} />
        </div>

        {/* Scene content */}
        <div
          ref={sceneRef}
          className="absolute inset-0 will-change-transform"
          style={{ opacity: 0 }}>
          
          {/* Left side — corridor view with framed images */}
          <div className="absolute left-0 top-0 bottom-0" style={{ width: '45%' }}>
            {/* Framed artwork on left wall */}
            <div className="absolute left-8 top-24 space-y-4">
              {[1, 2, 3]?.map((i) =>
              <div
                key={i}
                className="rounded-lg overflow-hidden shadow-lg"
                style={{ width: '80px', height: '60px', background: '#1a1a2e', border: '2px solid rgba(255,255,255,0.1)' }}>
                
                  <div className="w-full h-full flex items-center justify-center text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
                    NSRIT
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT WALL PANEL */}
          <div
            ref={contentRef}
            className="absolute right-0 top-0 bottom-0 will-change-transform"
            style={{ width: '55%', paddingTop: '72px', paddingRight: '40px', paddingLeft: '40px', paddingBottom: '24px' }}>
            
            {/* NSRIT × LENDI ERP header */}
            <div className="flex items-center gap-4 mb-6">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <div className="text-2xl font-black" style={{ color: '#0F1E3C' }}>NSRIT</div>
                  <div className="text-xl font-light" style={{ color: '#9CA3AF' }}>×</div>
                  <div className="w-6 h-6 rounded" style={{ background: '#1A56DB' }} />
                  <div className="text-xl font-black" style={{ color: '#0F1E3C' }}>LENDI ERP</div>
                </div>
                <div className="text-xs" style={{ color: '#6B7280' }}>NADIMPALLI SATYANARAYANA RAJU</div>
                <div className="text-xs" style={{ color: '#6B7280' }}>INSTITUTE OF TECHNOLOGY</div>
              </div>
            </div>

            {/* Quote */}
            <div className="mb-6">
              <div className="text-2xl font-black leading-tight mb-2" style={{ color: '#0F1E3C', fontFamily: 'Georgia, serif' }}>
                &ldquo;Empowering Education<br />Through Technology.&rdquo;
              </div>
              <div className="w-8 h-0.5" style={{ background: '#1A56DB' }} />
            </div>

            {/* Two column layout */}
            <div className="grid grid-cols-2 gap-6 mb-6">
              {/* Left: description */}
              <div>
                <p className="text-sm leading-relaxed mb-4" style={{ color: '#374151' }}>
                  A smarter campus where students, faculty and administrators stay connected, informed and empowered.
                </p>
                <div className="w-8 h-0.5 mb-4" style={{ background: '#E5E7EB' }} />
                <div className="text-sm font-bold" style={{ color: '#0F1E3C' }}>Built for People.</div>
                <div className="text-sm font-bold" style={{ color: '#374151' }}>Driven by Progress.</div>
              </div>

              {/* Right: campus image */}
              <div>
                <div className="relative rounded-xl overflow-hidden shadow-lg" style={{ height: '140px' }}>
                  <AppImage
                    src="https://img.rocket.new/generatedImages/rocket_gen_img_19e527898-1776886882768.png"
                    alt="NSRIT campus aerial view showing modern buildings and green campus"
                    fill
                    className="object-cover"
                    sizes="300px" />
                  
                  <div className="absolute bottom-2 right-2">
                    <div className="text-xs font-bold italic" style={{ color: '#fff', textShadow: '0 1px 3px rgba(0,0,0,0.5)', fontFamily: 'Georgia, serif' }}>
                      Same Campus.<br />Greater Possibilities.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Metrics */}
            <div
              ref={metricsRef}
              className="grid grid-cols-4 gap-4 pt-4"
              style={{ borderTop: '1px solid #E5E7EB' }}>
              
              {[
              { val: '5000+', label: 'Students', icon: '👥' },
              { val: '300+', label: 'Faculty', icon: '👨‍🏫' },
              { val: '50+', label: 'Departments', icon: '🏛️' },
              { val: '∞', label: 'Possibilities', icon: '∞' }]?.
              map((m, i) =>
              <div
                key={m?.label}
                className="text-center transition-all duration-700"
                style={{
                  opacity: metricsVisible ? 1 : 0,
                  transform: metricsVisible ? 'translateY(0)' : 'translateY(20px)',
                  transitionDelay: `${i * 100}ms`
                }}>
                
                  <div className="text-lg mb-0.5">{m?.icon}</div>
                  <div className="text-2xl font-black" style={{ color: '#0F1E3C' }}>{m?.val}</div>
                  <div className="text-xs" style={{ color: '#6B7280' }}>{m?.label}</div>
                </div>
              )}
            </div>
          </div>

          {/* Right side decorative text */}
          <div className="absolute right-4 top-1/3 text-right" style={{ writingMode: 'vertical-rl' }}>
            <div className="text-xs font-bold tracking-widest" style={{ color: 'rgba(15,30,60,0.2)' }}>
              PEOPLE · PROCESS · PROGRESS
            </div>
          </div>

          {/* Bottom tagline */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center z-10">
            <div className="text-xs font-medium" style={{ color: 'rgba(15,30,60,0.4)' }}>
              One Campus. One Platform. A Smarter Tomorrow.
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-30">
          <div className="w-6 h-9 rounded-full border-2 flex items-start justify-center pt-1.5" style={{ borderColor: 'rgba(15,30,60,0.3)' }}>
            <div className="w-1 h-2 rounded-full" style={{ background: '#0F1E3C', animation: 'scrollBounce 1.5s ease-in-out infinite' }} />
          </div>
          <span className="text-xs font-medium tracking-widest uppercase" style={{ color: 'rgba(15,30,60,0.4)' }}>
            Scroll to explore
          </span>
        </div>
      </div>

      <style jsx>{`
        @keyframes scrollBounce {
          0%, 100% { transform: translateY(0); opacity: 1; }
          50% { transform: translateY(6px); opacity: 0.4; }
        }
      `}</style>
    </section>);

}