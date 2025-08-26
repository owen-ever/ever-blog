import { Link } from '@/i18n/navigation';
import { getAllPosts } from '@/lib/posts';
import { useTranslations } from 'next-intl';

export default function PostListPage() {
  const tPostList = useTranslations('PostListPage');
  const posts = getAllPosts();

  return (
    <main className="flex h-full w-full flex-col gap-y-10 p-10">
      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="text-main text-7xl font-bold lg:text-8xl">{tPostList('title')}</div>
        <div className="flex h-full items-end">
          <Link className="text-colPick text-2xl font-medium underline" href="/">
            {tPostList('home')}
          </Link>
        </div>
      </div>

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
