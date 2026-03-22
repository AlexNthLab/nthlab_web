/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  // 图片优化配置
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],

    // 允许加载图片的域名（用于外部图片）
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.github.com',
        pathname: '/**',
      },
    ],

    // 禁用图片优化（如果需要）
    // unoptimized: true,
  },

  // 编译器选项
  compiler: {
    // 移除 console.log 在生产环境
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // 环境变量
  env: {
    SITE_URL: process.env.SITE_URL || 'https://nthlab.ai',
    BUILD_TIMESTAMP: new Date().toISOString(),
  },

  // 头部配置
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          // 注意：CSP 头通常在生产环境单独配置
        ],
      },
    ];
  },

  // 无重定向：/ 为中文，/en 为英文，各自独立路由
  async redirects() {
    return [];
  },

  // 输出配置
  output: 'standalone', // 适用于 Docker 部署

  // 生产环境忽略 TypeScript 错误
  typescript: {
    ignoreBuildErrors: false,
  },

  // 生产环境忽略 ESLint 错误
  eslint: {
    ignoreDuringBuilds: false,
  },
};

module.exports = nextConfig;