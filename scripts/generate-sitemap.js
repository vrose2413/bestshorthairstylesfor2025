const fs = require("fs");
const path = require("path");

const baseUrl = "https://bestshorthairstylesfor2025.pages.dev"; // change if needed

// Paths
const pagesDir = path.join(__dirname, "../pages");
const postsDir = path.join(__dirname, "../posts"); // Markdown blog posts

function getLastMod(filePath) {
  const stats = fs.statSync(filePath);
  return stats.mtime.toISOString().split("T")[0];
}

function getPagePaths(dir) {
  return fs
    .readdirSync(dir)
    .filter(
      (file) =>
        !file.startsWith("_") &&
        !file.startsWith("[") &&
        !["api"].includes(file) &&
        (file.endsWith(".js") || file.endsWith(".jsx") || file.endsWith(".tsx"))
    )
    .map((file) => {
      let name = file.replace(/\.(js|jsx|tsx)$/, "");
      if (name === "index") return "/";
      return `/${name}`;
    });
}

function getPostPaths(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".md") || file.endsWith(".mdx"))
    .map((file) => {
      const slug = file.replace(/\.(md|mdx)$/, "");
      return `/blog/${slug}`;
    });
}

// Collect all URLs
let urls = [];

// Pages
getPagePaths(pagesDir).forEach((route) => {
  const filePath =
    route === "/"
      ? path.join(pagesDir, "index.js")
      : path.join(pagesDir, `${route.replace("/", "")}.js`);
  urls.push({
    loc: `${baseUrl}${route}`,
    lastmod: getLastMod(filePath),
  });
});

// Blog posts
getPostPaths(postsDir).forEach((route) => {
  const filePath = path.join(postsDir, `${route.split("/").pop()}.md`);
  urls.push({
    loc: `${baseUrl}${route}`,
    lastmod: getLastMod(filePath),
  });
});

// Build XML
const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `<url>
  <loc>${url.loc}</loc>
  <lastmod>${url.lastmod}</lastmod>
</url>`
  )
  .join("\n")}
</urlset>`;

// Save
const publicDir = path.join(__dirname, "../public");
if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir);
fs.writeFileSync(path.join(publicDir, "sitemap.xml"), sitemapXml, "utf8");

console.log("✅ Sitemap generated with", urls.length, "URLs");
