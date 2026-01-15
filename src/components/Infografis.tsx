import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { 
  ChevronLeft, ChevronRight, Maximize2, ArrowUpRight, 
  X, FileCheck, Download, Send, BarChart3, Zap, Info, Tag, ShieldCheck 
} from 'lucide-react';
import { api, getStorageUrl } from '../api';
import { ScrollReveal } from './ScrollReveal'; // SOP: Menambahkan import animasi

export const Infografis = () => {
  // --- STATE MANAGEMENT ---
  const [items, setItems] = useState<any[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedAlbum, setSelectedAlbum] = useState<any>(null);
  const [modalIdx, setModalIdx] = useState(0);

  // State Form Verifikasi
  const [showForm, setShowForm] = useState(false);
  const [visitor, setVisitor] = useState({ email: '', nama: '', instansi: '', keperluan: '' });

  // --- FETCH DATA ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Ambil 4 data infografis pilihan untuk Beranda
        const featuredRes = await api.get('/public/infografis/featured');
        setItems(featuredRes.data);

        // 2. Ambil total arsip untuk statistik header
        const allRes = await api.get('/public/infografis');
        setTotalCount(allRes.data.length);
      } catch (err) {
        console.error("Gagal sinkronisasi infografis:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Kunci Scroll saat Modal Aktif
  useEffect(() => {
    document.body.style.overflow = (selectedAlbum || showForm) ? 'hidden' : 'auto';
  }, [selectedAlbum, showForm]);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setModalIdx((prev) => (prev === selectedAlbum.gambar.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setModalIdx((prev) => (prev === 0 ? selectedAlbum.gambar.length - 1 : prev - 1));
  };

  const handleZipDownload = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post(`/public/infografis/${selectedAlbum.id}/download`, visitor);
      window.location.href = res.data.download_url;
      setShowForm(false);
      alert("Verifikasi berhasil. Permintaan unduhan Anda sedang diproses.");
    } catch (error) {
      alert("Mohon maaf, terjadi kesalahan saat memproses verifikasi.");
    }
  };

  if (loading) return (
    <div className="py-20 text-center">
      <div className="w-8 h-8 border-3 border-[#E3242B] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-[10px] font-bold text-gray-400 tracking-wider">Menyiapkan data visual...</p>
    </div>
  );

  return (
    <section id="infografis" className="py-24 bg-[#F9FAFB] px-6 lg:px-24 relative overflow-hidden selection:bg-[#E3242B] selection:text-white">
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* --- 1. HEADER (ANIMATED) --- */}
        <ScrollReveal>
          <div className="flex flex-col lg:flex-row justify-between items-center lg:items-end gap-8 mb-16 pb-10 border-b border-gray-100">
            <div className="space-y-3 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-3">
                 <div className="p-1.5 bg-[#E3242B]/10 rounded-lg text-[#E3242B] text-left"><FileCheck size={16}/></div>
                 <span className="text-[10px] font-bold text-[#E3242B] uppercase tracking-widest">Tersedia {totalCount} Materi Infografis</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-[#111827] tracking-tighter leading-none text-center lg:text-left">
                Katalog <span className="text-[#E3242B]">Infografis</span>
              </h2>
              <p className="text-gray-500 font-medium text-sm max-w-md leading-relaxed text-center lg:text-left">
                Memahami data desa menjadi lebih mudah melalui sajian visual yang presisi, informatif, dan transparan.
              </p>
            </div>
            
            <Link to="/infografis" className="group flex items-center gap-4 bg-[#111827] text-white px-8 py-4 rounded-xl font-bold text-xs hover:bg-[#E3242B] transition-all shadow-xl active:scale-95">
              Lihat Semua Koleksi <ArrowUpRight size={16} className="group-hover:rotate-45 transition-transform" />
            </Link>
          </div>
        </ScrollReveal>

        {/* --- 2. GRID 4 KARTU (ANIMATED DELAY 0.2) --- */}
        <ScrollReveal delay={0.2}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {items.map((item) => (
              <div 
                key={item.id} 
                onClick={() => { setSelectedAlbum(item); setModalIdx(0); }}
                className="group bg-white rounded-[2.5rem] border border-gray-100 p-4 shadow-sm hover:shadow-[0_30px_60px_rgba(0,0,0,0.08)] transition-all duration-700 flex flex-col h-full cursor-pointer"
              >
                <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden bg-gray-50 border border-gray-50 mb-6 shrink-0">
                  <img
                    src={Array.isArray(item.gambar_urls) ? item.gambar_urls[0] : item.gambar_urls}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-[1500ms]"
                    alt={item.judul}
                  />
                  <div className="absolute inset-0 bg-[#111827]/40 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center backdrop-blur-[2px]">
                      <div className="bg-white p-4 rounded-2xl shadow-2xl scale-75 group-hover:scale-100 transition-all duration-500">
                          <Maximize2 className="text-[#E3242B]" size={24} />
                      </div>
                  </div>
                  <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md text-white text-[9px] font-bold px-3 py-1 rounded-full tracking-wider">
                    {item.gambar.length} Halaman
                  </div>
                </div>

                <div className="px-2 pb-2 space-y-4 flex-grow flex flex-col justify-between text-left">
                  <div>
                      <h4 className="text-[#111827] font-bold text-sm tracking-tight line-clamp-2 leading-tight group-hover:text-[#E3242B] transition-colors mb-3">
                          {item.judul}
                      </h4>
                      <p className="text-[11px] text-gray-400 font-medium leading-relaxed line-clamp-3 border-l-2 border-gray-100 pl-3">
                          {item.keterangan || "Analisis visual terpadu hasil riset Laboratory Data Desa Presisi."}
                      </p>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-50 flex justify-between items-center text-gray-300">
                      <span className="text-[9px] font-bold uppercase tracking-widest">{item.kategori || 'Analitik'}</span>
                      <BarChart3 size={14} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>

      {/* --- 3. PREMIUM LIGHTBOX --- */}
      {selectedAlbum && createPortal(
        <div className="fixed inset-0 z-[100000] flex items-center justify-center p-4 md:p-10">
          <div className="absolute inset-0 bg-[#0B1120]/98 backdrop-blur-3xl animate-in fade-in duration-500" onClick={() => setSelectedAlbum(null)}></div>
          
          <div className="relative bg-white w-full max-w-7xl h-full max-h-[90vh] md:max-h-[85vh] rounded-[3rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row animate-in zoom-in-95 duration-500 border border-white/10">
            
            {/* LEFT: SLIDESHOW (STATIS) */}
            <div className="h-[45%] lg:h-full lg:flex-1 bg-[#0a0f1a] relative flex items-center justify-center group/slider overflow-hidden border-b lg:border-b-0 lg:border-r border-white/5">
               <img 
                  key={modalIdx}
                  src={selectedAlbum.gambar_urls[modalIdx]}
                                    className="max-w-[95%] max-h-[90%] object-contain animate-in fade-in slide-in-from-right-4 duration-700" 
                  alt="Slide Infografis" 
               />
               
               <button onClick={handlePrev} className="absolute left-6 p-4 bg-white/5 hover:bg-[#E3242B] rounded-2xl text-white transition-all backdrop-blur-md border border-white/10 opacity-0 group-hover/slider:opacity-100">
                  <ChevronLeft size={24} />
               </button>
               <button onClick={handleNext} className="absolute right-6 p-4 bg-white/5 hover:bg-[#E3242B] rounded-2xl text-white transition-all backdrop-blur-md border border-white/10 opacity-0 group-hover/slider:opacity-100">
                  <ChevronRight size={24} />
               </button>
               
               <div className="absolute bottom-8 bg-[#E3242B] px-6 py-2 rounded-full text-white font-bold text-[10px] tracking-wider shadow-2xl">
                  Halaman {modalIdx + 1} dari {selectedAlbum.gambar.length}
               </div>
            </div>

            {/* RIGHT: INFO PANEL (SCROLLABLE) */}
            <div className="h-[55%] lg:h-full lg:w-[450px] bg-white flex flex-col overflow-hidden">
                <div className="p-8 pb-4 flex justify-between items-center border-b border-gray-50">
                    <div className="flex items-center gap-2">
                        <Zap size={16} className="text-[#E3242B] fill-[#E3242B]" />
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Informasi Data</span>
                    </div>
                    <button onClick={() => setSelectedAlbum(null)} className="p-2 text-gray-300 hover:text-[#E3242B] hover:bg-red-50 rounded-full transition-all text-left"><X size={24}/></button>
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar p-10 space-y-10 text-left">
                    <div className="space-y-4">
                        <h2 className="text-2xl font-black text-[#111827] tracking-tight leading-tight">{selectedAlbum.judul}</h2>
                        <div className="h-1 w-12 bg-[#E3242B] rounded-full"></div>
                        <p className="text-gray-500 font-medium text-sm leading-relaxed text-justify">
                            {selectedAlbum.keterangan || "Detail sajian infografis berbasis data presisi dari laboratorium IPB University."}
                        </p>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-[2rem] border border-gray-100 text-left">
                        <div className="flex items-center gap-3 text-emerald-600 mb-2">
                            <ShieldCheck size={16} />
                            <span className="text-[9px] font-bold uppercase tracking-widest">Arsip Terverifikasi</span>
                        </div>
                        <p className="text-[11px] font-medium text-gray-500 leading-relaxed text-left">
                            Data ini telah melewati proses validasi saintifik untuk menjamin akurasi informasi bagi publik.
                        </p>
                    </div>
                </div>

                <div className="p-8 border-t border-gray-50">
                    <button onClick={() => setShowForm(true)} className="w-full py-5 bg-[#111827] text-white font-bold rounded-2xl flex items-center justify-center gap-3 uppercase tracking-widest text-[10px] shadow-xl hover:bg-[#E3242B] transition-all active:scale-95 group">
                        Unduh Materi Lengkap <Download size={18} className="group-hover:translate-y-1 transition-transform" />
                    </button>
                </div>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* --- 4. FORM GATE (PREMIUM VERIFICATION) --- */}
      {showForm && createPortal(
        <div className="fixed inset-0 z-[100001] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-[#0B1120]/95 backdrop-blur-xl animate-in fade-in" onClick={() => setShowForm(false)}></div>
            <div className="relative bg-white w-full max-w-md rounded-[3rem] shadow-2xl overflow-hidden border border-white/20 animate-in zoom-in-95">
                <div className="p-8 bg-[#F9FAFB] border-b border-gray-100 flex justify-between items-center text-left">
                    <h3 className="text-sm font-bold text-[#111827] uppercase tracking-widest">Verifikasi Akses</h3>
                    <button onClick={() => setShowForm(false)} className="p-2 text-gray-400 hover:text-[#E3242B] transition-all"><X size={20}/></button>
                </div>
                <form onSubmit={handleZipDownload} className="p-10 space-y-5 text-left">
                    {[
                      { label: 'Email Aktif *', key: 'email', type: 'text' },
                      { label: 'Asal Instansi *', key: 'instansi', type: 'text' }
                    ].map((item, i) => (
                        <div key={i} className="space-y-1.5">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">{item.label}</label>
                            <input 
                              required 
                              className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-4 focus:ring-red-50 text-sm font-semibold text-[#111827] outline-none transition-all" 
                              placeholder={`Masukkan ${item.label.replace(' *', '')}`}
                              onChange={(e) => setVisitor({...visitor, [item.key]: e.target.value})} 
                            />
                        </div>
                    ))}
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Keperluan Akses *</label>
                        <textarea 
                          required 
                          className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-4 focus:ring-red-50 h-24 resize-none text-sm font-semibold text-[#111827] outline-none transition-all" 
                          placeholder="Jelaskan tujuan penggunaan materi..."
                          onChange={(e) => setVisitor({...visitor, keperluan: e.target.value})} 
                        />
                    </div>
                    <button type="submit" className="w-full py-5 bg-[#E3242B] text-white font-bold rounded-2xl uppercase tracking-widest text-[11px] shadow-2xl hover:bg-[#111827] transition-all transform active:scale-95">
                        Konfirmasi & Unduh ZIP <Send size={16} className="inline ml-2" />
                    </button>
                </form>
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