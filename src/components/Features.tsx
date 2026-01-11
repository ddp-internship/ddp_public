import React from 'react';
import { Zap, LayoutGrid, ArrowUpRight, ShieldCheck } from 'lucide-react';

// 1. Tambahkan properti 'link' ke interface AppItem
interface AppItem {
  name: string;
  desc: string;
  img: string;
  tag: string;
  link: string; // Tautan tujuan
}

// 2. Tambahkan tautan ke data apps
const apps: AppItem[] = [
  { 
    name: 'Merdesa Sensus', 
    desc: 'Aplikasi sensus keluarga partisipatif terintegrasi data spasial untuk profil penduduk.',
    img: '/img/apps/logo-sensus.png', 
    tag: 'Sensus Digital',
    link: 'https://play.google.com/store/apps/details?id=id.desapresisi.merdesasensus&hl=en' // Contoh link 1
  },
  { 
    name: 'Merdesa Maps', 
    desc: 'Teknologi pemetaan partisipatif untuk pendataan sarana, vegetasi, dan batas wilayah presisi.',
    img: '/img/apps/logo-maps.png', 
    tag: 'Geospasial',
    link: 'https://play.google.com/store/apps/details?id=id.desapresisi.merdesamaps&hl=id' // Contoh link 2
  },
  { 
    name: 'Merdesa Monev', 
    desc: 'Sistem monitoring untuk memantau progres dan kualitas hasil pendataan lapangan real-time.',
    img: '/img/apps/logo-monev.png', 
    tag: 'Pemantauan',
    link: 'https://monev.desapresisi.id/signin' // Contoh link 3
  },
  { 
    name: 'Merdesa WebGIS', 
    desc: 'Dashboard analisis data desa untuk pemangku kebijakan melihat capaian pembangunan.',
    img: '/img/apps/logo-webgis.png', 
    tag: 'Analitik',
    link: 'https://webgis.desapresisi.id/account/login' // Contoh link 4
  },
];

export const Features = () => {
  return (
    <section id="features" className="py-24 md:py-32 bg-[#FDFDFD] overflow-hidden selection:bg-[#E3242B] selection:text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-24 relative">
        
        {/* --- 1. HEADER (KONSISTEN: CENTERED ON MOBILE, LEFT ON DESKTOP) --- */}
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-end gap-8 mb-20 pb-10 border-b border-gray-100">
          <div className="space-y-3 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-2">
               <span className="text-[10px] font-black text-[#E3242B] uppercase tracking-[0.3em]">Rangkaian Perangkat Lunak</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-[#111827] tracking-tighter uppercase leading-none">
              Ekosistem <span className="text-[#E3242B]">Aplikasi</span>
            </h2>
            <p className="text-gray-500 font-bold text-xs uppercase tracking-widest max-w-md leading-relaxed">
              Rangkaian alat digital terintegrasi untuk kedaulatan data desa Indonesia.
            </p>
          </div>
          <div className="hidden lg:flex items-center gap-3 text-gray-300">
             <ShieldCheck size={20} />
             <span className="text-[10px] font-black uppercase tracking-widest">Keamanan Terverifikasi</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-16 items-start">
          
          {/* --- 2. APPS LIST (STANDARDIZED GRID) --- */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {apps.map((app, i) => (
                // 3. Bungkus item dengan tag <a> dan tambahkan href, target="_blank" untuk membuka di tab baru
                <a 
                  key={i} 
                  href={app.link} 
                  target="_blank" 
                  rel="noopener noreferrer" // Penting untuk keamanan saat menggunakan target="_blank"
                  className="group bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl hover:border-[#E3242B]/20 transition-all duration-500 flex flex-col h-full text-center lg:text-left items-center lg:items-start justify-between cursor-pointer"
                >
                   
                   <div className="space-y-6 w-full">
                      <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
                        {/* Logo Container - Penyeragaman Ukuran */}
                        <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center p-3 group-hover:bg-white transition-all duration-500 border border-gray-100 shadow-inner overflow-hidden">
                           <img 
                            src={app.img} 
                            alt={app.name} 
                            className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-500"
                           />
                        </div>
                        <span className="text-[8px] font-black text-gray-300 group-hover:text-[#E3242B] transition-colors uppercase tracking-[0.2em] bg-gray-50 px-3 py-1 rounded-full">{app.tag}</span>
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="text-lg font-black text-[#111827] uppercase tracking-tighter leading-tight">{app.name}</h4>
                        <p className="text-[11px] text-gray-400 leading-relaxed font-bold uppercase tracking-tight line-clamp-3">
                          {app.desc}
                        </p>
                      </div>
                   </div>

                   <div className="pt-6 w-full flex justify-center lg:justify-start">
                      <div className="flex items-center gap-2 text-[9px] font-black text-[#E3242B] opacity-40 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 uppercase tracking-widest">
                         Lihat Detail <ArrowUpRight size={12} />
                      </div>
                   </div>
                </a>
              ))}
            </div>
          </div>

          {/* --- 3. VISUAL MOCKUP (FOKUS EKSEKUTIF) --- */}
          <div className="lg:col-span-5 order-1 lg:order-2 flex justify-center">
             <div className="relative w-full max-w-[450px]">
                {/* Decorative Layer */}
                <div className="absolute -inset-4 bg-[#E3242B]/5 blur-[80px] rounded-full"></div>
                
                <div className="relative bg-[#111827] rounded-[3.5rem] p-6 md:p-8 border border-white/10 shadow-2xl overflow-hidden group">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex gap-2">
                            <div className="w-2 h-2 rounded-full bg-red-500/40"></div>
                            <div className="w-2 h-2 rounded-full bg-emerald-500/40"></div>
                        </div>
                        <span className="text-[8px] font-black text-gray-500 tracking-widest uppercase">Antarmuka Sistem</span>
                    </div>

                    <img 
                      src="/img/DDPApps.png" 
                      alt="Mockup" 
                      className="w-full h-auto drop-shadow-2xl transform group-hover:scale-105 transition-transform duration-[2000ms]" 
                    />

                    {/* Floating Info Box */}
                    <div className="mt-8 p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-[#E3242B] rounded-xl flex items-center justify-center text-white">
                                <LayoutGrid size={18} />
                            </div>
                            <div className="text-left">
                                <p className="text-[8px] font-black text-gray-500 uppercase tracking-widest leading-none">Status</p>
                                <p className="text-[10px] font-bold text-white mt-1">Sistem Aktif</p>
                            </div>
                        </div>
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_15px_#10b981]"></div>
                    </div>
                </div>
             </div>
          </div>

        </div>

      </div>
    </section>
  );
};
