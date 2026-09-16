'use client';
import React, { useEffect, useRef, useState } from 'react';

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
const times = ['9:00', '10:00', '11:00', '2:00', '3:00'];

const subjectColors: Record<string, string> = {
  'DS': 'bg-blue-500/30 text-blue-300 border-blue-500/40',
  'DBMS': 'bg-purple-500/30 text-purple-300 border-purple-500/40',
  'CN': 'bg-green-500/30 text-green-300 border-green-500/40',
  'SE': 'bg-orange-500/30 text-orange-300 border-orange-500/40',
  'OS': 'bg-pink-500/30 text-pink-300 border-pink-500/40',
  '—': 'bg-white/3 text-white/20 border-white/5',
};

const finalTimetable: Record<string, string[]> = {
  Mon: ['DS', 'DBMS', '—', 'SE', 'OS'],
  Tue: ['CN', '—', 'DS', 'DBMS', '—'],
  Wed: ['—', 'SE', 'CN', '—', 'DS'],
  Thu: ['DBMS', 'OS', '—', 'CN', 'SE'],
  Fri: ['OS', 'DS', 'SE', '—', 'CN'],
};

export default function TimetableFeature() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState(0);
  // 0: hidden, 1: empty grid, 2: populating, 3: conflict, 4: resolved, 5: complete
  const [filledCells, setFilledCells] = useState<Set<string>>(new Set());
  const [conflictCell, setConflictCell] = useState<string | null>(null);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && phase === 0) {
          setPhase(1);
          runAnimation();
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [phase]);

  const runAnimation = async () => {
    await delay(400);
    setPhase(2);

    // Populate cells one by one
    const allCells: string[] = [];
    days.forEach(d => times.forEach((_, ti) => allCells.push(`${d}-${ti}`)));

    for (let i = 0; i < allCells.length; i++) {
      await delay(60);
      setFilledCells(prev => new Set([...prev, allCells[i]]));
    }

    // Conflict
    await delay(300);
    setPhase(3);
    setConflictCell('Wed-0');
    await delay(900);

    // Resolve
    setPhase(4);
    setConflictCell(null);
    await delay(400);

    // Complete
    setPhase(5);
    setComplete(true);
  };

  const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

  const getCellContent = (day: string, timeIdx: number) => {
    const key = `${day}-${timeIdx}`;
    const isConflict = conflictCell === key;
    const subject = finalTimetable[day]?.[timeIdx] || '—';
    const isFilled = filledCells.has(key);

    if (!isFilled) return <div className="timetable-cell bg-white/3 border border-white/5 opacity-30">—</div>;

    return (
      <div
        className={`timetable-cell border cell-fill ${isConflict ? 'bg-red-500/30 text-red-300 border-red-500/60 animate-pulse' : subjectColors[subject]}`}
        style={{ animationDelay: `${(days.indexOf(day) * 5 + timeIdx) * 30}ms` }}
      >
        {subject}
      </div>
    );
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-20 px-6"
      style={{ background: 'linear-gradient(180deg, #0A2040 0%, #0A1628 100%)' }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span className="eyebrow text-accent block mb-4">Timetable Generation</span>
          <h2 className="editorial-md text-white mb-4">WATCH IT<br /><span className="text-primary">BUILD ITSELF.</span></h2>
          <p className="text-white/50 text-sm max-w-md mx-auto">
            Define constraints. Assign faculty. LendiERP generates a conflict-free timetable in under 2 minutes.
          </p>
        </div>

        {/* Steps */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {['Select Dept', 'Choose Subjects', 'Assign Faculty', 'Set Rooms', 'Apply Constraints', 'Generate', 'Verify', 'Publish'].map((step, i) => (
            <div
              key={step}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-300 ${
                phase >= i + 1 ? 'bg-primary/20 text-primary border-primary/40' : 'bg-white/5 text-white/30 border-white/10'
              }`}
            >
              {step}
            </div>
          ))}
        </div>

        {/* Timetable grid */}
        <div className="glass-dark rounded-2xl p-6 border border-white/10">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-white/30 text-xs font-semibold pb-3 pr-2 text-left">Time</th>
                  {days.map(d => (
                    <th key={d} className="text-white/60 text-xs font-semibold pb-3 px-1 text-center">{d}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {times.map((time, ti) => (
                  <tr key={time}>
                    <td className="text-white/30 text-xs font-mono pr-2 py-1 whitespace-nowrap">{time}</td>
                    {days.map(day => (
                      <td key={`${day}-${ti}`} className="px-1 py-1">
                        {phase >= 2 ? getCellContent(day, ti) : (
                          <div className="timetable-cell bg-white/3 border border-white/5 opacity-20">—</div>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Status */}
          <div className="mt-6 flex items-center justify-between">
            <div className="flex gap-4 text-xs">
              {Object.entries(subjectColors).filter(([k]) => k !== '—').slice(0, 4).map(([subj, cls]) => (
                <div key={subj} className="flex items-center gap-1.5">
                  <div className={`w-3 h-3 rounded border ${cls}`} />
                  <span className="text-white/40">{subj}</span>
                </div>
              ))}
            </div>
            {phase === 3 && (
              <div className="flex items-center gap-2 text-red-400 text-xs font-semibold animate-pulse">
                <span>⚠</span> Conflict detected — resolving…
              </div>
            )}
            {complete && (
              <div className="flex items-center gap-2">
                <span className="text-green-400 text-xs font-bold">✓ TIMETABLE GENERATED</span>
                <span className="text-green-400/60 text-xs">· NO CONFLICTS</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}