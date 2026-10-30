# Changelog

다음 릴리스 예정 항목: [패치 예정 노트](docs/patch-notes-next.md)

## Unreleased

- 개인정보 검사(`bun run check:content`)가 현재 브랜치(HEAD)와 `dev`에서 닿는 커밋 메시지, 태그, 이전 파일 버전도 검사합니다. 다른 로컬 브랜치와 다른 원격 추적 브랜치는 검사하지 않으므로, 다른 작업 브랜치의 발견이 이 작업의 dev 머지를 막지 않습니다. 탐지 패턴은 바뀌지 않았습니다. 이전 방법은 필요 없습니다.
- 뮤테이션 테스트 명령 `bun run test:mutation [시드] [개수]`를 추가했습니다. 결과는 `.omo/evidence/mutation-<시드>.json`에 남습니다.
