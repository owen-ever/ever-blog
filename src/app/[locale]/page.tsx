import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { formatLine } from '@/lib/formatter';

export default function HomePage() {
  const tHome = useTranslations('HomePage');

  return (
    <main>
      <section>
        <h1>{tHome('title')}</h1>
        {formatLine(tHome('description')).map((line, index) => (
          <p key={index}>{line}</p>
        ))}
      </section>

      <section>
        <div className="flex flex-col gap-4">
          <Link href="/posts">{tHome('feed')}</Link>
          <Link href={tHome('github')}>GitHub</Link>
        </div>
      </section>
    </main>
  );
}
