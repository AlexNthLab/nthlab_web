import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: 'Nᵗʰ Lab - 拒绝概率，拥抱确定',
    template: '%s | Nᵗʰ Lab',
  },
  description: 'Nᵗʰ Lab - 确定性AI框架。混合逻辑时钟(HLC)确保多Agent任务流在网络波动中始终保持因果一致性，WAL预写日志与Epoch快照保证原子性变更。',
  keywords: [
    'Nth Lab',
    '确定性AI',
    'AI框架',
    '多Agent协同',
    '因果一致性',
    'HLC',
    '安全执行',
    'SafeExec',
  ],
  authors: [
    { name: 'Nᵗʰ Lab Team', url: 'https://nthlab.ai' },
  ],
  creator: 'Nᵗʰ Lab',
  publisher: 'Nᵗʰ Lab',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.SITE_URL || 'https://nthlab.ai'),
  alternates: {
    canonical: '/',
    languages: {
      'zh': '/',
      'en': '/en',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: process.env.SITE_URL || 'https://nthlab.ai',
    title: 'Nᵗʰ Lab - 拒绝概率，拥抱确定',
    description: '确定性AI框架，让多Agent协作变得可靠、安全、可追溯。',
    siteName: 'Nᵗʰ Lab',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Nᵗʰ Lab - 确定性AI框架',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nᵗʰ Lab - 拒绝概率，拥抱确定',
    description: '确定性AI框架，让多Agent协作变得可靠、安全、可追溯。',
    images: ['/og-image.png'],
    creator: '@nthlab',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    yandex: process.env.YANDEX_VERIFICATION,
    yahoo: process.env.YAHOO_VERIFICATION,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
  colorScheme: 'light dark',
};

interface RootLayoutProps {
  children: React.ReactNode;
  params: {
    lang: string;
  };
}

export default function RootLayout({ children, params }: RootLayoutProps) {
  return (
    <html
      lang={params.lang || 'zh'}
      className={`${inter.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link
          rel="apple-touch-icon"
          href="/apple-touch-icon.png"
          type="image/png"
          sizes="180x180"
        />
        <link
          rel="icon"
          href="/icon.svg"
          type="image/svg+xml"
          sizes="any"
        />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

        {/* 性能优化: 预加载关键资源 */}
        <link rel="preload" href="/logo.png" as="image" type="image/png" />

        {/* 安全相关meta标签 */}
        <meta httpEquiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://api.nthlab.ai;" />
      </head>
      <body className={`${inter.className} bg-white dark:bg-black text-black dark:text-white transition-colors duration-700 min-h-screen`}>
        <ThemeProvider>
          <div className="relative flex min-h-screen flex-col">
            <main className="flex-1">{children}</main>

            {/* 全局页脚 */}
            <footer className="border-t border-gray-200 dark:border-gray-800 py-6">
              <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-center">
                  <div className="mb-4 md:mb-0">
                    <p className="text-xs tracking-[0.1em] uppercase text-gray-600 dark:text-gray-400">
                      © {new Date().getFullYear()} Nᵗʰ Lab. 保留所有权利。
                    </p>
                  </div>
                  <div className="flex gap-6">
                    <a
                      href="/privacy"
                      className="text-xs tracking-[0.1em] uppercase text-gray-600 dark:text-gray-400 hover:text-current transition-colors"
                    >
                      隐私政策
                    </a>
                    <a
                      href="/terms"
                      className="text-xs tracking-[0.1em] uppercase text-gray-600 dark:text-gray-color hover:text-current transition-colors"
                    >
                      服务条款
                    </a>
                    <a
                      href="mailto:contact@nthlab.ai"
                      className="text-xs tracking-[0.1em] uppercase text-gray-600 dark:text-gray-400 hover:text-current transition-colors"
                    >
                      联系我们
                    </a>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}