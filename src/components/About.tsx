import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal'; // SOP: Menambahkan import animasi

export const About = () => {
  return (
    <section id="about" className="py-24 bg-white px-6 lg:px-24 relative overflow-hidden selection:bg-[#E3242B] selection:text-white">
      
      {/* Dekorasi Latar Belakang */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gray-50 rounded-full blur-[120px] -z-0 opacity-40 translate-x-1/2 -translate-y-1/2"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* --- 1. HEADER (ANIMATED) --- */}
        <ScrollReveal>
          <div className="flex flex-col lg:flex-row justify-between items-center lg:items-end gap-8 mb-16 pb-10 border-b border-gray-100">
            <div className="space-y-3 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-2">
                 <span className="text-[10px] font-bold text-[#E3242B] tracking-widest uppercase">Profil Lembaga</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-[#111827] tracking-tighter leading-none">
                Membangun <span className="text-[#E3242B]">Kedaulatan Data</span>
              </h2>
              <p className="text-gray-500 font-medium text-sm max-w-md leading-relaxed">
                Inovasi metodologi untuk menyajikan basis big data Indonesia dari tingkat tapak.
              </p>
            </div>
            <div className="hidden lg:flex items-center gap-3 text-gray-300">
               <ShieldCheck size={20} />
               <span className="text-[10px] font-bold tracking-widest uppercase">Metodologi Terverifikasi</span>
            </div>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-12 gap-16 items-center">
          
          {/* --- 2. VISUAL SECTION (ANIMATED DELAY 0.2) --- */}
          <div className="lg:col-span-6 order-2 lg:order-1 relative group">
            <ScrollReveal delay={0.2} direction="right">
              <div className="absolute -inset-4 bg-[#E3242B]/5 blur-[80px] rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-1000"></div>
              
              <div className="relative rounded-[3rem] overflow-hidden border-[10px] border-gray-50 shadow-2xl transition-all duration-700">
                 <img 
                   src="/img/gambarberita6.jpg" 
                   alt="Unit Data Desa Presisi" 
                   className="w-full h-[400px] md:h-[500px] object-cover grayscale-[40%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" 
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-[#111827]/80 via-transparent to-transparent opacity-60"></div>
                 
                 {/* Badge Informasi */}
                 <div className="absolute bottom-8 left-8 flex items-center gap-4 bg-white/10 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/20 shadow-2xl">
                    <Zap size={20} className="text-[#E3242B] fill-[#E3242B]" />
                    <div className="h-8 w-px bg-white/20"></div>
                    <span className="text-[10px] font-bold text-white tracking-widest leading-tight uppercase">
                      Teknologi Spasial <br /> & Sensus Digital
                    </span>
                 </div>
              </div>

              {/* Statistik Cepat */}
              <div className="absolute -bottom-6 -right-6 bg-[#111827] p-8 rounded-[2.5rem] shadow-2xl border border-white/10 hidden md:block transform group-hover:-translate-y-2 transition-transform duration-500">
                  <div className="flex items-center gap-6">
                      <div className="text-center space-y-1">
                          <p className="text-2xl font-black text-white tracking-tighter">573+</p>
                          <p className="text-[8px] font-bold text-[#E3242B] tracking-widest uppercase">Desa</p>
                      </div>
                      <div className="w-px h-10 bg-white/10"></div>
                      <div className="text-center space-y-1">
                          <p className="text-2xl font-black text-white tracking-tighter">14</p>
                          <p className="text-[8px] font-bold text-[#E3242B] tracking-widest uppercase">Provinsi</p>
                      </div>
                  </div>
              </div>
            </ScrollReveal>
          </div>

          {/* --- 3. CONTENT SECTION (ANIMATED DELAY 0.4) --- */}
          <div className="lg:col-span-6 order-1 lg:order-2 space-y-10 text-center lg:text-left flex flex-col items-center lg:items-start">
            <ScrollReveal delay={0.4} direction="left">
              <div className="space-y-10">
                <div className="space-y-6">
                  <h3 className="text-[#111827] text-xl md:text-2xl font-bold leading-tight tracking-tight max-w-xl text-center lg:text-left">
                    "Data Desa Presisi sebagai basis membangun Indonesia dari bawah"
                  </h3>
                  
                  <div className="space-y-6 text-gray-500 font-medium text-sm md:text-base leading-relaxed">
                    <p className="text-justify">
                      Merupakan inovasi metodologi dari IPB University untuk menyajikan data yang akurat, aktual, dan terverifikasi sebagai landasan pembangunan nasional.
                    </p>
                    <div className="p-6 md:p-8 bg-gray-50 rounded-[2.5rem] border-l-4 md:border-l-8 border-[#111827] text-[#111827] shadow-inner">
                      <p className="text-justify leading-relaxed">
                        Data dikumpulkan melalui kolaborasi aktif warga desa dengan pendampingan akademisi, menggabungkan teknologi spasial tingkat tinggi dengan kearifan lokal.
                      </p>
                    </div>
                  </div>
                </div>

                {/* CTA & Trust Indicators */}
                <div className="pt-4 flex flex-col sm:flex-row items-center gap-10">
                  <Link 
                    to="/about" 
                    className="group flex items-center gap-4 bg-[#E3242B] text-white px-10 py-5 rounded-2xl font-bold tracking-wide text-xs shadow-xl hover:bg-[#111827] transition-all duration-500 active:scale-95"
                  >
                    Jelajahi Profil <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                  </Link>
                  
                  <div className="flex items-center gap-4 border-l border-gray-100 pl-8 hidden sm:flex">
                    <div className="flex -space-x-3">
                        <div className="w-10 h-10 rounded-full border-4 border-white bg-white overflow-hidden shadow-md flex items-center justify-center">
                            <img 
                              src="/img/LogoFema.png" 
                              alt="FEMA IPB" 
                              className="w-full h-full object-contain p-1"
                              onError={(e) => { e.currentTarget.src = "https://via.placeholder.com/150"; }}
                            />
                        </div>
                    </div>
                    <div className="text-[10px] font-bold text-gray-400 tracking-wider leading-tight text-left">
                        Official Lab <br /> <span className="text-[#111827]">DDP IPB University</span>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

        </div>
      </div>
    </section>
  );
};