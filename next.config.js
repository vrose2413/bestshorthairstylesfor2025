/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true, // keep trailing slashes
  output: 'export',    // tells Next.js to do static export
  env: {
    NEXT_PUBLIC_CONTENTFUL_SPACE_ID: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
    NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
  },
};

module.exports = nextConfig;
