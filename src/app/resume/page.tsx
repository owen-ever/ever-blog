import { persona } from '@/lib/comment';
import { formatLine } from '@/lib/formatter';
import { createPageMetadata } from '@/lib/seo';
import Link from 'next/link';

export const metadata = createPageMetadata({
  title: 'Resume',
  description: 'Owen의 경력, 프로젝트, 기술 스택을 정리한 Ever.Log 이력서 페이지',
  path: '/resume',
});

const githubLink = 'https://github.com/owen-ever';
const blogLink = 'https://blog.owen.kr';
const linkedInLink = 'https://www.linkedin.com/in/chanhojeon95';

const resumeDatas = [
  {
    company: '팀벨',
    position: 'Frontend Engineer',
    startDate: '2024.01',
    endDate: '2026.04',
    description:
      'AI 기반 마케팅·CRM 통합 추적 제품을 1인 설계·개발하고, 팀블로 v2 구조 전환과 협업 표준화까지 함께 맡았습니다. \n이 시기에는 빠른 구현보다 다음 변경을 얼마나 안전하게 받아들이는 구조인지가 더 중요하다는 걸 반복해서 배웠습니다. \n실시간/배치, MVP/확장성, 속도/안정성 사이의 trade-off를 팀의 공통 언어로 정리하는 것이 제 일의 중심이 되었습니다.',
    projects: [
      {
        title: 'AI 마케팅·CRM 통합 추적 솔루션, 내부 베타까지',
        summary:
          '마케팅 유입부터 고객 전환까지 단일 뷰로 추적하고 AI 분석까지 연결하는 내부 제품을 처음부터 끝까지 만들었습니다. \n\nGoogle·Meta·Naver API 제약과 실제 사용자 가치 사이에서 균형을 맞춰야 했고 요구사항은 주 단위로 바뀌었습니다. \n완성형을 한 번에 만들기보다 확장 가능한 뼈대를 먼저 세우는 쪽이 결국 더 빠르다는 판단으로 방향을 잡았습니다.',
        descriptions: [
          '실시간/배치 하이브리드 아키텍처를 설계해 데이터 신선도와 운영 비용의 균형을 맞춤',
          '요구사항 변동이 큰 환경에 맞춰 변경 격리 중심의 MSA 구조를 도입하고 기능 책임 경계를 정리',
          'Claude·Codex·Gemini를 역할별로 병렬 활용하는 구현/조사/검증 workflow를 정착',
          '마케팅 담당자 대상 내부 베타 릴리즈 후 운영팀으로 안정적으로 인수인계',
        ],
        techStack: ['TypeScript', 'Next.js', 'Node.js', 'MSA', 'AI Workflow'],
      },
      {
        title: '팀블로 v2, FSD 기반 프론트엔드 재설계',
        summary:
          '기능이 늘수록 수정 범위 예측이 어려웠고 레이어 경계가 흐려질수록 사이드이펙트가 반복됐습니다. \n\n페이지 단위 점진적 마이그레이션으로 운영을 멈추지 않으면서 구조를 바꾸는 데 집중했습니다.',
        descriptions: [
          'FSD + Atomic Design 기반으로 레이어 경계를 재정의하고 공통 컴포넌트 체계를 정비',
          '신규 기능 반영 시 수정 파일 수 40% 감소, 개발 소요 시간 20% 단축',
          '대량 STT 대화 목록에 가상화와 레이지 로딩을 적용해 체감 성능 개선',
          '가상화 이후 깨진 DOM 검색/치환을 원본 데이터·인덱스 기반 검색 구조로 재설계',
          'API 스키마 불일치 사례를 정리해 FE-BE 아키텍처 리뷰 미팅을 정례화',
        ],
        techStack: ['React', 'TypeScript', 'FSD', 'Atomic Design', 'Virtualization'],
      },
      {
        title: '멀티컴퍼니 RAG PoC, 개발 표준 먼저 세우기',
        summary:
          '5개 서비스가 결합되는 협업 프로젝트에서 기능 구현보다 먼저 공통 기반이 필요했습니다. \n\n초기에 규칙을 정리하면 속도가 늦어질 것 같았지만, 결과적으로 가장 빠른 길이 되었습니다.',
        descriptions: [
          'Nuxt.js 보일러플레이트와 컨벤션 문서를 작성해 조직 표준으로 채택',
          'Husky 기반 커밋 컨벤션을 적용해 협업 히스토리 관리 일관성 확보',
          '협업사 온보딩 시간을 1주에서 2일로 단축',
          '캐시 전략과 사용자 행동 트래킹 구조를 설계·제안',
          '프로젝트 마감일 3주 단축, 경쟁 PT에서 PoC 최종 선정',
        ],
        techStack: ['Vue 3', 'Nuxt.js', 'TypeScript', 'Husky', 'RAG'],
      },
      {
        title: 'OpenClaw OAuth recovery 오픈소스 기여',
        summary:
          '업무 바깥에서도 멀티 에이전트 환경의 신뢰성을 높이는 문제를 계속 파고들었습니다. \n\n재현이 어려운 인증 이슈를 줄여 릴리즈 가능한 해결 단위로 정리하는 데 집중했습니다.',
        descriptions: [
          '공유 OAuth 프로필이 동시에 refresh되며 재로그인을 유발하는 race condition을 재현하고 원인을 축소',
          '`refresh_token_reused` 상황에서 auth store 재로드 + 1회 retry recovery path를 제안 (PR #54856)',
          '핵심 recovery 방향이 좁혀진 형태로 v2026.4.7 릴리스에 반영',
        ],
        techStack: ['OpenClaw', 'OAuth', 'Race Condition', 'Reliability', 'OSS'],
      },
    ],
  },
  {
    company: '플렉시스',
    position: 'Software Engineer',
    startDate: '2022.01',
    endDate: '2023.12',
    description:
      '임베디드 위젯의 CSS 충돌과 백엔드 처리 병목처럼, 사용자 불편으로 드러나는 문제의 뿌리는 대부분 구조에 있었습니다. \n이때부터 증상만 고치기보다 시스템 경계를 다시 그려서 문제를 줄이는 접근을 습관으로 만들었습니다. \n호스트 환경을 존중하는 캡슐화와 병목을 제거하는 단순화가 장기적으로 가장 큰 효율을 만든다는 걸 배웠습니다.',
    projects: [
      {
        title: '큐잉 v2, Shadow DOM 기반 위젯 시스템 재설계',
        summary:
          '고객사 웹사이트에 임베딩되는 위젯에서 CSS 충돌 민원이 반복됐습니다. \n\niframe은 이벤트 흐름 단절 이슈가 있었고 CSS Modules는 완전한 격리가 어려웠습니다. \n호스트 이벤트 흐름은 유지하면서 스타일만 분리하기 위해 Shadow DOM을 선택했습니다.',
        descriptions: [
          'Shadow DOM 스타일 격리 시스템을 설계·구현해 CSS 충돌 민원 0건 달성',
          'Next.js + Tailwind CSS로 프론트엔드를 리빌딩해 온보딩 시간을 1주에서 2일로 단축',
          '정적 프리렌더링 + CDN 캐싱 + 파일 해싱 기반 JAMstack 전략으로 배포 안정성 개선',
          '카페24 스토어 앱과 공공기관 B2G 제품의 프론트엔드 설계부터 출시까지 담당',
        ],
        techStack: ['Next.js', 'Tailwind CSS', 'Shadow DOM', 'JAMstack', 'B2G'],
      },
      {
        title: '다듬 솔루션, 텍스트 처리 파이프라인 12배 개선',
        summary:
          'Selenium 기반 렌더링 후 텍스트 추출 구조는 100페이지 처리에 60분이 걸려 데모와 납품 일정에 부담이 컸습니다. \n\n텍스트 분석 단계에 렌더링이 꼭 필요한지부터 다시 검토하고 병목을 제거하는 방향으로 파이프라인을 재설계했습니다.',
        descriptions: [
          'Selenium 의존 구조를 HTTP 수집 + 비트마스킹 + 아호-코라식 기반으로 전환',
          '100페이지 처리 시간을 60분에서 5분으로 단축해 12배 성능 개선',
          '데이터 처리 단계별 책임을 분리해 결합도를 낮추고 유지보수 예측 가능성 확보',
          'Docker 컨테이너화로 배포 환경을 표준화해 운영 편차 축소',
        ],
        techStack: ['Python', 'Aho-Corasick', 'Bitmasking', 'Docker', 'Performance'],
      },
    ],
  },
  {
    company: 'Branvip',
    position: 'Freelance Full-stack Developer',
    startDate: '2021.10',
    endDate: '2021.11',
    description:
      '짧은 기간이었지만, 아이디어를 실제로 쓰이는 MVP로 바꾸는 속도와 균형 감각을 단단하게 만든 프로젝트였습니다. \n설계부터 배포까지 전 과정을 혼자 책임지며 완성도와 납기 사이에서 무엇을 먼저 지켜야 하는지 선명하게 배웠습니다.',
    projects: [
      {
        title: '특허청 등록 로고상표 검색 서비스 MVP',
        summary:
          '1개월이라는 제한된 시간 안에 사용자 문제를 검증할 수 있는 기능 단위를 빠르게 정의했습니다. \n\n핵심 사용 시나리오에 집중해 불필요한 복잡도를 덜고, 실제 배포 가능한 형태로 마무리하는 데 집중했습니다.',
        descriptions: [
          'React + Django 기반으로 검색 플로우와 관리 기능을 설계·구현',
          'Naver Cloud Platform 환경에 배포해 운영 가능한 MVP 완성',
          '기획, 개발, 배포까지 전 과정을 1인으로 수행',
        ],
        techStack: ['React', 'Django', 'Naver Cloud Platform', 'MVP'],
      },
    ],
  },
  {
    company: '핀테크놀러지',
    position: 'Software Engineer',
    startDate: '2019.01',
    endDate: '2021.04',
    description:
      '금융 도메인 챗봇을 운영하면서 기능 구현만으로는 문제가 해결되지 않는다는 걸 처음 크게 체감했습니다. \nAPI 일관성, 운영자 도구, 도메인 언어 처리처럼 팀 바깥의 사용자까지 포함해 설계해야 서비스가 안정된다는 기준을 세운 시기였습니다. \n코드 가독성과 운영 흐름을 함께 다루는 습관이 이때 자리 잡았습니다.',
    projects: [
      {
        title: 'IBK 챗봇, 백오피스와 API 운영 구조 정리',
        summary:
          '운영 도구가 부족해 데이터 확인과 패턴 관리가 개발자 의존적으로 굴러가던 시기였습니다. \n\n운영자가 직접 다룰 수 있는 인터페이스를 만들고 API 구조를 정돈해 반복 업무의 마찰을 줄이는 데 집중했습니다.',
        descriptions: [
          'React 기반 백오피스를 구축해 상담 데이터 분석 업무 효율 개선',
          'REST API 레거시를 모듈 단위로 분리하고 반환 타입·네이밍 규칙 정리',
          '정규표현식 관리 UI를 도입해 운영자의 self-service 범위를 확대',
          'Rasa + Mecab 커스텀 사전으로 금융 도메인 형태소 인식률 개선',
        ],
        techStack: ['React', 'REST API', 'Rasa', 'Mecab', 'Backoffice'],
      },
    ],
  },
];

