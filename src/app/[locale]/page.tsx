import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';

export default function HomePage() {
  const posts = getAllPosts();

  return (
    <main>
      <h1>My Blog</h1>
      <ul className="flex flex-col gap-4">
        {posts.map(post => (
          <li key={post.slug} className="border-2 border-blue-500 p-4">
            <Link href={`/ko/${post.slug}`} className="flex flex-col">
              <span>{post.meta.title}</span>
              <span>{post.meta.description}</span>
              <span>{post.meta.date}</span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
