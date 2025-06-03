/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true, // ✅ Allow builds with ESLint errors
  },
  experimental: {
    // Clean slate — no experimental flags currently set
  },
};

module.exports = nextConfig;
