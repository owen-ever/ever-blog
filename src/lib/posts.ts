import 'server-only';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDir = path.join(process.cwd(), 'posts');

export function getPostSlugs(): Post['slug'][] {
  return fs
    .readdirSync(postsDir)
    .filter(file => file.endsWith('.md'))
    .map(file => file.replace(/\.md$/, ''));
}

export function getPostBySlug(slug: Post['slug']): Post {
  const filePath = path.join(postsDir, `${slug}.md`);
  // console.log('>>>> 1', filePath);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  // console.log('>>>> 2', fileContents);
  const { data, content } = matter(fileContents);

  return {
    slug,
    meta: data as PostMeta,
    content,
  };
}

export function getAllPosts(): Post[] {
  return getPostSlugs()
    .map(slug => getPostBySlug(slug))
    .sort((a, b) => {
      if (a.meta.date === b.meta.date) {
        return a.meta.index < b.meta.index ? 1 : -1;
      }
      return a.meta.date < b.meta.date ? 1 : -1;
    });
}
