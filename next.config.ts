/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['xsgames.co', 'upload.wikimedia.org', 'avatars.githubusercontent.com'],
  },
};

module.exports = nextConfig;
