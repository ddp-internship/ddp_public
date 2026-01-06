import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { 
  Menu, X, ChevronDown, ChevronRight, 
  Book, FileText, Globe, AppWindow, 
  Info, Camera, Newspaper, BarChart3,
  MapPin, Activity, ShieldCheck, Zap
} from 'lucide-react';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- FUNGSI NAVIGASI PINTAR (SOP: Lintas Halaman Tanpa Merubah Style) ---
  const handleNavigation = (id: string) => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);

    if (location.pathname !== '/') {
      // Jika posisi sedang tidak di Home, pindah ke Home dulu baru bawa ID-nya
      navigate(`/#${id}`);
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      // Jika sudah di Home, langsung scroll halus
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className={`fixed w-full top-0 left-0 transition-all duration-500 z-[9999] ${
      isScrolled || location.pathname !== '/' 
      ? 'bg-white/95 backdrop-blur-xl shadow-2xl py-3' 
      : 'bg-transparent py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        
        {/* --- LOGO SECTION --- */}
        <div onClick={() => navigate('/')} className="flex items-center gap-3 shrink-0 cursor-pointer">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg p-1.5 border border-gray-100">
            <img src="/img/logo-ddp.png" alt="Logo DDP" className="w-full h-full object-contain" />
          </div>
          <div className="flex flex-col">
            <span className={`font-black tracking-tighter text-xl leading-none transition-colors duration-500 ${isScrolled || location.pathname !== '/' ? 'text-[#111827]' : 'text-white'}`}>
              DATA DESA <span className="text-[#E3242B]">PRESISI</span>
            </span>
            <span className={`text-[9px] font-black tracking-[0.2em] uppercase transition-colors duration-500 ${isScrolled || location.pathname !== '/' ? 'text-gray-400' : 'text-gray-300'}`}>
              SOLUSI SATU DATA INDONESIA
            </span>
          </div>
        </div>

        {/* --- DESKTOP MENU --- */}
        <div className={`hidden lg:flex gap-8 text-[11px] font-black uppercase tracking-widest items-center ${isScrolled || location.pathname !== '/' ? 'text-gray-600' : 'text-gray-200'}`}>
          <button onClick={() => handleNavigation('hero')} className="hover:text-[#E3242B] transition-colors uppercase">HOME</button>
          <button onClick={() => handleNavigation('about')} className="hover:text-[#E3242B] transition-colors uppercase">ABOUT</button>
          <button onClick={() => handleNavigation('features')} className="hover:text-[#E3242B] transition-colors uppercase">FEATURES</button>
          
          {/* --- DROP DOWN PRODUCT & PUBLIKASI --- */}
          <div 
            className="relative group py-2"
            onMouseEnter={() => setActiveDropdown('product')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button className={`flex items-center gap-1 hover:text-[#E3242B] transition-colors uppercase ${['monografi', 'news', 'infografis'].includes(activeDropdown || '') ? 'text-[#E3242B]' : ''}`}>
              PRODUCT & PUBLIKASI <ChevronDown size={14} className={`transition-transform duration-300 ${activeDropdown === 'product' ? 'rotate-180' : ''}`} />
            </button>
            
            <div className={`absolute top-full -left-10 w-[350px] bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] p-6 text-[#111827] transition-all duration-300 origin-top border border-gray-100 ${
              activeDropdown === 'product' ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
            }`}>
              <div className="space-y-1">
                <p className="px-4 py-2 text-[9px] font-black text-[#E3242B] uppercase tracking-[0.3em] opacity-40">LITERASI DIGITAL</p>
                
                <div className="relative group/sub">
                  <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-2xl transition-all cursor-pointer">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600"><Book size={16} /></div>
                        <span className="font-black text-[10px] uppercase tracking-widest">KATALOG BUKU</span>
                    </div>
                    <ChevronRight size={12} className="text-gray-300" />
                  </div>
                  <div className="absolute left-full top-0 ml-2 w-52 bg-white rounded-2xl shadow-xl p-3 border border-gray-100 opacity-0 invisible group-hover/sub:visible group-hover/sub:opacity-100 transition-all">
                    {/* --- LINK UNTUK BUKU (DATA DESA PRESISI) --- */}
                  <Link to="/buku-jurnal" state={{ tab: 'buku' }} 
                    className="block p-3 hover:bg-red-50 hover:text-[#E3242B] text-[10px] font-black rounded-xl uppercase transition-colors">
                      DATA DESA PRESISI</Link>
                    <button onClick={() => handleNavigation('monografi')} className="w-full text-left p-3 hover:bg-red-50 hover:text-[#E3242B] text-[10px] font-black rounded-xl uppercase transition-colors">MONOGRAFI DESA</button>
                  </div>
                </div>

                {/* --- LINK UNTUK JURNAL --- */}
                <Link to="/buku-jurnal" state={{ tab: 'jurnal' }} 
                  className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-2xl transition-all group">
                      <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-all">
                       <FileText size={16} />
                      </div>
                  <span className="font-black text-[10px] uppercase tracking-widest text-[#111827] group-hover:text-[#E3242B]">
                    JURNAL PRESISI </span>
                    </Link>

                <button onClick={() => handleNavigation('news')} className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-2xl transition-all group text-left">
                    <div className="w-8 h-8 bg-red-50 rounded-lg flex items-center justify-center text-[#E3242B] group-hover:bg-[#E3242B] group-hover:text-white transition-all"><Newspaper size={16} /></div>
                    <span className="font-black text-[10px] uppercase tracking-widest">BERITA & ARTIKEL</span>
                </button>

                <button onClick={() => handleNavigation('infografis')} className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-2xl transition-all group text-left">
                    <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all"><BarChart3 size={16} /></div>
                    <span className="font-black text-[10px] uppercase tracking-widest">INFOGRAFIS DDP</span>
                </button>

                <div className="my-3 border-t border-gray-100"></div>
                <p className="px-4 py-2 text-[9px] font-black text-gray-400 uppercase tracking-[0.3em] opacity-40">DIGITAL PLATFORM</p>

                <div className="grid grid-cols-1 gap-1">
                    <a href="https://webgis.desapresisi.id" target="_blank" rel="noreferrer" className="flex items-center gap-3 p-3 hover:bg-blue-600 hover:text-white rounded-2xl transition-all group">
                        <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 group-hover:bg-white/20 group-hover:text-white transition-all"><Globe size={16} /></div>
                        <span className="font-black text-[10px] uppercase tracking-widest">WEBGIS DDP</span>
                    </a>
                    <a href="#" className="flex items-center gap-3 p-3 hover:bg-emerald-600 hover:text-white rounded-2xl transition-all group">
                        <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600 group-hover:bg-white/20 group-hover:text-white transition-all"><AppWindow size={16} /></div>
                        <span className="font-black text-[10px] uppercase tracking-widest">MERDESA SENSUS</span>
                    </a>
                    <a href="#" className="flex items-center gap-3 p-3 hover:bg-orange-600 hover:text-white rounded-2xl transition-all group">
                        <div className="w-8 h-8 bg-orange-50 rounded-lg flex items-center justify-center text-orange-600 group-hover:bg-white/20 group-hover:text-white transition-all"><MapPin size={16} /></div>
                        <span className="font-black text-[10px] uppercase tracking-widest">MERDESA MAPS</span>
                    </a>
                    <a href="#" className="flex items-center gap-3 p-3 hover:bg-red-600 hover:text-white rounded-2xl transition-all group">
                        <div className="w-8 h-8 bg-red-50 rounded-lg flex items-center justify-center text-red-600 group-hover:bg-white/20 group-hover:text-white transition-all"><Activity size={16} /></div>
                        <span className="font-black text-[10px] uppercase tracking-widest">MERDESA MONEV</span>
                    </a>
                </div>
              </div>
            </div>
          </div>

          <button onClick={() => handleNavigation('gallery')} className="hover:text-[#E3242B] transition-colors uppercase">GALLERY</button>
          <button onClick={() => handleNavigation('testimonials')} className="hover:text-[#E3242B] transition-colors uppercase">TESTIMONI</button>
        </div>

        {/* --- ACTION BUTTON --- */}
        <div className="flex items-center gap-4">
          <a href="https://ddppublic.vercel.app/" target="_blank" rel="noreferrer" className="hidden md:flex items-center gap-2 bg-[#111827] text-white px-7 py-3 rounded-full font-black uppercase tracking-widest text-[9px] shadow-xl hover:bg-[#E3242B] transition-all transform hover:-translate-y-1">
            <ShieldCheck size={14} className="text-[#E3242B]" /> PORTAL ADMIN
          </a>
          <button className="lg:hidden text-[#E3242B]" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* --- MOBILE MENU --- */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 p-8 space-y-6 shadow-2xl absolute w-full left-0 animate-fade-in overflow-y-auto max-h-[85vh]">
          {['home', 'about', 'features', 'monografi', 'news', 'gallery', 'testimonials'].map((item) => (
            <button 
                key={item} 
                onClick={() => handleNavigation(item)} 
                className="block w-full text-left font-black text-[11px] text-[#111827] uppercase tracking-widest pb-3 border-b border-gray-50 hover:text-[#E3242B]"
            >
                {item === 'testimonials' ? 'TESTIMONIALS' : item.toUpperCase()}
            </button>
          ))}
          <a href="https://ddppublic.vercel.app/" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 w-full bg-[#E3242B] text-white py-5 rounded-2xl font-black text-[10px] tracking-[0.2em] shadow-lg shadow-red-900/20 uppercase">
             <ShieldCheck size={16}/> MASUK PORTAL ADMIN
          </a>
        </div>
      )}
    </nav>
  );
};