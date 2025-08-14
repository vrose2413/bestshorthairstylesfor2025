const fs = require("fs");
const path = require("path");
const glob = require("glob");

const siteUrl = "https://bestshorthairstylesfor2025.pages.dev";
const pagesDir = path.join(__dirname, "../pages");
const postsDir = path.join(__dirname, "../posts");

function generateSitemap() {
  // 1. Static pages
  const staticPages = glob
    .sync("**/*.js", {
      cwd: pagesDir,
      ignore: [
        "_*.js", // Ignore _app.js, _document.js
        "api/**",
        "[*]*", // Ignore dynamic routes
      ],
    })
    .map((page) => {
      const route = page
        .replace(".js", "")
        .replace("/index", "");
      return {
        loc: `${siteUrl}${route === "index" ? "" : `/${route}`}`,
        lastmod: new Date(fs.statSync(path.join(pagesDir, page)).mtime).toISOString(),
      };
    });

  // 2. Blog posts
  const blogPosts = glob
    .sync("**/*.{md,mdx}", { cwd: postsDir })
    .map((file) => {
      const slug = file.replace(/\.(md|mdx)$/, "");
      return {
        loc: `${siteUrl}/blog/${slug}`,
        lastmod: new Date(fs.statSync(path.join(postsDir, file)).mtime).toISOString(),
      };
    });

  // Combine
  const allUrls = [...staticPages, ...blogPosts];

  // 3. Build XML
  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
  .map((url) => {
    return `<url>
  <loc>${url.loc}</loc>
  <lastmod>${url.lastmod}</lastmod>
</url>`;
  })
  .join("\n")}
</urlset>
`;

  // 4. Save to public/
  fs.writeFileSync(path.join(__dirname, "../public/sitemap.xml"), sitemapXml);
  console.log(`✅ Sitemap generated with ${allUrls.length} URLs`);
}

generateSitemap();
