import { persona } from '@/lib/comment';
import { formatLine } from '@/lib/formatter';
import { createPageMetadata } from '@/lib/seo';
import Link from 'next/link';
import type { ReactNode } from 'react';

export const metadata = createPageMetadata({
  title: 'Resume',
  description: 'Owen의 경력, 프로젝트, 기술 스택을 정리한 Ever.Log 이력서 페이지',
  path: '/resume',
});

const githubLink = 'https://github.com/owen-ever';
const blogLink = 'https://blog.owen.kr';
const linkedInLink = 'https://www.linkedin.com/in/chanhojeon95';

const position = 'AI Engineer';
const emphasis =
  '프론트엔드·백엔드·인프라를 모두 직접 다뤄 온 경험자의 시야로 AI·LLM 기능을 제품에 직접 구현합니다. AI 에이전트 기반 생산 워크플로우 설계·구축, 에이전트용 개발 도구 직접 제작, 대화형 AI(챗봇 NLP·STT·RAG) 제품 경험, 일정·인력 리스크 속 팀 리딩 경험이 있습니다.';

const summaryLead =
  '6년 이상 프론트엔드·백엔드·인프라를 직접 다루며 제품을 개발해 온 엔지니어로, 지금은 AI 에이전트와 LLM이 실제 업무 산출물을 만들도록 시스템과 도구를 설계·구축합니다.';

const summaryItems = [
  '최근 (주)한화 ESG 공시지원시스템 신규 구축 1차 사업에서 화면설계서 분석 → 디자인 적용 → 퍼블리싱 화면 조립으로 이어지는 3단계 AX 워크플로우와 단계별 도구를 직접 설계·제작했습니다.',
  '이 워크플로우로 인력 이탈과 작업량 증가 속에서도 522개 화면 규모의 UI/UX 산출물을 본 제작 3개월 동안 처리했습니다(2026.10 기준 퍼블리싱 반영 434화면).',
  '코딩 에이전트용 화면 검수 도구 scene-glass와 개인 AI 에이전트 게이트웨이 zigmini를 직접 만들어 npm에 공개했습니다.',
  '소규모 팀에서 프론트엔드 아키텍처 설계, 백엔드 성능 최적화, 컨테이너 배포까지 직접 수행한 경험이 있습니다.',
  '금융 챗봇 NLP, 음성(STT) 대화 데이터 UI, RAG 대화엔진 PoC, LLM 기반 마케팅 데이터 분석 등 대화형 AI 제품을 화면부터 API·데이터 구조까지 다뤄 왔습니다.',
  '넓은 시야와 개발 깊이를 결합해 AI가 실제 업무 흐름에 자리 잡는 제품과 도구를 만들고자 합니다.',
];

const competencies = [
  {
    label: 'AX Workflow',
    text: '화면설계서 분석 → 디자인 적용 → 퍼블리싱 화면 조립의 3단계 AI 생산 워크플로우와 단계별 도구 직접 설계·제작 (Figma·Hermes Agent·Claude Code·Codex·scene-glass)',
  },
  {
    label: 'Agent Tooling',
    text: '코딩 에이전트용 MCP 검수 도구(scene-glass), 개인 AI 에이전트 게이트웨이(zigmini) 개발·npm 공개',
  },
  {
    label: 'AI-Augmented Development',
    text: 'Claude·Codex·Gemini 역할 분리 활용, AI 기반 프로덕션 솔루션 1인 설계·개발',
  },
  {
    label: 'End-to-End Development',
    text: 'React·Next.js·Vue/Nuxt 프론트엔드, REST API 설계·Django·MSA 백엔드, Docker·CDN 배포까지 직접 수행',
  },
  {
    label: 'Conversational AI',
    text: 'Rasa + Mecab 금융 도메인 NLP, STT 대화 데이터 채팅형 UI·대량 데이터 검색 구조, RAG 대화엔진 PoC 개발 표준, LLM 기반 분석 기능 설계',
  },
  {
    label: 'Project Leadership',
    text: 'UI/UX 팀 리딩, 공수 재산정을 통한 인력 증원 계약, 인력 이탈 대응, 신규 인력 AI 활용 교육',
  },
  {
    label: 'Architecture',
    text: 'FSD + Atomic Design 기반 프로젝트 구조 설계, 단계적 마이그레이션 전략 수립·실행',
  },
  {
    label: 'Performance',
    text: '알고리즘 레벨 최적화 (비트마스킹, 아호-코라식으로 12배 성능 개선), 외부 의존성 제거',
  },
  { label: 'Web Platform', text: 'Shadow DOM 기반 스타일 격리 시스템 설계·구현' },
  {
    label: 'Cross-team',
    text: '다수 수행사·고객사 간 범위·책임·일정 조율, 백엔드 API 스키마 사전 리뷰 프로세스 설계·도입',
  },
];

