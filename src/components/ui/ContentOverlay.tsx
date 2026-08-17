// src/components/ui/ContentOverlay.tsx
"use client";
import { useStore } from '@/store/useStore';

export default function ContentOverlay() {
  const activeSection = useStore((state) => state.activeSection);
  const setActiveSection = useStore((state) => state.setActiveSection);

  if (!activeSection) return null;

  const renderContent = () => {
    switch (activeSection) {
      case 'Experience':
        return (
          <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-4 custom-scrollbar">
            <div className="mb-6">
              <span className="text-[10px] font-black tracking-widest uppercase text-[#8db580] block mb-4 opacity-80">Experience</span>
              
              <div className="border-l border-[#8db580] pl-5 mb-6 relative before:absolute before:-left-[5px] before:top-1 before:w-2 before:h-2 before:bg-[#8db580] before:rounded-full">
                <h3 className="text-lg font-bold text-white tracking-wide">Technical</h3>
                <p className="text-sm font-medium text-[#8db580] mb-1">Intelligent System Design Lab SRM</p>
                <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-2">Feb 2026 - Present</p>
              </div>

              <div className="border-l border-white/20 pl-5 mb-6 relative before:absolute before:-left-[5px] before:top-1 before:w-2 before:h-2 before:bg-white/20 before:rounded-full">
                <h3 className="text-lg font-bold text-white tracking-wide">AI-ML</h3>
                <p className="text-sm font-medium text-white/70 mb-1">Microsoft Learn Student Ambassadors SRM</p>
                <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-2">Oct 2025 - Present</p>
              </div>

              <div className="border-l border-white/20 pl-5 mb-2 relative before:absolute before:-left-[5px] before:top-1 before:w-2 before:h-2 before:bg-white/20 before:rounded-full">
                <h3 className="text-lg font-bold text-white tracking-wide">Volunteer</h3>
                <p className="text-sm font-medium text-white/70 mb-1">Aaruush, SRM University</p>
                <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-2">Aug 2025 - Present</p>
              </div>
            </div>
          </div>
        );
      case 'Education':
        return (
          <div className="space-y-4">
            <div className="bg-white/5 p-5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
              <h3 className="text-md font-bold text-white tracking-wide">SRM IST Chennai</h3>
              <p className="text-white/60 text-sm mt-1 leading-relaxed">Bachelor of Technology - BTech, Computer Science AI/ML</p>
              <p className="text-[#8db580] text-[10px] font-bold uppercase tracking-widest mt-3">Aug 2025 - 2029</p>
            </div>
            
            <div className="bg-white/5 p-5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
              <h3 className="text-md font-bold text-white tracking-wide">Essar International School</h3>
              <p className="text-white/60 text-sm mt-1">High School Education</p>
              <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mt-3">2010 - 2024</p>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10">
              <span className="text-[10px] font-black tracking-widest uppercase text-[#8db580] block mb-4 opacity-80">Certifications</span>
              <div className="bg-[#8db580]/10 p-5 rounded-xl border border-[#8db580]/20">
                <h3 className="text-sm font-bold text-white leading-snug">Oracle Cloud Infrastructure 2025 Certified AI Foundation Associate</h3>
                <p className="text-[#8db580] text-[10px] font-bold uppercase tracking-widest mt-3">Issued Oct 2025 • Oracle</p>
              </div>
            </div>
          </div>
        );
      case 'Projects':
        return (
          <div className="space-y-4">
            <div className="bg-white/5 p-5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors group cursor-pointer">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-bold text-white tracking-wide group-hover:text-[#8db580] transition-colors">Portfolio Ecosystem</h3>
                <svg className="w-5 h-5 text-white/30 group-hover:text-[#8db580] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
              </div>
              <p className="text-white/60 text-sm leading-relaxed">An interactive 3D web experience built with React Three Fiber to showcase my journey in AI, ML, and Software Engineering.</p>
            </div>
          </div>
        );
      case 'Tech Stack':
        return (
          <div className="space-y-6">
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Core technologies and domains I specialize in as an AI/ML Computer Science student:
            </p>
            <div className="flex flex-wrap gap-2">
              {['Artificial Intelligence', 'Machine Learning', 'C (Programming)', 'Python', 'React Three Fiber', 'TypeScript'].map((tech) => (
                <span key={tech} className="px-4 py-2 bg-white/5 border border-white/10 text-white/90 text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-white/10 hover:border-[#8db580] transition-all">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        );
      case 'Contact':
        return (
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">A big fan of just saying hello.</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Based in Surat, Gujarat, India. I am always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
              </p>
            </div>
            
            <div className="flex flex-col gap-3">
              <a 
                href="mailto:eishitjain23@gmail.com" 
                className="w-full text-center px-8 py-4 bg-[#8db580] text-[#0a0f0d] font-black text-xs uppercase tracking-widest rounded-xl hover:bg-white transition-all transform hover:-translate-y-1 shadow-[0_0_20px_rgba(141,181,128,0.3)]"
              >
                Email Me
              </a>
              
              <a 
                href="https://www.linkedin.com/in/eishit-jain-a4a87628a/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-full text-center px-8 py-4 bg-white/5 border border-white/10 text-white font-black text-xs uppercase tracking-widest rounded-xl hover:bg-[#0a66c2] hover:border-[#0a66c2] transition-all transform hover:-translate-y-1"
              >
                Connect on LinkedIn
              </a>
            </div>
          </div>
        );
      default:
        return <p className="text-white/60">Content coming soon.</p>;
    }
  };

  return (
    <div className="absolute inset-0 flex items-center justify-start px-12 md:px-24 pointer-events-none mt-16">
      {/* PREMIUM DARK GLASSMORPHISM */}
      <div className="relative w-full max-w-lg bg-[#0a0f0d]/80 backdrop-blur-3xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] rounded-3xl p-10 pointer-events-auto animate-in slide-in-from-left-12 fade-in duration-500">
        
        {/* Close Button */}
        <button 
          onClick={() => setActiveSection(null)}
          className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-all"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>

        <span className="text-[10px] font-black tracking-[0.3em] uppercase text-[#8db580] mb-3 block opacity-80">
          Details
        </span>
        <h2 className="text-4xl font-black uppercase tracking-tighter text-white mb-8 border-b border-white/10 pb-6">
          {activeSection}
        </h2>
        
        {renderContent()}

      </div>
    </div>
  );
}