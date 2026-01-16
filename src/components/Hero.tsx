import React, { useState, useEffect } from 'react';
import { Database, Play, Zap } from 'lucide-react';

// --- KONFIGURASI PROPS ---
interface HeroProps {
  onExplore?: () => void;
}

const slides = [
  {
    title: 'Membangun Kedaulatan Data Desa Indonesia',
    subtitle: 'Data desa presisi sebagai landasan utama pembangunan desa berkelanjutan yang berdaulat.',
  },
  {
    title: 'Transformasi Tata Kelola Desa Digital',
    subtitle: 'Kebijakan publik berbasis bukti melalui Drone Participatory Mapping (DPM) dan sensus partisipatif.',
  },
  {
    title: 'Solusi Data Presisi untuk Masa Depan',
    subtitle: 'Mewujudkan ekosistem data desa yang transparan, inklusif, dan akuntabel untuk kesejahteraan masyarakat.',
  }
];

export const Hero: React.FC<HeroProps> = ({ onExplore }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const scrollToStats = () => {
    if (onExplore) {
      onExplore();
    } else {
      document.getElementById('statistics')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center bg-[#0B1120] overflow-hidden px-6 lg:px-24 selection:bg-[#E3242B] selection:text-white">
      
      {/* --- PREMIUM BACKGROUND ELEMENTS --- */}
      <div className="absolute inset-0 opacity-[0.08]" 
           style={{ 
             backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', 
             backgroundSize: '80px 80px',
             maskImage: 'radial-gradient(ellipse at center, black, transparent 80%)',
             WebkitMaskImage: 'radial-gradient(ellipse at center, black, transparent 80%)'
           }}>
      </div>

      <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#E3242B] opacity-[0.03] blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-[#E3242B] opacity-[0.02] blur-[100px] rounded-full"></div>

      <div className="max-w-7xl mx-auto w-full relative z-10 pt-20">
        
        <div className="max-w-4xl min-h-[400px] relative flex items-center">
          
          {slides.map((slide, index) => (
            <div 
              key={index}
              className={`transition-all duration-1000 absolute inset-0 flex flex-col justify-center ${
                index === current 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8 pointer-events-none'
              }`}
            >
              <div className="space-y-6 md:space-y-8">
                
                {/* --- MAIN TITLE (SENTENCE CASE) --- */}
                <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-black leading-[1.1] tracking-tighter max-w-3xl animate-in fade-in slide-in-from-bottom-5 duration-1000">
                  {slide.title.split(' ').map((word, i) => (
                    <span key={i} className={['Indonesia', 'Desa', 'Data', 'Presisi', 'Digital'].includes(word) ? 'text-[#E3242B]' : ''}>
                      {word}{' '}
                    </span>
                  ))}
                </h1>

                {/* --- SUBTITLE (SENTENCE CASE) --- */}
                <div className="max-w-2xl animate-in fade-in slide-in-from-bottom-5 duration-1000 delay-200">
                    <div className="flex gap-5">
                        <div className="w-1 h-auto bg-[#E3242B] rounded-full opacity-40"></div>
                        <p className="text-gray-400 text-xs md:text-base font-medium leading-relaxed tracking-wider">
                        {slide.subtitle}
                        </p>
                    </div>
                </div>

                {/* --- ACTION BUTTONS --- */}
                <div className="flex flex-wrap gap-4 md:gap-6 pt-4 animate-in fade-in slide-in-from-bottom-5 duration-1000 delay-400">
                  <button 
                    onClick={scrollToStats}
                    className="group relative flex items-center gap-4 bg-[#E3242B] text-white px-8 py-4 md:px-10 md:py-4 rounded-2xl font-bold tracking-widest text-[11px] transition-all duration-500 overflow-hidden shadow-[0_20px_40px_rgba(227,36,43,0.2)] hover:shadow-[#E3242B]/40 hover:-translate-y-1 active:scale-95"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                    <span className="relative z-10 uppercase">Capaian Pendataan</span>
                    <Database size={18} className="relative z-10 group-hover:rotate-12 transition-transform" />
                  </button>

                  <a 
                    href="www.youtube.com" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="flex items-center gap-4 bg-white/[0.03] border border-white/10 text-white px-8 py-4 md:px-10 md:py-4 rounded-2xl font-bold tracking-widest text-[11px] hover:bg-white hover:text-[#0B1120] transition-all duration-500 backdrop-blur-md group shadow-xl hover:-translate-y-1 active:scale-95"
                  >
                    <div className="p-1 bg-[#E3242B] rounded-md group-hover:bg-[#0B1120] transition-colors">
                        <Play size={12} className="fill-current" />
                    </div>
                    <span className="uppercase">Tonton Dokumenter</span>
                  </a>
                </div>
              </div>
            </div>
          ))}

        </div>

        {/* --- INDICATORS --- */}
        <div className="flex items-center gap-6 mt-32 md:mt-20">
          <div className="flex gap-3">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-1 rounded-full transition-all duration-500 ${
                  i === current ? 'w-16 md:w-24 bg-[#E3242B]' : 'w-4 md:w-6 bg-white/10'
                }`}
              />
            ))}
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-black text-[#E3242B] tracking-tighter">0{current + 1}</span>
            <div className="w-4 h-px bg-white/20"></div>
            <span className="text-[11px] font-black text-white/20 tracking-tighter">0{slides.length}</span>
          </div>
        </div>
      </div>

      {/* --- SIDE STATS FOOTER (DATA 2026) --- */}
      <div className="absolute bottom-12 right-12 hidden lg:flex items-center gap-10 text-right">
          <div className="h-12 w-px bg-white/10"></div>
          <div className="flex flex-col items-end space-y-1">
              <span className="text-[11px] font-black text-white tracking-widest uppercase text-right">Januari 2026</span>
              <span className="text-[8px] font-bold text-gray-600 tracking-widest uppercase">Edisi Utama</span>
          </div>
      </div>
    </section>
  );
};

