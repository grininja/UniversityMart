/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    MONGODB_SRV: process.env.MONGODB_SRV,
    BASE_URL: process.env.BASE_URL,
  },
};

module.exports = nextConfig;
