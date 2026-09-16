'use client';
import React, { useEffect, useRef, useState } from 'react';
import AppImage from '@/components/ui/AppImage';

const moduleIcons = [
{ label: 'Admissions', icon: '👤' },
{ label: 'Academics', icon: '📚' },
{ label: 'Attendance', icon: '✓' },
{ label: 'Timetable', icon: '📅' },
{ label: 'Examinations', icon: '📝' },
{ label: 'Fees', icon: '₹' },
{ label: 'Library', icon: '📖' },
{ label: 'Hostel', icon: '🏠' },
{ label: 'Reports', icon: '📊' }];


export default function CorridorScene() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const laptopZoomRef = useRef<HTMLDivElement>(null);
  const corridorRef = useRef<HTMLDivElement>(null);
  const leftWallTextRef = useRef<HTMLDivElement>(null);
  const rightWallTextRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<'laptop' | 'corridor'>('laptop');

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, -rect.top / (rect.height - window.innerHeight)));

      // Phase 1 (0–0.35): Laptop zooms to fill screen
      // Phase 2 (0.35–1.0): Corridor scene with walls
      const laptopProgress = Math.min(1, progress / 0.35);
      const corridorProgress = Math.max(0, (progress - 0.35) / 0.65);

      setPhase(progress < 0.35 ? 'laptop' : 'corridor');

      if (laptopZoomRef.current) {
        const scale = 1 + laptopProgress * 2.5;
        const opacity = progress < 0.45 ? 1 : Math.max(0, 1 - (progress - 0.45) / 0.15);
        laptopZoomRef.current.style.transform = `scale(${scale}) translateY(${-laptopProgress * 8}%)`;
        laptopZoomRef.current.style.opacity = String(opacity);
      }

      if (corridorRef.current) {
        const corridorOpacity = Math.min(1, corridorProgress * 3);
        const corridorScale = 1 + corridorProgress * 0.08;
        corridorRef.current.style.opacity = String(corridorOpacity);
        corridorRef.current.style.transform = `scale(${corridorScale})`;
      }

      if (leftWallTextRef.current) {
        const textProgress = Math.min(1, Math.max(0, (progress - 0.4) / 0.3));
        leftWallTextRef.current.style.opacity = String(textProgress);
        leftWallTextRef.current.style.transform = `translateY(${(1 - textProgress) * 30}px)`;
      }

      if (rightWallTextRef.current) {
        const textProgress = Math.min(1, Math.max(0, (progress - 0.45) / 0.3));
        rightWallTextRef.current.style.opacity = String(textProgress);
      }

      if (scrollHintRef.current) {
        const hintOpacity = progress > 0.1 && progress < 0.9 ? 1 : 0;
        scrollHintRef.current.style.opacity = String(hintOpacity);
        scrollHintRef.current.innerHTML = progress < 0.35 ?
        '<span>Scroll to step inside</span>' : '<span>Scroll to continue</span>';
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="platform"
      className="relative"
      style={{ minHeight: '300vh' }}>
      
      <div className="sticky top-0 h-screen overflow-hidden" style={{ background: '#0F1E3C' }}>

        {/* ── LAPTOP ZOOM LAYER ── */}
        <div
          ref={laptopZoomRef}
          className="absolute inset-0 flex items-center justify-center will-change-transform z-10"
          style={{ background: 'linear-gradient(180deg, #0F1E3C 0%, #1a2a4a 100%)' }}>
          
          {/* Left text */}
          <div className="absolute left-8 top-1/2 -translate-y-1/2 z-20">
            <div className="text-xs font-bold tracking-widest mb-2" style={{ color: 'rgba(255,255,255,0.4)' }}>01</div>
            <div className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>The Start</div>
            <div className="mt-6 space-y-1">
              {['From a', 'Single Screen', 'to a Smarter', 'Tomorrow.'].map((line, i) =>
              <div key={i} className={`font-bold leading-tight ${i === 0 ? 'text-sm' : i === 1 || i === 2 ? 'text-xl' : 'text-base'}`} style={{ color: i === 0 ? 'rgba(255,255,255,0.5)' : '#fff' }}>
                  {line}
                </div>
              )}
              <div className="mt-3 text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>LENDI ERP<br />NSRIT</div>
            </div>
            <div className="mt-8 space-y-1">
              {['Ideas', 'Schedules', 'Students', 'Brighter', 'Tomorrows.'].map((w) =>
              <div key={w} className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.3)' }}>{w}</div>
              )}
            </div>
          </div>

          {/* Laptop */}
          <div className="relative" style={{ width: '65%', maxWidth: '900px' }}>
            {/* Screen */}
            <div
              className="relative rounded-t-2xl overflow-hidden shadow-2xl"
              style={{ background: '#0a0a1a', border: '3px solid #2d2d4e', aspectRatio: '16/10' }}>
              
              {/* Camera dot */}
              <div className="absolute top-0 left-0 right-0 h-5 flex items-center justify-center" style={{ background: '#111' }}>
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#333' }} />
              </div>

              {/* Dashboard */}
              <div className="absolute inset-0 flex" style={{ paddingTop: '20px', background: '#F8FAFC' }}>
                {/* Top bar */}
                <div className="absolute top-5 left-0 right-0 h-9 flex items-center justify-between px-3" style={{ background: '#fff', borderBottom: '1px solid #E5E7EB' }}>
                  <div className="flex items-center gap-1.5">
                    <div className="w-4 h-4 rounded" style={{ background: '#1A56DB' }} />
                    <span className="text-xs font-bold" style={{ color: '#0F1E3C' }}>LENDI ERP</span>
                  </div>
                  <div className="flex-1 mx-3">
                    <div className="rounded-full px-2 py-0.5 text-xs" style={{ background: '#F3F4F6', color: '#9CA3AF' }}>
                      Search students, faculty, modules...
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-5 h-5 rounded-full" style={{ background: '#E5E7EB' }} />
                    <div className="text-xs font-semibold" style={{ color: '#0F1E3C' }}>Dr. R. Kumar</div>
                    <div className="text-xs" style={{ color: '#6B7280' }}>Administrator</div>
                  </div>
                </div>

                {/* Sidebar */}
                <div className="absolute left-0 top-14 bottom-0 w-28" style={{ background: '#fff', borderRight: '1px solid #E5E7EB' }}>
                  {['Dashboard', 'Students', 'Academics', 'Attendance', 'Timetable', 'Examinations', 'Fees', 'Library', 'Hostel', 'Communication', 'Reports', 'Settings'].map((item, i) =>
                  <div
                    key={item}
                    className="px-2 py-1 text-xs flex items-center gap-1.5"
                    style={{
                      background: i === 0 ? '#EBF5FF' : 'transparent',
                      color: i === 0 ? '#1A56DB' : '#6B7280',
                      borderRight: i === 0 ? '2px solid #1A56DB' : '2px solid transparent'
                    }}>
                    
                      <div className="w-2.5 h-2.5 rounded-sm" style={{ background: i === 0 ? '#1A56DB' : '#D1D5DB' }} />
                      {item}
                    </div>
                  )}
                </div>

                {/* Main */}
                <div className="absolute left-28 top-14 right-0 bottom-0 p-2.5" style={{ background: '#F8FAFC' }}>
                  <div className="flex justify-between mb-2">
                    <div>
                      <div className="text-xs font-bold" style={{ color: '#0F1E3C' }}>Good Morning,</div>
                      <div className="text-xs font-bold" style={{ color: '#0F1E3C' }}>Dr. R. Kumar</div>
                      <div className="text-xs" style={{ color: '#9CA3AF', fontSize: '9px' }}>Here&apos;s what&apos;s happening at NSRIT today.</div>
                    </div>
                    <div className="text-xs" style={{ color: '#9CA3AF', fontSize: '9px' }}>Mon, 5 Jan 2026</div>
                  </div>
                  <div className="grid grid-cols-4 gap-1.5 mb-2">
                    {[['5,248', 'Students', '👥'], ['186', 'Faculty', '👨‍🏫'], ['28', 'Departments', '🏛️'], ['12', 'Ongoing Exams', '📝']].map(([v, l, ic]) =>
                    <div key={l} className="rounded-lg p-1.5" style={{ background: '#fff', border: '1px solid #E5E7EB' }}>
                        <div className="text-sm">{ic}</div>
                        <div className="text-xs font-bold" style={{ color: '#0F1E3C' }}>{v}</div>
                        <div style={{ color: '#9CA3AF', fontSize: '8px' }}>{l}</div>
                      </div>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-1.5">
                    <div className="rounded-lg p-2" style={{ background: '#fff', border: '1px solid #E5E7EB' }}>
                      <div className="text-xs font-bold mb-1" style={{ color: '#0F1E3C' }}>Today&apos;s Schedule</div>
                      {[['09:00', 'Data Structures', 'Dr. S. Meena', 'CSE-204'], ['10:00', 'Operating Systems', 'Dr. V. Rajesh', 'CSE-206'], ['11:00', 'Database Management', 'Dr. L. Priya', 'CSE-201'], ['12:00', 'Computer Networks', 'Dr. M. Arvind', 'CSE-203']].map(([t, s, f, r]) =>
                      <div key={t} className="grid text-xs py-0.5" style={{ gridTemplateColumns: '2fr 3fr 3fr 2fr', color: '#6B7280', borderBottom: '1px solid #F3F4F6', fontSize: '8px' }}>
                          <span style={{ color: '#1A56DB' }}>{t}</span>
                          <span style={{ color: '#374151' }}>{s}</span>
                          <span>{f}</span>
                          <span>{r}</span>
                        </div>
                      )}
                    </div>
                    <div className="rounded-lg p-2" style={{ background: '#fff', border: '1px solid #E5E7EB' }}>
                      <div className="text-xs font-bold mb-1" style={{ color: '#0F1E3C' }}>Attendance Overview</div>
                      <div className="flex items-center gap-2">
                        <div className="relative w-12 h-12 shrink-0">
                          <svg viewBox="0 0 48 48" className="w-full h-full -rotate-90">
                            <circle cx="24" cy="24" r="18" fill="none" stroke="#E5E7EB" strokeWidth="4" />
                            <circle cx="24" cy="24" r="18" fill="none" stroke="#10B981" strokeWidth="4" strokeDasharray={`${2 * Math.PI * 18 * 0.78} ${2 * Math.PI * 18}`} strokeLinecap="round" />
                          </svg>
                          <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <div className="text-xs font-bold" style={{ color: '#0F1E3C', fontSize: '9px' }}>78%</div>
                          </div>
                        </div>
                        <div className="flex items-end gap-0.5 h-8">
                          {[60, 75, 80, 70, 85, 78].map((h, i) =>
                          <div key={i} className="w-2.5 rounded-t" style={{ height: `${h}%`, background: i === 5 ? '#1A56DB' : '#BFDBFE' }} />
                          )}
                        </div>
                      </div>
                      <div style={{ color: '#10B981', fontSize: '8px' }}>↑ 6% from last week</div>
                    </div>
                  </div>
                  <div className="mt-1.5 rounded-lg p-2" style={{ background: '#fff', border: '1px solid #E5E7EB' }}>
                    <div className="text-xs font-bold mb-1" style={{ color: '#0F1E3C' }}>Quick Actions</div>
                    <div className="grid grid-cols-4 gap-1.5">
                      {[['Generate Timetable', '#EBF5FF', '📅'], ['Mark Attendance', '#ECFDF5', '✓'], ['Create Exam', '#FFF7ED', '📝'], ['View Reports', '#F5F3FF', '📊']].map(([l, c, ic]) =>
                      <div key={l as string} className="rounded-lg p-1.5 text-center" style={{ background: c as string }}>
                          <div className="text-sm">{ic}</div>
                          <div style={{ color: '#374151', fontSize: '7px', fontWeight: 500 }}>{l}</div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Glow at bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-8" style={{ background: 'linear-gradient(to top, rgba(26,86,219,0.3), transparent)' }} />
            </div>

            {/* Laptop base */}
            <div className="mx-auto rounded-b-lg" style={{ height: '12px', width: '92%', background: 'linear-gradient(to bottom, #C0C0C0, #A0A0A0)' }} />
            <div className="mx-auto rounded-b-xl" style={{ height: '5px', width: '55%', background: '#909090' }} />

            {/* Glow under laptop */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-8 rounded-full" style={{ background: 'rgba(26,86,219,0.4)', filter: 'blur(20px)' }} />
          </div>

          {/* Right side text */}
          <div className="absolute right-8 top-1/2 -translate-y-1/2 text-right z-20">
            <div className="text-sm font-light italic" style={{ color: 'rgba(255,255,255,0.6)', fontFamily: 'Georgia, serif' }}>
              Same Campus<br />Greater Possibilities.
            </div>
          </div>

          {/* Bottom corridor preview */}
          <div className="absolute bottom-0 left-0 right-0 overflow-hidden" style={{ height: '35%' }}>
            <AppImage
              src="https://images.unsplash.com/photo-1704983704010-75fc56510e62"
              alt="Modern college corridor with polished floors and ceiling lights"
              fill
              className="object-cover object-top"
              sizes="100vw" />
            
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, #0F1E3C 0%, rgba(15,30,60,0.3) 50%, transparent 100%)' }} />

            {/* Left wall text preview */}
            <div className="absolute left-8 bottom-8 z-10">
              <div className="text-xs font-bold tracking-widest mb-1" style={{ color: 'rgba(255,255,255,0.5)' }}>02</div>
              <div className="text-xs mb-2" style={{ color: 'rgba(255,255,255,0.5)' }}>The Platform</div>
              <div className="text-2xl font-black leading-tight" style={{ color: '#fff' }}>ONE PLATFORM.<br />EVERY CAMPUS<br />PROCESS.</div>
              <p className="text-xs mt-2 max-w-xs" style={{ color: 'rgba(255,255,255,0.6)' }}>
                LENDI ERP simplifies academic and administrative operations, so that education can focus on what truly matters — people.
              </p>
            </div>

            {/* Right wall text preview */}
            <div className="absolute right-8 bottom-8 z-10 text-right">
              <div className="text-xl font-bold" style={{ color: '#fff' }}>NSRIT</div>
              <div className="text-xs" style={{ color: 'rgba(255,255,255,0.6)' }}>NADIMPALLI SATYANARAYANA RAJU<br />INSTITUTE OF TECHNOLOGY</div>
              <div className="mt-2 text-sm italic" style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'Georgia, serif' }}>
                &ldquo;Empowering Education<br />Through Technology.&rdquo;
              </div>
              <div className="mt-3 flex gap-4 justify-end">
                {[['5000+', 'Students'], ['300+', 'Faculty'], ['50+', 'Departments']].map(([v, l]) =>
                <div key={l} className="text-center">
                    <div className="text-sm font-bold" style={{ color: '#fff' }}>{v}</div>
                    <div className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>{l}</div>
                  </div>
                )}
              </div>
            </div>

            {/* Module icons row */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-4 z-10">
              {moduleIcons.map((m) =>
              <div key={m.label} className="flex flex-col items-center gap-1">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}>
                    {m.icon}
                  </div>
                  <div className="text-xs" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '8px' }}>{m.label}</div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── CORRIDOR SCENE LAYER ── */}
        <div
          ref={corridorRef}
          className="absolute inset-0 will-change-transform z-20"
          style={{ opacity: 0 }}>
          
          <AppImage
            src="https://images.unsplash.com/photo-1620410796703-b366fd0fccb2"
            alt="Long symmetrical modern college corridor with polished marble floors, ceiling strip lights, plants, and daylight at the far end with students walking"
            fill
            className="object-cover"
            sizes="100vw" />
          
          {/* Depth overlay */}
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, transparent 30%, rgba(0,0,0,0.2) 100%)' }} />
          {/* Left vignette */}
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.3) 0%, transparent 25%, transparent 75%, rgba(0,0,0,0.3) 100%)' }} />
        </div>

        {/* Scroll hint */}
        <div
          ref={scrollHintRef}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-30 transition-opacity duration-500"
          style={{ opacity: 0 }}>
          
          <div className="w-6 h-9 rounded-full border-2 flex items-start justify-center pt-1.5" style={{ borderColor: 'rgba(255,255,255,0.5)' }}>
            <div className="w-1 h-2 rounded-full" style={{ background: '#fff', animation: 'scrollBounce 1.5s ease-in-out infinite' }} />
          </div>
          <span className="text-xs font-medium tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.6)' }}>
            Scroll to step inside
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
