# 0.2.0 웹 컴포넌트 전환 검증

확인일: 2026-10-28. 실제 서비스 프로젝트는 수정하거나 설치하지 않았습니다. 로컬 패키지를 별도 임시 프로젝트에 설치해 확인했습니다.

## 빌드와 설치

| 항목 | 결과 |
|---|---|
| UI·Storybook TypeScript | 통과 |
| Foundation 3종 CSS·UI npm 모듈·타입·브라우저 JS/CSS | 빌드 통과 |
| 정적 Storybook | 빌드 통과 |
| 세 .tgz 별도 설치 | 통과. 저장소 소스 alias 없이 설치된 package exports 사용 |
| 설치된 패키지의 React·Vue·Svelte·HTML | 프로덕션 빌드·실행 통과 |
| React 소비 프로젝트 타입 | 통과 |
| JSP 컨텍스트 경로 | /context 경로로 출력된 HTML과 JS·CSS 연결 확인. 실제 JSP 서버 배포 검증은 아님 |

최초 전환 검증 당시 설치 파일은 Tokens 2,594바이트, Foundation 198,051바이트, UI 55,750바이트였습니다. 모두 0.2.0이며 UI→Foundation→Tokens 의존 버전도 일치했습니다. 브라우저 파일의 설치본과 빌드본이 일치하는지 확인했습니다. 이후 최적화 결과는 문서 하단에 별도로 기록합니다.

## 외형

- 기존 보관본과 **일반 748개 + Field 192개 = 940개 조합** 비교 통과.
- 높이·최소 높이·너비·상하좌우 패딩·테두리 두께·반경·글자 크기·굵기·행간·gap·글자색·배경색의 계산값을 비교했습니다.
- Field 계획서의 144개보다 넓게 현재 카탈로그의 입력 조합 192개를 확인했습니다.
- Field의 직접 flex 자식이 Shadow 내부가 되면서 min-height 계산값이 auto에서 0px로 변한 경우는 실제 요소 높이가 동일할 때만 동등하게 처리했습니다.
- 타이포그래피 39개를 국문·영문으로 각각 확인한 78개 조합에서 크기·굵기·행간·자간이 일치했습니다.
- Button Playground와 TextInput Docs 화면을 직접 확인했습니다. 이 비교는 모든 픽셀·모든 운영체제 폰트의 동일성을 보증하는 검사는 아닙니다.

## 동작

설치된 .tgz에서 **15개 검사 × Chromium·Firefox·WebKit = 45개 통과**. 비교용 보관본이 필요한 외형 검사 3개는 해당 실행에서 명시적으로 건너뛰고 별도의 Chromium 비교에서 통과했습니다.

검사 내용:

- React·Vue·Svelte·HTML의 화면별 크기, 768/992 경계 전후, 768.5/992.5 소수 너비
- 고정값·생략 기본값·base 생략·화면 키 생략·설정 누락·설정 변경·잘못된 기준값
- 화면 너비 변경 중 입력값과 포커스 유지
- React 제어형/비제어형 입력·체크, 한글 문자열 입력
- Field 라벨 클릭·접근 가능한 이름과 설명·오류·기존 설명 병합·문구 없는 빈 공간 제거
- Field 왼쪽 정렬·16px gap·상태 문구와 배경/글자색 커스터마이징의 분리
- 비밀번호 표시·내용에 따른 자동 높이
- FormData·required·submit name/value·reset·외부 form·fieldset disabled
- submit 클릭 취소·Enter 제출·Radio 사용자 지정 검증
- 같은 form/name 라디오 그룹·다른 form 독립성·키보드 이동
- Select 옵션/그룹 추가와 변경
- Tabs 방향키·Home/End·비활성 제외·패널 연결·세로 방향
- Filled IconButton 기본 16, Chip·Badge small 높이 32

마지막 Select 보완 후에는 선택 옵션 삭제 시 값 복원과 존재하지 않는 선택값의 제출 제외를 추가하고, **폼 관련 9개 검사(3개 엔진)를 다시 통과**했습니다.

## Storybook와 복사 코드

- 32개 Playground를 열어 런타임 오류가 없음을 확인했습니다.
- 실제 Viewport 도구로 미리보기 너비를 768px로 바꿨을 때 고정 열은 small·medium·large·xlarge를 유지하고 반응형 열만 medium으로 선택됨을 확인했습니다.
- React·Vue·Svelte 예제는 환경당 370개, 총 1,110개 생성 코드를 각각 컴파일해 구문 오류가 없음을 확인했습니다.
- 그중 버튼·숫자 IconButton·Field 오류 입력·Select·Tabs·Checkbox의 대표 코드 6개씩을 설치 프로젝트에 넣어 프로덕션 빌드와 실행을 확인했습니다.
- HTML과 JSP 출력 예제는 브라우저 배포 JS/CSS로 실행했습니다.
- 아이콘 갤러리의 개별 다운로드 링크 394개를 확인했습니다.
- Docs는 선택 견본, Playground는 전체 견본이며 Text·Field 중복 메뉴를 추가하지 않았습니다.

