import React, { useEffect, useState, useRef } from 'react';
import { 
  Database, Users, Map, Home, 
  Building2, Users2, ChevronLeft, ChevronRight,
  TrendingUp, PieChart, Activity, ShieldCheck, 
  BarChart3, Info, Mars, Venus, RefreshCcw, 
  CheckCircle2, Fingerprint, Award
} from 'lucide-react';
import { api } from '../api';

// --- Animated Counter ---
const Counter = ({ value, duration = 2500 }: { value: any, duration?: number }) => {
  const [count, setCount] = useState(0);
  const target = Number(value) || 0;

  useEffect(() => {
    let start = 0;
    if (target === 0) return;
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
  { label: 'Desa', key: 'desa', icon: Map },
  { label: 'Dusun', key: 'dusun', icon: Database },
  { label: 'Kelurahan', key: 'kelurahan', icon: Building2 },
  { label: 'RW', key: 'rw', icon: Home },
  { label: 'Keluarga', key: 'kk', icon: Users },
  { label: 'Jiwa', key: 'jiwa', icon: Users2 },
];

export const Statistics = () => {
  const [dbData, setDbData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // SOP: Intersection Observer untuk efek transisi masuk dari Hero
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    api.get('/public/capaian')
      .then(res => {
        if (res.data.length > 0) setDbData(res.data[0]);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Logika Auto-Scroll & Center Detection
  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        let nextScroll = scrollLeft + (clientWidth / 2);
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          nextScroll = 0;
        }
        scrollRef.current.scrollTo({ left: nextScroll, behavior: 'smooth' });
      }
    }, 4000); // Jalan otomatis setiap 4 detik
    return () => clearInterval(interval);
  }, []);

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollPos = scrollRef.current.scrollLeft;
      const cardWidth = 320 + 24; // Width + Gap
      const index = Math.round(scrollPos / cardWidth);
      setActiveIndex(index);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  const totalWilayah = (Number(dbData?.desa) || 0) + (Number(dbData?.kelurahan) || 0);
  const totalJiwa = dbData ? Number(dbData.jiwa) : 0;
  const jmlLaki = dbData ? Number(dbData.laki) : 0;
  const jmlPerempuan = dbData ? Number(dbData.perempuan) : 0;
  const persenLaki = totalJiwa > 0 ? (jmlLaki / totalJiwa) * 100 : 0;
  const persenPerempuan = totalJiwa > 0 ? (jmlPerempuan / totalJiwa) * 100 : 0;

  if (loading) return <div className="py-40 text-center animate-pulse text-gray-300 font-black uppercase text-[10px] tracking-[0.5em]">Memuat Analitik...</div>;

  return (
    <section 
      ref={sectionRef}
      id="statistics" 
      className={`py-24 bg-white px-6 lg:px-24 relative overflow-hidden transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:60px_60px] opacity-[0.15]"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-end gap-8 mb-16 pb-10 border-b border-gray-100">
          <div className="space-y-3 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-2">
               <span className="text-[10px] font-black text-[#E3242B] uppercase tracking-[0.3em]">Analitik Data Terpadu</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-[#111827] tracking-tighter uppercase leading-none">
              Capaian <span className="text-[#E3242B]">Pendataan</span>
            </h2>
            <p className="text-gray-500 font-bold text-xs uppercase tracking-widest max-w-lg leading-relaxed mt-4">
              Akumulasi data riil hasil kerja sama dengan masyarakat di <span className="text-[#111827] font-black">{totalWilayah}</span> Wilayah binaan seluruh Indonesia.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-gray-50 p-2 rounded-[2rem] border border-gray-100 shadow-inner">
            <button onClick={() => scroll('left')} className="w-14 h-14 rounded-2xl bg-white hover:bg-[#111827] hover:text-white transition-all shadow-sm flex items-center justify-center">
              <ChevronLeft size={24} />
            </button>
            <button onClick={() => scroll('right')} className="w-14 h-14 rounded-2xl bg-[#E3242B] text-white shadow-xl shadow-red-900/30 hover:scale-105 transition-all flex items-center justify-center">
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* --- STATS SLIDER DENGAN EFEK POP-OUT TENGAH --- */}
        <div 
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto gap-6 pb-20 no-scrollbar snap-x snap-mandatory pt-10"
        >
          {statsConfig.map((item, index) => (
            <div 
              key={index}
              className={`min-w-[300px] md:min-w-[340px] snap-center bg-white p-12 rounded-[3rem] border transition-all duration-700 flex flex-col items-center text-center relative
                ${index === activeIndex 
                  ? 'border-[#E3242B] shadow-[0_40px_80px_rgba(227,36,43,0.15)] scale-110 z-20' 
                  : 'border-gray-50 opacity-40 scale-90 grayscale'
                }`}
            >
              <div className={`w-20 h-20 rounded-[2rem] flex items-center justify-center mb-8 transition-all duration-500 ${index === activeIndex ? 'bg-[#E3242B] text-white rotate-12' : 'bg-gray-50 text-gray-300'}`}>
                <item.icon size={36} />
              </div>

              <div className="space-y-1">
                <h3 className={`text-6xl font-black tracking-tighter transition-colors duration-500 ${index === activeIndex ? 'text-[#111827]' : 'text-gray-200'}`}>
                  <Counter value={dbData ? dbData[item.key] : 0} />
                </h3>
                <p className="text-[11px] font-black text-gray-400 uppercase tracking-[0.5em] mt-3">{item.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* --- GRID ANALITIK --- */}
        <div className="grid lg:grid-cols-12 gap-8">
            
            <div className="lg:col-span-8 bg-[#111827] rounded-[4rem] p-10 md:p-14 text-white relative overflow-hidden shadow-2xl border border-white/5">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#E3242B] opacity-[0.05] blur-[120px] rounded-full"></div>
                
                <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-12">
                        <div className="space-y-3">
                            <h4 className="font-black text-3xl uppercase tracking-tighter">Rasio Demografi</h4>
                            <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.4em]">Proporsi Distribusi Gender</p>
                        </div>
                        
                        <div className="space-y-10">
                            <div className="space-y-4">
                                <div className="flex justify-between items-end">
                                    <div className="flex items-center gap-3 text-blue-400">
                                        <Mars size={18} />
                                        <span className="text-[10px] font-black uppercase tracking-widest">Laki-Laki</span>
                                    </div>
                                    <span className="text-2xl font-black">{jmlLaki.toLocaleString('id-ID')}</span>
                                </div>
                                <div className="h-3 bg-white/5 rounded-full overflow-hidden border border-white/5 p-0.5">
                                    <div className="h-full bg-blue-500 rounded-full transition-all duration-1000 shadow-[0_0_15px_rgba(59,130,246,0.5)]" style={{ width: `${persenLaki}%` }}></div>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="flex justify-between items-end">
                                    <div className="flex items-center gap-3 text-pink-400">
                                        <Venus size={18} />
                                        <span className="text-[10px] font-black uppercase tracking-widest">Perempuan</span>
                                    </div>
                                    <span className="text-2xl font-black">{jmlPerempuan.toLocaleString('id-ID')}</span>
                                </div>
                                <div className="h-3 bg-white/5 rounded-full overflow-hidden border border-white/5 p-0.5">
                                    <div className="h-full bg-pink-500 rounded-full transition-all duration-1000 shadow-[0_0_15px_rgba(236,72,153,0.5)]" style={{ width: `${persenPerempuan}%` }}></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/[0.03] border border-white/10 rounded-[3.5rem] p-12 flex flex-col items-center justify-center text-center space-y-6 backdrop-blur-3xl shadow-inner">
                        <div className="w-20 h-20 bg-[#E3242B] rounded-[2rem] flex items-center justify-center text-white shadow-2xl shadow-red-900/50">
                             <BarChart3 size={40} />
                        </div>
                        <div className="space-y-1">
                            <h5 className="text-6xl font-black tracking-tighter text-white">
                                {jmlPerempuan > 0 ? ((jmlLaki/jmlPerempuan) * 100).toFixed(1) : "0.0"}
                            </h5>
                            <p className="text-[11px] font-black text-[#E3242B] uppercase tracking-[0.5em] mt-2">Indeks Gender</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- REPLACEMENT CARD: OTENTIKASI DATA --- */}
            <div className="lg:col-span-4 bg-[#F9FAFB] rounded-[4rem] p-12 flex flex-col justify-between items-center text-center border border-gray-100 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-2 bg-[#E3242B]"></div>
                
                <div className="space-y-8 flex flex-col items-center">
                    <div className="w-24 h-24 bg-white rounded-[2.5rem] flex items-center justify-center shadow-xl border border-gray-50 group-hover:rotate-[360deg] transition-transform duration-1000">
                        <ShieldCheck size={48} className="text-[#E3242B]" />
                    </div>
                    
                    <div className="space-y-3 px-4">
                        <h4 className="text-2xl font-black text-[#111827] uppercase tracking-tighter leading-none">Otentikasi <br /> Lab DDP</h4>
                        <div className="flex items-center justify-center gap-2 py-2">
                            <div className="h-px w-8 bg-gray-200"></div>
                            <Award size={16} className="text-gray-400" />
                            <div className="h-px w-8 bg-gray-200"></div>
                        </div>
                        <p className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.25em] leading-relaxed">
                            Data telah melalui proses verifikasi spasial & sensus partisipatif.
                        </p>
                    </div>
                </div>

                <div className="w-full space-y-4">
                    <div className="bg-white p-5 rounded-3xl border border-gray-100 flex items-center justify-center gap-4 shadow-sm">
                        <Fingerprint size={24} className="text-[#111827]" />
                        <span className="text-[9px] font-black text-[#111827] uppercase tracking-[0.3em]">Verified Digital Asset</span>
                    </div>
                    <p className="text-[8px] font-black text-[#E3242B] uppercase tracking-[0.5em] animate-pulse">System Integrity Secure</p>
                </div>
            </div>
        </div>

      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
};