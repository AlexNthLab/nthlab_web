'use client';

import React from 'react';
import { getSafeLinkProps } from '@/lib/utils/url-validator';

interface SafeExternalLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
  /**
   * 是否显示安全警告图标
   */
  showSecurityIndicator?: boolean;
  /**
   * 验证选项
   */
  validationOptions?: Parameters<typeof getSafeLinkProps>[1];
}

/**
 * 安全的外部链接组件
 * 自动验证URL并添加安全属性
 */
export function SafeExternalLink({
  href,
  children,
  showSecurityIndicator = false,
  validationOptions,
  className = '',
  ...props
}: SafeExternalLinkProps) {
  const safeProps = getSafeLinkProps(href, validationOptions);
  const isExternal = href.startsWith('http') && !href.startsWith(window?.location?.origin || '');

  return (
    <a
      {...props}
      {...safeProps}
      className={`inline-flex items-center gap-1 ${className}`}
      aria-label={`链接到${isExternal ? '外部网站' : ''}`}
    >
      {children}
      {showSecurityIndicator && isExternal && (
        <span className="inline-block text-xs opacity-50" aria-hidden="true">
          ↗
        </span>
      )}
    </a>
  );
}

/**
 * 安全的下一个链接组件（用于内部导航）
 */
import NextLink from 'next/link';

interface SafeNextLinkProps extends React.ComponentProps<typeof NextLink> {
  children: React.ReactNode;
}

export function SafeNextLink({ href, children, ...props }: SafeNextLinkProps) {
  // 对于Next.js链接，我们可以进行额外的验证
  const hrefStr = typeof href === 'string' ? href : href.pathname || '';

  // 简单的路径验证
  const isValidPath = !hrefStr.includes('javascript:') && !hrefStr.includes('data:');

  if (!isValidPath) {
    console.error('检测到不安全的Next.js链接:', href);
    return (
      <span className="text-red-500 cursor-not-allowed" title="不安全的链接已被阻止">
        {children}
      </span>
    );
  }

  return (
    <NextLink href={href} {...props}>
      {children}
    </NextLink>
  );
}