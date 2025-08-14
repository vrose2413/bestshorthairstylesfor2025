const fs = require("fs");
const path = require("path");
const glob = require("glob");

const siteUrl = "https://bestshorthairstylesfor2025.pages.dev";
const pagesDir = path.join(__dirname, "../pages");
const postsDir = path.join(__dirname, "../posts");

function generateSitemap() {
  const staticPages = glob
    .sync("**/*.js", {
      cwd: pagesDir,
      ignore: [
        "_*.js", // Ignore _app.js, _document.js, etc.
        "api/**",
        "[*", // Ignore dynamic routes
      ],
    })
    .map((page) => {
      const route = page
        .replace(".js", "")
        .replace("/index", "");
      return `${siteUrl}${route === "index" ? "" : `/${route}`}`;
    });

  const blogPosts = glob
    .sync("**/*.md", { cwd: postsDir })
    .map((file) => {
      const slug = file.replace(/\.md$/, "");
      return `${siteUrl}/blog/${slug}`;
    });

  const allUrls = [...staticPages, ...blogPosts];

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
  .map((url) => {
    return `<url><loc>${url}</loc></url>`;
  })
  .join("\n")}
</urlset>
`;

  fs.writeFileSync(path.join(__dirname, "../public/sitemap.xml"), sitemapXml);
  console.log("✅ Sitemap generated with", allUrls.length, "URLs.");
}

generateSitemap();
