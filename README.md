# Ever Blog

[NextJS](https://nextjs.org/) v15 프레임워크를 기반으로 한 Typescript 템플릿 (App Router)
AI를 적극 활용하여 개발

## 시작하기

### 환경

- Bun 1.2.6 이상
- Node.js 21.5.0

### 의존성 설치 및 개발 서버 실행

```
./init.sh

bun run dev
```

### 환경 구성 테스트

```
bun run lint-format
```

> 커밋 이전에 위의 명령어를 실행하고 커밋을 진행

## 주요 기술 스택

- [NextJS](https://nextjs.org/docs)
- [Typescript](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [React Markdown](https://github.com/remarkjs/react-markdown)

## 개발 도구

- [bun](https://bun.sh/) - 패키지 매니저 겸 런타임
- [Husky](https://typicode.github.io/husky/#/) - Git Hooks 관리
- [ESLint](https://eslint.org/) - 코드 검사
- [Prettier](https://prettier.io/) - 코드 포맷팅

## 초기 프로젝트 구조

추가로 필요한 구성은 [NextJS 디렉토리 구조](https://nextjs.org/docs/app/getting-started/project-structure)를 참고

```
/
├── .husky       # Husky 설정 파일
├── .next        # next 파일
├── messages     # i18n 언어팩
│   ├── en.json  # 영어 설정 파일
│   └── ko.json  # 한국어 설정 파일
├── public       # 정적 자산 파일
└── src
    ├── api            # api 설정 파일
    ├── app
    │   ├── [locale]           # 동적 국제화 설정이 적용된 페이지 (내부의 페이지만 적용됨)
    │   │   ├── layout.tsx         # [locale]의 layout
    │   │   └── page.tsx           # [locale] 페이지 -> 사실상 홈
    │   ├── layout.tsx         # root layout
    │   ├── not-found.tsx      # 404 페이지
    │   ├── providers.tsx      # custom jotai provider
    │   └── robots.txt         # 스크래핑 허용 설정 파일
    ├── components         # 공통 컴포넌트 파일
    │   └── fetch              # data fetching 컴포넌트 파일
    ├── i18n           # 국제화 설정 파일
    ├── lib            # 공통 함수 파일
    │   ├── atoms.ts           # jotai 선언 파일
    │   └── auth.ts            # 권한을 위한 토큰 관련 파일
    ├── types          # 타입 설정 파일
    └── middleware.ts  # 미들웨어 설정 파일
...
```

## 배포

로컬에서 빌드한 뒤 linux/amd64 도커 이미지를 만들어 NAS 레지스트리(`docker.owen.kr`)에 push합니다. 블로그는 NAS의 Container Manager 프로젝트로 실행합니다.

### 1. 이미지 빌드와 push (로컬)

`dockerbuild.sh`는 `docker-compose.yaml`로 이미지를 빌드합니다. `docker-compose-example.yaml`을 `docker-compose.yaml`로 복사한 뒤 실행합니다. 이미지 태그는 `package.json`의 `version`입니다. 이미 push한 태그는 덮어쓰지 않습니다.

```
cp docker-compose-example.yaml docker-compose.yaml
./dockerbuild.sh docker.owen.kr
```

### 2. NAS 실행 (Container Manager)

1. NAS에 프로젝트 폴더를 만들고 그 안에 `posts`, `images` 폴더를 만듭니다.
2. Container Manager에서 프로젝트를 만들고 `docker-compose.nas.yaml` 내용을 붙여 넣습니다.
3. 값을 바꿀 때는 `.env.example`을 프로젝트 폴더에 `.env`로 복사한 뒤 고칩니다.

| 값                     | 기본값                     | 뜻                                                  |
| ---------------------- | -------------------------- | --------------------------------------------------- |
| `EVER_BLOG_IMAGE`      | `docker.owen.kr/ever-blog` | 레지스트리 이미지 이름                              |
| `EVER_BLOG_TAG`        | 현재 릴리스 버전           | 실행할 이미지 태그                                  |
| `EVER_BLOG_PORT`       | `3000`                     | NAS에서 여는 포트                                   |
| `EVER_BLOG_POSTS_DIR`  | `./posts`                  | 포스트 폴더 (컨테이너 `/posts`)                     |
| `EVER_BLOG_IMAGES_DIR` | `./images`                 | 포스트 이미지 폴더 (컨테이너 `/posts/images`)       |

새 버전을 배포할 때는 `EVER_BLOG_TAG`를 바꾸고 프로젝트를 다시 빌드(이미지 다시 받기)합니다.

## 참고

> 콘텐츠 페이지와 마크다운 렌더링을 중심으로 단순한 App Router 구조를 유지합니다.