const resumeDatas = [
  {
    company: '프리랜스',
    position: 'PL 겸 UX 기획자',
    startDate: '2026.06',
    endDate: '2026.10',
    description:
      '(주)한화 ESG 공시지원시스템 신규 구축 1차 사업에 프리랜서 PL 겸 UX 기획자로 참여해 UI/UX 팀을 리딩했습니다. \n화면설계서를 받는 시점부터 퍼블리싱 코드를 제출하는 시점까지 전체 과정을 AI 기반 워크플로우로 설계하고, 단계마다 필요한 도구를 직접 만들었습니다. \n화면 카탈로그 522개 화면 규모의 UI/UX 산출물을 본 제작 3개월 동안 제작했습니다.',
    projects: [
      {
        title: '(주)한화 ESG 공시지원시스템 신규 구축 (1차 사업), AI 기반 3단계 UI/UX 생산 워크플로우',
        summary:
          '3명으로 시작한 UI/UX 팀을 추가 계약으로 5명까지 늘리며 리딩했습니다. \n\n2026.06에 프로젝트 분석과 워크플로우·도구 설계를 하고, 본 제작 기간 3개월(2026.07–09) 동안 화면 카탈로그 522개 화면 규모의 UI/UX 산출물을 제작한 뒤, 2026.10에 수정·보완을 마무리했습니다. \n2026.10 기준 퍼블리싱 저장소에는 434화면이 반영되었습니다.',
        descriptions: [
          '화면설계서 입력부터 퍼블리싱 코드 출력까지 ① 화면설계서 분석 ② 디자인 적용 ③ 분석 데이터를 바탕으로 디자인을 입힌 퍼블리싱 화면 조립의 3단계 AX 워크플로우 설계',
          '단계마다 필요한 도구를 직접 제작하고 프로젝트 기간 중 계속 개선 (2026.06–08)',
          '도구 역할 분리: Hermes Agent는 진행 관리·화면설계서 분석·화면 검사, Claude Code는 Vue 화면 조립과 UX 점검, Codex는 화면 후보 생성·교차 리뷰·Figma 게시 담당',
          'Hermes Agent 전용 프로필을 구성·내보내기(export)해 여러 PC에 같은 설정으로 복원하고 병행 작업',
          '검수 도구 scene-glass 제작: 화면 요소에 메모를 남기면 요소 정보와 함께 AI에게 수정 작업이 전달되어, 글 설명과 캡처 과정을 없앰',
        ],
        techStack: ['AX Workflow', 'Figma', 'Hermes Agent', 'Claude Code', 'Codex', 'scene-glass'],
      },
      {
        title: 'AX 워크플로우 성과',
        summary:
          '형식과 품질이 제각각인 화면설계서를 같은 기준으로 처리하는 것이 가장 큰 과제였습니다. \n\n판단 기준을 쌓아 재사용하고 검수 과정을 도구로 줄이는 데 집중했습니다.',
        descriptions: [
          '화면설계서 품질이 낮은 화면의 퍼블리싱 검수 시간을 최대 1일에서 2시간 내외로 단축',
          'scene-glass 도입 후 재작업이 거의 사라짐',
          '수행사마다 형식이 다른 화면설계서의 판단 기준을 검수 관례 68건(사람 승인 규칙 33건 + 후보 규칙 35건)으로 축적해, 같은 유형을 재사용 처리하며 후반 검수 부담 감소',
          '같은 기간 다른 수행사 대비 안정적인 산출물 품질 확보',
          '1차 사업 종료 후 후속 사업 참여 제안을 받음',
        ],
        techStack: ['AI Review', 'MCP', 'Quality'],
      },
      {
        title: '일정·인력 리스크 대응과 협업',
        summary:
          '착수 시점부터 인력 부족, PM 교체 뒤 작업량 증가, 핵심 인력 이탈이 이어졌습니다. \n\n일정과 품질을 지키기 위해 근거를 먼저 정리하고, 계약 구조와 인력·AI 처리 용량 계획을 함께 조율했습니다.',
        descriptions: [
          '착수 시 공수를 재산정해 인력 부족을 근거로 제시하고, 소속사의 추가 인력 계약을 성사시킴',
          'AI 사용 한도에 맞춰 AI 구독 계정을 2개에서 5개로 늘려 처리 용량 확보',
          'PM 교체 뒤 작업량이 계약 범위를 넘어서자, 계약 범위 밖 화면은 다른 수행사가 제작하고 우리 팀이 검수하는 구조로 협의',
          '핵심 인력(퍼블리셔) 이탈 시 면담으로 이탈 시점을 늦추고, 신규 인력 요청과 인수인계 일정을 조율해 공백 최소화',
          'AI 활용 경험이 없는 신규 인력에게 워크플로우와 AI 활용 방법을 직접 교육',
          '3개 협력사의 관리자·PL·PM과 요구사항, 책임 범위, 일정, 산출물 범위 조율',
          '한화 계열사 AX팀과 2회에 걸쳐 AI 활용 교류를 진행했으며, 2회차는 AI 활용 사례 강연 형태로 진행',
        ],
        techStack: ['Project Leadership', 'Cross-team', 'AI Education'],
      },
    ],
  },
  {
    company: '팀벨',
    position: 'Frontend Engineer',
    startDate: '2024.01',
    endDate: '2026.04',
    description:
      'AI 기반 마케팅·CRM 통합 추적 제품을 1인 설계·개발하고, 팀블로 v2 구조 전환과 협업 표준화까지 함께 맡았습니다. \n이 시기에는 빠른 구현보다 다음 변경을 얼마나 안전하게 받아들이는 구조인지가 더 중요하다는 걸 반복해서 배웠습니다. \n실시간/배치, MVP/확장성, 속도/안정성 사이의 trade-off를 팀의 공통 언어로 정리하는 것이 제 일의 중심이 되었습니다.',
    projects: [
      {
        title: 'AI 기반 마케팅·CRM 통합 추적 솔루션, 내부 베타까지',
        summary:
          '마케팅 유입부터 고객 전환까지 전 과정을 단일 뷰로 추적하는 AI 기반 다각도 분석 솔루션을 기획·설계·개발까지 1인으로 수행했습니다. \n\nGoogle·Meta·Naver API 제약과 실제 사용자 가치 사이에서 균형을 맞춰야 했고 요구사항은 주 단위로 바뀌었습니다. \n초기 완성도보다 "확장 가능한 기반 → 점진적 완성"으로 의도적으로 전환해, 불확실한 요구사항 환경에서 유연성을 우선했습니다.',
        descriptions: [
          'Claude·Codex·Gemini를 동일 태스크에 병렬 지시해 결과를 비교·검증하고, 모델별 강점에 따라 개발 자동화와 데이터 분석·정리로 역할 분리',
          '실시간 가능 범위를 사전 조사로 한정(활성 세션·히트맵·스크롤 뎁스)하고, Google·Meta·Naver 마케팅 데이터는 API 제약으로 배치 처리 분리',
          '주 단위 요구사항 변경 환경에서 변경 범위 격리를 위해 MSA 선택 (안정성이 아닌 변동성 대응을 판단 기준으로 설정)',
          '마케팅 비용·유입·전환 데이터를 통합하고, LLM 기반 분석으로 비용 집행 흐름과 성과 변화를 다각도 해석하는 기능 설계',
          '마케팅 담당자 대상 내부 베타 버전 릴리즈 후 운영팀 이관',
        ],
        techStack: ['TypeScript', 'Next.js', 'Node.js', 'MSA', 'LLM', 'AI Workflow'],
      },
      {
        title: '팀블로 v2, FSD 기반 프론트엔드 아키텍처 재설계',
        summary:
          '팀 내 FE 최고 연차로서 프론트엔드 기술 스택 선정과 아키텍처 의사결정을 맡았습니다. \n\n기능 추가 시 수정 범위가 넓고 예측하기 어려웠고, 원인은 레이어 간 의존 관계가 불명확한 데 있었습니다. \n프레임워크·아키텍처 후보들의 강점/약점과 서비스 영향도를 평가해, 레이어 경계를 강제할 수 있는 FSD(Feature-Sliced Design)를 선택했습니다.',
        descriptions: [
          '페이지 단위 점진적 마이그레이션과 카나리 배포로 운영 중단 없이 전환 완료',
          '기능 추가 시 수정 파일 수 40% 감소, 개발 소요 시간 20% 단축',
          '음성 대화 내역을 STT로 변환해 채팅형 UI로 표시하는 기능 개발',
          '대량 STT 데이터 목록에 가상화(virtualization)를 적용하고, 그로 인한 DOM 기반 검색·치환 불가 문제를 원본 데이터·인덱스 기반 검색 구조로 해소',
          '다기능 솔루션 특성상 라우트·컴포넌트 단위 레이지 로딩 적용',
          'API 스키마 불일치 케이스를 정리해 백엔드 팀에 공유하고, FE-BE 간 아키텍처 리뷰 미팅 정기화',
        ],
        techStack: ['React', 'TypeScript', 'FSD', 'STT', 'Virtualization'],
      },
      {
        title: '신입 온보딩 프로그램 설계',
        summary: '신입 엔지니어가 팀의 구조와 협업 방식에 빠르게 적응할 수 있도록 온보딩 과정을 설계했습니다.',
        descriptions: ['신입 엔지니어를 위한 2주 온보딩 커리큘럼 설계', '과제 기반 학습 + 코드리뷰 방식으로 구성'],
        techStack: ['Onboarding', 'Code Review'],
      },
      {
        title: 'RAG 기반 대화엔진 PoC (랭사 솔루션), 개발 표준 먼저 세우기',
        summary:
          'RAG 기반 대화엔진을 포함한 5개 서비스가 결합되는 멀티컴퍼니 협업 프로젝트에서 프론트엔드 아키텍처와 개발 표준을 맡았습니다. \n\n기능 개발보다 개발 표준을 먼저 만드는 것이 전체 속도를 높인다고 판단했고, 검증된 표준(ESLint TS 룰, Prettier 기본)을 인용했습니다.',
        descriptions: [
          '5개 서비스 결합 구조를 고려해 Nuxt.js 기본 패턴을 따르면서 기능 단위 폴더링 기준 정리',
          'Nuxt.js 보일러플레이트 + 컨벤션 문서 작성 → 조직 표준으로 채택 (Nuxt 선택: 고객사 Vue3 요구)',
          '이모지 기반 커밋 컨벤션을 Husky로 강제 적용해, 사람마다 스타일이 달라 히스토리 추적이 어려운 문제 해결',
          '협업사 온보딩 시간을 1주에서 2일로 단축',
          '캐시 전략 + 사용자 행동 트래킹 구조 직접 설계·제안',
          '마감일 3주 앞당김, 경쟁 PT에서 PoC 최종 선정',
        ],
        techStack: ['Vue 3', 'Nuxt.js', 'TypeScript', 'Husky', 'RAG'],
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
        title: '큐잉 v2 (키워드 인덱싱 솔루션), Shadow DOM 기반 위젯 시스템',
        summary:
          '고객사 웹사이트에 임베딩되는 위젯에서 CSS 충돌 민원이 발생했습니다. \n\niframe은 성능(별도 문서 로딩)과 이벤트 버블링 문제가 있었고, CSS Modules는 완전한 격리를 보장하지 못했습니다. \n플러그인 특성상 호스트 사이트의 이벤트 흐름을 차단하지 않으면서 스타일만 완전히 격리해야 했기에 Shadow DOM을 선택했습니다.',
        descriptions: [
          'Shadow DOM 스타일 격리 시스템을 설계·구현해 CSS 충돌 민원 0건 달성',
          'Next.js + Tailwind CSS로 프론트엔드를 리빌딩해 온보딩 시간을 1주에서 2일로 단축',
          'JAMstack 아키텍처 기반으로 정적 프리렌더링 + CDN 캐싱 + 클라이언트 사이드 API 호출을 적용해 서버 부하 절감',
          '배포 시 CDN 캐시 무효화 이슈를 파일명 해싱 전략으로 해결',
          '카페24 스토어 앱 + 공공기관 B2G 제품의 프론트엔드를 설계부터 출시까지 담당',
        ],
        techStack: ['Next.js', 'Tailwind CSS', 'Shadow DOM', 'JAMstack', 'B2G'],
      },
      {
        title: '다듬 솔루션 (공공언어 개선), 처리 시간 12배 개선',
        summary:
          'Selenium으로 페이지를 렌더링해 텍스트를 추출하던 구조는 100페이지 처리에 60분이 걸렸습니다. \n\n브라우저 렌더링 대기 시간이 병목의 핵심이었고, 텍스트 분석에는 렌더링이 필요하지 않다는 것을 확인했습니다.',
        descriptions: [
          'HTTP 통신으로 직접 데이터를 수집한 뒤 비트마스킹 + 아호-코라식 알고리즘으로 파싱하는 방식으로 전환',
          '처리 시간을 60분에서 5분으로 단축해 12배 개선',
          'Docker 컨테이너화로 배포 환경 표준화',
        ],
        techStack: ['Python', 'Aho-Corasick', 'Bitmasking', 'Docker', 'Performance'],
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
        title: 'IBK 챗봇, 백오피스 & API 설계',
        summary:
          '운영 도구가 부족해 데이터 확인과 패턴 관리가 개발자 의존적으로 굴러가던 시기였습니다. \n\n운영자가 직접 다룰 수 있는 인터페이스를 만들고 API 구조를 정돈해 반복 업무의 마찰을 줄이는 데 집중했습니다.',
        descriptions: [
          'REST API 레거시를 모듈 단위로 분리하고 반환 타입·네이밍 규칙 정리',
          'React 기반 백오피스를 구축해 상담 데이터 분석 업무 효율 개선',
          'Rasa + Mecab 커스텀 사전으로 금융 도메인 형태소 인식률 개선',
          '정규표현식 관리 UI를 구축해 운영자가 직접 패턴을 수정할 수 있도록 개선',
        ],
        techStack: ['React', 'REST API', 'Rasa', 'Mecab', 'Backoffice'],
      },
    ],
  },
  {
    company: 'Branvip',
    position: 'Freelance Developer',
    startDate: '2021.10',
    endDate: '2021.11',
    description:
      '짧은 기간이었지만, 아이디어를 실제로 쓰이는 MVP로 바꾸는 속도와 균형 감각을 단단하게 만든 프로젝트였습니다. \n설계부터 배포까지 전 과정을 혼자 책임지며 완성도와 납기 사이에서 무엇을 먼저 지켜야 하는지 선명하게 배웠습니다.',
    projects: [
      {
        title: '특허청 등록 로고상표 검색 웹 서비스 MVP',
        summary:
          '1개월이라는 제한된 시간 안에 사용자 문제를 검증할 수 있는 기능 단위를 빠르게 정의했습니다. \n\n핵심 사용 시나리오에 집중해 불필요한 복잡도를 덜고, 실제 배포 가능한 형태로 마무리하는 데 집중했습니다.',
        descriptions: [
          'React + Django + Naver Cloud Platform 기반으로 MVP 개발',
          '1개월 내 MVP 설계부터 배포까지 1인 완료',
        ],
        techStack: ['React', 'Django', 'Naver Cloud Platform', 'MVP'],
      },
    ],
  },
];

