# 구현 검증 결과

2026-10-27, Windows / Node 24.4.1 / Chromium 환경에서 확인했습니다.

- 타입 검사, UI 패키지 빌드, Storybook 정적 빌드 성공
- 원본 70개 규격 그룹의 748개 조합 렌더링 성공
- 원본에 명시된 높이·최소 높이·반경·패딩·글자 크기·굵기 비교에서 차이 없음
- Storybook 전체 34개 예제 렌더링 및 SVG 로딩 확인
- 컴포넌트와 Field 조합 24개 예제의 Code 표시 확인, 라디오 변경 시 아이콘 사용 코드 갱신 확인
- TextInput·UnderlineTextInput·TextArea·AutoHeightTextArea·Select의 Field 오류 문구, label, aria-describedby, aria-invalid 연결 확인
- 390px 화면에서 위 입력 조합의 가로 넘침 없음
- 비밀번호 표시 버튼의 키보드 조작과 포커스 이탈, disabled·readonly 상태 확인
- 체크박스·토글·라디오의 Space 조작, 탭의 방향키·Home 및 패널 전환, 셀렉트 키보드 선택 확인
- 자동 높이 텍스트 영역의 확장·축소, 페이지네이션 전환 확인
- tgz 3개를 별도 React 19 프로젝트에 설치하고 의존성 연결 및 프로덕션 빌드 확인
- 소비 프로젝트에서 실제 오류 표시·해제, 컴포넌트 범위 색상 변경, SVG 표시, 모바일 화면 확인
- 패키지 CSS 변수의 누락 참조 없음, Foundation CSS에 직접 작성된 양수 4배수 px 없음, 새 소스에 margin 선언 없음
- 기존 파일 430개는 이동 전후 SHA-256 일치, SVG 394개도 원본과 일치
- tgz에 legacy·Storybook·테스트·스크립트·폰트 파일 미포함 확인

이는 패키지와 별도 검증 프로젝트의 결과입니다. 실제 서비스 적용과 전체 브라우저·스크린리더 검증을 완료했다는 의미는 아닙니다. 폰트는 소비 프로젝트가 제공하므로 최종 글꼴의 줄바꿈은 해당 프로젝트에서 확인합니다.

현재 Windows/Node 환경에서 Vite의 재귀 출력 폴더 정리가 프로세스 오류를 일으켜 UI의 vite.config.ts에서 해당 패키지 dist만 파일별로 정리합니다. 이 방식으로 연속 빌드와 pack을 확인했습니다.

## 상태 CSS 공통화 검증

- 기존 748개 규격과 Field 3종·Pagination 1종의 수정 전후 CSS를 동일한 DOM에서 비교했습니다. 기본, 체크·선택, hover/active, 키보드 포커스 조건에서 루트·자식·가상 요소의 색상, 테두리, 포커스 표시, 크기, 간격 등 37개 속성을 확인했습니다.
- 허용한 변화는 Filled TextInput·TextArea 오류 상태의 placeholder `red-70` 및 그 가상 요소의 currentColor 계산값뿐입니다. 그 외 비교 차이는 없었습니다.
- 입력 계열 5종에서 문구 색상 3가지, Field 16px 간격, label·aria-describedby·aria-invalid 연결을 확인했습니다.
- Storybook Docs와 Controls에서 항목명과 선택 영역의 왼쪽 시작선이 일치하며, 390px·1200px 화면의 옵션 영역에 가로 넘침이 없음을 확인했습니다. 상태 라디오의 한국어 표시, 방향키 조작, 생성 코드 갱신, v3 기준 메뉴 순서도 확인했습니다.
- 타입 검사, UI 패키지 빌드, Storybook 정적 빌드를 통과했습니다. 이 비교는 기존 규격 보존과 이번 수정 범위를 검증하며 모든 브라우저·스크린리더 동작의 검증을 의미하지 않습니다.
