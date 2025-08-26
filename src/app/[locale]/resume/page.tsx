import { Link } from '@/i18n/navigation';
import { formatLine } from '@/lib/formatter';
import { useTranslations } from 'next-intl';

const githubLink = 'https://github.com/owen-ever';

const resumeDatas = [
  {
    company: '테크 스타트업',
    position: 'Frontend Engineer',
    startDate: '2023.03',
    endDate: 'Present',
    description:
      'React 기반의 대규모 웹 애플리케이션 개발을 담당하며, 사용자 경험 개선과 성능 최적화에 집중하고 있습니다.',
    projects: [
      {
        title: '디자인 시스템 구축 및 컴포넌트 라이브러리 개발',
        descriptions: [
          '디자인 시스템 구축 및 컴포넌트 라이브러리 개발 디자인 시스템 구축 및 컴포넌트 라이브러리 개발 디자인 시스템 구축 및 컴포넌트 라이브러리 개발',
          '웹 성능 최적화로 로딩 속도 40% 개선',
          '크로스 브라우저 호환성 및 반응형 웹 구현',
        ],
        techStack: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS'],
      },
      {
        title: '웹 성능 최적화',
        descriptions: ['모바일 최적화로 전황율 25% 향상', '결제 시스템 UI 개선 및 사용성 향상'],
        techStack: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS'],
      },
    ],
  },
  {
    company: '이커머스 회사',
    position: 'Frontend Engineer',
    startDate: '2021.06',
    endDate: '2023.02',
    description: '온라인 쇼핑몰의 프론트엔드 개발을 담당하며, 사용자 친화적인 UI/UX 구현에 집중했습니다.',
    projects: [
      {
        title: '디자인 시스템 구축 및 컴포넌트 라이브러리 개발',
        descriptions: [
          '모바일 최적화로 전환율 25% 향상',
          '결제 시스템 UI 개선 및 사용성 향상',
          'A/B 테스트를 통한 지속적인 UX 개선',
        ],
        techStack: ['Vue.js', 'JavaScript', 'SCSS', 'Webpack'],
      },
      {
        title: '웹 성능 최적화',
        descriptions: ['모바일 최적화로 전황율 25% 향상', '결제 시스템 UI 개선 및 사용성 향상'],
        techStack: ['Vue.js', 'JavaScript', 'SCSS', 'Webpack'],
      },
    ],
  },
  {
    company: '개인 프로젝트',
    position: 'Full-stack Developer',
    startDate: '2023.01',
    endDate: 'Present',
    description: '개발자 커뮤니티 플랫폼을 기획부터 배포까지 전체 과정을 담당한 풀스택 프로젝트입니다.',
    projects: [
      {
        title: '기술적 도전',
        descriptions: ['실시간 채팅 기능 구현 (WebSocket)', 'JWT 기반 인증 시스템 구축', 'Docker를 활용한 배포 자동화'],
        techStack: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS'],
      },
      {
        title: '웹 성능 최적화',
        descriptions: ['모바일 최적화로 전황율 25% 향상', '결제 시스템 UI 개선 및 사용성 향상'],
        techStack: ['Vue.js', 'JavaScript', 'SCSS', 'Webpack'],
      },
    ],
  },
];

export default function ResumePage() {
  const tHome = useTranslations('HomePage');
  const tResume = useTranslations('ResumePage');

  return (
    <main className="flex h-full w-full flex-col gap-y-10 p-10">
      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="text-main text-7xl font-bold lg:text-8xl">{tResume('title')}</div>
        <div className="flex h-full items-end">
          <Link className="text-colPick text-2xl font-medium underline" href="/">
            {tResume('home')}
          </Link>
        </div>
      </div>

      <section className="mx-auto w-full">
        <div className="p-0">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
            <div className="space-y-3">
              <h2 className="border-b pb-1 text-xs font-semibold tracking-wider text-gray-500 uppercase">Identity</h2>
              <div>
                <p className="text-colPick text-lg font-medium">Owen</p>
                <p className="text-sm text-gray-600">Frontend Engineer</p>
                <p className="mt-1 text-xs text-gray-500">Seoul, Korea</p>
              </div>
            </div>

            <div className="space-y-3">
              <h2 className="border-b pb-1 text-xs font-semibold tracking-wider text-gray-500 uppercase">Position</h2>
              <div>
                <p className="text-colPick text-lg font-medium">Frontend Engineer</p>
              </div>
            </div>

            <div className="space-y-3">
              <h2 className="border-b pb-1 text-xs font-semibold tracking-wider text-gray-500 uppercase">About</h2>
              {formatLine(tHome('description')).map((line, index) => (
                <p className="text-sm leading-relaxed text-gray-700" key={index}>
                  {line}
                </p>
              ))}
            </div>

            <div className="space-y-3">
              <h2 className="border-b pb-1 text-xs font-semibold tracking-wider text-gray-500 uppercase">Contact</h2>
              <div className="space-y-2">
                <a
                  href="mailto:me@owen.kr"
                  className="text-colPick hover:text-main block text-sm underline transition-colors">
                  me@owen.kr
                </a>
                <a href={githubLink} className="text-colPick hover:text-main block text-sm underline transition-colors">
                  github.com/owen-ever
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full">
        <div className="space-y-4">
          {/* Current Position */}
          {resumeDatas.map((data, idx) => (
            <div className="p-0" key={idx}>
              <div className="flex flex-col border-t pt-2 lg:flex-row lg:items-start lg:justify-between">
                <div className="lg:w-1/4">
                  <h3 className="text-colPick mb-2 text-xl font-semibold">{data.company}</h3>
                  <p
                    className={`${data.endDate === 'Present' ? 'text-main' : 'text-gray-600'} mb-1 text-sm font-medium`}>
                    {data.position}
                  </p>
                  <p className="mb-3 text-xs text-gray-500">
                    {data.startDate} - {data.endDate}
                  </p>
                  {data.endDate === 'Present' ? (
                    <div className="bg-main h-1 w-12 rounded" />
                  ) : (
                    <div className="h-1 w-12 rounded bg-gray-300" />
                  )}
                </div>

                <div className="lg:w-3/4">
                  <div className="space-y-4">
                    <p className="text-colPick leading-relaxed">{data.description}</p>

                    <div className="space-y-3">
                      {data.projects.map((project, idx) => (
                        <div className="flex flex-col space-y-2 border-t pt-2 lg:flex-row" key={idx}>
                          <h5 className="text-colPick text-sm font-semibold lg:w-1/3">{project.title}</h5>
                          <div className="flex flex-col gap-2 lg:w-2/3">
                            <ul className="text-colPick space-y-1 text-sm">
                              {project.descriptions.map((description, idx) => (
                                <li className="flex items-start" key={idx}>
                                  <span className="mt-2 mr-3 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gray-400"></span>
                                  {description}
                                </li>
                              ))}
                            </ul>

                            <div className="flex flex-wrap gap-2">
                              {project.techStack.map((tech, idx) => (
                                <span className="text-colPick border-1 px-2 py-1 text-xs font-medium" key={idx}>
                                  #{tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
