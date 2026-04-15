import AppMarkdown from '@/components/markdown/AppMarkdown';
import { getPostBySlug } from '@/lib/posts';
import { createPageMetadata } from '@/lib/seo';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

type PageProps = {
  params: Promise<{ slug: Post['slug'] }>;
};

const NOT_FOUND_DESCRIPTION = '요청한 게시글을 찾을 수 없습니다.';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      ...createPageMetadata({
        title: 'Post Not Found',
        description: NOT_FOUND_DESCRIPTION,
        path: `/posts/${slug}`,
      }),
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title = post.meta.title;
  const description = post.meta.description || `${title} | Ever.Log`;
  const canonical = `/posts/${post.slug}`;

  return createPageMetadata({
    title,
    description,
    path: canonical,
    type: 'article',
  });
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="flex justify-center p-4">
      <div className="flex w-full flex-col gap-6 lg:max-w-[40%]">
        <section className="mt-5 flex flex-col gap-10 lg:mt-15">
          <h1 className="text-colPick text-5xl font-bold">{post.meta.title}</h1>

          <div className="flex justify-between">
            <div className="flex items-center gap-2">
              <span className="text-md rounded-full bg-white px-2 py-1 text-gray-600">{post.meta.date}</span>
              {Array.isArray(post.meta.tag) ? (
                post.meta.tag.map((t, i) => (
                  <span key={i} className="text-md text-main rounded-full bg-white px-2 py-1 font-bold">
                    {t}
                  </span>
                ))
              ) : (
                <span className="text-md text-main rounded-full bg-white px-2 py-1 font-bold">{post.meta.tag}</span>
              )}
            </div>

            <div className="flex items-center">
              <Link className="text-colPick text-xl font-medium underline" href="/posts">
                Feed
              </Link>
            </div>
          </div>
        </section>

        <section>
          <AppMarkdown text={post.content} />
        </section>
      </div>
    </article>
  );
}
