import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { BookOpen, ArrowUpRight, FileCheck, X, Send, ShieldCheck, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { api, getStorageUrl } from '../api';
import { ScrollReveal } from './ScrollReveal'; // SOP: Menambahkan import animasi

export const Monografi = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // State untuk Pop-up Verifikasi
  const [showModal, setShowModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState<any>(null);
  const [visitor, setVisitor] = useState({ email: '', nama: '', instansi: '', keperluan: '' });

  // --- FETCH DATA ---
  useEffect(() => {
    // Sinkronisasi data monografi pilihan dari jalur publik
    api.get('/public/monografi/featured')
      .then(res => {
        setItems(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Kunci Scroll saat Modal Aktif
  useEffect(() => {
    document.body.style.overflow = showModal ? 'hidden' : 'auto';
  }, [showModal]);

  const handleOpenForm = (item: any) => {
    setSelectedBook(item);
    setShowModal(true);
  };

  const handleProcessDownload = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/public/monografi/download', {
        monografi_id: selectedBook.id,
        ...visitor
      });
      
      window.open(selectedBook.link, '_blank');
      setShowModal(false);
      setVisitor({ email: '', nama: '', instansi: '', keperluan: '' });
      alert("Verifikasi berhasil. Membuka dokumen digital...");
    } catch (error) {
      alert("Mohon lengkapi formulir verifikasi dengan benar.");
    }
  };

  if (loading) return (
    <div className="py-20 text-center">
      <div className="w-8 h-8 border-3 border-[#E3242B] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-[10px] font-bold text-gray-400 tracking-wider">Menghubungkan ke katalog...</p>
    </div>
  );

  return (
    <section id="monografi" className="py-24 bg-white px-6 lg:px-24 relative overflow-hidden selection:bg-[#E3242B] selection:text-white text-left">
      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gray-50 rounded-full blur-[120px] -z-0 opacity-40 translate-x-1/2 -translate-y-1/2"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* --- 1. HEADER (ANIMATED) --- */}
        <ScrollReveal>
          <div className="flex flex-col lg:flex-row justify-between items-center lg:items-end gap-8 mb-16 pb-10 border-b border-gray-100">
            <div className="space-y-3 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-2">
                 <span className="text-[11px] font-bold text-[#E3242B] tracking-wider uppercase">Repositori Digital</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-[#111827] tracking-tighter leading-none">
                Katalog <span className="text-[#E3242B]">Monografi</span>
              </h2>
              <p className="text-gray-500 font-medium text-sm max-w-md leading-relaxed">
                Arsip profil desa yang terverifikasi untuk mendukung pembangunan berbasis data dan fakta.
              </p>
            </div>
            
            <Link to="/monografi" className="group flex items-center gap-4 bg-[#111827] text-white px-8 py-4 rounded-xl font-bold text-xs tracking-wide hover:bg-[#E3242B] transition-all shadow-xl active:scale-95">
              Telusuri Semua Monografi <ArrowUpRight size={16} className="group-hover:rotate-45 transition-transform" />
            </Link>
          </div>
        </ScrollReveal>

        {/* --- 2. GRID BUKU (ANIMATED DELAY 0.2) --- */}
        <ScrollReveal delay={0.2}>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-10">
            {items.map((item) => (
              <div key={item.id} className="group cursor-pointer flex flex-col h-full" onClick={() => handleOpenForm(item)}>
                <div className="relative aspect-[3/4.2] rounded-[2rem] overflow-hidden shadow-lg group-hover:shadow-[0_30px_60px_rgba(0,0,0,0.12)] transition-all duration-700 border-4 border-white bg-gray-50">
                  <img 
                      src={item.gambar_url} 
                      alt={`Sampul Monografi ${item.desa}`} 
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" 
                  />
                  
                  {/* Immersive Overlay */}
                  <div className="absolute inset-0 bg-[#111827]/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6 backdrop-blur-[2px]">
                      <div className="w-10 h-10 bg-[#E3242B] rounded-xl flex items-center justify-center text-white mb-3 shadow-lg"><BookOpen size={20} /></div>
                      <p className="text-white font-bold text-[11px] tracking-wide">Baca Dokumen</p>
                  </div>
                </div>
                
                <div className="mt-6 text-center lg:text-left space-y-1 px-1">
                  <h4 className="text-[#111827] font-bold text-sm tracking-tight leading-tight line-clamp-2 group-hover:text-[#E3242B] transition-colors">
                      {item.desa}
                  </h4>
                  <div className="flex items-center justify-center lg:justify-start gap-2 opacity-60">
                      <div className="h-px w-4 bg-[#111827]"></div>
                      <span className="text-[10px] font-bold text-[#111827] tracking-wider">Tahun {item.tahun}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>

      {/* --- 3. MODAL VERIFIKASI --- */}
      {showModal && createPortal(
        <div className="fixed inset-0 flex items-center justify-center p-4 md:p-6" style={{ zIndex: 99999 }}>
            <div className="absolute inset-0 bg-[#0B1120]/95 backdrop-blur-xl animate-in fade-in duration-500" onClick={() => setShowModal(false)}></div>
            
            <div className="relative bg-white w-full max-w-md rounded-[3rem] shadow-[0_50px_100px_rgba(0,0,0,0.4)] overflow-hidden border border-white/20 z-100000 animate-in zoom-in-95 duration-300">
                <div className="p-8 bg-[#F9FAFB] border-b border-gray-100 flex justify-between items-center text-left">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2 text-[#E3242B]">
                            <ShieldCheck size={18} />
                            <h3 className="text-sm font-bold tracking-tight">Verifikasi Akses</h3>
                        </div>
                        <p className="text-xs font-semibold text-gray-500 leading-tight">Membuka materi: <span className="text-[#111827]">{selectedBook?.desa}</span></p>
                    </div>
                    <button onClick={() => setShowModal(false)} className="p-2 hover:bg-white rounded-full text-gray-400 hover:text-[#E3242B] transition-all shadow-sm"><X size={20}/></button>
                </div>
                
                <form onSubmit={handleProcessDownload} className="p-10 space-y-6 text-left">
                    <div className="space-y-2">
                        <label className="text-[11px] font-bold text-gray-500 tracking-wider ml-1 uppercase">Nama Lengkap</label>
                        <input 
                            required 
                            type="text"
                            placeholder="Masukkan nama Anda"
                            className="w-full p-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:border-red-100 focus:bg-white outline-none transition-all text-sm font-medium"
                            onChange={(e) => setVisitor({...visitor, nama: e.target.value})}
                        />
                    </div>
                    
                    <div className="space-y-2">
                        <label className="text-[11px] font-bold text-gray-500 tracking-wider ml-1 uppercase">Alamat Email</label>
                        <input 
                            required 
                            type="email"
                            placeholder="nama@email.com"
                            className="w-full p-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:border-red-100 focus:bg-white outline-none transition-all text-sm font-medium"
                            onChange={(e) => setVisitor({...visitor, email: e.target.value})}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-[11px] font-bold text-gray-500 tracking-wider ml-1 uppercase">Instansi</label>
                        <input 
                            required 
                            type="text"
                            placeholder="Nama organisasi atau lembaga"
                            className="w-full p-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:border-red-100 focus:bg-white outline-none transition-all text-sm font-medium"
                            onChange={(e) => setVisitor({...visitor, instansi: e.target.value})}
                        />
                    </div>

                    <button type="submit" className="w-full py-5 bg-[#111827] text-white font-bold rounded-2xl flex items-center justify-center gap-3 tracking-wide text-xs hover:bg-[#E3242B] transition-all shadow-xl group">
                        Konfirmasi & Buka Dokumen <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </button>
                    
                    <div className="flex gap-3 p-4 bg-blue-50 rounded-2xl items-start">
                        <Info size={16} className="text-blue-500 shrink-0 mt-0.5" />
                        <p className="text-[10px] text-blue-600 font-medium leading-relaxed">
                            Data Anda digunakan sebagai bagian dari pendataan distribusi informasi publik laboratorium desa.
                        </p>
                    </div>
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