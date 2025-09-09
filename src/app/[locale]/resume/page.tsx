import { Link } from '@/i18n/navigation';
import { formatLine } from '@/lib/formatter';
import { useTranslations } from 'next-intl';

const githubLink = 'https://github.com/owen-ever';

const resumeDatas = [
  {
    company: '팀벨',
    position: 'Frontend Engineer',
    startDate: '2024.01',
    endDate: 'Present',
    description: 'AI 음성기록 솔루션 리뉴얼 \nRAG 기반 대화엔진 솔루션 초기 개발',
    projects: [
      {
        title: '팀블로 v2 프론트엔드 리뉴얼',
        summary:
          '팀블로 v1은 기능이 빠르게 추가되면서 코드 복잡도가 높아, 신규 요구사항 대응 시 사이드이펙트가 빈번해지는 문제가 있었습니다. \n고객사별 선택적 기능 요구가 늘어나면서 백오피스 설정을 통해 메인 서비스 기능을 제어하는 구조가 필요해졌습니다. \n이 문제를 해결하기 위해서 FSD 아키텍처 기반으로 재설계하고, 공통 컴포넌트를 아토믹 디자인화하여 유지보수성과 UI 일관성을 강화했습니다.',
        descriptions: [
          '확장성과 유지보수성에 유리한 FSD 아키텍처 기반으로 재설계',
          '공통 컴포넌트를 아토믹 디자인화하여 유지보수성과 UI 일관성 강화',
          '신규 기능 반영 시 수정 파일 수 40% 감소, 반영 소요시간 20% 단축',
        ],
        techStack: ['React', 'Tailwind CSS', 'Material UI', 'SCSS'],
      },
      {
        title: '랭사 초기 버전 프론트엔드 개발',
        summary:
          '여러 회사가 동시에 협업하는 촉박한 일정 속에서 컨벤션 부재와 코드 일관성 부족으로 협업 효율과 생산성 저하에 대한 문제를 사전에 예상하고 대응했습니다. \nNext.js 기반 보일러플레이트와 컨벤션을 설계, 문서화하여 생산성과 협업 효율을 확보했습니다.',
        descriptions: [
          'Nuxt.js 기반 보일러플레이트와 컨벤션 설계, 문서화',
          '협업사 온보딩 기간을 1주 → 2일로 단축',
          '프로젝트 마감일 3주 단축, PoC 성공적 완료',
        ],
        techStack: ['Vue', 'TypeScript', 'Nuxt.js', 'Tailwind CSS'],
      },
    ],
  },
  {
    company: '플렉시스',
    position: 'Software Engineer',
    startDate: '2022.01',
    endDate: '2023.12',
    description: 'B2G 대상 공공언어 개선 서비스 성능 최적화 \nB2B 대상 키워드 인덱싱 솔루션 리뉴얼',
    projects: [
      {
        title: '다듬 백엔드 리뉴얼',
        summary:
          '레거시에 포함된 Selenium 의존으로 웹페이지 100개 처리에 1시간 이상 소요되며 영업 미팅 & 데모가 지연되는 문제가 있었습니다. \n이 문제를 해결하기 위해서 Selenium을 대체하는 메커니즘을 구상하고, 동시에 알고리즘 최적화를 진행했습니다. \nDocker 기반 API 서버 구성으로 처리 속도와 납품 효율을 개선했습니다.',
        descriptions: [
          '알고리즘 최적화(비트마스킹, 아호코라식) 및 Selenium 제거로 처리 속도 개선',
          'Docker 기반 미들웨어 구성으로 대응 방식 다각화',
          '처리시간을 1시간 → 5분(12배 개선 - 영업 EX 향상)',
        ],
        techStack: ['Python', 'FastAPI'],
      },
      {
        title: '큐잉 v2 프론트엔드 리뉴얼',
        summary:
          'HTML, CSS, JS 기반 레거시 구조는 확장성과 유지보수가 어려워 신규 기능 대응에 한계가 있었습니다. \n리빌딩 과정에서 고객사 웹페이지의 스타일이 변경되는 문제가 발생했는데, 솔루션이 스크립트 형태로 삽입되는 과정에서 !important 스타일이 고객사 스타일을 덮어쓰는 것이 원인이었습니다. \n이 문제를 해결하기 위한 방법을 찾던 중 카카오 컨퍼런스를 통해 Shadow DOM 개념을 접하게 되었고, 이를 적용하여 고객사 웹페이지와 CSS 충돌 문제를 근본적으로 해소할 수 있었습니다. \nNext.js, Tailwind CSS로 전체 구조를 리빌딩하고, 추가로 코드 컨벤션 설계에 참여하여 신규 인력의 빠른 적응과 팀 내 개발 일관성을 확보했습니다.',
        descriptions: [
          'Next.js & Tailwind CSS로 레거시 구조 리빌딩',
          'Shadow DOM을 도입해 고객사 웹페이지와 CSS 충돌 제거',
          '코드 컨벤션을 설계 & 도입해 개발 일관성 향상, 신규 인력 온보딩 기간 2주 → 1주 단축',
          '공공기관, 카페24 스토어 앱 런칭 성공',
        ],
        techStack: ['React', 'Typescript', 'Next.js', 'Tailwind CSS', 'SCSS'],
      },
    ],
  },
  {
    company: '핀테크놀러지',
    position: 'Software Engineer',
    startDate: '2019.01',
    endDate: '2021.04',
    description: 'IBK 앱 내 챗봇 서비스 유지보수 \n챗봇 운영 관리도구 개발',
    projects: [
      {
        title: '챗봇 솔루션 유지보수',
        summary:
          '레거시 REST API와 일관성 없는 주석 관리로 유지보수 난이도가 높았습니다. \n유지보수 과정에서 관리되지 않은 주석을 기반으로 작업하는 것은 문제가 있다고 판단했고, 주석 전면 재작성으로 코드 가독성과 각 기능의 역할을 명확히 했습니다. \n이를 기반으로 결합도가 낮은 영역부터 단계적으로 리팩토링을 진행했습니다.',
        descriptions: [
          'REST API 리팩토링으로 구조적 일관성 확보',
          '주석 전면 재작성으로 문서화 품질 강화',
          '신규 인력 온보딩 기간을 1주 단축',
        ],
        techStack: ['Java', 'JSDoc', 'Spring'],
      },
      {
        title: '챗봇 백오피스 프론트엔드 개발',
        summary:
          '상담 데이터, 정규표현식 관리 도구가 미흡하여 운영 효율과 유지보수성이 떨어지는 문제가 있었습니다. \nReact 기반 백오피스를 기획 단계부터 참여하여 개발하고, Rasa 오픈소스를 한글화(Mecab 사전 적용)하여 운영 효율과 유지보수성을 개선했습니다.',
        descriptions: [
          'React 기반 백오피스를 기획 단계부터 참여하여 개발',
          'Rasa 오픈소스를 형태소 분석기 커스텀(Mecab)을 통해 한글화',
          '상담 데이터 관리 효율화',
        ],
        techStack: ['React', 'Rasa'],
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
                <p className="text-sm text-gray-600">Experience Architect (희망)</p>
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
                    <p className="text-colPick leading-relaxed sm:whitespace-pre-wrap">{data.description}</p>

                    <div className="space-y-3">
                      {data.projects.map((project, idx) => (
                        <div className="flex flex-col space-y-2 border-t pt-2 lg:flex-row" key={idx}>
                          <h5 className="text-colPick text-sm font-semibold lg:w-1/3">{project.title}</h5>
                          <div className="flex flex-col gap-2 lg:w-2/3">
                            <p className="text-colPick text-sm font-medium whitespace-pre-wrap">{project.summary}</p>
                            <ul className="text-colPick space-y-1 text-sm">
                              {project.descriptions.map((description, idx) => (
                                <li className="flex items-start whitespace-pre-wrap" key={idx}>
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
