/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cms.moscow-shiny.ru'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'cms.moscow-shiny.ru',
        port: '',
        pathname: '/wp-content/uploads/**',
      },
    ],
  }
}

module.exports = nextConfig
