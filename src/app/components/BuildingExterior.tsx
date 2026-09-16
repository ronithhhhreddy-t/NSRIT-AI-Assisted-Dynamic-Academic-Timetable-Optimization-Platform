'use client';
import React, { useEffect, useRef, useState } from 'react';
import AppImage from '@/components/ui/AppImage';

export default function BuildingExterior() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const buildingRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {if (entry.isIntersecting) setVisible(true);},
      { threshold: 0.1 }
    );
    if (sectionRef?.current) observer?.observe(sectionRef?.current);
    return () => observer?.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef?.current || !buildingRef?.current) return;
      const rect = sectionRef?.current?.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, -rect?.top / (rect?.height - window.innerHeight)));

      // Camera dolly along building facade
      buildingRef.current.style.transform = `translateX(${-progress * 8}%) scale(${1 + progress * 0.06})`;
      buildingRef.current.style.filter = `brightness(${0.7 + progress * 0.3})`;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative"
      style={{ minHeight: '160vh' }}>
      
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Building facade */}
        <div
          ref={buildingRef}
          className={`absolute inset-0 will-change-transform transition-opacity duration-1000 ${visible ? 'opacity-100' : 'opacity-0'}`}
          style={{ width: '120%', left: '-10%' }}>
          
          <AppImage
            src="https://img.rocket.new/generatedImages/rocket_gen_img_15b450716-1767514940729.png"
            alt="Modern college building exterior side facade with large windows, clean architectural lines, green campus landscaping, warm afternoon sunlight"
            fill
            className="object-cover"
            sizes="120vw" />
          
          <div className="absolute inset-0 bg-gradient-to-r from-secondary/40 via-transparent to-secondary/20" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-secondary/70" />
        </div>

        {/* Foreground parallax plant */}
        <div
          className="absolute bottom-0 left-0 w-48 h-64 pointer-events-none"
          style={{ transform: 'translateZ(0)' }}>
          
          <div className="w-full h-full bg-gradient-to-t from-green-900/20 to-transparent rounded-tr-full" />
        </div>

        {/* Copy overlay */}
        <div className="absolute inset-0 flex items-end pb-20 px-8 lg:px-16 z-10">
          <div className={`transition-all duration-1000 delay-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="eyebrow text-white/50 block mb-3">Exiting the platform</span>
            <h2 className="editorial-lg text-white mb-4">
              BACK TO<br />
              <span className="text-accent">CAMPUS.</span>
            </h2>
            <p className="text-white/50 text-base max-w-sm leading-relaxed">
              The software connects every department. But the campus — this is where it all comes to life.
            </p>
          </div>
        </div>

        {/* Bottom fade to aerial */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-aerial-sky/60 to-transparent" />
      </div>
    </section>);

}