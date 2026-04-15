import 'server-only';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Docker 런타임에서는 /posts 볼륨 마운트 경로, 빌드/로컬에서는 프로젝트 내 api/posts 디렉토리
// POSTS_DIR 환경변수로 오버라이드 가능
const postsDir = process.env.POSTS_DIR || path.join(process.cwd(), 'api/posts');

function normalizePostDate(date: unknown): string {
  if (date instanceof Date) {
    return date.toISOString().slice(0, 10);
  }

  return typeof date === 'string' ? date : String(date ?? '');
}

function normalizePostMeta(data: Record<string, unknown>): PostMeta {
  return {
    ...data,
    date: normalizePostDate(data.date),
  } as PostMeta;
}

export function getPostSlugs(): Post['slug'][] {
  if (!fs.existsSync(postsDir)) {
    return [];
  }

  return fs
    .readdirSync(postsDir)
    .filter(file => file.endsWith('.md'))
    .map(file => file.replace(/\.md$/, ''));
}

export function getPostBySlug(slug: Post['slug']): Post | null {
  const filePath = path.join(postsDir, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug,
    meta: normalizePostMeta(data),
    content,
  };
}

export function getAllPosts(): Post[] {
  return getPostSlugs()
    .map(slug => getPostBySlug(slug))
    .filter((post): post is Post => post !== null)
    .sort((a, b) => {
      if (a.meta.date === b.meta.date) {
        return a.meta.index < b.meta.index ? 1 : -1;
      }
      return a.meta.date < b.meta.date ? 1 : -1;
    });
}
