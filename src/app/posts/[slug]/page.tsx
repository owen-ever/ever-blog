import AppMarkdown from '@/components/markdown/AppMarkdown';
import { getPostBySlug } from '@/lib/posts';
import { createPageMetadata, SITE_NAME, toAbsoluteUrl } from '@/lib/seo';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

type PageProps = {
  params: Promise<{ slug: Post['slug'] }>;
};

const AUTHOR_NAME = 'Owen';

export const dynamic = 'force-dynamic';

function normalizeTags(tag: PostMeta['tag']): string[] {
  if (Array.isArray(tag)) {
    return tag.filter((value): value is string => typeof value === 'string' && value.length > 0);
  }

  if (typeof tag === 'string' && tag.length > 0) {
    return [tag];
  }

  return [];
}

function toIso8601(date: string): string | undefined {
  const timestamp = Date.parse(date);

  if (Number.isNaN(timestamp)) {
    return undefined;
  }

  return new Date(timestamp).toISOString();
}

function serializeJsonLd(payload: Record<string, unknown>): string {
  return JSON.stringify(payload).replace(/</g, '\\u003c');
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const title = post.meta.title;
  const description = post.meta.description || `${title} | ${SITE_NAME}`;
  const canonicalPath = `/posts/${post.slug}`;
  const canonicalUrl = toAbsoluteUrl(canonicalPath);
  const tags = normalizeTags(post.meta.tag);
  const publishedTime = toIso8601(post.meta.date);

  const metadata = createPageMetadata({
    title,
    description,
    path: canonicalPath,
    type: 'article',
  });

  return {
    ...metadata,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      ...(metadata.openGraph ?? {}),
      type: 'article',
      url: canonicalUrl,
      authors: [AUTHOR_NAME],
      ...(publishedTime ? { publishedTime, modifiedTime: publishedTime } : {}),
      ...(tags.length > 0 ? { tags } : {}),
    },
    twitter: {
      ...(metadata.twitter ?? {}),
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const canonicalPath = `/posts/${post.slug}`;
  const canonicalUrl = toAbsoluteUrl(canonicalPath);
  const description = post.meta.description || `${post.meta.title} | ${SITE_NAME}`;
  const tags = normalizeTags(post.meta.tag);
  const publishedTime = toIso8601(post.meta.date);

  const articleJsonLd: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.meta.title,
    description,
    inLanguage: 'ko-KR',
    url: canonicalUrl,
    mainEntityOfPage: canonicalUrl,
    image: toAbsoluteUrl('/favicon.ico'),
    author: {
      '@type': 'Person',
      name: AUTHOR_NAME,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: toAbsoluteUrl('/'),
    },
    datePublished: publishedTime ?? post.meta.date,
    dateModified: publishedTime ?? post.meta.date,
    ...(tags.length > 0 ? { keywords: tags.join(', ') } : {}),
  };

  return (
    <article className="flex justify-center p-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(articleJsonLd),
        }}
      />

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
