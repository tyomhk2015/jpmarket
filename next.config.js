/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["imagedelivery.net", "videodelivery.net" ],
  },
  env: {
    GOOGLEMAP_API: process.env.GOOGLEMAP_API,
  }
};

module.exports = nextConfig;