export default function ResumePage() {
  return (
    <main className="flex h-full w-full flex-col gap-y-10 p-10">
      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between">
        <h1 className="text-main text-7xl font-bold lg:text-8xl">Resume</h1>
        <div className="flex h-full items-end">
          <Link className="text-colPick text-2xl font-medium underline" href="/">
            Home
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
                <p className="text-sm text-gray-600">Senior Frontend Developer</p>
                <p className="mt-1 text-xs text-gray-500">Seoul, Korea</p>
              </div>
            </div>

            <div className="space-y-3">
              <h2 className="border-b pb-1 text-xs font-semibold tracking-wider text-gray-500 uppercase">Position</h2>
              <div>
                <p className="text-colPick text-lg font-medium">Senior Frontend Developer</p>
              </div>
            </div>

            <div className="space-y-3">
              <h2 className="border-b pb-1 text-xs font-semibold tracking-wider text-gray-500 uppercase">About</h2>
              {formatLine(persona).map((line, index) => (
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
                <a href={blogLink} className="text-colPick hover:text-main block text-sm underline transition-colors">
                  blog.owen.kr
                </a>
                <a href={githubLink} className="text-colPick hover:text-main block text-sm underline transition-colors">
                  github.com/owen-ever
                </a>
                <a
                  href={linkedInLink}
                  className="text-colPick hover:text-main block text-sm underline transition-colors">
                  linkedin.com/in/chanhojeon95
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
