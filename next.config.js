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
    // Настройки оптимизации изображений
    formats: ['image/webp'], // Только WebP формат
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840], // Размеры для разных устройств
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384], // Размеры для небольших изображений
    minimumCacheTTL: 60 * 60 * 24 * 365, // Кеш изображений на 1 год
    dangerouslyAllowSVG: true, // Разрешаем SVG (опционально)
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;", // Безопасность для SVG
    // Настройки для внешних изображений
    unoptimized: false, // Включаем оптимизацию для всех изображений
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
      {
        // Кеширование оптимизированных изображений Next.js
        source: '/_next/image/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable', // 1 год для оптимизированных изображений
          },
        ],
      },
    ];
  },
  // Настройки для улучшения производительности сборки
  experimental: {
    largePageDataBytes: 128 * 1000, // 128KB
  },
  // Настройки для улучшения производительности сборки
  experimental: {
    largePageDataBytes: 1024 * 1000, // 512KB (увеличено с 128KB)
  },
}

module.exports = nextConfig;