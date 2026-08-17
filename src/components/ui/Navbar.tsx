// src/components/ui/Navbar.tsx
"use client";
import { useStore } from '@/store/useStore';

export default function Navbar() {
  const setActiveSection = useStore((state) => state.setActiveSection);
  const scrollProgress = useStore((state) => state.scrollProgress);

  // Trigger dark mode when user scrolls past the 15% mark (entering space)
  const isDark = scrollProgress > 0.15;

  const navItems = ['Experience', 'Education', 'Projects', 'Tech Stack'];

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 flex items-center h-24 transition-all duration-700 ease-in-out ${
        isDark 
          ? 'bg-gradient-to-b from-[#0a0f0d]/80 to-transparent border-transparent' 
          : 'bg-[#edf1e8]/60 backdrop-blur-xl border-b border-white/40'
      }`}
    >
      
      {/* CONTENT CONTAINER */}
      <div className="relative z-10 w-full h-full px-8 md:px-16 flex justify-between items-center">
        
        {/* Logo */}
        <div 
          className={`font-black tracking-tighter text-xl uppercase cursor-pointer transition-colors duration-700 ${isDark ? 'text-white' : 'text-[#2c363f]'}`}
          onClick={() => setActiveSection(null)}
        >
          Eishit Jain
        </div>
        
        {/* Navigation Links */}
        <div className="hidden md:flex gap-8 items-center">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => setActiveSection(item)}
              className={`text-xs font-bold uppercase tracking-widest transition-colors duration-700 ${isDark ? 'text-white/70 hover:text-[#8db580]' : 'text-[#5c6b73] hover:text-[#8db580]'}`}
            >
              {item}
            </button>
          ))}
          
          {/* Action Button */}
          <button 
            onClick={() => setActiveSection('Contact')}
            className={`px-6 py-2.5 text-xs font-bold uppercase tracking-widest rounded-full transition-all duration-700 shadow-md
              ${isDark ? 'bg-[#8db580] text-[#0a0f0d] hover:bg-white hover:scale-105' : 'bg-[#2c363f] text-white hover:bg-[#8db580] hover:scale-105'}`}
          >
            Let's Talk
          </button>
        </div>
      </div>
    </nav>
  );
}