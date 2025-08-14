/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true, // ✅ keeps trailing slashes for SEO
  env: {
    NEXT_PUBLIC_CONTENTFUL_SPACE_ID: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
    NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
  },
  output: 'export', // ✅ enables static HTML export for Cloudflare Pages
};

module.exports = nextConfig;
