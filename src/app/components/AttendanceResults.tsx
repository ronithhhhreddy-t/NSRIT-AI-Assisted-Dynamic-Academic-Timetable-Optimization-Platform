'use client';
import React, { useEffect, useRef, useState } from 'react';

const classData = [
  { name: 'CSE-A', present: 58, total: 65, pct: 89 },
  { name: 'CSE-B', present: 54, total: 62, pct: 87 },
  { name: 'ECE-A', present: 61, total: 68, pct: 90 },
  { name: 'MECH', present: 47, total: 60, pct: 78 },
  { name: 'CIVIL', present: 52, total: 58, pct: 90 },
];

const subjectResults = [
  { subject: 'Data Structures', pass: 91, avg: 72 },
  { subject: 'Database Systems', pass: 85, avg: 68 },
  { subject: 'Computer Networks', pass: 88, avg: 71 },
  { subject: 'Software Eng.', pass: 94, avg: 76 },
];

export default function AttendanceResults() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [animBars, setAnimBars] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimBars(true); },
      { threshold: 0.2 }
    );
    if (sectionRef?.current) observer?.observe(sectionRef?.current);
    return () => observer?.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 px-6"
      style={{ background: 'linear-gradient(180deg, #071020 0%, #0A1628 100%)' }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Attendance Panel */}
          <div>
            <span className="eyebrow text-accent block mb-4">Attendance Overview</span>
            <h2 className="editorial-md text-white mb-8">REAL-TIME<br /><span className="text-primary">TRACKING.</span></h2>

            {/* Summary metrics */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {[
                { label: 'Total Students', value: '2,847', color: 'text-white' },
                { label: 'Present Today', value: '2,476', color: 'text-green-400' },
                { label: 'Absent Today', value: '371', color: 'text-red-400' },
              ]?.map((m) => (
                <div key={m?.label} className="glass-dark rounded-xl p-4 border border-white/8 text-center">
                  <div className={`text-xl font-bold ${m?.color}`}>{m?.value}</div>
                  <div className="text-white/40 text-xs mt-1">{m?.label}</div>
                </div>
              ))}
            </div>

            {/* Class-wise bars */}
            <div className="glass-dark rounded-xl p-5 border border-white/8">
              <div className="text-white/50 text-xs font-semibold uppercase tracking-wider mb-4">Class-wise Attendance</div>
              <div className="space-y-3">
                {classData?.map((cls, i) => (
                  <div key={cls?.name}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-white/70 font-medium">{cls?.name}</span>
                      <span className="text-white/50">{cls?.present}/{cls?.total}</span>
                      <span className={`font-bold ${cls?.pct >= 85 ? 'text-green-400' : 'text-orange-400'}`}>{cls?.pct}%</span>
                    </div>
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-1000 ${cls?.pct >= 85 ? 'bg-green-500' : 'bg-orange-500'}`}
                        style={{
                          width: animBars ? `${cls?.pct}%` : '0%',
                          transitionDelay: `${i * 120}ms`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Results Panel */}
          <div>
            <span className="eyebrow text-accent block mb-4">Results & Analytics</span>
            <h2 className="editorial-md text-white mb-8">DATA INTO<br /><span className="text-primary">INSIGHTS.</span></h2>

            <div className="glass-dark rounded-xl p-5 border border-white/8 mb-6">
              <div className="text-white/50 text-xs font-semibold uppercase tracking-wider mb-4">Subject-wise Results</div>
              <div className="space-y-4">
                {subjectResults?.map((s, i) => (
                  <div key={s?.subject}>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-white/70">{s?.subject}</span>
                      <span className="text-accent font-bold">{s?.pass}% pass</span>
                    </div>
                    {/* Pass rate bar */}
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-primary to-blue-400 transition-all duration-1000"
                        style={{
                          width: animBars ? `${s?.pass}%` : '0%',
                          transitionDelay: `${200 + i * 120}ms`,
                        }}
                      />
                    </div>
                    <div className="text-white/30 text-xs mt-1">Class avg: {s?.avg}/100</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Performance distribution */}
            <div className="glass-dark rounded-xl p-5 border border-white/8">
              <div className="text-white/50 text-xs font-semibold uppercase tracking-wider mb-4">Grade Distribution</div>
              <div className="flex items-end gap-2 h-20">
                {[
                  { grade: 'O', pct: 18, color: 'bg-green-500' },
                  { grade: 'A+', pct: 28, color: 'bg-blue-500' },
                  { grade: 'A', pct: 32, color: 'bg-primary' },
                  { grade: 'B+', pct: 14, color: 'bg-yellow-500' },
                  { grade: 'B', pct: 6, color: 'bg-orange-500' },
                  { grade: 'C', pct: 2, color: 'bg-red-500' },
                ]?.map((g, i) => (
                  <div key={g?.grade} className="flex-1 flex flex-col items-center gap-1">
                    <div
                      className={`w-full rounded-t ${g?.color} chart-bar`}
                      style={{
                        height: animBars ? `${g?.pct * 2.5}px` : '0px',
                        transition: `height 1s cubic-bezier(0.34, 1.56, 0.64, 1)`,
                        transitionDelay: `${400 + i * 80}ms`,
                        minHeight: '2px',
                      }}
                    />
                    <span className="text-white/40 text-[9px] font-bold">{g?.grade}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}