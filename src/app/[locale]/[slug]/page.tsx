import AppMarkdown from '@/components/markdown/AppMarkdown';
import { getPostBySlug, getPostSlugs } from '@/lib/posts';
import Head from 'next/head';

type Props = {
  params: Promise<{ slug: Post['slug'] }>;
};

export async function generateStaticParams() {
  const slugs = getPostSlugs().map(slug => ({ slug }));
  return slugs;
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  return (
    <>
      <Head>
        <title>{post.meta.title}</title>
        <meta name="description" content={post.meta.description} />
        <meta property="og:title" content={post.meta.title} />
        <meta property="og:description" content={post.meta.description} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`http://localhost:3000/ko/${post.slug}`} />
        <link rel="canonical" href={`http://localhost:3000/ko/${post.slug}`} />
      </Head>

      <AppMarkdown text={post.content} />
    </>
  );
}
