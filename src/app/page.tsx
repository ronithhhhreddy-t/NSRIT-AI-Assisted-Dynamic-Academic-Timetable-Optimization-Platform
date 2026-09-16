import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProgressRail from './components/ProgressRail';
import CabinHero from './components/CabinHero';
import ERPDashboard from './components/ERPDashboard';
import CorridorScene from './components/CorridorScene';
import ModuleWall from './components/ModuleWall';
import RightWall from './components/RightWall';
import TimetableFeature from './components/TimetableFeature';
import ExamSeating from './components/ExamSeating';
import AttendanceResults from './components/AttendanceResults';
import ERPOrbit from './components/ERPOrbit';
import BuildingExterior from './components/BuildingExterior';
import CampusAerial from './components/CampusAerial';

export const metadata: Metadata = {
  title: 'LENDI ERP — Run Your Campus. Smarter.',
  description: 'LENDI ERP is the complete academic and administration ERP for NSRIT — timetable, attendance, exams, fees, results, library, hostel, and analytics in one connected system.',
  openGraph: {
    title: 'LENDI ERP — Run Your Campus. Smarter.',
    description: 'One connected ERP for academics, administration, and campus operations at NSRIT.',
    images: [{ url: '/assets/images/app_logo.png', width: 1200, height: 630 }],
  },
};

export default function LandingPage() {
  return (
    <main className="relative" style={{ background: '#FAF8F3' }}>
      {/* Fixed persistent navigation */}
      <Header />

      {/* Fixed progress rail — left side */}
      <ProgressRail />

      {/* ─── Cinematic Journey ─── */}

      {/* Stage 1: Cabin Hero — warm desk scene with ERP dashboard laptop */}
      <CabinHero />

      {/* Stage 2: ERP Dashboard Reveal — laptop zoom */}
      <ERPDashboard />

      {/* Stage 3: Corridor Entry — laptop fills screen → corridor appears below */}
      <CorridorScene />

      {/* Stage 4: Left Wall — ONE PLATFORM. EVERY CAMPUS PROCESS. + module cards */}
      <ModuleWall />

      {/* Stage 5: Right Wall — NSRIT × LENDI ERP partnership + metrics */}
      <RightWall />

      {/* Stage 6: Timetable Feature Animation */}
      <TimetableFeature />

      {/* Stage 7: Exam Seating Allocation */}
      <ExamSeating />

      {/* Stage 8: Attendance + Results */}
      <AttendanceResults />

      {/* Stage 9: Complete ERP Orbit */}
      <ERPOrbit />

      {/* Stage 10: Building Exterior / Side Facade */}
      <BuildingExterior />

      {/* Stage 11: Aerial Campus + Final CTA */}
      <CampusAerial />

      {/* Footer */}
      <Footer />
    </main>
  );
}