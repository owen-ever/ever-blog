import PostList from '@/components/Post/PostList';
import { getAllPosts } from '@/lib/posts';
import { createPageMetadata } from '@/lib/seo';
import Link from 'next/link';

const POSTS_DESCRIPTION = 'Ever.Log의 전체 게시글 피드입니다. 태그와 정렬로 개발 기록을 탐색할 수 있습니다.';

export const metadata = createPageMetadata({
  title: 'Feed',
  description: POSTS_DESCRIPTION,
  path: '/posts',
});

export const dynamic = 'force-dynamic';

export default async function PostListPage() {
  const allPosts = getAllPosts();

  return (
    <main className="flex h-full w-full flex-col gap-y-10 p-10">
      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="text-main text-7xl font-bold lg:text-8xl">Feed</div>
        <div className="flex h-full items-end">
          <Link className="text-colPick text-2xl font-medium underline" href="/">
            Home
          </Link>
        </div>
      </div>

      <section>
        <PostList posts={allPosts} />
      </section>
    </main>
  );
}
