const { siteUrl, hostName } = require("./constants/config");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [hostName],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: hostName,
        port: '',
        pathname: '/wp-content/uploads/**',
      },
    ],
  },
  // Настройки кеширования
  async headers() {
    return [
      {
        // Кеширование главной страницы
        source: '/',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=600, stale-while-revalidate=1800', // 10 минут кеш, 30 минут stale
          },
        ],
      },
      {
        // Кеширование API роутов
        source: '/api/products/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=300, stale-while-revalidate=600', // 5 минут кеш, 10 минут stale
          },
        ],
      },
      {
        // Кеширование статических ресурсов
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable', // 1 год
          },
        ],
      },
    ];
  },
  // Настройки для улучшения производительности сборки
  experimental: {
    largePageDataBytes: 128 * 1000, // 128KB
  },
}

module.exports = nextConfig;