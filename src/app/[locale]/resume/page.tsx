import { Link } from '@/i18n/navigation';
import { formatLine } from '@/lib/formatter';
import { useTranslations } from 'next-intl';

export default function ResumePage() {
  const tHome = useTranslations('HomePage');
  const tResume = useTranslations('ResumePage');

  return (
    <main className="flex h-full w-full flex-col gap-y-10 p-10">
      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-main text-7xl font-bold lg:text-8xl">{tResume('title')}</div>
        <div className="flex h-full items-end">
          <Link className="text-colPick text-2xl font-medium underline" href="/">
            {tResume('home')}
          </Link>
        </div>
      </div>

      <section className="mx-auto w-full">
        <div className="p-0">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 lg:gap-8">
            <div className="space-y-3">
              <h2 className="text-xs font-semibold tracking-wider text-gray-500 uppercase">Identity</h2>
              <div>
                <p className="text-colPick text-lg font-medium">Owen</p>
                <p className="text-sm text-gray-600">Frontend Engineer</p>
                <p className="mt-1 text-xs text-gray-500">Seoul, Korea</p>
              </div>
            </div>

            <div className="space-y-3">
              <h2 className="text-xs font-semibold tracking-wider text-gray-500 uppercase">Position</h2>
              <div>
                <p className="text-colPick text-lg font-medium">Frontend Engineer</p>
              </div>
            </div>

            <div className="space-y-3">
              <h2 className="text-xs font-semibold tracking-wider text-gray-500 uppercase">About</h2>
              {formatLine(tHome('description')).map((line, index) => (
                <p className="text-sm leading-relaxed text-gray-700" key={index}>
                  {line}
                </p>
              ))}
            </div>

            <div className="space-y-3">
              <h2 className="text-xs font-semibold tracking-wider text-gray-500 uppercase">Contact</h2>
              <div className="space-y-2">
                <a
                  href="mailto:me@owen.kr"
                  className="text-colPick hover:text-main block text-sm underline transition-colors">
                  me@owen.kr
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full">
        <div className="space-y-10">
          {/* Current Position */}
          <div className="p-0">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="lg:w-1/3">
                <h3 className="text-colPick mb-2 text-xl font-semibold">테크 스타트업</h3>
                <p className="mb-1 text-sm font-medium text-blue-600">Frontend Engineer</p>
                <p className="mb-3 text-xs text-gray-500">2023.03 - Present</p>
                <div className="h-1 w-12 rounded bg-blue-600"></div>
              </div>

              <div className="lg:w-2/3">
                <div className="mb-6 space-y-4">
                  <p className="leading-relaxed text-gray-700">
                    React 기반의 대규모 웹 애플리케이션 개발을 담당하며, 사용자 경험 개선과 성능 최적화에 집중하고
                    있습니다.
                  </p>

                  <div className="space-y-3">
                    <div>
                      <h4 className="text-colPick mb-2 text-sm font-medium">주요 프로젝트</h4>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li className="flex items-start">
                          <span className="mt-2 mr-3 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gray-400"></span>
                          디자인 시스템 구축 및 컴포넌트 라이브러리 개발
                        </li>
                        <li className="flex items-start">
                          <span className="mt-2 mr-3 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gray-400"></span>웹 성능
                          최적화로 로딩 속도 40% 개선
                        </li>
                        <li className="flex items-start">
                          <span className="mt-2 mr-3 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gray-400"></span>
                          크로스 브라우저 호환성 및 반응형 웹 구현
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">React</span>
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                    TypeScript
                  </span>
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">Next.js</span>
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                    Tailwind CSS
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Previous Position */}
          <div className="p-0">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="lg:w-1/3">
                <h3 className="mb-2 text-xl font-semibold text-gray-900">이커머스 회사</h3>
                <p className="mb-1 text-sm font-medium text-gray-600">Frontend Developer</p>
                <p className="mb-3 text-xs text-gray-500">2021.06 - 2023.02</p>
                <div className="h-1 w-12 rounded bg-gray-300"></div>
              </div>

              <div className="lg:w-2/3">
                <div className="mb-6 space-y-4">
                  <p className="leading-relaxed text-gray-700">
                    온라인 쇼핑몰의 프론트엔드 개발을 담당하며, 사용자 친화적인 UI/UX 구현에 집중했습니다.
                  </p>

                  <div className="space-y-3">
                    <div>
                      <h4 className="mb-2 text-sm font-medium text-gray-900">주요 성과</h4>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li className="flex items-start">
                          <span className="mt-2 mr-3 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gray-400"></span>
                          모바일 최적화로 전환율 25% 향상
                        </li>
                        <li className="flex items-start">
                          <span className="mt-2 mr-3 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gray-400"></span>
                          결제 시스템 UI 개선 및 사용성 향상
                        </li>
                        <li className="flex items-start">
                          <span className="mt-2 mr-3 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gray-400"></span>
                          A/B 테스트를 통한 지속적인 UX 개선
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-gray-50 px-3 py-1 text-xs font-medium text-gray-700">Vue.js</span>
                  <span className="rounded-full bg-gray-50 px-3 py-1 text-xs font-medium text-gray-700">
                    JavaScript
                  </span>
                  <span className="rounded-full bg-gray-50 px-3 py-1 text-xs font-medium text-gray-700">SCSS</span>
                  <span className="rounded-full bg-gray-50 px-3 py-1 text-xs font-medium text-gray-700">Webpack</span>
                </div>
              </div>
            </div>
          </div>

          {/* Side Project */}
          <div className="p-0">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="lg:w-1/3">
                <h3 className="mb-2 text-xl font-semibold text-gray-900">개인 프로젝트</h3>
                <p className="mb-1 text-sm font-medium text-green-600">Full-stack Development</p>
                <p className="mb-3 text-xs text-gray-500">2023.01 - 2023.12</p>
                <div className="h-1 w-12 rounded bg-green-600"></div>
              </div>

              <div className="lg:w-2/3">
                <div className="mb-6 space-y-4">
                  <p className="leading-relaxed text-gray-700">
                    개발자 커뮤니티 플랫폼을 기획부터 배포까지 전체 과정을 담당한 풀스택 프로젝트입니다.
                  </p>

                  <div className="space-y-3">
                    <div>
                      <h4 className="mb-2 text-sm font-medium text-gray-900">기술적 도전</h4>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li className="flex items-start">
                          <span className="mt-2 mr-3 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gray-400"></span>
                          실시간 채팅 기능 구현 (WebSocket)
                        </li>
                        <li className="flex items-start">
                          <span className="mt-2 mr-3 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gray-400"></span>
                          JWT 기반 인증 시스템 구축
                        </li>
                        <li className="flex items-start">
                          <span className="mt-2 mr-3 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gray-400"></span>
                          Docker를 활용한 배포 자동화
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">React</span>
                  <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">Node.js</span>
                  <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">MongoDB</span>
                  <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">Docker</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
