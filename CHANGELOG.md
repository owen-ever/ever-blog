# Changelog

다음 릴리스에 넣을 버그와 개선 예정 항목은 [패치 예정 노트](docs/patch-notes-next.md)에 있습니다.

## Unreleased

## 0.3.0 - 2026-10-29

- 📝 `/resume` 이력서 내용을 2026-10 기준으로 바꿨습니다. 직위를 AI Engineer로 바꾸고, Summary·Core Competencies·Side Projects·Education·Certification·Awards 절을 추가했습니다. 프리랜스 (주)한화 ESG 공시지원시스템 경력을 추가하고 팀벨·플렉시스·핀테크놀러지·Branvip 경력 내용을 정리했습니다. 화면 디자인과 기존 컴포넌트 구성은 그대로입니다. 호환성 영향은 없습니다.
- 📝 `/resume` 플렉시스 경력의 "공공기관 B2B"를 "공공기관 B2G"로 되돌렸습니다. 대상 고객이 지방자치단체이기 때문입니다. 기술 태그도 이전처럼 `B2G`로 되돌렸습니다. 호환성 영향은 없습니다.
- 🚀 NAS Container Manager 프로젝트용 `docker-compose.nas.yaml`과 `.env.example`을 추가했습니다. 빌드 없이 NAS 레지스트리 이미지(`docker.owen.kr/ever-blog:0.3.0`)를 받아 실행하고, 포스트·이미지 폴더는 프로젝트 폴더 기준 상대 경로를 기본값으로 씁니다. README 배포 절을 이 절차로 바꿨습니다. 기존 `docker-compose-example.yaml`(로컬 빌드용)은 그대로입니다.
- 🔨 `bun run check:content`를 추가했습니다. 저장소 파일의 홈 절대경로, 로컬 계정 이름, 토큰·키·비밀번호, 내부 호스트를 찾고, 이력서 페이지의 금지 키워드를 찾으면 실패합니다. dev 머지 전에 실행합니다.
- 🔨 `bun run test`(검사 스크립트 단위 테스트)와 `bun run test:mutation`(무작위 시드 뮤테이션 검사, 결과는 `.omo/evidence/`에 저장, git 제외)을 추가했습니다.

호환성·이전 방법: 화면과 API 변경은 없습니다. NAS에서는 Container Manager 프로젝트의 이미지 태그를 `0.3.0`으로 바꾸고 이미지를 다시 받습니다.

검증: 이 릴리스는 사용자 허가로 CI 대신 로컬 검사를 썼습니다. `bun run test`(11 pass), `bun run check:content`, `bun run lint`, `tsc --noEmit`, `bun run build`, `docker compose -f docker-compose.nas.yaml config`가 통과했습니다.

알려진 문제: 없음. `bun run lint`에 기존 경고 1건(`src/app/api/images/[...path]/route.ts` 미사용 변수)이 남아 있습니다.
