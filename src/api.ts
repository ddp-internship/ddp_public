import axios from 'axios';

/**
 * LOGIKA JEMBATAN OTOMATIS:
 * Mengambil link dari Vercel Settings (VITE_API_URL).
 * Jika di laptop (localhost), otomatis pakai port 8000.
 */
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api"; 

export const api = axios.create({
    baseURL: BASE_URL,
    headers: { 'Accept': 'application/json' }
});

// FUNGSI PINTAR GAMBAR: Link otomatis mengikuti alamat API yang aktif
export const getStorageUrl = (path: any) => {
    if (!path) return "/img/placeholder.png"; 
    
    let targetPath = Array.isArray(path) ? path[0] : path;
    if (typeof targetPath !== 'string') return "/img/placeholder.png";
    
    const cleanPath = targetPath.replace('public/', '');
    
    // Otomatis mengubah /api menjadi /storage pada link Ngrok
    const storageBase = BASE_URL.replace('/api', '/storage');
    
    return `${storageBase}/${cleanPath}`;
};
