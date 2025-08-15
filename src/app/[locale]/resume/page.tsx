import { useTranslations } from 'next-intl';

export default function ResumePage() {
  const tResume = useTranslations('ResumePage');
  return (
    <main className="flex h-screen w-full flex-col gap-y-10 p-10">
      <div className="text-main text-7xl font-bold lg:text-8xl">{tResume('title')}</div>
    </main>
  );
}
