/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // domains: ["https://firebasestorage.googleapis.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        port: "",
      },
    ],
  },
  reactStrictMode: true,
  env: {
    MONGODB_SRV: process.env.MONGODB_SRV,
    BASE_URL: process.env.BASE_URL,
  },
};

module.exports = nextConfig;
