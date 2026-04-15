/* eslint-disable @next/next/no-page-custom-font */
// 루트 레이아웃
import { DEFAULT_DESCRIPTION, SITE_NAME, SITE_URL } from '@/lib/seo';
import type { Metadata } from 'next';
import { Noto_Sans_KR } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import Provider from './providers';

const notoSansKR = Noto_Sans_KR({
  variable: '--font-noto-sans-kr',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    images: [{ url: '/favicon.ico' }],
  },
  twitter: {
    card: 'summary',
    title: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    images: ['/favicon.ico'],
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;200;300;400;500;600;700;800;900&display=swap"
          as="style"
        />
      </head>
      <body className={`${notoSansKR.variable} antialiased`}>
        <Provider>{children}</Provider>

        {/* Cloudflare Analytics 스크립트 - CORS 문제 해결을 위해 Next.js Script 사용 */}
        <Script src="https://static.cloudflareinsights.com/beacon.min.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