## SVG·배포물

- SVG 394개 전체의 SHA-256이 전환 전 보관본과 동일합니다.
- Foundation .tgz에 SVG 394개를 포함합니다.
- 브라우저 JS의 빌드 모듈 목록에 React·ReactDOM·Vue·Svelte가 없습니다.
- 브라우저 JS에는 필수 SVG 4개를 데이터 URI로 포함합니다.
- 추가 검색 SVG 하나를 사용하는 소비 화면의 번들에는 고유 SVG 데이터 URI 5개가 있습니다. 전체 394개를 넣지 않았습니다.
- 브라우저 JS에 포함된 Lit 실행 의존성의 라이선스 고지를 보존합니다.
- 설치 파일에는 Storybook·검증 앱·테스트·legacy·SCSS 개발 원본이 포함되지 않습니다.
- 원본 .history 및 .codex-snapshots의 기존 변경과 사용자 삭제를 보존했습니다. Git push·공개 npm 배포는 실행하지 않았습니다.

## 확인하지 않은 환경

자동화 WebKit은 실제 Safari가 아닙니다. 실제 Safari·Edge·각 브라우저 직전 주요 버전·실기기 모바일·스크린리더·운영체제 한글 IME 조합 입력·실제 JSP 서버 배포·SSR/hydration은 이번 작업에서 통과로 표시하지 않습니다. 실제 서비스 도입 시 해당 프로젝트에서 확인해야 합니다.

## Storybook 개발 서버 재검증

2026-10-28 사용자 오류를 실제 6006 서버에서 재현했습니다. 기존 프로세스는 localhost와 127.0.0.1 모두 preview.tsx에 404를 반환했고, 동일 설정으로 서버를 재시작한 뒤 두 주소에서 200으로 정상화됐습니다. 비-localhost에서 출력되는 호스트 경고는 미리보기 모듈의 일반 로딩 실패에도 나타나는 메시지이므로, 해당 문구만으로 보안 설정이 원인이라고 판단하지 않았습니다.

- 실행 명령에 --host 127.0.0.1, --port 6006, --exact-port를 명시했습니다.
- 두 주소 각각 Docs 27개·Playground/Field 32개, 총 59개 화면의 렌더와 콘솔·네트워크 오류 없음 확인.
- 실제 Viewport 도구에서 768px로 바꾸면 고정 열은 유지하고 반응형 열만 medium 적용 확인.
- 21개 컴포넌트 전시 화면을 1440·1024·992·900·768·375px에서 검사해 셀 밖으로 견본이 침범하지 않음 확인.
- 표를 내용에 맞춰 배치하고 기존 좌우 16px 토큰 여백은 유지했습니다. 너비가 부족하면 표 안에서 가로 스크롤합니다. 타이포그래피 표의 별도 열 구성과 실제 컴포넌트 크기는 유지했습니다.
- TypeScript와 정적 Storybook 빌드 통과. 이번 수정은 Storybook 실행·전시와 검증 코드이며 UI 배포 규격은 변경하지 않았습니다.

회귀 검사: `npm run check-storybook --workspace=@h_designsystem/verification`. 이 검사는 별도 Playwright 설정에서 실제 6006 서버를 사용합니다.

## 다시 확인하기

```bash
npm run typecheck
npm run build
npm run build-storybook
npm run check --workspace=@h_designsystem/verification
npm run pack
```

개발 검증 앱은 공개 빌드 결과를 사용하므로 UI 수정 후 먼저 build합니다. 이전 보관본 비교는 H_DESIGNSYSTEM_BASELINE 환경 변수와 verification의 vite.appearance.config.ts 서버가 필요합니다. 일반 설치 패키지에는 비교 자료가 들어가지 않습니다.

검사 결과 JSON·스크린샷은 로컬 apps/verification/results/에 있으며 Git 및 설치 파일에서 제외합니다.

## 패키지 최적화 검증 — 2026-10-28

Tokens·Foundation·UI의 소스 108개, 공개 진입점과 빌드 설정을 점검했습니다. 기존 미커밋 변경을 기준으로 비교했으며 컴포넌트 옵션·기본값·규격·패키지 구조는 유지했습니다.

