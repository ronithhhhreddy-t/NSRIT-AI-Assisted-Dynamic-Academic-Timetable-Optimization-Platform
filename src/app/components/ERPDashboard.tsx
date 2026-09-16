'use client';
import React, { useEffect, useRef, useState } from 'react';

const sidebarItems = [
  { icon: '⊞', label: 'Dashboard', active: true },
  { icon: '👥', label: 'Students' },
  { icon: '📚', label: 'Academics' },
  { icon: '✓', label: 'Attendance' },
  { icon: '📅', label: 'Timetable' },
  { icon: '📝', label: 'Examinations' },
  { icon: '₹', label: 'Fees' },
  { icon: '📊', label: 'Results' },
  { icon: '📖', label: 'Library' },
  { icon: '🏠', label: 'Hostel' },
  { icon: '💬', label: 'Communication' },
  { icon: '📈', label: 'Reports' },
  { icon: '⚙', label: 'Settings' },
];

const metrics = [
  { value: '2,847', label: 'Students', color: 'bg-primary/20 text-primary' },
  { value: '148', label: 'Faculty', color: 'bg-accent/20 text-accent' },
  { value: '12', label: 'Departments', color: 'bg-green-500/20 text-green-400' },
  { value: '3', label: 'Ongoing Exams', color: 'bg-purple-500/20 text-purple-400' },
];

const timetableToday = [
  { time: '9:00 AM', subject: 'Data Structures', faculty: 'Dr. K. Rao', room: 'B-201' },
  { time: '10:00 AM', subject: 'Database Systems', faculty: 'Prof. S. Sharma', room: 'A-105' },
  { time: '11:00 AM', subject: 'Computer Networks', faculty: 'Dr. P. Reddy', room: 'C-301' },
  { time: '2:00 PM', subject: 'Software Engineering', faculty: 'Prof. M. Patel', room: 'B-202' },
];

const quickActions = [
  { label: 'Generate Timetable', icon: '📅', color: 'bg-primary' },
  { label: 'Mark Attendance', icon: '✓', color: 'bg-green-600' },
  { label: 'Create Exam', icon: '📝', color: 'bg-orange-600' },
  { label: 'View Reports', icon: '📈', color: 'bg-purple-600' },
];

