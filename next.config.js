/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    MONGODB_SRV: process.env.MONGODB_SRV
  }
}

module.exports = nextConfig
