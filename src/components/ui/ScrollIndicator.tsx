// src/components/ui/ScrollIndicator.tsx
"use client";
import { useStore } from '@/store/useStore';

export default function ScrollIndicator() {
  const scrollProgress = useStore((state) => state.scrollProgress);
  const activeSection = useStore((state) => state.activeSection);

  // Hide the guide completely if a UI panel is open so it doesn't clutter the screen
  if (activeSection) return null;

  // Determine the dark mode state based on scroll depth
  const isDark = scrollProgress > 0.15;

  // The Narrative Engine: Changes text based on how far the user has scrolled
  let storyText = "Every line of code builds a world. Scroll to descend.";
  let showArrow = true;

  if (scrollProgress > 0.05 && scrollProgress < 0.3) {
    storyText = "Breaking through the atmosphere...";
  } else if (scrollProgress >= 0.3) {
    storyText = "The core is exposed. Select a layer to explore.";
    showArrow = false; // Hide the arrow because they have arrived at the destination
  }

  return (
    <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center pointer-events-none">
      
      {/* The Story Pill */}
      <div 
        className={`px-6 py-3 rounded-full backdrop-blur-md shadow-lg text-center transition-all duration-700 ease-in-out transform ${
          isDark 
            ? 'bg-[#0a0f0d]/60 border border-white/10 text-white' 
            : 'bg-white/50 border border-black/5 text-[#2c363f]'
        }`}
      >
        <p className="text-xs font-black uppercase tracking-[0.2em] animate-in fade-in zoom-in duration-500">
          {storyText}
        </p>
      </div>
      
      {/* The Bouncing Down Arrow */}
      <div 
        className={`mt-6 transition-all duration-700 ease-in-out ${
          showArrow ? 'opacity-100 animate-bounce' : 'opacity-0 translate-y-4'
        } ${isDark ? 'text-white/50' : 'text-[#2c363f]/50'}`}
      >
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <polyline points="19 12 12 19 5 12"></polyline>
        </svg>
      </div>

    </div>
  );
}