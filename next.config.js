const { siteUrl, hostName } = require("./constants/config");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [hostName],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: hostName,
        port: '',
        pathname: '/wp-content/uploads/**',
      },
    ],
  }
}

module.exports = nextConfig;