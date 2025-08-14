const fs = require("fs");
const path = require("path");
const glob = require("glob");

const baseUrl = "https://bestnewshorthairstyles2025.pages.dev"; // ✅ Replace with your real URL
const pagesDir = path.join(__dirname, "../pages");

function generateSitemap() {
  const pagePaths = glob.sync("**/*.js", {
    cwd: pagesDir,
    ignore: [
      "_*.js",       // Ignore _app.js, _document.js
      "**/[[]*[]].js", // Ignore dynamic routes like [slug].js
      "api/**"       // Ignore API routes
    ]
  });

  const urls = pagePaths.map((file) => {
    const route = file
      .replace(/\.js$/, "")
      .replace(/index$/, "")
      .replace(/\\/g, "/");

    return `${baseUrl}/${route}`;
  });

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls
    .map(
      (url) => `
  <url>
    <loc>${url}</loc>
  </url>`
    )
    .join("\n")}
</urlset>`;

  fs.writeFileSync(path.join(__dirname, "../out/sitemap.xml"), sitemap, "utf8");
  console.log("✅ sitemap.xml generated!");
}

generateSitemap();
