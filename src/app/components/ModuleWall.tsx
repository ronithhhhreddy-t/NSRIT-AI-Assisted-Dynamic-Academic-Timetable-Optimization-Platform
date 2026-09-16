'use client';
import React, { useEffect, useRef, useState } from 'react';
import AppImage from '@/components/ui/AppImage';

const modules = [
{ icon: '👥', label: 'Student\nManagement', desc: 'From admission\nto graduation', color: '#3B82F6' },
{ icon: '📚', label: 'Academics', desc: 'Streamlined curriculum\n& course delivery', color: '#10B981' },
{ icon: '✓', label: 'Attendance', desc: 'Real-time\ntracking', color: '#F59E0B' },
{ icon: '📅', label: 'Timetable', desc: 'Automated &\nconflict-free', color: '#8B5CF6' },
{ icon: '📝', label: 'Examinations', desc: 'End-to-end\nexam management', color: '#EF4444' },
{ icon: '₹', label: 'Fees', desc: 'Simple &\ntransparent', color: '#06B6D4' },
{ icon: '📖', label: 'Library', desc: 'Digital access\nand resources', color: '#F59E0B' },
{ icon: '🏠', label: 'Hostel', desc: 'Room allocation\nand records', color: '#3B82F6' },
{ icon: '📊', label: 'Reports', desc: 'Insights for\nbetter decisions', color: '#6366F1' }];


