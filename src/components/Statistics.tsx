import React, { useEffect, useState, useRef } from 'react';
import { 
  Database, Users, Map, Home, 
  Building2, Users2, ChevronLeft, ChevronRight,
  TrendingUp, PieChart, Activity, ShieldCheck, 
  BarChart3, Info, Mars, Venus, RefreshCcw, 
  Award, CheckCircle2, Search, Zap
} from 'lucide-react';
import { api } from '../api';
import { ScrollReveal } from './ScrollReveal';

const Counter = ({ value, duration = 2500 }: { value: any, duration?: number }) => {
  const [count, setCount] = useState(0);
  const target = Number(value) || 0;

  useEffect(() => {
    let start = 0;
    if (target === 0) {
      setCount(0);
      return;
    }
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration]);

  return <span>{count.toLocaleString('id-ID')}</span>;
};

const statsConfig = [
  { label: 'Desa', key: 'desa', icon: Map, info: 'Cakupan wilayah administratif pedesaan' },
  { label: 'Dusun', key: 'dusun', icon: Database, info: 'Unit basis data tingkat desa' },
  { label: 'Kelurahan', key: 'kelurahan', icon: Building2, info: 'Wilayah administratif perkotaan' },
  { label: 'RW', key: 'rw', icon: Home, info: 'Struktur koordinasi lingkungan warga' },
  { label: 'Keluarga', key: 'kk', icon: Users, info: 'Total Kepala Keluarga valid' },
  { label: 'Jiwa', key: 'jiwa', icon: Users2, info: 'Total populasi secara presisi' },
];

