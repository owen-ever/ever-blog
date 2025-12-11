import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone', // 🚀 Docker 배포 효율↑
  serverExternalPackages: ['gray-matter'], // 서버 전용으로만 쓰는 패키지 명시 (안전)
  eslint: {
    ignoreDuringBuilds: true, // CI/CD 속도 ↑
  },
  // 외부 스크립트 허용 설정
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value:
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://static.cloudflareinsights.com https://*.cloudflare.com;",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
