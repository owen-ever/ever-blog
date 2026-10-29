# Changelog

다음 릴리스에 넣을 버그와 개선 예정 항목은 [패치 예정 노트](docs/patch-notes-next.md)에 있습니다.

## Unreleased

- 📝 `/resume` 이력서 내용을 2026-10 기준으로 바꿨습니다. 직위를 AI Engineer로 바꾸고, Summary·Core Competencies·Side Projects·Education·Certification·Awards 절을 추가했습니다. 프리랜스 (주)한화 ESG 공시지원시스템 경력을 추가하고 팀벨·플렉시스·핀테크놀러지·Branvip 경력 내용을 정리했습니다. 화면 디자인과 기존 컴포넌트 구성은 그대로입니다. 호환성 영향은 없습니다.
- 🔨 `bun run check:content`를 추가했습니다. 저장소 파일의 홈 절대경로, 로컬 계정 이름, 토큰·키·비밀번호, 내부 호스트를 찾고, 이력서 페이지의 금지 키워드를 찾으면 실패합니다. dev 머지 전에 실행합니다.
- 🔨 `bun run test`(검사 스크립트 단위 테스트)와 `bun run test:mutation`(무작위 시드 뮤테이션 검사, 결과는 `.omo/evidence/`에 저장, git 제외)을 추가했습니다.
