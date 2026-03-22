'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';

type Theme = 'dark' | 'light';
type ThemePreference = Theme | 'system';

interface UseThemeReturn {
  theme: Theme;
  resolvedTheme: Theme;
  preference: ThemePreference;
  setPreference: (preference: ThemePreference) => void;
  toggleTheme: () => void;
  isDark: boolean;
  isLight: boolean;
}

const THEME_STORAGE_KEY = 'nthlab-theme-preference';
const DEFAULT_THEME: Theme = 'dark';

/**
 * 检测系统主题偏好
 */
function getSystemTheme(): Theme {
  if (typeof window === 'undefined') return DEFAULT_THEME;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

/**
 * 获取存储的主题偏好
 */
function getStoredPreference(): ThemePreference {
  if (typeof window === 'undefined') return DEFAULT_THEME;
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === 'dark' || stored === 'light' || stored === 'system') {
      return stored;
    }
  } catch (error) {
    console.warn('无法读取主题偏好:', error);
  }
  return DEFAULT_THEME;
}

/**
 * 根据偏好解析实际主题
 */
function resolveTheme(preference: ThemePreference): Theme {
  if (preference === 'system') {
    return getSystemTheme();
  }
  return preference;
}

/**
 * 自定义Hook：管理主题状态
 */
export function useTheme(): UseThemeReturn {
  const [preference, setPreferenceState] = useState<ThemePreference>(() => {
    return getStoredPreference();
  });

  const [systemTheme, setSystemTheme] = useState<Theme>(() => getSystemTheme());
  const [mounted, setMounted] = useState(false);

  // 实际应用的主题
  const resolvedTheme = useMemo(() => resolveTheme(preference), [preference, systemTheme]);

  // 监听系统主题变化
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (event: MediaQueryListEvent) => {
      setSystemTheme(event.matches ? 'dark' : 'light');
    };

    // 现代API
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      // 兼容旧浏览器
      mediaQuery.addListener(handleChange);
    }

    setMounted(true);

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  // 持久化主题偏好
  const setPreference = useCallback((newPreference: ThemePreference) => {
    setPreferenceState(newPreference);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, newPreference);
    } catch (error) {
      console.warn('无法保存主题偏好:', error);
    }
  }, []);

  // 切换主题（在明/暗之间切换，保持system或特定主题）
  const toggleTheme = useCallback(() => {
    if (preference === 'system') {
      // 如果当前是system，切换到与当前系统主题相反的主题
      const currentTheme = getSystemTheme();
      setPreference(currentTheme === 'dark' ? 'light' : 'dark');
    } else {
      // 如果当前是特定主题，切换到相反主题
      setPreference(preference === 'dark' ? 'light' : 'dark');
    }
  }, [preference, setPreference]);

  // 更新HTML类名
  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;

    // 移除旧的类
    root.classList.remove('light', 'dark');

    // 添加新的类
    root.classList.add(resolvedTheme);

    // 设置data-theme属性
    root.setAttribute('data-theme', resolvedTheme);
  }, [resolvedTheme, mounted]);

  return {
    theme: resolvedTheme,
    resolvedTheme,
    preference,
    setPreference,
    toggleTheme,
    isDark: resolvedTheme === 'dark',
    isLight: resolvedTheme === 'light',
  };
}

/**
 * 获取服务器端的主题（用于SSR）
 */
export function getServerTheme(preference?: string): Theme {
  if (preference === 'dark' || preference === 'light') {
    return preference;
  }

  // 尝试从cookie获取
  if (typeof window === 'undefined') {
    // 服务器端，可以解析cookie或头信息
    return DEFAULT_THEME;
  }

  return resolveTheme(getStoredPreference());
}