import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link, useSearchParams } from 'react-router-dom'; 
import { 
  ArrowRight, X, Clock, Newspaper, Zap, Hash, 
  ShieldCheck, Tag, ArrowUpRight, MonitorPlay, Share2
} from 'lucide-react';
import { api } from '../api';

export const News = () => {
  const [items, setItems] = useState<any[]>([]);
  const [totalBerita, setTotalBerita] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedNews, setSelectedNews] = useState<any>(null);
  
  //  Membaca parameter dari URL 
  const [searchParams, setSearchParams] = useSearchParams();

  // --- 1. AMBIL DATA DARI BACKEND ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        const newsRes = await api.get('/public/berita');
        setItems(newsRes.data);
        
        const countRes = await api.get('/public/berita/count');
        setTotalBerita(countRes.data.total);

        // --- LOGIKA AUTO-OPEN (LANGSUNG POP UP) ---
        const newsIdFromUrl = searchParams.get('newsId');
        if (newsIdFromUrl && newsRes.data.length > 0) {
          const found = newsRes.data.find((n: any) => n.id.toString() === newsIdFromUrl);
          if (found) {
            setSelectedNews(found);
          }
        }
      } catch (error) {
        console.error("Gagal sinkronisasi data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [searchParams]);

<<<<<<< HEAD
  // --- 2. FUNGSI SHARE DENGAN PREVIEW GAMBAR ---
  const handleShare = async (news: any) => {
   
    const shareUrl = `${window.location.origin}/?newsId=${news.id}`;
    
=======
  // --- 2. FUNGSI SHARE (DIUBAH) ---
  const handleShare = async (news: any) => {
    const shareUrl = `${window.location.origin}/share/news/${news.id}`;

>>>>>>> 24c95fb (Update ddp_public (UX + links + fixes))
    const shareData = {
      title: news.judul_artikel,
      text: `[WARTA DDP] ${news.judul_artikel}`,
      url: shareUrl,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
<<<<<<< HEAD
        // Masukkan link gambar agar WA mencoba mengambil preview-nya
        const waMessage = `*${shareData.title}*\n\nBaca selengkapnya di:\n${shareUrl}\n\nVisual: ${selectedNews.gambar_url}`;
        window.open(`https://wa.me/?text=${encodeURIComponent(waMessage)}`, '_blank');
      }
    } catch (err) {
=======
        const waMessage = `*${shareData.title}*\n\nBaca selengkapnya di:\n${shareUrl}`;
        window.open(`https://wa.me/?text=${encodeURIComponent(waMessage)}`, "_blank");
      }
    } catch {
>>>>>>> 24c95fb (Update ddp_public (UX + links + fixes))
      console.log("Share dibatalkan.");
    }
  };

<<<<<<< HEAD
=======

>>>>>>> 24c95fb (Update ddp_public (UX + links + fixes))
  const closeNews = () => {
    setSelectedNews(null);
    setSearchParams({}); // Bersihkan URL agar kembali normal
  };

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
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-end gap-8 mb-16 pb-10 border-b border-gray-100 text-left text-[#111827]">
          <div className="space-y-3">
            <span className="text-[10px] font-black text-[#E3242B] uppercase tracking-[0.3em]">Pusat Media</span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tighter uppercase leading-none">
              Pusat <span className="text-[#E3242B]">Warta.</span>
            </h2>
            <p className="text-gray-500 font-bold text-xs uppercase tracking-widest max-w-md leading-relaxed">
              Publikasi resmi dan kabar terkini mengenai transformasi data desa di Indonesia.
            </p>
          </div>
          <Link to="/news" className="group flex items-center gap-3 px-8 py-4 bg-[#111827] text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-[#E3242B] transition-all shadow-xl active:scale-95 shrink-0">
           Jelajahi Arsip <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* --- GRID UTAMA --- */}
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-8 space-y-12">
            <div onClick={() => setSelectedNews(items[0])} className="group cursor-pointer relative rounded-[3rem] overflow-hidden shadow-2xl transition-all duration-1000 h-[450px] border-4 border-white bg-gray-50">
              <img src={items[0].gambar_url} className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-105" alt="Headline" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-[#111827]/20 to-transparent"></div>
              <div className="absolute bottom-10 left-10 right-10 space-y-4 text-left">
                <span className="bg-[#E3242B] text-white px-5 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest shadow-xl">BERITA TERKINI</span>
                <h3 className="text-2xl md:text-3xl font-black text-white leading-tight tracking-tighter group-hover:text-red-100 transition-colors line-clamp-2">{items[0].judul_artikel}</h3>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-10">
                {items.slice(1, 3).map((news) => (
                    <div key={news.id} onClick={() => setSelectedNews(news)} className="group cursor-pointer space-y-6 text-left">
                        <div className="relative aspect-video rounded-[2.5rem] overflow-hidden shadow-xl border-4 border-white bg-gray-50">
                            <img src={news.gambar_url} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="News" />
                        </div>
                        <h4 className="px-2 text-lg font-black text-[#111827] group-hover:text-[#E3242B] transition-colors leading-tight tracking-tighter line-clamp-2">{news.judul_artikel}</h4>
                    </div>
                ))}
            </div>
          </div>

          {/* SIDEBAR */}
          <div className="lg:col-span-4 space-y-8 text-left">
            <div className="bg-[#111827] rounded-[3.5rem] p-10 text-white relative overflow-hidden shadow-2xl border border-white/5">
                <div className="relative z-10 space-y-8">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 shadow-lg"><MonitorPlay size={18} className="text-[#E3242B]" /></div>
                        <span className="text-[11px] font-black uppercase tracking-[0.3em]">ipb official tv</span>
                    </div>
                    <div className="aspect-video rounded-[2.5rem] overflow-hidden border border-white/10 bg-black shadow-inner">
                        <iframe width="100%" height="100%" src="https://www.youtube.com/embed/B83_p6gRj-Q" title="YouTube" frameBorder="0" allowFullScreen className="grayscale-[0.4] hover:grayscale-0 transition-all duration-1000"></iframe>
                    </div>
                    <h4 className="font-black uppercase text-[11px] tracking-widest text-white leading-tight">Dokumenter Pendataan Desa Presisi</h4>
                </div>
            </div>
            <div className="p-8 bg-gray-50 rounded-[3rem] border border-gray-100 shadow-inner space-y-4">
                <div className="flex items-center justify-between">
                    <div className="w-12 h-12 bg-white text-[#E3242B] rounded-2xl flex items-center justify-center shadow-md"><Hash size={20} /></div>
                    <span className="text-3xl font-black text-[#111827] tracking-tighter">{totalBerita}</span>
                </div>
                <p className="text-[10px] font-black text-[#111827] uppercase tracking-widest">Total Publikasi Terverifikasi</p>
            </div>
          </div>
        </div>
      </div>

      {/* --- 3. THE IMMERSIVE READER  --- */}
      {selectedNews && createPortal(
        <div className="fixed inset-0 z-[100000] flex items-center justify-center">
          <div className="absolute inset-0 bg-[#0a0f1a]/98 backdrop-blur-3xl animate-fade-in" onClick={closeNews}></div>
          
          <div className="relative bg-white w-full h-full md:max-w-6xl md:h-[90vh] md:rounded-[4rem] overflow-hidden shadow-2xl flex flex-col animate-in zoom-in-95 duration-500 border border-white/10">
            
            {/* Header Modal (Dibuat lebih Rapat) */}
            <div className="flex items-center justify-between px-6 md:px-12 py-4 bg-white border-b sticky top-0 z-50">
                <div className="flex items-center gap-4 text-left">
                    <span className="bg-[#E3242B] text-white px-4 py-1 rounded-full font-black text-[9px] uppercase tracking-widest">{selectedNews.kategori}</span>
                    <div className="h-4 w-px bg-gray-200 hidden sm:block"></div>
                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest hidden sm:block">Press Release</span>
                </div>
                <div className="flex items-center gap-2">
                    <button onClick={() => handleShare(selectedNews)} className="p-2 text-gray-400 hover:text-[#E3242B] transition-all"><Share2 size={20}/></button>
                    <button onClick={closeNews} className="p-2 bg-gray-100 text-gray-400 hover:text-[#E3242B] rounded-full transition-all"><X size={24}/></button>
                </div>
            </div>

            {/* Area Konten Reader*/}
            <div className="flex-1 overflow-y-auto custom-scrollbar bg-white">
                <div className="max-w-5xl mx-auto flex flex-col items-center">
                    
                    <div className="w-full aspect-video md:aspect-[21/9] overflow-hidden relative border-b border-gray-100 bg-gray-50">
                        <img src={selectedNews.gambar_url} className="w-full h-full object-cover" alt="Hero" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    </div>

                    <div className="w-full px-6 md:px-20 py-8 space-y-8 text-left text-[#111827]">
                        
                        <div className="space-y-4 max-w-4xl">
                            <h1 className="text-3xl md:text-5xl font-black tracking-tighter leading-[1.05] ">{selectedNews.judul_artikel}</h1>
                            <div className="flex flex-wrap items-center gap-5 py-4 border-y border-gray-100 uppercase">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-[#111827] text-[#E3242B] rounded-xl flex items-center justify-center font-black text-sm transform -rotate-3">{selectedNews.penulis.charAt(0)}</div>
                                    <div className="space-y-0.5"><p className="text-[8px] font-black text-gray-400 uppercase tracking-widest leading-none">Redaksi</p><p className="text-xs font-black leading-none">{selectedNews.penulis}</p></div>
                                </div>
                                <div className="h-6 w-px bg-gray-100 hidden sm:block"></div>
                                <div className="space-y-0.5"><p className="text-[8px] font-black text-gray-400 uppercase tracking-widest leading-none">Terbit</p><p className="text-xs font-black text-[#E3242B] leading-none">{selectedNews.tanggal}</p></div>
                            </div>
                        </div>

                        {/* Narasi Teks */}
                        <div className="text-gray-700 text-lg md:text-xl leading-[1.8] font-medium text-left tracking-normal whitespace-pre-line relative z-10">
                            {selectedNews.isi_artikel.split('\n').map((para: string, i: number) => (
                                <p key={i} className={`mb-6 ${i === 0 ? "first-letter:text-7xl md:first-letter:text-[9rem] first-letter:font-black first-letter:text-[#E3242B] first-letter:mr-4 first-letter:float-left first-letter:leading-none first-letter:mt-2" : ""}`}>
                                    {para}
                                </p>
                            ))}
                        </div>

                        {/* Footer Branding */}
                        <div className="pt-8 border-t border-gray-100 flex items-center gap-4 opacity-50 text-left">
                            <ShieldCheck size={24} className="text-emerald-500" />
                            <span className="text-[10px] font-black uppercase tracking-widest">Verified Press Release Lab DDP IPB University</span>
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
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #E3242B; border-radius: 10px; }
      `}</style>
    </section>
  );
};
