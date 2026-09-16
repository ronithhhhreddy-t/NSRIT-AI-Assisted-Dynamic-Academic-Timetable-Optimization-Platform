'use client';
import React, { useEffect, useRef } from 'react';
import AppImage from '@/components/ui/AppImage';

export default function CabinHero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const laptopRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const nsritBrandRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      const progress = Math.min(scrollY / (vh * 1.2), 1);

      if (bgRef?.current) {
        bgRef.current.style.transform = `translateY(${scrollY * 0.25}px) scale(${1 + progress * 0.08})`;
        bgRef.current.style.filter = `blur(${progress * 8}px) brightness(${1 - progress * 0.2})`;
      }
      if (laptopRef?.current) {
        const scale = 1 + progress * 0.5;
        laptopRef.current.style.transform = `perspective(1400px) translateZ(${progress * 100}px) scale(${scale})`;
        laptopRef.current.style.opacity = String(Math.max(0, 1 - progress * 1.8));
      }
      if (heroTextRef?.current) {
        heroTextRef.current.style.opacity = String(Math.max(0, 1 - progress * 2.2));
        heroTextRef.current.style.transform = `translateY(${-progress * 50}px)`;
      }
      if (scrollIndicatorRef?.current) {
        scrollIndicatorRef.current.style.opacity = String(Math.max(0, 1 - progress * 5));
      }
      if (nsritBrandRef?.current) {
        nsritBrandRef.current.style.opacity = String(Math.max(0, 1 - progress * 2.5));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative overflow-hidden"
      style={{ minHeight: '200vh' }}>
      
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Background — warm cabin interior */}
        <div ref={bgRef} className="absolute inset-0 will-change-transform">
          <AppImage
            src="https://images.unsplash.com/photo-1650665930712-d9f9eb576915"
            alt="Warm sunlit college office interior with wooden desk, large window overlooking campus, morning light"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw" />
          
          {/* Warm overlay */}
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(248,244,235,0.85) 0%, rgba(240,235,220,0.6) 40%, rgba(220,230,245,0.3) 100%)' }} />
          {/* Left fade for text readability */}
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(248,244,235,0.92) 0%, rgba(248,244,235,0.7) 35%, rgba(248,244,235,0.1) 60%, transparent 100%)' }} />
        </div>

        {/* NSRIT branding — top right */}
        <div
          ref={nsritBrandRef}
          className="absolute top-24 right-8 text-right will-change-transform z-20"
          style={{ paddingTop: '80px' }}>
          
          <div className="text-xs font-bold tracking-widest text-gray-700 uppercase leading-relaxed">
            NADIMPALLI<br />
            SATYANARAYANA RAJU<br />
            INSTITUTE OF TECHNOLOGY
          </div>
          <div className="mt-3 border-t border-gray-400 pt-3">
            <div className="text-xs text-gray-500 leading-relaxed">
              Education<br />
              Empowers<br />
              Better Tomorrows
            </div>
          </div>
        </div>

        {/* Bottom left branding */}
        <div className="absolute bottom-8 left-8 z-20">
          <div className="text-xs font-bold tracking-widest text-gray-600 uppercase leading-relaxed">
            TECHNOLOGY<br />
            FOR A BRIGHTER<br />
            CAMPUS TOMORROW
          </div>
        </div>

        {/* Bottom right tagline */}
        <div className="absolute bottom-8 right-8 z-20 text-right">
          <div className="text-xs text-gray-500 leading-relaxed">
            Built for Students,<br />
            Empowering Educators,<br />
            Driving Better Institutions.
          </div>
        </div>

        {/* Hero text — LEFT side */}
        <div
          ref={heroTextRef}
          className="absolute inset-0 flex items-center will-change-transform z-10"
          style={{ paddingTop: '80px' }}>
          
          <div className="w-full max-w-7xl mx-auto px-6 lg:px-12">
            <div className="max-w-lg">
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 mb-6">
                <span
                  className="text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full border"
                  style={{ background: 'rgba(255,255,255,0.7)', borderColor: 'rgba(15,30,60,0.2)', color: '#0F1E3C', backdropFilter: 'blur(8px)' }}>
                  
                  LENDI ERP / NSRIT
                </span>
              </div>

              {/* Main heading */}
              <h1
                className="font-black leading-none mb-6"
                style={{ fontSize: 'clamp(52px, 7vw, 96px)', color: '#0F1E3C', letterSpacing: '-0.02em' }}>
                
                RUN YOUR<br />
                CAMPUS.<br />
                <span style={{ color: '#1A56DB' }}>SMARTER.</span>
              </h1>

              {/* Subtext */}
              <p className="text-base font-medium mb-8 max-w-sm leading-relaxed" style={{ color: '#374151' }}>
                One connected ERP for academics,<br />
                administration, and campus operations.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 mb-10">
                <a
                  href="#features"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm text-white transition-all hover:opacity-90"
                  style={{ background: '#0F1E3C' }}>
                  
                  Explore LENDI ERP
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
                <button className="inline-flex items-center gap-2 text-sm font-medium" style={{ color: '#374151' }}>
                  <span className="w-8 h-8 rounded-full border-2 flex items-center justify-center" style={{ borderColor: '#374151' }}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                  Watch the story
                </button>
              </div>

              {/* Quick features row */}
              <div className="flex flex-wrap gap-6">
                {[
                { label: 'TIMETABLE', sub: 'Automated & conflict-free' },
                { label: 'ATTENDANCE', sub: 'Real-time tracking' },
                { label: 'EXAM MANAGEMENT', sub: 'Simpler. Smarter.' }]?.
                map((f) =>
                <div key={f?.label} className="flex items-start gap-2">
                    <div className="w-4 h-4 mt-0.5 rounded border flex items-center justify-center shrink-0" style={{ borderColor: '#9CA3AF' }}>
                      <div className="w-1.5 h-1.5 rounded-sm" style={{ background: '#1A56DB' }} />
                    </div>
                    <div>
                      <div className="text-xs font-bold tracking-wider uppercase" style={{ color: '#0F1E3C' }}>{f?.label}</div>
                      <div className="text-xs" style={{ color: '#6B7280' }}>{f?.sub}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Laptop with ERP dashboard — RIGHT side */}
        <div
          ref={laptopRef}
          className="absolute will-change-transform z-10"
          style={{
            right: '2%',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '58%',
            maxWidth: '860px'
          }}>
          
          {/* Laptop screen */}
          <div
            className="relative rounded-t-2xl overflow-hidden shadow-2xl"
            style={{
              background: '#1a1a2e',
              border: '2px solid #2d2d4e',
              aspectRatio: '16/10'
            }}>
            
            {/* Screen bezel top */}
            <div className="absolute top-0 left-0 right-0 h-6 flex items-center justify-center" style={{ background: '#111' }}>
              <div className="w-2 h-2 rounded-full" style={{ background: '#333' }} />
            </div>

            {/* ERP Dashboard UI */}
            <div className="absolute inset-0 flex" style={{ paddingTop: '24px', background: '#F8FAFC' }}>
              {/* Top bar */}
              <div className="absolute top-6 left-0 right-0 h-10 flex items-center justify-between px-4" style={{ background: '#fff', borderBottom: '1px solid #E5E7EB' }}>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded" style={{ background: '#1A56DB' }} />
                  <span className="text-xs font-bold" style={{ color: '#0F1E3C' }}>LENDI ERP</span>
                </div>
                <div className="flex-1 mx-4">
                  <div className="rounded-full px-3 py-1 text-xs" style={{ background: '#F3F4F6', color: '#9CA3AF' }}>
                    Search students, faculty, subjects...
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full" style={{ background: '#E5E7EB' }} />
                  <div className="text-xs font-semibold" style={{ color: '#0F1E3C' }}>Dr. R. Kumar</div>
                  <div className="text-xs" style={{ color: '#6B7280' }}>Administrator</div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="absolute left-0 top-16 bottom-0 w-32 flex flex-col" style={{ background: '#fff', borderRight: '1px solid #E5E7EB' }}>
                {[
                { label: 'Dashboard', active: true },
                { label: 'Students', active: false },
                { label: 'Academics', active: false },
                { label: 'Attendance', active: false },
                { label: 'Timetable', active: false },
                { label: 'Examinations', active: false },
                { label: 'Fees', active: false },
                { label: 'Results', active: false },
                { label: 'Library', active: false },
                { label: 'Hostel', active: false },
                { label: 'Communication', active: false },
                { label: 'Reports', active: false },
                { label: 'Settings', active: false }]?.
                map((item) =>
                <div
                  key={item?.label}
                  className="px-3 py-1.5 text-xs font-medium flex items-center gap-2"
                  style={{
                    background: item?.active ? '#EBF5FF' : 'transparent',
                    color: item?.active ? '#1A56DB' : '#6B7280',
                    borderRight: item?.active ? '2px solid #1A56DB' : '2px solid transparent'
                  }}>
                  
                    <div className="w-3 h-3 rounded-sm" style={{ background: item?.active ? '#1A56DB' : '#D1D5DB' }} />
                    {item?.label}
                  </div>
                )}
              </div>

              {/* Main content */}
              <div className="absolute left-32 top-16 right-0 bottom-0 p-3 overflow-hidden" style={{ background: '#F8FAFC' }}>
                {/* Greeting */}
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="text-sm font-bold" style={{ color: '#0F1E3C' }}>Good Morning,</div>
                    <div className="text-sm font-bold" style={{ color: '#0F1E3C' }}>Dr. R. Kumar</div>
                    <div className="text-xs" style={{ color: '#9CA3AF' }}>Here&apos;s what&apos;s happening at NSRIT today.</div>
                  </div>
                  <div className="text-xs" style={{ color: '#9CA3AF' }}>Mon, 5 Jan 2026</div>
                </div>

                {/* Metrics row */}
                <div className="grid grid-cols-4 gap-2 mb-3">
                  {[
                  { val: '5,248', label: 'Students', change: '+12%', color: '#3B82F6', icon: '👥' },
                  { val: '186', label: 'Faculty', change: '+4%', color: '#10B981', icon: '👨‍🏫' },
                  { val: '28', label: 'Departments', change: '', color: '#F59E0B', icon: '🏛️' },
                  { val: '12', label: 'Ongoing Exams', change: '', color: '#EF4444', icon: '📝' }]?.
                  map((m) =>
                  <div key={m?.label} className="rounded-lg p-2" style={{ background: '#fff', border: '1px solid #E5E7EB' }}>
                      <div className="text-base mb-0.5">{m?.icon}</div>
                      <div className="text-sm font-bold" style={{ color: '#0F1E3C' }}>{m?.val}</div>
                      <div className="text-xs" style={{ color: '#9CA3AF' }}>{m?.label}</div>
                      {m?.change && <div className="text-xs font-semibold" style={{ color: '#10B981' }}>{m?.change}</div>}
                    </div>
                  )}
                </div>

                {/* Two column layout */}
                <div className="grid grid-cols-2 gap-2">
                  {/* Today's timetable */}
                  <div className="rounded-lg p-2" style={{ background: '#fff', border: '1px solid #E5E7EB' }}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-xs font-bold" style={{ color: '#0F1E3C' }}>Today&apos;s Timetable</div>
                      <div className="text-xs" style={{ color: '#1A56DB' }}>View All →</div>
                    </div>
                    <div className="space-y-1">
                      {[
                      ['09:00', 'Data Structures', 'Dr. S. Meena', 'CSE-204'],
                      ['10:00', 'Operating Systems', 'Dr. V. Rajesh', 'CSE-206'],
                      ['11:00', 'Database Management', 'Dr. L. Priya', 'CSE-201'],
                      ['01:00', 'Computer Networks', 'Dr. M. Arvind', 'CSE-203']]?.
                      map(([time, sub, fac, room]) =>
                      <div key={time} className="grid text-xs py-0.5" style={{ gridTemplateColumns: '2fr 3fr 3fr 2fr', color: '#6B7280', borderBottom: '1px solid #F3F4F6' }}>
                          <span style={{ color: '#1A56DB' }}>{time}</span>
                          <span style={{ color: '#374151' }}>{sub}</span>
                          <span>{fac}</span>
                          <span>{room}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Attendance overview */}
                  <div className="rounded-lg p-2" style={{ background: '#fff', border: '1px solid #E5E7EB' }}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-xs font-bold" style={{ color: '#0F1E3C' }}>Attendance Overview</div>
                      <div className="text-xs" style={{ color: '#1A56DB' }}>This Week →</div>
                    </div>
                    <div className="flex items-center gap-3">
                      {/* Ring */}
                      <div className="relative w-14 h-14 shrink-0">
                        <svg viewBox="0 0 56 56" className="w-full h-full -rotate-90">
                          <circle cx="28" cy="28" r="22" fill="none" stroke="#E5E7EB" strokeWidth="5" />
                          <circle cx="28" cy="28" r="22" fill="none" stroke="#10B981" strokeWidth="5" strokeDasharray={`${2 * Math.PI * 22 * 0.78} ${2 * Math.PI * 22}`} strokeLinecap="round" />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <div className="text-xs font-bold" style={{ color: '#0F1E3C' }}>78%</div>
                          <div className="text-xs" style={{ color: '#9CA3AF', fontSize: '8px' }}>Overall</div>
                        </div>
                      </div>
                      {/* Bar chart */}
                      <div className="flex items-end gap-1 h-10">
                        {[60, 75, 80, 70, 85, 78]?.map((h, i) =>
                        <div key={i} className="w-3 rounded-t" style={{ height: `${h}%`, background: i === 5 ? '#1A56DB' : '#BFDBFE' }} />
                        )}
                      </div>
                    </div>
                    <div className="text-xs mt-1" style={{ color: '#10B981' }}>↑ 6% from last week</div>
                  </div>
                </div>

                {/* Quick actions */}
                <div className="mt-2 rounded-lg p-2" style={{ background: '#fff', border: '1px solid #E5E7EB' }}>
                  <div className="text-xs font-bold mb-2" style={{ color: '#0F1E3C' }}>Quick Actions</div>
                  <div className="grid grid-cols-4 gap-2">
                    {[
                    { label: 'Generate Timetable', color: '#EBF5FF', icon: '📅' },
                    { label: 'Mark Attendance', color: '#ECFDF5', icon: '✓' },
                    { label: 'Create Exam', color: '#FFF7ED', icon: '📝' },
                    { label: 'View Reports', color: '#F5F3FF', icon: '📊' }]?.
                    map((a) =>
                    <div key={a?.label} className="rounded-lg p-2 text-center" style={{ background: a?.color }}>
                        <div className="text-base mb-1">{a?.icon}</div>
                        <div className="text-xs font-medium" style={{ color: '#374151', fontSize: '9px' }}>{a?.label}</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Laptop base */}
          <div className="mx-auto rounded-b-lg" style={{ height: '14px', width: '92%', background: 'linear-gradient(to bottom, #C8C8C8, #A8A8A8)' }} />
          <div className="mx-auto rounded-b-xl" style={{ height: '6px', width: '55%', background: '#9CA3AF' }} />
        </div>

        {/* Books on desk — bottom left decorative */}
        <div className="absolute bottom-0 left-0 z-10" style={{ width: '28%', height: '35%' }}>
          <div className="absolute bottom-0 left-8 flex flex-col gap-1">
            {[
            { title: 'Ideas', sub: 'Build Better Campuses', color: '#1a1a2e' },
            { title: 'Technology', sub: 'Empowers Education', color: '#1a2a4a' },
            { title: 'People', sub: 'Create Brighter Tomorrows', color: '#0f1e3c' }]?.
            map((book) =>
            <div
              key={book?.title}
              className="px-4 py-2 rounded-sm"
              style={{ background: book?.color, minWidth: '160px' }}>
              
                <div className="text-xs font-bold" style={{ color: '#fff' }}>{book?.title}</div>
                <div className="text-xs" style={{ color: 'rgba(255,255,255,0.6)' }}>{book?.sub}</div>
              </div>
            )}
          </div>
        </div>

        {/* NSRIT mug — bottom right decorative */}
        <div className="absolute bottom-4 right-4 z-10 hidden lg:block">
          <div
            className="w-16 h-20 rounded-b-xl flex flex-col items-center justify-center"
            style={{ background: '#1a1a2e', border: '2px solid #2d2d4e' }}>
            
            <div className="text-xs font-bold text-center leading-tight" style={{ color: 'rgba(255,255,255,0.8)', fontSize: '8px' }}>
              Good<br />Education<br />Greater<br />Possibilities
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          ref={scrollIndicatorRef}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20 will-change-transform">
          
          {/* Mouse icon */}
          <div
            className="w-6 h-9 rounded-full border-2 flex items-start justify-center pt-1.5"
            style={{ borderColor: 'rgba(15,30,60,0.4)' }}>
            
            <div
              className="w-1 h-2 rounded-full"
              style={{
                background: '#0F1E3C',
                animation: 'scrollBounce 1.5s ease-in-out infinite'
              }} />
            
          </div>
          <span className="text-xs font-medium tracking-widest uppercase" style={{ color: 'rgba(15,30,60,0.5)' }}>
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