### 변경한 부분

- 공통 요소·폼 입력은 값이 달라진 DOM 속성만 갱신합니다. Field가 계산한 접근성 이름을 지웠다가 다시 넣는 중복 처리도 제거했습니다.
- Field는 라벨·설명·오류 여부가 바뀔 때, Tabs는 선택값이 바뀔 때 자식에 알립니다.
- Radio는 한 그룹을 갱신할 때 이미 조회·정렬한 목록을 재사용합니다. 폼·name·문서 경계와 선택 규칙은 유지합니다.
- AutoHeightTextArea는 브라우저가 `field-sizing`을 지원하면 ResizeObserver를 만들지 않습니다. JS 보완 경로는 입력 후 측정을 중복하지 않고, 너비 변경 측정은 다음 프레임으로 보내 ResizeObserver 순환 경고를 방지합니다. 분리 시 구독·예약 프레임을 해제하고 재연결 시 다시 관찰합니다.
- React 연결 파일 13개의 빈 `& {}` 타입을 제거했습니다.
- TextInput·TextButton·Chip 선택 상태의 중복 CSS 블록을 합쳤습니다. 배포용 Foundation CSS만 압축하고 원본은 읽기 쉽게 유지합니다.

이미 공통화된 크기 Map·단순 Mixin·상태 스타일·공용 Lit 스타일 객체·화면 구간 감지는 유지했습니다. 컴포넌트 생성기나 새로운 공통 계층, 실행 의존성을 추가하지 않았습니다.

### 결과와 한계

| 항목 | 이번 결과 |
|---|---|
| 타입·패키지 빌드 | 통과 |
| 정적 Storybook | 빌드 통과 |
| React·Vue·Svelte·HTML 검증 앱 | 공개 빌드 결과를 사용해 프로덕션 빌드 통과. 이 Windows 환경에서는 `--emptyOutDir=false` 사용 |
| Chromium·Firefox·WebKit | 20개 검사 × 3개 엔진 = 60개 통과 |
| 기존 전환용 appearance 검사 | 별도 이전 보관본이 필요한 3개는 건너뜀. 이번 비교와 구분 |
| 수정 직전과 외형 비교 | 컴포넌트·Field 조합·국문/영문 타이포그래피 23개 전시 화면 × 1280/768px = 46개 화면의 계산된 스타일 동일 |
| 반복 갱신 | 동일 값 갱신과 Field 색상만 변경 시 관찰한 자식 속성 변경 0건. 실제 값 변경·접근성 연결·탭 전환 정상 |
| 자동 높이 | 기본/JS 보완 경로 모두 입력·줄바꿈·너비 변경·분리 후 재연결 통과. pageerror 없음 |
| SVG·토큰 | 394개 SVG와 Tokens 소스의 SHA-256이 수정 전과 동일 |
| 로컬 설치 파일 | 0.2.0 세 파일 갱신. Tokens 2,594 / Foundation 195,334 / UI 56,500바이트. 압축 내부의 대표 JS·CSS가 현재 빌드본과 일치하며 개발 앱·검사·legacy·SCSS 원본 미포함 |

Foundation `styles.css`는 **93,940 → 81,981바이트(12.7% 감소)**, gzip은 **8,325 → 6,969바이트**입니다. 브라우저 JS는 갱신 조건과 정리 코드를 추가해 **151,965 → 152,910바이트**로 소폭 증가했습니다. 따라서 전체 JS 용량이나 체감 속도가 개선됐다고 주장하지 않습니다.

외형 비교는 요소·가상 요소의 크기·패딩·반경·타이포그래피·색상·배치 계산값을 비교한 결과이며 픽셀 비교는 아닙니다. 실제 Safari·실기기·스크린리더 확인과 자동화 엔진 검증은 구분합니다. 비교 자료는 `apps/verification/results/package-optimization/`, 회귀 검사는 `apps/verification/checks/optimization.spec.ts`에 있으며 설치 패키지에 포함하지 않습니다.

검증 앱의 기본 빌드는 이 Windows/Node 환경에서 출력 폴더 정리 중 종료 코드 3221226505로 중단됐습니다. `npm run build --workspace=@h_designsystem/verification -- --emptyOutDir=false`로 정리 단계를 건너뛰면 정상 빌드됩니다. 이는 검증 앱에 사용한 명령 옵션이며 UI 패키지 빌드·사용법을 변경한 것은 아닙니다. 이번에는 다른 프로젝트에 재설치하지 않고 저장소 내부 검증 앱과 갱신된 압축 파일의 내용을 확인했습니다.
