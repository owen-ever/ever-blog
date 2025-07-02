import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { formatLine } from '@/lib/formatter';

export default function HomePage() {
  const tHome = useTranslations('HomePage');

  return (
    <main>
      <section>
        <div className="text-main text-8xl font-bold">{tHome('title')}</div>
        {formatLine(tHome('description')).map((line, index) => (
          <p className="text-colPick text-2xl" key={index}>
            {line}
          </p>
        ))}
      </section>

      <section>
        <div className="flex flex-col gap-4">
          <Link className="text-sub" href="/posts">
            {tHome('feed')}
          </Link>
          <Link className="text-side" href={tHome('github')}>
            GitHub
          </Link>
        </div>
      </section>
    </main>
  );
}
