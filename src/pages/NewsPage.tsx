import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { 
  ChevronLeft, ChevronRight, X, Clock, Zap, 
  Newspaper, ArrowUpRight, ArrowDown, ShieldCheck, Tag
} from 'lucide-react';
import { api, getStorageUrl } from '../api';

export const NewsPage = () => {
  // --- STATE MANAGEMENT ---
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('Berita');
  const [selectedNews, setSelectedNews] = useState<any>(null);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  // --- FETCH DATA ---
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/public/berita/all?page=${page}&kategori=${activeTab}`);
        setItems(res.data.data || []);
        setLastPage(res.data.last_page || 1);
      } catch (error) {
        console.error("Gagal sinkronisasi warta");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page, activeTab]);

  useEffect(() => {
    document.body.style.overflow = selectedNews ? 'hidden' : 'auto';
  }, [selectedNews]);

  return (
    <div className="bg-[#FDFDFD] min-h-screen selection:bg-[#E3242B] selection:text-white font-sans text-left">
      
      {/* --- 1. HERO HEADER (ANIMATED & SOVEREIGN DESIGN) --- */}
      <section className="relative pt-32 pb-24 md:pt-52 md:pb-44 bg-[#111827] overflow-hidden rounded-b-[3.5rem] md:rounded-b-[6rem]">
        {/* Background Layers */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'url("/img/pattern.png")', backgroundSize: '120px' }}></div>
        <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-gradient-to-br from-[#E3242B]/10 to-transparent blur-[180px] rounded-full translate-x-1/4 -translate-y-1/4"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-center lg:items-end gap-10 md:gap-12">
            
            <div className="max-w-4xl space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-1000">
              {/* Badge Dinamis dengan Animasi */}
              <div className="inline-flex items-center gap-4 px-5 py-2.5 bg-white/5 border border-white/10 rounded-full backdrop-blur-md">
                 <Zap size={14} className="text-[#E3242B] animate-pulse" />
                 <span className="text-[9px] md:text-[10px] font-black text-gray-300 uppercase tracking-[0.4em]">Pusat Media Resmi</span>
              </div>
              
              <div className="relative">
                  {/* Watermark Background (Mewah) */}
                  <h2 className="absolute -top-16 left-0 text-white/[0.02] text-[8rem] md:text-[12rem] font-black uppercase tracking-tighter pointer-events-none select-none hidden lg:block">
                    PRESISI
                  </h2>
                  <h1 className="text-5xl md:text-[100px] font-black text-white uppercase tracking-tighter leading-[0.9] relative z-10">
                    Warta <br /> 
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E3242B] to-[#ff4d4d]">
                        Presisi
                    </span>
                  </h1>
              </div>
            </div>

            {/* TAB SWITCHER dengan Animasi */}
            <div className="flex bg-white/5 p-1.5 rounded-[2rem] border border-white/10 backdrop-blur-md shadow-2xl animate-in fade-in zoom-in-95 duration-1000 delay-500">
                <button 
                  onClick={() => { setActiveTab('Berita'); setPage(1); }}
                  className={`px-8 md:px-12 py-4 rounded-[1.5rem] font-black text-[10px] md:text-[11px] uppercase tracking-widest transition-all duration-500 ${activeTab === 'Berita' ? 'bg-[#E3242B] text-white shadow-xl scale-105' : 'text-gray-500 hover:text-white'}`}
                >
                  Berita
                </button>
                <button 
                  onClick={() => { setActiveTab('Artikel'); setPage(1); }}
                  className={`px-8 md:px-12 py-4 rounded-[1.5rem] font-black text-[10px] md:text-[11px] uppercase tracking-widest transition-all duration-500 ${activeTab === 'Artikel' ? 'bg-[#111827] text-white shadow-xl' : 'text-gray-500 hover:text-white'}`}
                >
                  Artikel
                </button>
            </div>
          </div>
        </div>
        
        {/* Decorative Scroll Hint */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-20">
            <ArrowDown size={14} className="text-white animate-bounce" />
        </div>
      </section>

      {/* --- 2. THE NEWS GRID (TEMPO/KOMPAS STYLE) --- */}
      <main className="py-20 px-6 bg-white relative -mt-12 z-20">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="py-40 text-center">
               <div className="w-10 h-10 border-4 border-[#E3242B] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
               <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.4em]">Sinkronisasi Redaksi...</p>
            </div>
          ) : (
            <div className="space-y-20 animate-in fade-in duration-1000">
                
                {/* HEADLINE CARD */}
                {page === 1 && items.length > 0 && (
                    <div 
                        onClick={() => setSelectedNews(items[0])}
                        className="group cursor-pointer grid lg:grid-cols-12 gap-8 md:gap-16 items-start border-b border-gray-100 pb-16"
                    >
                        <div className="lg:col-span-8 relative rounded-[2.5rem] md:rounded-[4rem] overflow-hidden shadow-2xl bg-gray-50 aspect-video lg:aspect-auto lg:h-[550px] border-4 border-white">
                            <img src={items[0].gambar_url} className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-105" alt="Main" />
                            <div className="absolute top-6 left-6">
                                <span className="bg-[#E3242B] text-white px-5 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-xl">UTAMA</span>
                            </div>
                        </div>
                        <div className="lg:col-span-4 space-y-6 pt-2">
                            <div className="flex items-center gap-3 text-[#E3242B] font-black text-[10px] uppercase tracking-widest">
                                <Tag size={14} /> {items[0].tanggal}
                            </div>
                            <h2 className="text-3xl md:text-5xl font-black text-[#111827] tracking-tighter leading-[1.1] group-hover:text-[#E3242B] transition-colors">
                                {items[0].judul_artikel}
                            </h2>
                            <p className="text-gray-500 font-bold text-sm md:text-base leading-relaxed tracking-wide text-left line-clamp-6">
                                {items[0].isi_artikel}
                            </p>
                            <button className="flex items-center gap-4 font-black text-[10px] uppercase tracking-[0.3em] text-[#111827] group-hover:gap-8 transition-all">
                                Baca Lengkap <ArrowUpRight size={18} className="text-[#E3242B]" />
                            </button>
                        </div>
                    </div>
                )}

                {/* FEED GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16">
                    {items.slice(page === 1 ? 1 : 0).map((news) => (
                        <div key={news.id} onClick={() => setSelectedNews(news)} className="group cursor-pointer flex flex-col space-y-6 border-b md:border-none border-gray-50 pb-10 md:pb-0">
                            <div className="relative aspect-video md:aspect-[4/3] rounded-[2rem] md:rounded-[3rem] overflow-hidden bg-gray-50 shadow-lg group-hover:shadow-2xl transition-all duration-700">
                                <img src={news.gambar_url} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="News" />
                                <div className="absolute top-4 left-4">
                                    <span className="bg-white/90 backdrop-blur-md text-[#111827] px-4 py-1.5 rounded-xl text-[8px] font-black uppercase tracking-widest">{news.tanggal}</span>
                                </div>
                            </div>
                            <div className="space-y-4 px-2">
                            {/* Judul Artikel: Menghapus uppercase, ukuran tetap */}
                            <h3 className="text-xl md:text-2xl font-black text-[#111827] tracking-tighter leading-tight group-hover:text-[#E3242B] transition-colors line-clamp-3">
                                {news.judul_artikel}
                            </h3>

                            {/* Isi Artikel: Menghapus uppercase, ukuran tetap, dan rata kiri */}
                            <p className="text-gray-400 font-bold text-[11px] md:text-xs tracking-tight leading-relaxed text-left line-clamp-3">
                                {news.isi_artikel}
                            </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* PAGINATION */}
                {lastPage > 1 && (
                    <div className="flex justify-center items-center gap-4 mt-20 border-t border-gray-50 pt-20">
                        <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className="w-14 h-14 rounded-2xl border border-gray-100 flex items-center justify-center text-[#111827] hover:bg-[#E3242B] hover:text-white disabled:opacity-20 transition-all shadow-sm"><ChevronLeft size={24}/></button>
                        <div className="flex items-center gap-4 font-black text-[10px] text-[#111827]">
                            <span className="bg-[#111827] text-white w-10 h-10 flex items-center justify-center rounded-xl shadow-lg">{page}</span>
                            <span className="text-gray-300">/</span>
                            <span className="text-gray-400">{lastPage}</span>
                        </div>
                        <button disabled={page === lastPage} onClick={() => setPage(p => p + 1)} className="w-14 h-14 rounded-2xl border border-gray-100 flex items-center justify-center text-[#111827] hover:bg-[#E3242B] hover:text-white disabled:opacity-20 transition-all shadow-sm"><ChevronRight size={24}/></button>
                    </div>
                )}
            </div>
          )}
        </div>
      </main>

      {/* --- 3. THE IMMERSIVE NEWS READER (ULTIMATE MOBILE OPTIMIZATION) --- */}
      {selectedNews && createPortal(
        <div className="fixed inset-0 z-[100000] flex items-center justify-center md:p-12">
          <div className="absolute inset-0 bg-[#0a0f1a]/98 backdrop-blur-3xl animate-fade-in" onClick={() => setSelectedNews(null)}></div>
          
          <div className="relative bg-white w-full h-full md:max-w-6xl md:h-[90vh] md:rounded-[4rem] overflow-hidden shadow-[0_60px_120px_rgba(0,0,0,0.5)] flex flex-col md:flex-row border border-white/10 animate-in zoom-in-95 duration-500">
            
            {/* Header Mobile Sticky */}
            <div className="md:hidden flex items-center justify-between px-6 py-4 bg-white border-b sticky top-0 z-50">
                <span className="text-[9px] font-black text-[#E3242B] uppercase tracking-widest">{selectedNews.kategori} Release</span>
                <button onClick={() => setSelectedNews(null)} className="p-2 bg-gray-100 rounded-full"><X size={20}/></button>
            </div>

            {/* AREA UTAMA PEMBACA (SCROLLABLE) */}
            <div className="flex-1 overflow-y-auto custom-scrollbar bg-white flex flex-col h-full">
                <div className="w-full aspect-video md:hidden shrink-0">
                    <img src={selectedNews.gambar_url} className="w-full h-full object-cover" alt="Cover" />
                </div>

                <div className="px-6 md:px-24 py-10 md:py-20 space-y-10">
                    <div className="space-y-6">
                        <div className="hidden md:flex items-center gap-3">
                            <span className="px-4 py-1.5 bg-[#E3242B]/5 border border-[#E3242B]/10 rounded-full text-[#E3242B] font-black uppercase text-[10px] tracking-widest">{selectedNews.kategori}</span>
                            <div className="h-px w-10 bg-gray-100"></div>
                            <span className="text-gray-400 font-bold text-[10px] uppercase tracking-widest">{selectedNews.tanggal}</span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black text-[#111827] tracking-tighter leading-[1.1]">
                            {selectedNews.judul_artikel}
                        </h2>
                        <div className="flex items-center gap-4 py-6 border-y border-gray-50">
                            <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center text-[#E3242B] font-black text-sm uppercase">{selectedNews.penulis.charAt(0)}</div>
                            <div className="space-y-0.5">
                                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Redaksi Pelaksana</p>
                                <p className="text-sm font-black text-[#111827] uppercase tracking-tight">{selectedNews.penulis}</p>
                            </div>
                        </div>
                    </div>

                    {/* PERUBAHAN DI SINI: text-justify diganti menjadi text-left */}
                    <div className="text-gray-700 text-base md:text-xl leading-[1.8] md:leading-[2.2] font-medium text-left tracking-normal whitespace-pre-line">
                        {selectedNews.isi_artikel.split('\n').map((para: string, i: number) => (
                            <p key={i} className={`mb-8 ${i === 0 ? "md:first-letter:text-9xl md:first-letter:font-black md:first-letter:text-[#E3242B] md:first-letter:mr-6 md:first-letter:float-left md:first-letter:leading-none md:first-letter:mt-3" : ""}`}>
                                {para}
                            </p>
                        ))}
                    </div>

                    <div className="pt-10 border-t border-gray-100 space-y-6">
                        <div className="flex items-center gap-4">
                            <ShieldCheck size={24} className="text-emerald-500" />
                            <span className="text-[10px] font-black text-[#111827] uppercase tracking-widest">Verified DDP Press Center</span>
                        </div>
                    </div>
                </div>

                <div className="px-6 md:px-24 py-12 bg-gray-50 border-t border-gray-100 flex items-center justify-between mt-auto">
                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.4em]">Laboratory Data Desa Presisi IPB University</p>
                </div>
            </div>

            {/* SIDEBAR MODAL (Desktop Only) */}
            <div className="hidden md:flex md:w-[35%] bg-[#111827] flex-col p-16 justify-between relative shrink-0 border-l border-white/5 overflow-hidden">
                <div className="absolute top-0 right-0 w-80 h-80 bg-[#E3242B] opacity-10 blur-[100px]"></div>
                <div className="z-10 space-y-12">
                    <button onClick={() => setSelectedNews(null)} className="flex items-center gap-4 text-gray-500 hover:text-white transition-all font-black text-[10px] uppercase tracking-[0.3em] group">
                       <div className="p-3 bg-white/5 rounded-2xl group-hover:bg-[#E3242B] transition-all"><X size={24}/></div> Tutup Jendela
                    </button>
                    <div className="aspect-[3/4.5] w-full rounded-[3.5rem] overflow-hidden border border-white/10 shadow-[0_50px_100px_rgba(0,0,0,0.5)]">
                        <img src={selectedNews.gambar_url} className="w-full h-full object-cover grayscale-[0.3] hover:grayscale-0 transition-all duration-[2000ms]" alt="Sidebar" />
                    </div>
                </div>
                <div className="z-10 opacity-20">
                    <p className="text-[11px] font-black text-gray-500 uppercase tracking-[0.8em]">Lab DDP IPB</p>
                </div>
            </div>

          </div>
        </div>,
        document.body
      )}

      {/* FOOTER */}
      <div className="py-24 flex flex-col items-center gap-6 bg-white border-t border-gray-50">
           <div className="h-px w-32 bg-gray-200"></div>
           <p className="text-[10px] font-black text-gray-400 uppercase tracking-[1em] text-center">Laboratory DDP IPB University</p>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #E3242B; border-radius: 10px; }
      `}</style>
    </div>
  );
};