export default function ModuleWall() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const leftWallRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [revealedCards, setRevealedCards] = useState<boolean[]>(new Array(9).fill(false));

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, -rect.top / (rect.height - window.innerHeight)));

      // Scene entry
      if (sceneRef.current) {
        const entryProgress = Math.min(1, progress * 3);
        const exitProgress = Math.max(0, (progress - 0.88) / 0.12);
        sceneRef.current.style.opacity = String(Math.max(0, entryProgress - exitProgress * 3));
      }

      // Left wall perspective shift
      if (leftWallRef.current) {
        const wallProgress = Math.min(1, progress * 2);
        leftWallRef.current.style.transform = `perspective(2000px) rotateY(${(1 - wallProgress) * 8}deg) translateX(${(1 - wallProgress) * -40}px)`;
      }

      // Headline
      if (headlineRef.current) {
        const hp = Math.min(1, Math.max(0, (progress - 0.05) / 0.25));
        headlineRef.current.style.opacity = String(hp);
        headlineRef.current.style.transform = `translateY(${(1 - hp) * 30}px)`;
      }

      // Right panel
      if (rightPanelRef.current) {
        const rp = Math.min(1, Math.max(0, (progress - 0.1) / 0.3));
        rightPanelRef.current.style.opacity = String(rp);
        rightPanelRef.current.style.transform = `translateX(${(1 - rp) * 30}px)`;
      }

      // Cards stagger
      const newRevealed = modules.map((_, i) => progress > 0.2 + i * 0.06);
      setRevealedCards(newRevealed);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="features"
      className="relative"
      style={{ minHeight: '320vh' }}>
      
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Corridor background */}
        <div className="absolute inset-0">
          <AppImage
            src="https://img.rocket.new/generatedImages/rocket_gen_img_145f7a36b-1765477774898.png"
            alt="Modern college corridor with polished marble floors, ceiling lights, plants, and students walking toward daylight"
            fill
            className="object-cover"
            sizes="100vw" />
          
          {/* Darken sides for wall effect */}
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(240,238,232,0.97) 0%, rgba(240,238,232,0.92) 38%, rgba(0,0,0,0) 55%, rgba(240,238,232,0.0) 65%, rgba(230,228,222,0.95) 100%)' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, transparent 20%, transparent 80%, rgba(0,0,0,0.1) 100%)' }} />
        </div>

        {/* Main scene overlay */}
        <div
          ref={sceneRef}
          className="absolute inset-0 will-change-transform"
          style={{ opacity: 0 }}>
          
          {/* LEFT WALL PANEL */}
          <div
            ref={leftWallRef}
            className="absolute left-0 top-0 bottom-0 will-change-transform"
            style={{ width: '52%', paddingTop: '72px', paddingLeft: '120px', paddingRight: '24px', paddingBottom: '24px' }}>
            
            {/* Eyebrow */}
            <div className="text-xs font-bold tracking-widest mb-3" style={{ color: '#9CA3AF' }}>
              ACADEMICS × ADMINISTRATION × PEOPLE
            </div>

            {/* Main headline */}
            <div ref={headlineRef} className="will-change-transform" style={{ opacity: 0 }}>
              <h2
                className="font-black leading-none mb-4"
                style={{ fontSize: 'clamp(36px, 4.5vw, 68px)', color: '#0F1E3C', letterSpacing: '-0.02em' }}>
                
                ONE PLATFORM.<br />
                EVERY CAMPUS<br />
                PROCESS.
              </h2>
              <p className="text-sm leading-relaxed mb-6 max-w-sm" style={{ color: '#374151' }}>
                LENDI ERP connects the entire academic and administrative ecosystem of NSRIT in one intelligent platform, so that education can focus on what truly matters — people.
              </p>
            </div>

            {/* Module cards — horizontal row */}
            <div ref={cardsRef} className="flex gap-2 flex-wrap">
              {modules.map((mod, i) =>
              <div
                key={mod.label}
                className="flex flex-col items-center transition-all duration-500"
                style={{
                  opacity: revealedCards[i] ? 1 : 0,
                  transform: revealedCards[i] ? 'translateY(0)' : 'translateY(16px)',
                  transitionDelay: `${i * 50}ms`,
                  width: '80px'
                }}>
                
                  <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-1.5 shadow-sm"
                  style={{ background: '#fff', border: '1px solid #E5E7EB' }}>
                  
                    {mod.icon}
                  </div>
                  <div className="text-center text-xs font-bold leading-tight" style={{ color: '#0F1E3C', whiteSpace: 'pre-line', fontSize: '10px' }}>
                    {mod.label}
                  </div>
                  <div className="text-center leading-tight mt-0.5" style={{ color: '#9CA3AF', whiteSpace: 'pre-line', fontSize: '8px' }}>
                    {mod.desc}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom quote */}
            <div className="mt-6 pt-4" style={{ borderTop: '1px solid rgba(15,30,60,0.15)' }}>
              <div className="text-sm font-bold" style={{ color: '#0F1E3C' }}>NSRIT</div>
              <div className="text-xs tracking-widest uppercase" style={{ color: '#6B7280' }}>EMPOWERING MINDS. BUILDING TOMORROWS.</div>
            </div>
          </div>

          {/* RIGHT PANEL — NSRIT info */}
          <div
            ref={rightPanelRef}
            className="absolute right-0 top-0 bottom-0 will-change-transform"
            style={{ width: '32%', paddingTop: '72px', paddingRight: '32px', paddingLeft: '16px', paddingBottom: '24px' }}>
            
            {/* NSRIT header */}
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0" style={{ background: '#0F1E3C' }}>
                🎓
              </div>
              <div>
                <div className="font-black text-lg" style={{ color: '#0F1E3C' }}>NSRIT</div>
                <div className="text-xs font-bold" style={{ color: '#374151' }}>NADIMPALLI SATYANARAYANA RAJU</div>
                <div className="text-xs font-bold" style={{ color: '#374151' }}>INSTITUTE OF TECHNOLOGY</div>
              </div>
            </div>

            <div className="mb-4" style={{ borderTop: '2px solid #0F1E3C', paddingTop: '12px' }}>
              <div className="text-sm italic font-medium leading-relaxed" style={{ color: '#374151', fontFamily: 'Georgia, serif' }}>
                &ldquo;Technology for Education.<br />Opportunities for Everyone.&rdquo;
              </div>
            </div>

            {/* Campus image */}
            <div className="relative rounded-xl overflow-hidden mb-4" style={{ height: '160px' }}>
              <AppImage
                src="https://img.rocket.new/generatedImages/rocket_gen_img_13634236c-1767003313995.png"
                alt="NSRIT college campus building with modern architecture, green landscaping and clear sky"
                fill
                className="object-cover"
                sizes="400px" />
              
              <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded text-xs font-bold" style={{ background: '#1A56DB', color: '#fff' }}>
                NSRIT
              </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              {[['5000+', 'Students'], ['300+', 'Faculty'], ['50+', 'Departments']].map(([v, l]) =>
              <div key={l} className="text-center">
                  <div className="text-xl font-black" style={{ color: '#0F1E3C' }}>{v}</div>
                  <div className="text-xs" style={{ color: '#6B7280' }}>{l}</div>
                </div>
              )}
            </div>

            <div className="text-sm font-bold" style={{ color: '#0F1E3C' }}>A Smarter Campus</div>
            <div className="text-sm font-bold" style={{ color: '#374151' }}>A Brighter Tomorrow.</div>

            {/* Scroll hint */}
            <div className="absolute bottom-8 right-0 flex items-center gap-2">
              <div className="text-xs font-medium" style={{ color: '#6B7280' }}>Scroll to right wall →</div>
              <div className="w-5 h-8 rounded-full border flex items-start justify-center pt-1" style={{ borderColor: '#9CA3AF' }}>
                <div className="w-0.5 h-1.5 rounded-full" style={{ background: '#6B7280', animation: 'scrollBounce 1.5s ease-in-out infinite' }} />
              </div>
            </div>
          </div>

          {/* Bottom tagline */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center z-10">
            <div className="text-xs font-medium" style={{ color: 'rgba(15,30,60,0.4)' }}>
              One Campus. One Platform. A Smarter Tomorrow.
            </div>
          </div>
        </div>

        {/* Scroll to continue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-30">
          <div className="w-6 h-9 rounded-full border-2 flex items-start justify-center pt-1.5" style={{ borderColor: 'rgba(15,30,60,0.3)' }}>
            <div className="w-1 h-2 rounded-full" style={{ background: '#0F1E3C', animation: 'scrollBounce 1.5s ease-in-out infinite' }} />
          </div>
          <span className="text-xs font-medium tracking-widest uppercase" style={{ color: 'rgba(15,30,60,0.4)' }}>
            Scroll to continue
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