const sideProjects: { name: string; description: string; link?: string }[] = [
  {
    name: 'zigmini',
    description:
      'Mac에서 동작하는 개인 AI 에이전트 게이트웨이. 웹 화면과 Android 앱에서 에이전트와 대화하고, 작업을 맡기고, 알림을 받음',
    link: 'https://www.npmjs.com/package/zigmini',
  },
  {
    name: 'scene-glass',
    description:
      'Vue 3·React(Vite) 프로젝트용 AI 화면 검수 도구. 브라우저 화면 요소에 남긴 메모를 요소 정보와 함께 MCP로 코딩 에이전트에 전달',
    link: 'https://www.npmjs.com/package/@scene-glass/devtools',
  },
  {
    name: 'OpenClaw 운영 환경 구축',
    description: '에이전트 오케스트레이션, QA 클로즈드 루프, 공용 지식 경로 설계 및 운영',
  },
  {
    name: 'OpenClaw OAuth recovery 오픈소스 기여',
    description:
      '공유 OAuth 프로필 동시 refresh로 재로그인이 발생하는 race condition을 재현·축소하고, `refresh_token_reused` 상황의 auth store 재로드 + 1회 retry recovery path를 제안 (PR #54856). 핵심 recovery 방향이 v2026.4.7 릴리스에 반영',
  },
  { name: 'ever-blog', description: '개인 블로그 (TypeScript/Next.js)', link: blogLink },
  { name: 'ever-hooks', description: '반복되는 패턴을 추출한 커스텀 React 훅 라이브러리' },
  { name: 'ui-ascii-art', description: 'UI 스크린샷을 ASCII 아트로 변환하는 MCP 도구' },
  { name: 'meal-boy', description: 'AI 기반 식사 메뉴 추천 봇 (Python, Claude Code 활용)' },
];

