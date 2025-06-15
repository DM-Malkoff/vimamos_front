const {siteUrl} = require("./constants/config");
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [siteUrl],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: siteUrl,
        port: '',
        pathname: '/wp-content/uploads/**',
      },
    ],
  }
}

module.exports = nextConfig
