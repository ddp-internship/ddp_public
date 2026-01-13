import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
app.set("trust proxy", true);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ isi lewat ENV saat deploy / run
const API_BASE = (process.env.DDP_API_BASE_URL || "").replace(/\/$/, "");
const ROUTER_MODE = process.env.ROUTER_MODE || "hash"; // kamu pakai HashRouter

function escapeHtml(str = "") {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

async function fetchNewsById(id) {
  if (!API_BASE) throw new Error("DDP_API_BASE_URL belum di-set");

  // 1) coba endpoint detail
  let res = await fetch(`${API_BASE}/public/berita/${id}`);
  if (res.ok) return await res.json();

  // 2) fallback: kalau belum ada endpoint detail, ambil list lalu cari
  res = await fetch(`${API_BASE}/public/berita`);
  if (!res.ok) throw new Error("Gagal ambil list berita dari API");
  const list = await res.json();
  const found = list.find((n) => String(n.id) === String(id));
  if (!found) throw new Error("Berita tidak ditemukan");
  return found;
}

// ✅ URL share untuk WhatsApp preview
app.get("/share/news/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const origin = `${req.protocol}://${req.get("host")}`;
    const redirectPath =
      ROUTER_MODE === "browser"
        ? `/news?newsId=${encodeURIComponent(id)}`
        : `/#/news?newsId=${encodeURIComponent(id)}`;

    const redirectUrl = `${origin}${redirectPath}`;

    const news = await fetchNewsById(id);

    const title = news.judul_artikel || "Warta DDP";
    const description = (news.isi_artikel || "")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 160);

    // ✅ utamakan gambar_url (berita), fallback ke gambar_urls[0] kalau ada
    const image =
      news.gambar_url ||
      (Array.isArray(news.gambar_urls) ? news.gambar_urls[0] : "") ||
      "";

    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.setHeader("Cache-Control", "no-store, max-age=0");

    res.status(200).send(`<!doctype html>
<html lang="id">
<head>
  <meta charset="utf-8" />
  <title>${escapeHtml(title)}</title>

  <meta property="og:type" content="article" />
  <meta property="og:title" content="${escapeHtml(title)}" />
  <meta property="og:description" content="${escapeHtml(description)}" />
  ${image ? `<meta property="og:image" content="${escapeHtml(image)}" />` : ""}
  <meta property="og:url" content="${escapeHtml(redirectUrl)}" />

  <meta name="twitter:card" content="summary_large_image" />
  ${image ? `<meta name="twitter:image" content="${escapeHtml(image)}" />` : ""}

  <link rel="canonical" href="${escapeHtml(redirectUrl)}" />
  <meta http-equiv="refresh" content="0; url=${escapeHtml(redirectUrl)}" />
</head>
<body>
  Redirecting...
  <script>location.replace(${JSON.stringify(redirectUrl)})</script>
</body>
</html>`);
  } catch (e) {
    res.status(404).send("Not found");
  }
});

// ✅ serve dist hasil build vite
const distPath = path.join(__dirname, "dist");
app.use(express.static(distPath, { index: false }));

// ✅ fallback SPA
app.get("*", (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server running on :${port}`));

app.use(express.static(distPath, { index: false }));

app.get("/", (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

app.get("/news", (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

// fallback terakhir
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});
