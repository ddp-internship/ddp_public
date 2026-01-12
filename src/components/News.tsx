import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, X, Clock, Newspaper, 
  ChevronLeft, ChevronRight, Zap, Hash, 
  ShieldCheck, Tag, ArrowUpRight, MonitorPlay,
  User, Bookmark, Share2
} from 'lucide-react';
import { api, getStorageUrl } from '../api';

export const News = () => {
  // --- STATE MANAGEMENT ---
  const [items, setItems] = useState<any[]>([]);
  const [totalBerita, setTotalBerita] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedNews, setSelectedNews] = useState<any>(null);

  // --- FETCH DATA ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        const newsRes = await api.get('/public/berita');
        setItems(newsRes.data);
        const countRes = await api.get('/public/berita/count');
        setTotalBerita(countRes.data.total);
      } catch (error) {
        console.error("Gagal sinkronisasi data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Lock scroll body saat modal aktif
  useEffect(() => {
    document.body.style.overflow = selectedNews ? 'hidden' : 'auto';
  }, [selectedNews]);

  if (loading) return (
    <div className="py-40 text-center space-y-3">
      <div className="w-8 h-8 border-3 border-[#E3242B] border-t-transparent rounded-full animate-spin mx-auto"></div>
      <p className="text-[8px] font-black text-gray-300 uppercase tracking-widest">Sinkronisasi Warta...</p>
    </div>
  );

  if (items.length === 0) return null;

  return (
    <section id="news" className="py-24 bg-white px-6 lg:px-24 relative overflow-hidden selection:bg-[#E3242B] selection:text-white">
      
      {/* Watermark Background (Seragam) */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 text-gray-50 text-[12rem] font-black uppercase tracking-tighter pointer-events-none select-none opacity-40">
        Newsroom
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* --- 1. HEADER (PENYERAGAMAN TOTAL) --- */}
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-end gap-8 mb-16 pb-10 border-b border-gray-100">
          <div className="space-y-3 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-2">
               <span className="text-[10px] font-black text-[#E3242B] uppercase tracking-[0.3em]">Pusat Media</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-[#111827] tracking-tighter uppercase leading-none">
              Pusat <span className="text-[#E3242B]">Warta</span>
            </h2>
            <p className="text-gray-500 font-bold text-xs uppercase tracking-widest max-w-md leading-relaxed">
              Publikasi resmi dan kabar terkini mengenai transformasi data desa di Indonesia.
            </p>
          </div>
          
          <Link to="/news" className="group flex items-center gap-3 px-8 py-4 bg-[#111827] text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-[#E3242B] transition-all duration-500 shadow-xl shadow-navy/20 active:scale-95">
           Jelajahi Arsip Publikasi <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* --- 2. MAIN CONTENT GRID (INDEKS) --- */}
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-8 space-y-12">
            {/* Headline Card */}
            <div onClick={() => setSelectedNews(items[0])} className="group cursor-pointer relative rounded-[3rem] overflow-hidden shadow-2xl transition-all duration-1000 h-[450px] border-4 border-white bg-gray-50">
              <img src={items[0].gambar_url} className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-105" alt="Headline" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-[#111827]/20 to-transparent"></div>
              <div className="absolute bottom-10 left-10 right-10 space-y-4 text-left">
                <span className="bg-[#E3242B] text-white px-5 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest shadow-xl">BERITA TERKINI</span>
                <h3 className="text-2xl md:text-3xl font-black text-white leading-tight tracking-tighter group-hover:text-red-100 transition-colors line-clamp-2">
                  {items[0].judul_artikel}
                </h3>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-10">
                {items.slice(1, 3).map((news) => (
                    <div key={news.id} onClick={() => setSelectedNews(news)} className="group cursor-pointer space-y-6 text-left">
                        <div className="relative aspect-video rounded-[2.5rem] overflow-hidden shadow-xl border-4 border-white bg-gray-50">
                            <img src={news.gambar_url} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="News" />
                        </div>
                        <div className="px-2 space-y-3">
                            <h4 className="text-lg font-black text-[#111827] group-hover:text-[#E3242B] transition-colors leading-tight tracking-tighter line-clamp-2">
                                {news.judul_artikel}
                            </h4>
                            <p className="text-gray-400 font-bold text-[9px] uppercase tracking-widest">{news.tanggal}</p>
                        </div>
                    </div>
                ))}
            </div>
          </div>

          {/* SIDEBAR SIDE */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-[#111827] rounded-[3.5rem] p-10 text-white relative overflow-hidden shadow-2xl border border-white/5">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#E3242B] opacity-10 blur-3xl"></div>
                <div className="relative z-10 space-y-8 text-left">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 shadow-lg">
                            <MonitorPlay size={18} className="text-[#E3242B]" />
                        </div>
                        <span className="text-[11px] font-black uppercase tracking-[0.3em]">desa presisi ipb official</span>
                    </div>
                    <div className="aspect-video rounded-[2.5rem] overflow-hidden border border-white/10 bg-black shadow-inner">
                        <iframe width="100%" height="100%" src="https://www.youtube.com/embed/B83_p6gRj-Q" title="YouTube" frameBorder="0" allowFullScreen className="grayscale-[0.4] hover:grayscale-0 transition-all duration-1000"></iframe>
                    </div>
                    <h4 className="font-black uppercase text-[11px] tracking-widest text-white leading-tight">Dokumenter Pendataan Desa Presisi Nasional</h4>
                </div>
            </div>
            <div className="p-8 bg-gray-50 rounded-[3rem] border border-gray-100 shadow-inner space-y-4">
                <div className="flex items-center justify-between">
                    <div className="w-12 h-12 bg-white text-[#E3242B] rounded-2xl flex items-center justify-center shadow-md"><Hash size={20} /></div>
                    <span className="text-3xl font-black text-[#111827] tracking-tighter">{totalBerita}</span>
                </div>
                <p className="text-[10px] font-black text-[#111827] uppercase tracking-widest text-left">Total Publikasi Terverifikasi</p>
            </div>
          </div>
        </div>
      </div>

      {/* --- 3. THE IMMERSIVE EDITORIAL READER (CNN/KOMPAS STYLE) --- */}
      {selectedNews && createPortal(
        <div className="fixed inset-0 z-[100000] flex items-center justify-center">
          <div className="absolute inset-0 bg-[#0a0f1a]/98 backdrop-blur-3xl animate-fade-in" onClick={() => setSelectedNews(null)}></div>
          
          <div className="relative bg-white w-full h-full md:max-w-6xl md:h-[90vh] md:rounded-[4rem] overflow-hidden shadow-[0_60px_120px_rgba(0,0,0,0.5)] flex flex-col animate-in zoom-in-95 duration-500 border border-white/10">
            
            {/* Reading Progress Bar (Premium Inovation) */}
            <div className="absolute top-0 left-0 h-1.5 bg-[#E3242B] z-[60] transition-all duration-300 w-full opacity-20"></div>

            {/* Header Modal (Statis) */}
            <div className="flex items-center justify-between px-8 md:px-14 py-6 bg-white border-b sticky top-0 z-50">
                <div className="flex items-center gap-4">
                    <span className="bg-[#E3242B] text-white px-4 py-1 rounded-full font-black text-[9px] uppercase tracking-widest">{selectedNews.kategori}</span>
                    <div className="h-4 w-px bg-gray-200"></div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest hidden sm:block">Lab DDP IPB Press Release</span>
                </div>
                <div className="flex items-center gap-2">
                    <button className="p-2.5 text-gray-400 hover:text-[#111827] transition-all"><Share2 size={20}/></button>
                    <button onClick={() => setSelectedNews(null)} className="p-2.5 bg-gray-100 text-gray-400 hover:text-[#E3242B] rounded-full transition-all"><X size={24}/></button>
                </div>
            </div>

            {/* Area Konten dengan Layout Editorial */}
            <div className="flex-1 overflow-y-auto custom-scrollbar bg-white">
                <div className="max-w-5xl mx-auto flex flex-col items-center">
                    
                    {/* Editorial Hero Image */}
                    <div className="w-full aspect-video md:aspect-[21/9] overflow-hidden relative border-b border-gray-100">
                        <img src={selectedNews.gambar_url} className="w-full h-full object-cover" alt="Hero" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    </div>

                    {/* Editorial Content */}
                    <div className="w-full px-6 md:px-20 py-12 md:py-20 space-y-12 text-left">
                        
                        {/* Title Section */}
                        <div className="space-y-8 max-w-4xl">
                            <h1 className="text-3xl md:text-6xl font-black text-[#111827] tracking-tighter leading-[1.05]">
                                {selectedNews.judul_artikel}
                            </h1>
                            
                            <div className="flex flex-wrap items-center gap-6 py-8 border-y border-gray-100">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-[#111827] text-[#E3242B] rounded-2xl flex items-center justify-center font-black text-lg uppercase shadow-xl transform -rotate-3">{selectedNews.penulis.charAt(0)}</div>
                                    <div className="space-y-0.5">
                                        <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Penulis Redaksi</p>
                                        <p className="text-sm font-black text-[#111827] uppercase">{selectedNews.penulis}</p>
                                    </div>
                                </div>
                                <div className="h-10 w-px bg-gray-100 hidden sm:block"></div>
                                <div className="space-y-0.5">
                                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Diterbitkan Pada</p>
                                    <p className="text-sm font-black text-[#E3242B] uppercase">{selectedNews.tanggal}</p>
                                </div>
                            </div>
                        </div>

                        {/* Narasi Utama (Fokus Readability) */}
                        {/* Perubahan: text-justify diganti menjadi text-left */}
                        <div className="text-gray-700 text-lg md:text-2xl leading-[2] md:leading-[2.4] font-medium text-left tracking-normal whitespace-pre-line relative z-10">
                            {/* Watermark di dalam teks agar premium */}
                            <div className="absolute top-40 left-1/2 -translate-x-1/2 -z-10 opacity-[0.03] select-none text-[15rem] font-black pointer-events-none uppercase tracking-tighter">
                                DDP
                            </div>
                            
                            {selectedNews.isi_artikel.split('\n').map((para: string, i: number) => (
                                <p key={i} className={`mb-12 ${i === 0 ? "first-letter:text-8xl md:first-letter:text-[12rem] first-letter:font-black first-letter:text-[#E3242B] first-letter:mr-6 first-letter:float-left first-letter:leading-none first-letter:mt-4" : ""}`}>
                                    {para}
                                </p>
                            ))}
                        </div>

                        {/* End of Article Branding */}
                        <div className="pt-20 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-8 opacity-60">
                            <div className="flex items-center gap-4">
                                <ShieldCheck size={32} className="text-emerald-500" />
                                <div className="space-y-1">
                                    <span className="text-[11px] font-black text-[#111827] uppercase tracking-widest">Verified Press Release</span>
                                    <p className="text-[9px] font-bold text-gray-400 uppercase">Dokumen Resmi Laboratory Data Desa Presisi IPB University.</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Zap size={14} className="text-[#E3242B]" />
                                <span className="text-[9px] font-black text-[#111827] uppercase tracking-[0.4em]">Official Release 2026</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

          </div>
        </div>,
        document.body
      )}

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #E3242B; border-radius: 10px; }
      `}</style>
    </section>
  );
};