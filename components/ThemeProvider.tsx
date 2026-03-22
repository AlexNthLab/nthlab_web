'use client';

import React, { createContext, useContext } from 'react';
import { useTheme } from '@/lib/hooks/useTheme';

interface ThemeContextType {
  theme: 'dark' | 'light';
  resolvedTheme: 'dark' | 'light';
  preference: 'dark' | 'light' | 'system';
  setPreference: (preference: 'dark' | 'light' | 'system') => void;
  toggleTheme: () => void;
  isDark: boolean;
  isLight: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: 'dark' | 'light' | 'system';
}

export function ThemeProvider({ children, defaultTheme }: ThemeProviderProps) {
  const theme = useTheme();

  // 如果提供了默认主题，覆盖初始值
  React.useEffect(() => {
    if (defaultTheme && theme.preference !== defaultTheme) {
      theme.setPreference(defaultTheme);
    }
  }, [defaultTheme, theme]);

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useThemeContext必须在ThemeProvider内部使用');
  }
  return context;
}

/**
 * 主题切换按钮组件
 */
export function ThemeToggle() {
  const { theme, toggleTheme, isDark, isLight } = useThemeContext();

  return (
    <button
      onClick={toggleTheme}
      className="relative w-10 h-10 rounded-full border border-gray-300 dark:border-gray-700 flex items-center justify-center hover:scale-110 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
      aria-label={isDark ? '切换到明亮模式' : '切换到暗黑模式'}
      title={isDark ? '切换到明亮模式' : '切换到暗黑模式'}
    >
      {/* 太阳图标（明亮模式） */}
      <svg
        className={`absolute w-5 h-5 transition-all duration-300 ${isLight ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
          clipRule="evenodd"
        />
      </svg>

      {/* 月亮图标（暗黑模式） */}
      <svg
        className={`absolute w-5 h-5 transition-all duration-300 ${isDark ? 'opacity-100 rotate-0' : 'opacity-0 rotate-90'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
      </svg>

      {/* 圆形指示器 */}
      <div className="w-2.5 h-2.5 rounded-full bg-gray-800 dark:bg-white transition-colors duration-300" />
    </button>
  );
}