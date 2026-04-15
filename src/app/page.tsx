import { persona } from '@/lib/comment';
import { formatLine } from '@/lib/formatter';
import { createPageMetadata } from '@/lib/seo';
import type { Metadata } from 'next';
import Link from 'next/link';

const HOME_DESCRIPTION = '프론트엔드 엔지니어 Owen의 개발 로그, 피드, 이력서를 한 곳에서 확인할 수 있습니다.';

export const metadata: Metadata = {
  ...createPageMetadata({
    title: 'Ever.Log',
    description: HOME_DESCRIPTION,
    path: '/',
  }),
  title: {
    absolute: 'Ever.Log',
  },
};

export default function HomePage() {
  return (
    <main className="flex h-full w-full flex-col gap-y-10 p-10">
      <div className="text-main text-7xl font-bold lg:text-8xl">Ever.Log</div>
      <div className="flex flex-col gap-y-10 lg:flex-row">
        <section className="flex h-full w-full flex-col gap-10 lg:w-1/2">
          <div className="flex flex-col gap-y-4">
            <div>
              {formatLine(persona).map((line, index) => (
                <p className="text-colPick text-2xl" key={index}>
                  {line}
                </p>
              ))}
            </div>
          </div>
        </section>

        <section className="flex h-full w-full flex-col gap-10 lg:w-1/2">
          <div className="flex flex-col gap-4">
            <Link className="text-colPick text-4xl font-bold underline" href="/posts">
              Feed
            </Link>
            <Link className="text-colPick text-4xl font-bold underline" href="/resume">
              Resume
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
