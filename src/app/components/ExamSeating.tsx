'use client';
import React, { useEffect, useRef, useState } from 'react';

const rows = 5;
const cols = 8;
const totalSeats = rows * cols;

const studentNames = [
  'A.Ravi', 'B.Priya', 'C.Kumar', 'D.Lakshmi', 'E.Suresh', 'F.Anitha',
  'G.Vijay', 'H.Padma', 'I.Srinivas', 'J.Kavitha', 'K.Ramesh', 'L.Sowmya',
  'M.Naresh', 'N.Deepa', 'O.Kiran', 'P.Usha', 'Q.Mohan', 'R.Sujatha',
  'S.Arun', 'T.Rekha', 'U.Prasad', 'V.Meena', 'W.Gopal', 'X.Nirmala',
  'Y.Satish', 'Z.Vani', 'AA.Raju', 'BB.Latha', 'CC.Sunil', 'DD.Bhavani',
  'EE.Madhu', 'FF.Srinu', 'GG.Hema', 'HH.Pavan', 'II.Swathi', 'JJ.Ajay',
  'KK.Divya', 'LL.Naidu', 'MM.Sree', 'NN.Venkat',
];

export default function ExamSeating() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [filledSeats, setFilledSeats] = useState<number[]>([]);
  const [complete, setComplete] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          runSeating();
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [started]);

  const runSeating = async () => {
    const delay = (ms: number) => new Promise(res => setTimeout(res, ms));
    for (let i = 0; i < totalSeats; i++) {
      await delay(35);
      setFilledSeats(prev => [...prev, i]);
    }
    await delay(400);
    setComplete(true);
  };

  const seatLabel = (idx: number) => {
    const r = Math.floor(idx / cols);
    const c = idx % cols;
    return `${String.fromCharCode(65 + r)}${String(c + 1).padStart(2, '0')}`;
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-20 px-6"
      style={{ background: 'linear-gradient(180deg, #0A1628 0%, #071020 100%)' }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span className="eyebrow text-accent block mb-4">Examinations & Seating</span>
          <h2 className="editorial-md text-white mb-4">SEATING<br /><span className="text-primary">ALLOCATED.</span></h2>
          <p className="text-white/50 text-sm max-w-md mx-auto">
            Room layouts generated, students assigned, roll numbers placed — automatically.
          </p>
        </div>

        {/* Exam info */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            ['Exam', 'Data Structures'],
            ['Date', '18 Nov 2026'],
            ['Room', 'Block B — 201'],
            ['Duration', '3 Hours'],
          ].map(([k, v]) => (
            <div key={k} className="glass-dark rounded-xl p-4 border border-white/8 text-center">
              <div className="text-white/40 text-xs mb-1">{k}</div>
              <div className="text-white font-semibold text-sm">{v}</div>
            </div>
          ))}
        </div>

        {/* Seating grid */}
        <div className="glass-dark rounded-2xl p-6 border border-white/10">
          <div className="text-white/40 text-xs font-semibold uppercase tracking-wider mb-4 text-center">Room B-201 · Seating Arrangement</div>

          {/* Teacher desk */}
          <div className="flex justify-center mb-6">
            <div className="px-8 py-2 rounded-lg bg-accent/20 text-accent text-xs font-semibold border border-accent/30">
              Invigilator Desk
            </div>
          </div>

          <div className="grid gap-1.5 mb-6" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
            {Array.from({ length: totalSeats }).map((_, i) => {
              const isFilled = filledSeats.includes(i);
              const studentName = studentNames[i] || '';
              return (
                <div
                  key={i}
                  className={`seat-${isFilled ? 'filled' : 'empty'} rounded p-1.5 text-center transition-all duration-200`}
                  style={{ animationDelay: `${i * 20}ms` }}
                >
                  <div className={`text-xs font-bold ${isFilled ? 'text-primary' : 'text-white/20'}`}>
                    {seatLabel(i)}
                  </div>
                  {isFilled && (
                    <div className="text-white/40 text-[7px] mt-0.5 truncate leading-tight">{studentName}</div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between border-t border-white/8 pt-4">
            <div className="flex gap-6 text-xs">
              <div><span className="text-white/40">Total Seats: </span><span className="text-white font-semibold">{totalSeats}</span></div>
              <div><span className="text-white/40">Allocated: </span><span className="text-primary font-semibold">{filledSeats.length}</span></div>
              <div><span className="text-white/40">Utilization: </span><span className="text-accent font-semibold">{Math.round((filledSeats.length / totalSeats) * 100)}%</span></div>
            </div>
            {complete && (
              <div className="text-green-400 text-xs font-bold flex items-center gap-1.5">
                <span>✓</span> SEATING PLAN COMPLETE
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}