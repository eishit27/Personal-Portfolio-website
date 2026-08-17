// src/app/page.tsx
"use client";
import Scene from '@/components/canvas/Scene';
import SmoothScroll from '@/components/layout/SmoothScroll';
import ContentOverlay from '@/components/ui/ContentOverlay'; 
import ScrollIndicator from '@/components/ui/ScrollIndicator';
import Navbar from '@/components/ui/Navbar';
import { useStore } from '@/store/useStore';

export default function Home() {
  const activeSection = useStore((state) => state.activeSection);

  return (
    <div className="bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#edf1e8] to-[#d8e0d0] min-h-screen text-[#2c363f] font-sans overflow-hidden">
      
      {/* 2D Persistent Navigation Header */}
      <Navbar />

      <SmoothScroll>
        
        {/* LAYER 1: The 3D Canvas */}
        <div className="fixed inset-0 z-0 pointer-events-auto">
          <Scene />
        </div>

        {/* LAYER 2: The Interactive UI Panel */}
        <div className="fixed inset-0 z-40 pointer-events-none">
          <ContentOverlay /> 
        </div>

        {/* LAYER 2.5: The Animated Scroll Cue */}
        <ScrollIndicator />

        {/* LAYER 3: The Scrolling Content */}
        <main className="relative z-10 w-full flex flex-col pointer-events-none select-none pt-24">
          
          {/* HERO SECTION */}
          <section className={`h-[calc(100vh-6rem)] w-full flex items-center justify-start px-12 md:px-24 transition-opacity duration-500 ${activeSection ? 'opacity-0' : 'opacity-100'}`}>
            <div className="max-w-2xl pointer-events-auto mt-[-10vh]">
              <span className="text-sm tracking-[0.2em] font-bold uppercase text-[#558257]">
                Hello, I am
              </span>
              <h1 className="text-7xl md:text-8xl font-black mt-2 mb-4 tracking-tighter uppercase leading-[0.9] text-[#2c363f]">
                Eishit<br/>Jain
              </h1>
              <p className="text-lg md:text-xl text-[#5c6b73] max-w-lg leading-relaxed font-medium">
                A computer science student and AI/ML engineer bridging the gap between raw data and intelligent web experiences.
              </p>
              
              <div className="mt-10 flex gap-4">
                <button className="px-8 py-3.5 bg-[#2c363f] text-white font-bold text-sm uppercase tracking-widest hover:bg-[#558257] transition-all duration-300 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                  Download Resume
                </button>
              </div>
            </div>
          </section>

          {/* EMPTY SCROLL TRACKS */}
          <section className="h-screen w-full"></section>
          <section className="h-[50vh] w-full"></section>

        </main>
      </SmoothScroll>
    </div>
  );
}