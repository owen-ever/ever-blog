import AppMarkdown from '@/components/markdown/AppMarkdown';
import { Link } from '@/i18n/navigation';
import { getPostBySlug, getPostSlugs } from '@/lib/posts';
import { getTranslations } from 'next-intl/server';

type Props = {
  params: Promise<{ slug: Post['slug'] }>;
};

export async function generateStaticParams() {
  const slugs = getPostSlugs().map(slug => ({ slug }));
  return slugs;
}

export default async function PostPage({ params }: Props) {
  const tPostList = await getTranslations('PostListPage');
  const { slug } = await params;
  const post = getPostBySlug(slug);

  return (
    <article className="flex justify-center p-4">
      <div className="flex w-full flex-col gap-6 lg:max-w-[40%]">
        <section className="mt-5 flex flex-col gap-10 lg:mt-15">
          <h1 className="text-colPick text-5xl font-bold">{post.meta.title}</h1>

          <div className="flex justify-between">
            <div className="flex items-center gap-2">
              <span className="text-md text-main rounded-full bg-white px-2 py-1 font-bold">{post.meta.tag}</span>
              <span className="text-md rounded-full bg-white px-2 py-1 text-gray-600">{post.meta.date}</span>
            </div>

            <div className="flex items-center">
              <Link className="text-colPick text-xl font-medium underline" href="/posts">
                {tPostList('title')}
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
