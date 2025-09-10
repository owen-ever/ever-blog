import { persona } from '@/lib/comment';
import { formatLine } from '@/lib/formatter';
import Link from 'next/link';

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
