import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { join } from 'path';

// 허용된 이미지 확장자와 MIME 타입 매핑
const MIME_TYPES: Record<string, string> = {
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
};

// 이미지 저장 경로 (docker-compose에서 마운트된 경로)
const IMAGES_BASE_PATH = '/posts/images';

export async function GET(request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  try {
    const { path } = await params;
    const imagePath = path.join('/');

    // path traversal 공격 방지
    if (imagePath.includes('..') || imagePath.includes('//')) {
      return NextResponse.json({ error: 'Invalid path' }, { status: 400 });
    }

    // 확장자 추출 및 검증
    const ext = '.' + imagePath.split('.').pop()?.toLowerCase();
    const mimeType = MIME_TYPES[ext];

    if (!mimeType) {
      return NextResponse.json({ error: 'Unsupported file type' }, { status: 400 });
    }

    // 파일 경로 생성
    const fullPath = join(IMAGES_BASE_PATH, imagePath);

    // 파일 읽기
    const fileBuffer = await readFile(fullPath);

    // 이미지 응답 반환
    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': mimeType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    // 파일이 없거나 읽기 실패
    return NextResponse.json({ error: 'Image not found' }, { status: 404 });
  }
}
