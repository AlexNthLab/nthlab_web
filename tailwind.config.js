/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './chinese/**/*.{js,ts,jsx,tsx,mdx}',
    './english/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class', // 使用 class 策略，通过 JavaScript 控制
  theme: {
    extend: {
      colors: {
        // 品牌颜色
        brand: {
          cyan: {
            400: '#22d3ee',
            600: '#0891b2',
          },
        },
        // 扩展灰色调用于暗黑模式
        gray: {
          850: '#1f2937',
          950: '#0a0a0a',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'slide-in-left': 'slideInLeft 0.6s ease-out forwards',
        'slide-in-right': 'slideInRight 0.6s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      transitionProperty: {
        'colors': 'background-color, border-color, color, fill, stroke',
        'transform': 'transform',
      },
      transitionDuration: {
        '700': '700ms',
        '1000': '1000ms',
      },
      backdropBlur: {
        xs: '2px',
      },
      borderWidth: {
        '1': '1px',
        '3': '3px',
      },
      // 自定义间距
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      // 字体配置
      fontFamily: {
        sans: [
          'Inter',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
        mono: [
          'JetBrains Mono',
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'Consolas',
          'Liberation Mono',
          'Courier New',
          'monospace',
        ],
      },
      // 边框半径
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'), // 美化表单元素
    require('@tailwindcss/typography'), // 排版插件
    require('@tailwindcss/aspect-ratio'), // 宽高比插件
  ],
  // 安全列表：确保某些类始终生成
  safelist: [
    'animate-fade-in-delay-1',
    'animate-fade-in-delay-2',
    'animate-fade-in-delay-3',
    'bg-black',
    'bg-white',
    'text-black',
    'text-white',
    'border-gray-800',
    'border-gray-200',
    'hover:border-gray-600',
    'hover:border-gray-400',
    'text-cyan-400',
    'text-cyan-600',
    'bg-cyan-400/10',
    'bg-cyan-100',
  ],
};