const credentials = [
  { title: 'Education', items: ['인하공업전문대 컴퓨터시스템과 (2013.03 ~ 2019.02)'] },
  { title: 'Certification', items: ['정보처리기사 (2020.11.12, 한국산업인력공단)'] },
  {
    title: 'Awards',
    items: ['교내 창의 아이디어 캠프 금상', '과학기술인재 경시대회 동상 (컴퓨터전공 부문)'],
  },
];

function ResumeRow({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex flex-col border-t pt-2 lg:flex-row lg:items-start lg:justify-between">
      <div className="lg:w-1/4">
        <h3 className="text-colPick mb-2 text-xl font-semibold">{title}</h3>
      </div>
      <div className="lg:w-3/4">{children}</div>
    </div>
  );
}

function BulletList({ items }: { items: ReactNode[] }) {
  return (
    <ul className="text-colPick space-y-1 text-sm">
      {items.map((item, idx) => (
        <li className="flex items-start whitespace-pre-wrap" key={idx}>
          <span className="mt-2 mr-3 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gray-400"></span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

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
                <p className="text-sm text-gray-600">{position}</p>
                <p className="mt-1 text-xs text-gray-500">Seoul, Korea</p>
              </div>
            </div>

            <div className="space-y-3">
              <h2 className="border-b pb-1 text-xs font-semibold tracking-wider text-gray-500 uppercase">Position</h2>
              <div>
                <p className="text-colPick text-lg font-medium">{position}</p>
                <p className="mt-1 text-sm leading-relaxed text-gray-700">{emphasis}</p>
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
          <ResumeRow title="Summary">
            <div className="space-y-4">
              <p className="text-colPick leading-relaxed">{summaryLead}</p>
              <BulletList items={summaryItems} />
            </div>
          </ResumeRow>

          <ResumeRow title="Core Competencies">
            <BulletList
              items={competencies.map(competency => (
                <>
                  <span className="font-semibold">{competency.label}:</span> {competency.text}
                </>
              ))}
            />
          </ResumeRow>
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

      <section className="mx-auto w-full">
        <div className="space-y-4">
          <ResumeRow title="Side Projects">
            <BulletList
              items={sideProjects.map(project => (
                <>
                  <span className="font-semibold">{project.name}</span> — {project.description}
                  {project.link && (
                    <>
                      {' '}
                      <a
                        href={project.link}
                        className="text-colPick hover:text-main break-all underline transition-colors">
                        {project.link.replace(/^https:\/\//, '')}
                      </a>
                    </>
                  )}
                </>
              ))}
            />
          </ResumeRow>

          {credentials.map(credential => (
            <ResumeRow title={credential.title} key={credential.title}>
              <BulletList items={credential.items} />
            </ResumeRow>
          ))}
        </div>
      </section>
    </main>
  );
}
