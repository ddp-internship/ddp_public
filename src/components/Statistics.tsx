import React, { useEffect, useState, useRef } from 'react';
import { 
  Database, Users, Map, Home, 
  Building2, Users2, ChevronLeft, ChevronRight,
  TrendingUp, PieChart, Activity, ShieldCheck, 
  BarChart3, Info, Mars, Venus, RefreshCcw
} from 'lucide-react';
import { api } from '../api';

// --- Animated Counter (Sesuai SOP) ---
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

// --- Config Data (Simplified & Centered) ---
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
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // SOP: Sinkronisasi data capaian dari backend
    api.get('/public/capaian')
      .then(res => {
        if (res.data.length > 0) setDbData(res.data[0]);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  // Logika Perhitungan Dinamis (Desa + Kelurahan)
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
    <section id="statistics" className="py-24 bg-white px-6 lg:px-24 relative overflow-hidden selection:bg-[#E3242B] selection:text-white">
      
      {/* Background Decor - Subtle Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:60px_60px] opacity-[0.15]"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* --- 1. HEADER (KONSISTEN DENGAN PARTNERS) --- */}
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-end gap-8 mb-16 pb-10 border-b border-gray-100">
          <div className="space-y-3 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-2">
               <span className="text-[10px] font-black text-[#E3242B] uppercase tracking-[0.3em]">Analitik Data</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-[#111827] tracking-tighter uppercase leading-none">
              Capaian <span className="text-[#E3242B]">Pendataan</span>
            </h2>
            <p className="text-gray-500 font-bold text-xs uppercase tracking-widest max-w-md leading-relaxed">
              Bekerja sama dengan masyarakat di <span className="text-[#111827] font-black">{totalWilayah}</span> Desa & Kelurahan seluruh Indonesia.
            </p>
          </div>

          {/* Navigation Controls - Custom Premium Style */}
          <div className="flex items-center gap-3 bg-gray-50 p-1.5 rounded-2xl border border-gray-100 shadow-inner">
            <button onClick={() => scroll('left')} className="w-12 h-12 rounded-xl bg-white hover:bg-[#111827] hover:text-white transition-all shadow-sm flex items-center justify-center group">
              <ChevronLeft size={20} />
            </button>
            <button onClick={() => scroll('right')} className="w-12 h-12 rounded-xl bg-[#E3242B] text-white shadow-xl shadow-red-900/30 hover:scale-105 transition-all flex items-center justify-center group">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* --- 2. STATS SLIDER (CENTERED CONTENT) --- */}
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto gap-6 pb-16 no-scrollbar snap-x snap-mandatory"
        >
          {statsConfig.map((item, index) => (
            <div 
              key={index}
              className="min-w-[280px] md:min-w-[320px] snap-center bg-white p-12 rounded-[2.5rem] border border-gray-50 shadow-sm hover:shadow-[0_30px_60px_rgba(0,0,0,0.06)] transition-all duration-700 group flex flex-col items-center text-center relative overflow-hidden"
            >
              {/* Center Icon - No Shadow Border */}
              <div className="w-20 h-20 bg-gray-50 text-gray-400 rounded-3xl flex items-center justify-center mb-8 group-hover:bg-[#E3242B] group-hover:text-white transition-all duration-500">
                <item.icon size={36} />
              </div>

              <div className="space-y-1 relative z-10">
                <h3 className="text-6xl font-black text-[#111827] tracking-tighter group-hover:text-[#E3242B] transition-colors duration-500">
                  <Counter value={dbData ? dbData[item.key] : 0} />
                </h3>
                <p className="text-[12px] font-black text-gray-400 uppercase tracking-[0.5em] mt-2 group-hover:text-gray-600 transition-colors">{item.label}</p>
              </div>

              {/* Minimalist Line Decor */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-50">
                  <div className="h-full bg-[#E3242B] opacity-0 group-hover:opacity-100 transition-all duration-1000 w-full"></div>
              </div>
            </div>
          ))}
        </div>

        {/* --- 3. DEMOGRAPHIC & REAL-TIME ANALYTICS --- */}
        <div className="grid lg:grid-cols-12 gap-8">
            
            {/* Demographic Card */}
            <div className="lg:col-span-8 bg-[#111827] rounded-[3.5rem] p-10 md:p-12 text-white relative overflow-hidden shadow-2xl border border-white/5">
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#E3242B] opacity-[0.03] blur-[120px] rounded-full"></div>
                
                <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-10">
                        <div className="space-y-3">
                            <h4 className="font-black text-2xl uppercase tracking-tighter">Rasio Demografi</h4>
                            <p className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.3em] opacity-60">Distribusi Gender</p>
                        </div>
                        
                        <div className="space-y-8">
                            {/* Laki-Laki */}
                            <div className="space-y-4">
                                <div className="flex justify-between items-end">
                                    <div className="flex items-center gap-3 text-blue-400">
                                        <div className="w-8 h-8 rounded-lg bg-blue-400/10 flex items-center justify-center"><Mars size={14} /></div>
                                        <span className="text-[10px] font-black uppercase tracking-widest">Laki-Laki</span>
                                    </div>
                                    <span className="text-xl font-black">{jmlLaki.toLocaleString('id-ID')} <span className="text-[10px] opacity-30 font-medium">JIWA</span></span>
                                </div>
                                <div className="h-2 bg-white/5 rounded-full overflow-hidden border border-white/5">
                                    <div className="h-full bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all duration-1000" style={{ width: `${persenLaki}%` }}></div>
                                </div>
                            </div>
                            {/* Perempuan */}
                            <div className="space-y-4">
                                <div className="flex justify-between items-end">
                                    <div className="flex items-center gap-3 text-pink-400">
                                        <div className="w-8 h-8 rounded-lg bg-pink-400/10 flex items-center justify-center"><Venus size={14} /></div>
                                        <span className="text-[10px] font-black uppercase tracking-widest">Perempuan</span>
                                    </div>
                                    <span className="text-xl font-black">{jmlPerempuan.toLocaleString('id-ID')} <span className="text-[10px] opacity-30 font-medium">JIWA</span></span>
                                </div>
                                <div className="h-2 bg-white/5 rounded-full overflow-hidden border border-white/5">
                                    <div className="h-full bg-pink-500 shadow-[0_0_20px_rgba(236,72,153,0.4)] transition-all duration-1000" style={{ width: `${persenPerempuan}%` }}></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Gender Index Visualization */}
                    <div className="bg-white/[0.02] border border-white/5 rounded-[3rem] p-10 flex flex-col items-center justify-center text-center space-y-4 backdrop-blur-xl">
                        <div className="w-16 h-16 bg-[#E3242B]/10 rounded-2xl flex items-center justify-center text-[#E3242B] mb-2">
                             <BarChart3 size={32} />
                        </div>
                        <div className="space-y-1">
                            <h5 className="text-5xl font-black tracking-tighter">
                                {jmlPerempuan > 0 ? ((jmlLaki/jmlPerempuan) * 100).toFixed(1) : "0.0"}
                            </h5>
                            <p className="text-[10px] font-black text-[#E3242B] uppercase tracking-[0.4em]">Indeks Gender</p>
                        </div>
                        <p className="text-[9px] text-gray-500 uppercase font-bold tracking-widest px-4">Rasio Jenis Kelamin per 100 Perempuan</p>
                    </div>
                </div>
            </div>

            {/* Real-time Status Card */}
            <div className="lg:col-span-4 bg-[#F9FAFB] rounded-[3.5rem] p-12 flex flex-col justify-between items-center text-center group border border-gray-100 shadow-sm">
                <div className="relative">
                    <div className="w-24 h-24 bg-white text-[#E3242B] rounded-[2.5rem] flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-700">
                        <Activity size={44} className="animate-pulse" />
                    </div>
                    <div className="absolute -right-2 -bottom-2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg border-4 border-[#F9FAFB]">
                        <div className="w-3 h-3 bg-emerald-500 rounded-full animate-ping"></div>
                    </div>
                </div>
                
                <div className="space-y-4">
                    <h4 className="text-2xl font-black text-[#111827] uppercase tracking-tighter leading-tight">Data <br /> Sinkron</h4>
                    <p className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.2em] leading-relaxed px-4">
                        Informasi dimutakhirkan secara otomatis melalui integrasi Lab DDP IPB University.
                    </p>
                </div>

                <div className="flex items-center gap-2 text-[#111827] font-black text-[9px] uppercase tracking-[0.4em] pt-6 border-t border-gray-200 w-full justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> Koneksi Aktif
                </div>
            </div>
        </div>

      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f1f1f1; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #E3242B; border-radius: 10px; }
      `}</style>
    </section>
  );
};