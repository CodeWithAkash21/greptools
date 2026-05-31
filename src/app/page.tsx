'use client';

import Navbar from '@/components/home/Navbar';
import FloatingBackground from '@/components/home/FloatingBackground';
import CursorSpotlight from '@/components/home/CursorSpotlight';
import ParticleLayer from '@/components/home/ParticleLayer';
import Hero from '@/components/home/Hero';
import ToolCards from '@/components/home/ToolCards';
import WhySection from '@/components/home/WhySection';
import Stats from '@/components/home/Stats';
import Categories from '@/components/home/Categories';
import FAQ from '@/components/home/FAQ';
import FinalCTA from '@/components/home/FinalCTA';
import Footer from '@/components/home/Footer';

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-[#0a0f1e] overflow-hidden text-slate-100 font-sans antialiased select-none">
      {/* Background Grid and Drift Snippets */}
      <FloatingBackground />

      {/* Floating particles */}
      <ParticleLayer />

      {/* Mouse hover light */}
      <CursorSpotlight />

      {/* Navbar header */}
      <Navbar />

      <main className="relative w-full">
        {/* Sections */}
        <Hero />
        <ToolCards />
        <WhySection />
        <Categories />
        <Stats />
        <FAQ />
        <FinalCTA />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
