import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion'; // Tambah motion
import {
  ArrowRight,
  X,
  Hash,
  ShieldCheck,
  MonitorPlay,
  Share2,
} from 'lucide-react';
import { api } from '../api';
import { ScrollReveal } from './ScrollReveal'; // Tambah ScrollReveal

export const News = () => {
  const [items, setItems] = useState<any[]>([]);
  const [totalBerita, setTotalBerita] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedNews, setSelectedNews] = useState<any>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const newsRes = await api.get('/public/berita');
        setItems(newsRes.data);

        const countRes = await api.get('/public/berita/count');
        setTotalBerita(countRes.data.total);

        const newsIdFromUrl = searchParams.get('newsId');
        if (newsIdFromUrl && newsRes.data?.length > 0) {
          const found = newsRes.data.find(
            (n: any) => n.id?.toString() === newsIdFromUrl
          );
          if (found) setSelectedNews(found);
        }
      } catch (error) {
        console.error('Gagal sinkronisasi data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchParams]);

  const handleShare = async (news: any) => {
    const shareUrl = `${window.location.origin}/share/news/${news.id}`;
    const shareData = {
      title: news.judul_artikel,
      text: `[Warta DDP] ${news.judul_artikel}`,
      url: shareUrl,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        const waMessage = `*${shareData.title}*\n\nBaca selengkapnya di:\n${shareUrl}`;
        window.open(`https://wa.me/?text=${encodeURIComponent(waMessage)}`, '_blank');
      }
    } catch (err) {
      const waMessage = `*${shareData.title}*\n\nBaca selengkapnya di:\n${shareUrl}`;
      window.open(`https://wa.me/?text=${encodeURIComponent(waMessage)}`, '_blank');
    }
  };

  const closeNews = () => {
    setSelectedNews(null);
    setSearchParams({});
  };

  useEffect(() => {
    document.body.style.overflow = selectedNews ? 'hidden' : 'auto';
  }, [selectedNews]);

  if (loading)
    return (
      <div className="py-40 text-center space-y-3">
        <div className="w-8 h-8 border-3 border-[#E3242B] border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="text-[10px] font-bold text-gray-400 tracking-wider">
          Menyiapkan berita terbaru...
        </p>
      </div>
    );

  if (items.length === 0) return null;

  return (
    <section
      id="news"
      className="py-24 bg-white px-6 lg:px-24 relative overflow-hidden selection:bg-[#E3242B] selection:text-white"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* HEADER - DIBUNGKUS ANIMASI */}
        <ScrollReveal>
          <div className="flex flex-col lg:flex-row justify-between items-center lg:items-end gap-8 mb-16 pb-10 border-b border-gray-100 text-left text-[#111827]">
            <div className="space-y-3">
              <span className="text-[11px] font-bold text-[#E3242B] uppercase tracking-widest">
                Pusat Media
              </span>
              <h2 className="text-3xl md:text-4xl font-black tracking-tighter leading-none">
                Warta <span className="text-[#E3242B]">Terkini</span>
              </h2>
              <p className="text-gray-500 font-medium text-sm max-w-md leading-relaxed">
                Publikasi resmi dan kabar terbaru mengenai transformasi data desa di seluruh Indonesia.
              </p>
            </div>

            <Link
              to="/news"
              className="group flex items-center gap-3 px-8 py-4 bg-[#111827] text-white rounded-2xl font-bold text-xs tracking-wide hover:bg-[#E3242B] transition-all shadow-xl active:scale-95 shrink-0"
            >
              Jelajahi Arsip Berita
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </ScrollReveal>

        {/* GRID UTAMA */}
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-8 space-y-12">
            
            {/* BERITA UTAMA - ANIMASI UP */}
            <ScrollReveal delay={0.1}>
              <div
                onClick={() => setSelectedNews(items[0])}
                className="group cursor-pointer relative rounded-[3rem] overflow-hidden shadow-2xl transition-all duration-1000 h-[450px] border-4 border-white bg-gray-50"
              >
                <img
                  src={items[0].gambar_url}
                  className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-105"
                  alt="Berita Utama"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-[#111827]/20 to-transparent"></div>
                <div className="absolute bottom-10 left-10 right-10 space-y-4 text-left">
                  <span className="bg-[#E3242B] text-white px-5 py-1.5 rounded-lg text-[10px] font-bold tracking-wider">
                    Topik Utama
                  </span>
                  <h3 className="text-2xl md:text-3xl font-black text-white leading-tight tracking-tighter group-hover:text-red-100 transition-colors line-clamp-2">
                    {items[0].judul_artikel}
                  </h3>
                </div>
              </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 gap-10">
              {items.slice(1, 3).map((news, index) => (
                /* LIST BERITA - ANIMASI BERTAHAP */
                <ScrollReveal key={news.id} delay={0.2 + index * 0.1}>
                  <div
                    onClick={() => setSelectedNews(news)}
                    className="group cursor-pointer space-y-6 text-left"
                  >
                    <div className="relative aspect-video rounded-[2.5rem] overflow-hidden shadow-xl border-4 border-white bg-gray-50">
                      <img
                        src={news.gambar_url}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                        alt="Thumbnail Berita"
                      />
                    </div>
                    <h4 className="px-2 text-lg font-bold text-[#111827] group-hover:text-[#E3242B] transition-colors leading-tight tracking-tight line-clamp-2">
                      {news.judul_artikel}
                    </h4>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>

          {/* SIDEBAR */}
          <div className="lg:col-span-4 space-y-8 text-left">
            {/* VIDEO CARD - ANIMASI DARI KANAN */}
            <ScrollReveal direction="left" delay={0.3}>
              <div className="bg-[#111827] rounded-[3.5rem] p-10 text-white relative overflow-hidden shadow-2xl border border-white/5">
                <div className="relative z-10 space-y-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 shadow-lg">
                      <MonitorPlay size={18} className="text-[#E3242B]" />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-widest">
                      IPB Official TV
                    </span>
                  </div>

                  <div className="aspect-video rounded-[2.5rem] overflow-hidden border border-white/10 bg-black shadow-inner">
                    <iframe
                      width="100%"
                      height="100%"
                      src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                      title="Dokumenter IPB"
                      frameBorder="0"
                      allowFullScreen
                      className="grayscale-[0.4] hover:grayscale-0 transition-all duration-1000"
                    ></iframe>
                  </div>

                  <h4 className="font-bold text-base leading-tight">
                    Dokumenter Pendataan Desa Presisi
                  </h4>
                </div>
              </div>
            </ScrollReveal>

            {/* COUNT CARD - ANIMASI DARI KANAN */}
            <ScrollReveal direction="left" delay={0.4}>
              <div className="p-8 bg-gray-50 rounded-[3rem] border border-gray-100 shadow-inner space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 bg-white text-[#E3242B] rounded-2xl flex items-center justify-center shadow-md">
                    <Hash size={20} />
                  </div>
                  <span className="text-3xl font-black text-[#111827] tracking-tighter">
                    {totalBerita}
                  </span>
                </div>
                <p className="text-[10px] font-bold text-[#111827] uppercase tracking-widest">
                  Total Publikasi Terverifikasi
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>

      {/* IMMERSIVE READER - DENGAN ANIMASI TRANSISI */}
      <AnimatePresence>
        {selectedNews &&
          createPortal(
            <div className="fixed inset-0 z-[100000] flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-[#0a0f1a]/98 backdrop-blur-3xl"
                onClick={closeNews}
              ></motion.div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative bg-white w-full h-full md:max-w-6xl md:h-[90vh] md:rounded-[4rem] overflow-hidden shadow-2xl flex flex-col border border-white/10"
              >
                {/* Header Modal */}
                <div className="flex items-center justify-between px-6 md:px-12 py-4 bg-white border-b sticky top-0 z-50">
                  <div className="flex items-center gap-4 text-left">
                    <span className="bg-[#E3242B] text-white px-4 py-1 rounded-full font-bold text-[10px] tracking-wide">
                      {selectedNews.kategori}
                    </span>
                    <div className="h-4 w-px bg-gray-200 hidden sm:block"></div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest hidden sm:block">
                      Rilis Pers Resmi
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleShare(selectedNews)}
                      className="p-2 text-gray-400 hover:text-[#E3242B] transition-all"
                      aria-label="Bagikan"
                    >
                      <Share2 size={20} />
                    </button>
                    <button
                      onClick={closeNews}
                      className="p-2 bg-gray-100 text-gray-400 hover:text-[#E3242B] rounded-full transition-all"
                      aria-label="Tutup"
                    >
                      <X size={24} />
                    </button>
                  </div>
                </div>

                {/* Konten Reader */}
                <div className="flex-1 overflow-y-auto custom-scrollbar bg-white">
                  <div className="max-w-5xl mx-auto flex flex-col items-center">
                    <div className="w-full aspect-video md:aspect-[21/9] overflow-hidden relative border-b border-gray-100 bg-gray-50">
                      <img
                        src={selectedNews.gambar_url}
                        className="w-full h-full object-cover"
                        alt="Gambar Berita"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    </div>

                    <div className="w-full px-6 md:px-20 py-8 space-y-8 text-left text-[#111827]">
                      <div className="space-y-4 max-w-4xl">
                        <h1 className="text-3xl md:text-5xl font-black tracking-tighter leading-[1.05]">
                          {selectedNews.judul_artikel}
                        </h1>

                        <div className="flex flex-wrap items-center gap-5 py-4 border-y border-gray-100">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-[#111827] text-[#E3242B] rounded-xl flex items-center justify-center font-bold text-sm transform -rotate-3">
                              {selectedNews.penulis?.charAt(0)}
                            </div>
                            <div className="space-y-0.5">
                              <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase leading-none">
                                Penyusun
                              </p>
                              <p className="text-xs font-bold leading-none">
                                {selectedNews.penulis}
                              </p>
                            </div>
                          </div>

                          <div className="h-6 w-px bg-gray-100 hidden sm:block"></div>

                          <div className="space-y-0.5">
                            <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase leading-none">
                              Tanggal Terbit
                            </p>
                            <p className="text-xs font-bold text-[#E3242B] leading-none">
                              {selectedNews.tanggal}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Narasi Berita */}
                      <div className="text-gray-700 text-lg md:text-xl leading-[1.8] font-medium text-left tracking-normal whitespace-pre-line relative z-10">
                        {String(selectedNews.isi_artikel || '')
                          .split('\n')
                          .map((para: string, i: number) => (
                            <p
                              key={i}
                              className={`mb-6 ${
                                i === 0
                                  ? 'first-letter:text-7xl md:first-letter:text-[9rem] first-letter:font-black first-letter:text-[#E3242B] first-letter:mr-4 first-letter:float-left first-letter:leading-none first-letter:mt-2'
                                  : ''
                              }`}
                            >
                              {para}
                            </p>
                          ))}
                      </div>

                      {/* Footer Branding */}
                      <div className="pt-8 border-t border-gray-100 flex items-center gap-4 opacity-70 text-left">
                        <ShieldCheck size={24} className="text-emerald-500" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                          Publikasi Resmi Terverifikasi Lab DDP IPB University
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>,
            document.body
          )}
      </AnimatePresence>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #E3242B; border-radius: 10px; }
      `}</style>
    </section>
  );
};