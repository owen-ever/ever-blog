/* eslint-disable @next/next/no-page-custom-font */
// 루트 레이아웃
import type { Metadata } from 'next';
import { Noto_Sans_KR } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import JotaiProvider from './providers';

const notoSansKR = Noto_Sans_KR({
  variable: '--font-noto-sans-kr',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Ever.Log',
  description: 'Ever.Log',
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
    <html>
      <head>
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;200;300;400;500;600;700;800;900&display=swap"
          as="style"
        />
      </head>
      <body className={`${notoSansKR.variable} antialiased`}>
        <JotaiProvider>{children}</JotaiProvider>

        {/* Cloudflare Analytics 스크립트 - CORS 문제 해결을 위해 Next.js Script 사용 */}
        <Script src="https://static.cloudflareinsights.com/beacon.min.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
