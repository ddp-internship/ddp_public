export default async function handler(req, res) {
  try {
    const { id } = req.query;

    const API_BASE = (process.env.DDP_API_BASE_URL || "").replace(/\/$/, "");
    if (!API_BASE) {
      res.status(500).send("DDP_API_BASE_URL is not set");
      return;
    }

    // ambil data berita by id
    const r = await fetch(`${API_BASE}/public/berita/${id}`);
    if (!r.ok) {
      res.status(404).send("News not found");
      return;
    }

    const news = await r.json();

    const origin = `https://${req.headers.host}`;

    // karena kamu pakai HashRouter
    const redirectUrl = `${origin}/#/news?newsId=${encodeURIComponent(id)}`;

    const title = news.judul_artikel || "Warta DDP";
    const description = String(news.isi_artikel || "")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 160);

    // ✅ WAJIB: pakai gambar_url (bukan gambar_urls)
    // ✅ FIX GCS: storage.cloud.google.com -> storage.googleapis.com
    let image = String(news.gambar_url || "").trim();
    if (image.startsWith("https://storage.cloud.google.com/")) {
      image = image.replace(
        "https://storage.cloud.google.com/",
        "https://storage.googleapis.com/"
      );
    }

    res.setHeader("Content-Type", "text/html; charset=utf-8");
    // biar testing tidak ketahan cache
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
    res.status(500).send("Internal error");
  }
}

function escapeHtml(str = "") {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
