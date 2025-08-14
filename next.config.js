/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // ✅ ensures static build
  images: { unoptimized: true } // optional: needed if you use next/image
};

module.exports = nextConfig;
