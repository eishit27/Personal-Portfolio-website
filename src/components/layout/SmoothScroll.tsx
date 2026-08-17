// src/components/layout/SmoothScroll.tsx
"use client";
import { ReactLenis, useLenis } from 'lenis/react';
import 'lenis/dist/lenis.css';
import { useStore } from '@/store/useStore';

// We create a tiny invisible component just to track the scroll math
function ScrollTracker() {
  const setScrollProgress = useStore((state) => state.setScrollProgress);
  
  useLenis(({ scroll, limit }) => {
    // Prevent division by zero and calculate percentage
    const progress = limit > 0 ? scroll / limit : 0;
    setScrollProgress(progress);
  });

  return null;
}

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis 
      root 
      options={{ 
        lerp: 0.05, 
        duration: 1.5, 
        smoothWheel: true 
      }}
    >
      <ScrollTracker />
      {children}
    </ReactLenis>
  );
}