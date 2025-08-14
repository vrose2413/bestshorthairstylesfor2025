const fs = require("fs");
const path = require("path");
const glob = require("glob");
const matter = require("gray-matter");
const contentful = require("contentful");

const baseUrl = "https://bestshorthairstylesfor2025.pages.dev"; // change to your real site

// Fetch Contentful posts
async function fetchContentfulPosts() {
  const client = contentful.createClient({
    space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
    accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
  });

  const entries = await client.getEntries({
    content_type: "post", // change to your content type ID
    order: "-fields.publishedAt",
    limit: 1000,
  });

  return entries.items.map((item) => ({
    url: `/blog/${item.fields.slug}/`,
    lastmod: item.fields.publishedAt || new Date().toISOString(),
  }));
}

// Get local Next.js pages
function getStaticPages() {
  const pagesDir = path.join(__dirname, "../pages");
  const pagePaths = glob.sync("**/*.js", {
    cwd: pagesDir,
    ignore: ["_*.js", "**/[slug].js", "**/[...slug].js", "api/**"],
  });

  return pagePaths.map((page) => {
    const route = page
      .replace(/index\.js$/, "")
      .replace(/\.js$/, "")
      .replace(/\/$/, "");
    const url = `/${route}`;
    const fullPath = path.join(pagesDir, page);
    const lastmod = fs.statSync(fullPath).mtime.toISOString();
    return { url, lastmod };
  });
}

// Get Markdown posts
function getMarkdownPosts() {
  const postsDir = path.join(__dirname, "../posts");
  const postFiles = glob.sync("**/*.md", { cwd: postsDir });

  return postFiles.map((file) => {
    const fullPath = path.join(postsDir, file);
    const slug = file.replace(/\.md$/, "");
    const { data } = matter(fs.readFileSync(fullPath, "utf8"));
    const lastmod = data.date
      ? new Date(data.date).toISOString()
      : fs.statSync(fullPath).mtime.toISOString();
    return { url: `/blog/${slug}/`, lastmod };
  });
}

// Main function
(async () => {
  let urls = [];

  urls = urls.concat(getStaticPages());
  urls = urls.concat(getMarkdownPosts());

  try {
    const contentfulPosts = await fetchContentfulPosts();
    urls = urls.concat(contentfulPosts);
  } catch (e) {
    console.warn("Contentful fetch skipped:", e.message);
  }

  // Remove duplicates
  const seen = new Set();
  urls = urls.filter((u) => {
    if (seen.has(u.url)) return false;
    seen.add(u.url);
    return true;
  });

  // Build XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `<url>
  <loc>${baseUrl}${u.url}</loc>
  <lastmod>${u.lastmod}</lastmod>
</url>`
  )
  .join("\n")}
</urlset>`;

  // Save to public folder
  fs.writeFileSync(path.join(__dirname, "../public/sitemap.xml"), sitemap);
  console.log("✅ Sitemap generated with", urls.length, "URLs");
})();
