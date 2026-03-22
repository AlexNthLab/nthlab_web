/**
 * URL验证与安全工具
 */

export interface UrlValidationOptions {
  /**
   * 允许的协议，默认只允许https
   */
  allowedProtocols?: string[];

  /**
   * 允许的域名列表（支持通配符，如 '*.github.com'）
   */
  allowedDomains?: string[];

  /**
   * 是否允许相对路径
   */
  allowRelative?: boolean;

  /**
   * 是否允许data URL
   */
  allowDataUrl?: boolean;

  /**
   * 是否允许mailto/tel等特殊协议
   */
  allowSpecialProtocols?: boolean;
}

const DEFAULT_OPTIONS: Required<UrlValidationOptions> = {
  allowedProtocols: ['https:', 'http:'],
  allowedDomains: [
    'github.com',
    '*.github.com',
    'nthlab.github.io',
    '*.nthlab.github.io',
    'nthlab.ai',
    '*.nthlab.ai',
  ],
  allowRelative: true,
  allowDataUrl: false,
  allowSpecialProtocols: false,
};

/**
 * 检查域名是否匹配允许的域名模式
 */
function domainMatchesPattern(domain: string, pattern: string): boolean {
  if (pattern === domain) {
    return true;
  }

  if (pattern.startsWith('*.')) {
    const baseDomain = pattern.slice(2);
    return domain === baseDomain || domain.endsWith('.' + baseDomain);
  }

  return false;
}

/**
 * 验证URL是否安全
 */
export function validateUrl(
  url: string,
  options: UrlValidationOptions = {}
): {
  isValid: boolean;
  error?: string;
  parsedUrl?: URL;
} {
  const mergedOptions = { ...DEFAULT_OPTIONS, ...options };

  // 处理相对路径
  if (mergedOptions.allowRelative && (url.startsWith('/') || url.startsWith('./') || url.startsWith('../'))) {
    // 相对路径，检查是否包含危险字符
    const dangerousPatterns = ['javascript:', 'data:', 'vbscript:'];
    if (dangerousPatterns.some(pattern => url.toLowerCase().includes(pattern))) {
      return {
        isValid: false,
        error: '相对路径包含危险协议',
      };
    }
    return { isValid: true };
  }

  try {
    const parsedUrl = new URL(url);

    // 检查特殊协议
    if (parsedUrl.protocol === 'mailto:' || parsedUrl.protocol === 'tel:') {
      if (mergedOptions.allowSpecialProtocols) {
        return { isValid: true, parsedUrl };
      }
      return {
        isValid: false,
        error: `特殊协议 ${parsedUrl.protocol} 不被允许`,
      };
    }

    // 检查data URL
    if (parsedUrl.protocol === 'data:') {
      if (mergedOptions.allowDataUrl) {
        return { isValid: true, parsedUrl };
      }
      return {
        isValid: false,
        error: 'Data URL不被允许',
      };
    }

    // 检查协议
    if (!mergedOptions.allowedProtocols.includes(parsedUrl.protocol)) {
      return {
        isValid: false,
        error: `协议 ${parsedUrl.protocol} 不被允许`,
      };
    }

    // 检查域名
    if (mergedOptions.allowedDomains.length > 0) {
      const domainMatches = mergedOptions.allowedDomains.some(pattern =>
        domainMatchesPattern(parsedUrl.hostname, pattern)
      );

      if (!domainMatches) {
        return {
          isValid: false,
          error: `域名 ${parsedUrl.hostname} 不在允许列表中`,
        };
      }
    }

    // 额外安全检查
    if (parsedUrl.href.includes('javascript:') || parsedUrl.href.includes('data:text/html')) {
      return {
        isValid: false,
        error: 'URL包含潜在的危险内容',
      };
    }

    return { isValid: true, parsedUrl };
  } catch (error) {
    // URL解析失败
    return {
      isValid: false,
      error: `无效的URL格式: ${error instanceof Error ? error.message : String(error)}`,
    };
  }
}

/**
 * 安全地设置链接属性
 */
export function getSafeLinkProps(
  url: string,
  options?: UrlValidationOptions
): {
  href: string;
  target?: string;
  rel?: string;
  onClick?: (e: React.MouseEvent) => void;
} {
  const validation = validateUrl(url, options);

  if (!validation.isValid) {
    // 对于无效URL，返回一个安全的空链接
    return {
      href: '#',
      onClick: (e: React.MouseEvent) => {
        e.preventDefault();
        console.warn('阻止了不安全的链接跳转:', validation.error);
      },
    };
  }

  // 有效的URL，设置安全属性
  const props: any = { href: url };

  // 如果是外部链接
  if (validation.parsedUrl && validation.parsedUrl.protocol.startsWith('http')) {
    props.target = '_blank';
    props.rel = 'noopener noreferrer nofollow';
  }

  return props;
}

/**
 * 创建安全的链接组件属性
 */
export function createSafeLinkProps(url: string, options?: UrlValidationOptions) {
  return getSafeLinkProps(url, options);
}

/**
 * 检查URL是否可能是钓鱼网站
 */
export function isPotentialPhishingUrl(url: string): boolean {
  try {
    const parsed = new URL(url);

    // 常见钓鱼网站特征
    const phishingIndicators = [
      // 视觉欺骗域名
      /xn--/, // Punycode域名（可能包含欺骗字符）
      /\.com-/, // 伪造的域名
      /\.net-/, // 伪造的域名
      /\.org-/, // 伪造的域名
    ];

    // 检查域名是否包含常见品牌的错误拼写
    const brandTypos = [
      'g00gle', 'go0gle', 'g00gle', // Google
      'faceb00k', 'facebok', 'fbacebook', // Facebook
      'micr0soft', 'micorsoft', 'microsoftt', // Microsoft
      'app1e', 'appie', 'aple', // Apple
      'amaz0n', 'amazom', 'amazonn', // Amazon
    ];

    const hostname = parsed.hostname.toLowerCase();

    // 检查钓鱼指标
    if (phishingIndicators.some(regex => regex.test(hostname))) {
      return true;
    }

    // 检查品牌错误拼写
    if (brandTypos.some(typo => hostname.includes(typo))) {
      return true;
    }

    // 检查异常端口
    if (parsed.port && !['80', '443', ''].includes(parsed.port)) {
      // 非标准端口可能是可疑的
      return true;
    }

    return false;
  } catch {
    return false;
  }
}