import { persona } from '@/lib/comment';
import { formatLine } from '@/lib/formatter';
import Link from 'next/link';

const githubLink = 'https://github.com/owen-ever';

const resumeDatas = [
  {
    company: '팀벨',
    position: 'Frontend Engineer',
    startDate: '2024.01',
    endDate: 'Present',
    description:
      'AI 음성기록 솔루션 리뉴얼, RAG 기반 대화엔진 초기 개발 \n복잡한 요구와 빠른 기능 추가 속도 속에서 구조적 설계 없이는 유지보수가 불가능하다는 것을 체감했습니다. \n역할을 분리하고 응집도를 높이면 사이드이펙트를 줄일 수 있다는 점을 직접 경험하며 변경 용이성을 우선한 구조 설계의 중요성을 내재화하게 되었습니다. \n협업과 변화에 강한 시스템은 추상화와 컨벤션 설계에서 비롯된다는 깨달음을 얻었습니다.',
    projects: [
      {
        title: '팀블로 v2 프론트엔드 구조 개선 및 유지보수 효율화',
        summary:
          'AI 음성기록 솔루션 리뉴얼 \n\n기존 v1 구조는 기능 추가가 빠르게 이루어진 반면 구현 범위가 얽혀 있어 신규 요구사항 대응 시 사이드이펙트가 반복되는 문제가 있었습니다. \n고객사마다 선택적 기능을 설정해 메인 서비스 흐름을 제어해야 할 니즈가 커졌습니다. \n문제의 해결을 위해서 FSD 아키텍처 기반의 구조 리디자인을 주도하여 역할별 디렉토리 구조와 공통 컴포넌트 추상화를 도입했습니다. \n추상화는 가독성과 응집도 간 균형을 유지하도록 설계했으며 디자인 시스템은 Atomic Design 기반으로 정비하여 UI 일관성과 유지보수 효율을 높였습니다.',
        descriptions: [
          '확장성과 변경 용이성을 고려한 FSD 아키텍처 적용',
          '공통 컴포넌트 아토믹 디자인화로 UI 일관성 및 재사용성 향상',
          '신규 기능 반영 시 수정 파일 수 40% 감소, 소요 시간 20% 단축 \n→ 변경 전후 각각 5일 간 PR 로그와 코드 변경량(파일 수, 라인 수)을 실제로 비교하여 산출.',
          '코드 충돌 및 구조 변경 시 영향 범위 최소화 → 결합도 낮춤',
        ],
        techStack: ['React', 'Tailwind CSS', 'FSD', 'Atomic Design'],
      },
      {
        title: '다중 협업 환경에서의 컨벤션 및 개발 생산성 정비',
        summary:
          'RAG 기반 대화엔진 초기 개발 \n\n여러 회사가 동시에 협업하는 프로젝트에서 코드 스타일 불일치와 명확한 컨벤션 부재로 협업 효율이 저하될 위험이 있었습니다. \n초기 개발 단계에서 이를 예측하고 대응하기 위해 Nuxt.js 기반 보일러플레이트와 컨벤션을 직접 설계 및 문서화했습니다.',
        descriptions: [
          '협업사 온보딩 시간 1주 → 2일 단축 \n→ 실제 협업사 신규 인력 투입 사례 기준, 세팅/첫 커밋/첫 PR까지의 평균 시간으로 산출',
          '다중 모듈 구조에서 반환 타입과 네이밍 일관성 확보',
          '프로젝트 마감일 3주 단축, PoC 성공적 완료',
          '코드베이스 내 예측 가능성 향상, 리뷰 커뮤니케이션 비용 감소 \n→ 프로젝트 진행 시점별 PR 완료 시간을 비교하여 산출',
        ],
        techStack: ['Vue', 'TypeScript', 'Nuxt.js', '컨벤션 설계', '협업환경'],
      },
    ],
  },
  {
    company: '플렉시스',
    position: 'Software Engineer',
    startDate: '2022.01',
    endDate: '2023.12',
    description:
      '공공언어 개선 백엔드 성능 최적화, 키워드 인덱싱 솔루션 프론트엔드 리뉴얼 \n기술적 병목을 단순히 속도 문제같은 단편적인 시선으로 보지 않고, 구조와 의존성 관점에서 분석하는 습관이 생겼습니다. \n외부 도구를 걷어내고 순수 구조로 리팩토링하는 과정에서 “단순함은 성능이다”라는 관점이 생겼습니다. \n고객사 스타일 충돌 해결을 통해 사용자 환경을 고려한 캡슐화 설계의 중요성을 배웠습니다. \n기능 구현보다 장기적인 구조 리스크를 줄이는 설계가 더 큰 임팩트를 만든다는 걸 체감했습니다.',
    projects: [
      {
        title: '성능 병목 제거를 통한 처리 속도 12배 개선 및 납품 효율 향상',
        summary:
          '공공언어 개선 백엔드 성능 최적화 \n\n기존 백엔드는 Selenium에 의존해 HTML을 파싱하는 구조였으며 웹 페이지 100개 처리에 1시간 이상 소요되어 영업 데모 지연 및 가용성 리스크가 존재했습니다. \n이 구조는 외부 의존성과 프로세스 비효율성이 혼재된 상태로 낮은 응집도와 높은 결합도를 가지며 유지보수도 어려운 상황이었습니다. \n이에 따라 Selenium을 제거하고 비트마스킹, 아호-코라식 알고리즘을 활용한 정규화된 파싱 로직으로 리팩토링을 진행했습니다.',
        descriptions: [
          '외부 의존 제거 + 순수 알고리즘화 → 처리 속도 12배 향상 (60분 → 5분) \n→ 동일한 웹 페이지 100개 처리 기준으로, 기능 리팩토링 전후 실제 실행 시간 측정',
          '데이터 처리 단계별 책임 분리 → 결합도 최소화',
          '실제 영업 데모 지연과 가용성 리스크 감소',
        ],
        techStack: ['Python', '성능개선', 'Algorithm Optimization'],
      },
      {
        title: '웹 삽입형 스크립트 구조 개선 및 고객사 스타일 충돌 제거',
        summary:
          '키워드 인덱싱 솔루션 프론트엔드 리뉴얼 \n\n레거시는 순수 HTML/CSS/JS 구조로 확장성과 유지보수가 어려워 신규 기능 개발이 매번 비용이 큰 구조였습니다. \n특히 고객사의 웹페이지에 삽입되는 스크립트가 !important 스타일로 CSS를 덮어쓰는 문제로 스타일 충돌 및 UI 깨짐 현상이 발생했습니다. \n이 문제를 근본적으로 해결하기 위해 Shadow DOM 구조를 도입해 CSS 격리와 함께 결합도를 제거 Next.js 기반으로 구조 전환하며 유지보수성과 코드 가독성을 향상시켰습니다.',
        descriptions: [
          'Shadow DOM 기반 스타일 캡슐화 → 고객사 CSS 충돌 100% 제거 \n→ 스타일 깨짐 관련 고객사 민원 0건 달성',
          'Next.js + Tailwind CSS 구조로 리빌딩 → 가독성과 일관성 확보',
          '코드 컨벤션 설계 주도 → 신규 인력 온보딩 시간 2주 → 1주 단축',
          '카페24 스토어 앱, 공공기관 대상 B2B 런칭 성공적 완료',
        ],
        techStack: ['Next.js', 'Tailwind CSS', 'Shadow DOM', '컨벤션 설계', 'B2B 런칭'],
      },
    ],
  },
  {
    company: '핀테크놀러지',
    position: 'Software Engineer',
    startDate: '2019.01',
    endDate: '2021.04',
    description:
      'IBK 챗봇 서비스 유지보수, 챗봇 백오피스 프론트엔드 개발 \n문서화의 부재가 협업 효율에 미치는 영향을 실감하면서 읽는 사람의 입장에서 코드와 설명을 구성하는 습관이 생겼습니다. \n운영 도구를 직접 설계하면서, 비개발자와 협업 가능한 인터페이스의 중요성을 깨달았고 기술적 해결뿐 아니라 업무 흐름 전체를 고려한 설계로 사고가 확장되었습니다.',
    projects: [
      {
        title: '코드 일관성 재정립 및 모듈 리팩토링을 통한 유지보수성 확보',
        summary:
          'IBK 챗봇 서비스 유지보수 \n\nREST API 기반 레거시 코드에는 불명확한 주석, 명명 불일치, 구조 일관성 부족 등 가독성과 예측 가능성을 해치는 요인이 많았습니다. \n문제의 해결을 위해서 주석 재작성 및 기능별 단위 모듈화 리팩토링을 주도했습니다.',
        descriptions: [
          '주석 전면 재작성 → 코드 가독성과 문서화 품질 향상',
          '비정형 API 구조를 표준화 → 반환 타입과 네이밍 일관성 확보',
          '낮은 응집도 영역부터 모듈화 리팩토링 → 예측 가능성 향상',
        ],
        techStack: ['리팩토링', '온보딩개선', '문서화'],
      },
      {
        title: '운영 효율 강화를 위한 도구 내재화 및 한글화 커스터마이징',
        summary:
          '챗봇 백오피스 프론트엔드 개발 \n\n기존 챗봇은 관리도구가 미흡하여 데이터 분석 및 패턴 관리의 생산성이 떨어지고 담당 개발자 의존도가 매우 높은 상태였습니다. \n문제의 해결을 위해서 React 기반 백오피스를 설계 단계부터 참여하여 구축하였고 정규표현식 관리 기능과 상담 이력 가시화 도구를 내재화했습니다. \nRasa 기반 오픈소스에 Mecab 커스텀 사전을 적용하여 도메인별 형태소 인식률을 개선하고 운영 피드백 플로우를 가속화했습니다.',
        descriptions: [
          'React 기반 백오피스 개발 → 상담 데이터 분석 생산성 향상',
          'Rasa 오픈소스 커스터마이징 (Mecab 커스텀 사전) → 도메인별 형태소 인식률 개선 \n→ 변경 전후 도메인별 형태소 오인식 건수를 비교하여 산출',
          '정규표현식 관리 UI 제공 → 운영자 편의성 및 에러율 감소',
        ],
        techStack: ['React', 'Rasa', 'Mecab', '백오피스'],
      },
    ],
  },
];

export default function ResumePage() {
  return (
    <main className="flex h-full w-full flex-col gap-y-10 p-10">
      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="text-main text-7xl font-bold lg:text-8xl">Resume</div>
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
