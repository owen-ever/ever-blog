import { Link } from '@/i18n/navigation';
import { getAllPosts } from '@/lib/posts';
import { useTranslations } from 'next-intl';

export default function PostListPage() {
  const tPostList = useTranslations('PostListPage');
  const posts = getAllPosts();

  return (
    <main>
      <section>
        <h1>{tPostList('title')}</h1>
        <Link href="/">{tPostList('home')}</Link>
      </section>

      <section>
        <ul className="flex flex-col gap-4">
          {posts.map(post => (
            <li key={post.slug} className="border-2 border-blue-500 p-4">
              <Link href={`/posts/${post.slug}`} className="flex flex-col">
                <span>{post.meta.title}</span>
                <span>{post.meta.description}</span>
                <span>{post.meta.date}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
