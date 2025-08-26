import PostList from '@/components/Post/PostList';
import { Link } from '@/i18n/navigation';
import { getAllPosts } from '@/lib/posts';
import { getTranslations } from 'next-intl/server';

export default async function PostListPage() {
  const tPostList = await getTranslations('PostListPage');
  const allPosts = getAllPosts();

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
        <PostList posts={allPosts} />
      </section>
    </main>
  );
}