export const Statistics = () => {
  const [dbData, setDbData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    api.get('/public/capaian')
      .then(res => {
        if (res.data.length > 0) setDbData(res.data[0]);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (loading) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % statsConfig.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [loading]);

  useEffect(() => {
    if (scrollRef.current) {
      const isMobile = window.innerWidth < 768;
      // SOP: cardWidth disesuaikan agar 4 kartu muat di desktop
      const cardWidth = isMobile ? (260 + 16) : (280 + 20); 
      scrollRef.current.scrollTo({
        left: activeIndex * cardWidth - (scrollRef.current.clientWidth / 2) + (cardWidth / 2),
        behavior: 'smooth'
      });
    }
  }, [activeIndex]);

  const scroll = (direction: 'left' | 'right') => {
    if (direction === 'left') {
      setActiveIndex((prev) => (prev - 1 + statsConfig.length) % statsConfig.length);
    } else {
      setActiveIndex((prev) => (prev + 1) % statsConfig.length);
    }
  };

  const totalWilayah = (Number(dbData?.desa) || 0) + (Number(dbData?.kelurahan) || 0);
  const totalJiwa = dbData ? Number(dbData.jiwa) : 0;
  const jmlLaki = dbData ? Number(dbData.laki) : 0;
  const jmlPerempuan = dbData ? Number(dbData.perempuan) : 0;
  const persenLaki = totalJiwa > 0 ? (jmlLaki / totalJiwa) * 100 : 0;
  const persenPerempuan = totalJiwa > 0 ? (jmlPerempuan / totalJiwa) * 100 : 0;

  if (loading) return (
    <div className="py-40 text-center space-y-3">
      <div className="w-8 h-8 border-3 border-[#E3242B] border-t-transparent rounded-full animate-spin mx-auto"></div>
      <p className="text-[8px] font-black text-gray-300 uppercase tracking-widest">Sinkronisasi Capaian...</p>
    </div>
  );

  return (
    <section id="statistics" className="py-24 bg-white relative overflow-hidden selection:bg-[#E3242B] selection:text-white">
      
      <style dangerouslySetInnerHTML={{ __html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />

      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:60px_60px] opacity-[0.15]"></div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-24 relative z-10">
        
        {/* --- 1. HEADER --- */}
        <ScrollReveal>
          <div className="flex flex-col lg:flex-row justify-between items-center lg:items-end gap-8 mb-16 pb-10 border-b border-gray-100">
            <div className="space-y-3 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-2">
                 <span className="text-[10px] font-black text-[#E3242B] uppercase tracking-[0.3em]">Analitik Data Terpadu</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-[#111827] tracking-tighter uppercase leading-none">
                Capaian <span className="text-[#E3242B]">Pendataan</span>
              </h2>
              <p className="text-gray-500 font-bold text-[10px] md:text-xs uppercase tracking-widest max-w-md leading-relaxed">
                Bekerja sama dengan masyarakat di <span className="text-[#111827] font-black">{totalWilayah}</span> Desa & Kelurahan seluruh Indonesia.
              </p>
            </div>

            <div className="flex items-center gap-3 bg-gray-50 p-1.5 rounded-2xl border border-gray-100 shadow-inner">
              <button onClick={() => scroll('left')} className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white hover:bg-[#111827] hover:text-white transition-all shadow-sm flex items-center justify-center">
                <ChevronLeft size={20} />
              </button>
              <button onClick={() => scroll('right')} className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-[#E3242B] text-white shadow-xl shadow-red-900/30 flex items-center justify-center">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* --- 2. STATS SLIDER (GRID 4 DESKTOP) --- */}
        <ScrollReveal delay={0.2} direction="right">
          <div className="relative">
            <div 
              ref={scrollRef}
              className="flex overflow-x-auto gap-4 md:gap-5 pb-32 no-scrollbar pt-12 px-[10%] md:px-[2%]"
              style={{ scrollSnapType: 'x mandatory' }}
            >
              {statsConfig.map((item, index) => {
                const isActive = index === activeIndex;
                return (
                  <div 
                    key={index}
                    // SOP: md:min-w-[280px] agar 4 kartu muat di container desktop
                    className={`min-w-[260px] md:min-w-[280px] snap-center bg-white p-8 md:p-10 rounded-[3.5rem] border transition-all duration-700 flex flex-col items-center text-center relative
                      ${isActive 
                        ? 'scale-110 z-20 border-[#E3242B] shadow-[0_40px_100px_rgba(227,36,43,0.15)] opacity-100' 
                        : 'scale-90 opacity-20 border-gray-50 blur-[2px] md:blur-[1px]'
                      }`}
                  >
                    {isActive && (
                      <div className="absolute -top-4 bg-[#E3242B] text-white text-[7px] md:text-[8px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg animate-bounce whitespace-nowrap">
                        Terverifikasi
                      </div>
                    )}

                    <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl md:rounded-3xl flex items-center justify-center mb-6 md:mb-8 transition-all duration-500
                      ${isActive ? 'bg-[#E3242B] text-white rotate-[10deg] scale-110' : 'bg-gray-50 text-gray-400'}`}>
                      <item.icon size={isActive ? 32 : 28} />
                    </div>

                    <div className="space-y-1 relative z-10">
                      <h3 className={`text-5xl md:text-5xl font-black tracking-tighter transition-colors duration-500
                        ${isActive ? 'text-[#E3242B]' : 'text-[#111827]'}`}>
                        <Counter value={dbData ? dbData[item.key] : 0} />
                      </h3>
                      <p className={`text-[10px] md:text-[11px] font-black uppercase tracking-[0.4em] mt-2 
                        ${isActive ? 'text-gray-800' : 'text-gray-400'}`}>{item.label}</p>
                      
                      <p className={`text-[8px] md:text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-4 md:mt-6 transition-all duration-1000 leading-relaxed
                        ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                        {item.info}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </ScrollReveal>

        {/* --- 3. DEMOGRAPHIC --- */}
        <ScrollReveal delay={0.4}>
          <div className="grid grid-cols-1 gap-8">
              <div className="bg-[#111827] rounded-[3rem] md:rounded-[4rem] p-8 md:p-16 text-white relative overflow-hidden shadow-2xl border border-white/5">
                  <div className="absolute top-0 right-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-[#E3242B] opacity-[0.05] blur-[150px] rounded-full"></div>
                  
                  <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
                      <div className="space-y-10">
                          <div className="space-y-3">
                              <div className="flex items-center gap-2 text-[#E3242B]">
                                  <Zap size={14} fill="currentColor" />
                                  <h4 className="font-black text-xl md:text-2xl uppercase tracking-tighter">Rasio Demografi Nasional</h4>
                              </div>
                              <p className="text-gray-400 text-[9px] font-bold uppercase tracking-[0.3em] opacity-60 leading-relaxed">Visualisasi Distribusi Gender Terintegrasi</p>
                          </div>
                          
                          <div className="space-y-8">
                              <div className="space-y-4">
                                  <div className="flex justify-between items-end">
                                      <div className="flex items-center gap-2 md:gap-3 text-blue-400">
                                          <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-blue-400/10 flex items-center justify-center border border-blue-400/20"><Mars size={16} /></div>
                                          <span className="text-[9px] md:text-[11px] font-black uppercase tracking-[0.2em]">Laki-Laki</span>
                                      </div>
                                      <span className="text-2xl md:text-3xl font-black">{jmlLaki.toLocaleString('id-ID')} <span className="text-[9px] opacity-30 font-medium">JIWA</span></span>
                                  </div>
                                  <div className="h-2.5 bg-white/5 rounded-full overflow-hidden border border-white/5 p-0.5">
                                      <div className="h-full bg-blue-500 shadow-[0_0_25px_rgba(59,130,246,0.5)] rounded-full transition-all duration-1000" style={{ width: `${persenLaki}%` }}></div>
                                  </div>
                              </div>
                              <div className="space-y-4">
                                  <div className="flex justify-between items-end">
                                      <div className="flex items-center gap-2 md:gap-3 text-pink-400">
                                          <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-pink-400/10 flex items-center justify-center border border-pink-400/20"><Venus size={16} /></div>
                                          <span className="text-[9px] md:text-[11px] font-black uppercase tracking-[0.2em]">Perempuan</span>
                                      </div>
                                      <span className="text-2xl md:text-3xl font-black">{jmlPerempuan.toLocaleString('id-ID')} <span className="text-[9px] opacity-30 font-medium">JIWA</span></span>
                                  </div>
                                  <div className="h-2.5 bg-white/5 rounded-full overflow-hidden border border-white/5 p-0.5">
                                      <div className="h-full bg-pink-500 shadow-[0_0_25px_rgba(236,72,153,0.5)] rounded-full transition-all duration-1000" style={{ width: `${persenPerempuan}%` }}></div>
                                  </div>
                              </div>
                          </div>
                      </div>

                      <div className="bg-white/[0.03] border border-white/10 rounded-[2.5rem] md:rounded-[4rem] p-10 md:p-16 flex flex-col items-center justify-center text-center space-y-4 md:space-y-6 backdrop-blur-2xl relative">
                          <div className="absolute inset-0 bg-gradient-to-b from-[#E3242B]/5 to-transparent rounded-[2.5rem] md:rounded-[4rem]"></div>
                          <div className="w-16 h-16 md:w-20 md:h-20 bg-[#E3242B] rounded-2xl md:rounded-3xl flex items-center justify-center text-white mb-2 shadow-[0_20px_40px_rgba(227,36,43,0.3)] relative z-10">
                               <BarChart3 size={32} />
                          </div>
                          <div className="space-y-1 md:space-y-2 relative z-10">
                              <h5 className="text-5xl md:text-7xl font-black tracking-tighter">
                                  {jmlPerempuan > 0 ? ((jmlLaki/jmlPerempuan) * 100).toFixed(1) : "0.0"}
                              </h5>
                              <p className="text-[10px] md:text-[12px] font-black text-[#E3242B] uppercase tracking-[0.4em] md:tracking-[0.5em]">Indeks Gender</p>
                          </div>
                          <p className="text-[8px] md:text-[10px] text-gray-500 uppercase font-bold tracking-[0.2em] px-4 md:px-8 relative z-10 leading-relaxed">
                              Rasio Jenis Kelamin per 100 Perempuan Terintegrasi Lab DDP IPB University
                          </p>
                      </div>
                  </div>
              </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};