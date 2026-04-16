import type { Metadata } from 'next';

export const SITE_URL = 'https://blog.owen.kr';
export const SITE_NAME = 'Ever.Log';
export const DEFAULT_DESCRIPTION = '프론트엔드 엔지니어 Owen의 기술 기록을 담은 Ever.Log 블로그';

type CreatePageMetadataInput = {
  title: string;
  description: string;
  path: string;
  type?: 'website' | 'article';
};

export function normalizePath(path: string): string {
  if (path === '/') {
    return '/';
  }

  return path.startsWith('/') ? path : `/${path}`;
}

export function toAbsoluteUrl(path: string): string {
  return new URL(normalizePath(path), SITE_URL).toString();
}

export function createPageMetadata({ title, description, path, type = 'website' }: CreatePageMetadataInput): Metadata {
  const normalizedPath = normalizePath(path);

  return {
    title,
    description,
    alternates: {
      canonical: normalizedPath,
    },
    openGraph: {
      title,
      description,
      url: normalizedPath,
      siteName: SITE_NAME,
      locale: 'ko_KR',
      type,
      images: [{ url: '/favicon.ico' }],
    },
    twitter: {
      card: 'summary',
      title,
      description,
      images: ['/favicon.ico'],
    },
  };
}