export default function ERPDashboard() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const dashboardRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef?.current) observer?.observe(sectionRef?.current);
    return () => observer?.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef?.current || !dashboardRef?.current) return;
      const rect = sectionRef?.current?.getBoundingClientRect();
      const sectionProgress = Math.max(0, Math.min(1, -rect?.top / (rect?.height - window.innerHeight)));

      // Scale up at start, scale out at end
      const enterProgress = Math.min(1, sectionProgress * 3);
      const exitProgress = Math.max(0, (sectionProgress - 0.7) / 0.3);

      const scale = 0.85 + enterProgress * 0.15 - exitProgress * 0.1;
      const opacity = enterProgress - exitProgress;
      const blur = exitProgress * 8;

      dashboardRef.current.style.transform = `scale(${scale})`;
      dashboardRef.current.style.opacity = String(Math.max(0, opacity));
      dashboardRef.current.style.filter = `blur(${blur}px)`;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="features"
      className="relative scene-dark"
      style={{ minHeight: '200vh' }}
    >
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 ambient-glow-blue" />

        <div
          ref={dashboardRef}
          className="relative w-full max-w-6xl mx-auto px-4 opacity-0 will-change-transform"
          style={{ transform: 'scale(0.85)' }}
        >
          <div className={`glass-dark rounded-2xl overflow-hidden shadow-2xl transition-all duration-1000 ${visible ? 'opacity-100' : 'opacity-0'}`} style={{ minHeight: '75vh' }}>
            <div className="flex h-full" style={{ minHeight: '75vh' }}>
              {/* Sidebar */}
              <div className="w-56 bg-secondary/80 border-r border-white/5 flex flex-col py-4 hidden md:flex">
                <div className="px-4 mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center text-white text-xs font-bold">L</div>
                    <span className="text-white font-bold text-sm">LendiERP</span>
                  </div>
                </div>
                <div className="flex-1 overflow-hidden">
                  {sidebarItems?.map((item, i) => (
                    <div
                      key={item?.label}
                      className={`flex items-center gap-3 px-4 py-2.5 text-sm cursor-pointer transition-colors ${
                        item?.active ? 'bg-primary/20 text-white border-r-2 border-primary' : 'text-white/40 hover:text-white/70 hover:bg-white/5'
                      }`}
                      style={{ transitionDelay: visible ? `${i * 30}ms` : '0ms' }}
                    >
                      <span className="text-base w-5 text-center">{item?.icon}</span>
                      <span className="font-medium">{item?.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Main content */}
              <div className="flex-1 p-6 overflow-hidden">
                <div className="mb-6">
                  <h2 className="text-white text-xl font-bold">Good Morning, Administrator</h2>
                  <p className="text-white/40 text-sm mt-1">Tuesday, 16 September 2026 · NSRIT Campus</p>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  {metrics?.map((m, i) => (
                    <div
                      key={m?.label}
                      className={`rounded-xl p-4 ${m?.color} bg-white/5 border border-white/8 transition-all duration-700`}
                      style={{ transitionDelay: visible ? `${200 + i * 80}ms` : '0ms', opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)' }}
                    >
                      <div className="text-2xl font-bold">{m?.value}</div>
                      <div className="text-xs font-medium opacity-70 mt-1">{m?.label}</div>
                    </div>
                  ))}
                </div>

                <div className="grid lg:grid-cols-3 gap-4">
                  {/* Timetable */}
                  <div className="lg:col-span-2 bg-white/5 rounded-xl p-4 border border-white/8">
                    <div className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-3">Today&apos;s Timetable</div>
                    <div className="space-y-2">
                      {timetableToday?.map((row, i) => (
                        <div
                          key={row?.time}
                          className="flex items-center gap-3 py-2 border-b border-white/5 text-sm"
                          style={{ transitionDelay: visible ? `${400 + i * 60}ms` : '0ms', opacity: visible ? 1 : 0, transition: 'opacity 0.5s ease' }}
                        >
                          <span className="text-accent text-xs font-mono w-20 shrink-0">{row?.time}</span>
                          <span className="text-white flex-1 font-medium text-xs">{row?.subject}</span>
                          <span className="text-white/40 text-xs hidden md:block">{row?.faculty}</span>
                          <span className="text-white/30 text-xs font-mono">{row?.room}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Attendance ring + Quick actions */}
                  <div className="flex flex-col gap-4">
                    <div className="bg-white/5 rounded-xl p-4 border border-white/8 flex-1">
                      <div className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-3">Attendance Today</div>
                      <div className="flex items-center gap-4">
                        <div className="relative w-16 h-16">
                          <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                            <circle cx="18" cy="18" r="15.9" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="3" />
                            <circle cx="18" cy="18" r="15.9" fill="none" stroke="#2D7DD2" strokeWidth="3"
                              strokeDasharray={`${87 * 1.005} 100`} strokeLinecap="round" />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold">87%</div>
                        </div>
                        <div className="text-xs space-y-1">
                          <div className="flex gap-2"><span className="text-green-400">●</span><span className="text-white/60">Present: 2,476</span></div>
                          <div className="flex gap-2"><span className="text-red-400">●</span><span className="text-white/60">Absent: 371</span></div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white/5 rounded-xl p-3 border border-white/8">
                      <div className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-2">Quick Actions</div>
                      <div className="grid grid-cols-2 gap-2">
                        {quickActions?.map((a) => (
                          <button key={a?.label} className={`${a?.color} rounded-lg p-2 text-white text-[9px] font-semibold text-center leading-tight hover:opacity-90 transition-opacity`}>
                            {a?.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section label */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-center">
          <div className="eyebrow text-white/30 mb-2">Scroll to enter</div>
          <div className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent mx-auto" />
        </div>
      </div>
    </section>
  );
}