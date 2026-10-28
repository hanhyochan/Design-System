# hyo_designSystem

기존 디자인 규격을 여러 프로젝트에서 재사용하는 **Lit 기반 웹 컴포넌트 라이브러리**입니다. 버튼·입력·선택 요소의 구조와 동작을 한 번 구현하고, React·Vue·Svelte·HTML·JSP에서 같은 컴포넌트를 사용합니다.

현재 전환 버전은 **0.2.0**입니다. 로컬 설치 파일(`.tgz`)과 브라우저용 JS·CSS를 제공하며 공개 npm 배포는 하지 않았습니다.

## 패키지 구성

| 패키지 | 포함 내용 | 단독 사용 |
|---|---|---|
| `@h_designsystem/tokens` | 색상·4배수 길이 CSS 변수 | 토큰만 필요한 프로젝트 |
| `@h_designsystem/foundation` | 타이포그래피·공통/개별 CSS·SVG 394개 | Tokens와 함께 CSS·SVG 사용 |
| `@h_designsystem/ui` | Lit 컴포넌트·React 연결·화면 기준 설정·브라우저 배포 파일 | Foundation·Tokens와 함께 사용 |

UI는 Foundation에, Foundation은 Tokens에 의존합니다. 폴더만 나눈 구조가 아니라 각각 설치·버전 관리할 수 있는 세 패키지입니다. UI 사용 시 공용 스타일은 시작점에서 한 번 불러옵니다.

## 환경별 연결 방식

| 프로젝트 환경 | 연결 | 화면에서 사용 |
|---|---|---|
| React 19 | npm 설치 후 `@h_designsystem/ui` import. 공식 `@lit/react`로 연결 | `<Button>확인</Button>` |
| Vue 3 | npm 설치 후 `@h_designsystem/ui/elements` 등록. Vue에 `h-` 태그 인식 설정 | `<h-button>확인</h-button>` |
| Svelte 5 | npm 설치 후 `@h_designsystem/ui/elements` 등록 | `<h-button>확인</h-button>` |
| HTML | 빌드된 JS·CSS를 프로젝트 정적 경로에 복사하고 연결 | `<h-button>확인</h-button>` |
| JSP | HTML과 같은 파일을 정적 경로에 배포하고 컨텍스트 경로로 연결 | 서버에서 출력한 HTML의 `<h-button>` |

실제 구조·동작은 모두 동일한 Lit 구현입니다. React 파일에는 프롭스·이벤트·슬롯 연결만 있으며 Vue·Svelte·JSP용 디자인을 따로 복제하지 않습니다. 환경을 자동 판별해 사용 방식을 바꾸지도 않습니다.

컴포넌트 내부는 Shadow DOM에 표시됩니다. 프로젝트 글꼴과 CSS 변수는 상속하고, 내부 구조·스타일은 패키지가 관리합니다. 브라우저용 JS에는 Lit 실행 코드와 필수 SVG가 포함되며 React·Vue·Svelte는 포함하지 않습니다.

## 설치와 첫 사용

디자인 시스템 저장소에서 설치 파일을 만듭니다.

```bash
npm install
npm run pack
```

만들어진 세 파일을 사용할 프로젝트에 복사하고 **그 프로젝트에서** 설치합니다.

```bash
npm install ./h_designsystem-tokens-0.2.0.tgz ./h_designsystem-foundation-0.2.0.tgz ./h_designsystem-ui-0.2.0.tgz
```

로컬 UI 파일 하나만 지정해도 옆에 있는 다른 파일을 찾아 설치하는 것은 아닙니다. 토큰만 필요하면 Tokens 파일만, Foundation이 필요하면 Tokens와 Foundation 파일을 지정합니다.

### React

```tsx
// main.tsx — 공용 스타일을 한 번 연결
import '@h_designsystem/ui/styles.css';
```

```tsx
import { Button, Field, TextInput } from '@h_designsystem/ui';

export function Example() {
  return (
    <form>
      <Field label="이름" description="이름을 입력해 주세요.">
        <TextInput name="name" required />
      </Field>
      <Button type="submit" size="large">저장</Button>
    </form>
  );
}
```

일반 컴포넌트는 size 생략 시 medium입니다. Filled IconButton은 숫자 16, Text는 `body_16_400`이 기본입니다. Button의 type 기본값은 button이며 폼 제출에는 submit을 명시합니다.

### HTML·JSP

UI 빌드 결과 `packages/ui/dist/browser/`의 두 파일을 복사합니다. npm으로 설치했다면 `node_modules/@h_designsystem/ui/dist/browser/`에 있습니다.

```text
assets/
  h-designsystem/
    h-designsystem.js
    styles.css
  icons/
    추가로 사용하는 SVG만
```

```html
<link rel="stylesheet" href="./assets/h-designsystem/styles.css">
<script type="module" src="./assets/h-designsystem/h-designsystem.js"></script>

<h-field label="이름" description="이름을 입력해 주세요.">
  <h-text-input name="name" required></h-text-input>
</h-field>
<h-button size="large">저장</h-button>
```

JSP에서는 파일 URL 앞에 `${pageContext.request.contextPath}`를 붙입니다. 서버가 출력한 HTML에서 같은 웹 컴포넌트가 실행됩니다. 파일 탐색기에서 직접 여는 대신 HTTP(S) 서버로 제공합니다.

Vue·Svelte의 등록 설정, 객체 속성·이벤트 연결은 [Vue 안내](docs/usage-vue.md)와 [Svelte 안내](docs/usage-svelte.md)를 참고하세요.

### 필요한 컴포넌트만 불러오기

React는 `import { Button } from '@h_designsystem/ui'`를 그대로 사용합니다. 프로덕션 번들러가 사용하지 않은 컴포넌트와 내부 CSS를 제거할 수 있도록 구성되어 있습니다. 공용 `styles.css`는 기존처럼 한 번 불러옵니다.

Vue·Svelte에서는 사용하는 태그만 등록할 수 있습니다.

```ts
import '@h_designsystem/ui/elements/button';
import '@h_designsystem/ui/elements/field';
import '@h_designsystem/ui/elements/text-input';
import '@h_designsystem/ui/styles.css';
```

HTML·JSP도 `browser/elements/button.js`처럼 선택해서 연결할 수 있습니다. 이때 상대 import에 필요한 `chunks/`와 `LICENSE.txt`를 포함해 browser 폴더 구조를 유지합니다. 브라우저는 사용한 모듈과 그 의존 파일만 요청합니다. 기존 `h-designsystem.js`는 모든 태그를 등록하는 단일 파일 방식입니다. [HTML·JSP 선택 사용](docs/usage-html.md#필요한-태그만-연결)

npm 설치에는 전체 컴포넌트가 들어 있지만 방문자에게 보내는 번들은 사용한 import에 따라 달라집니다. React에서 JSX 없이 직접 `document.createElement('h-button')`를 호출할 경우에는 위의 개별 등록 import를 먼저 사용합니다. [CSS 빌드 구조](docs/css-structure.md#컴포넌트별-스타일-배포)

## 제공 컴포넌트

| 구분 | React 이름 |
|---|---|
| 버튼 | Button, IconButton, TextButton |
| 탭 | Tabs, TabList, Tab, TabPanel |
| 입력 | TextInput, UnderlineTextInput, TextArea, AutoHeightTextArea, Select |
| 입력 조합 | Field |
| 표시 요소 | Chip, ContentTag, Hashtag, Badge |
| 선택 요소 | Toggle, Checkbox, Radio |
| 타이포그래피 | Text |

Filled·Outline·Rounded·아이콘 유무는 별도 컴포넌트를 복제하지 않고 제공된 옵션으로 선택합니다. 모든 컴포넌트에 동일한 옵션을 강제하지 않습니다. 숫자 크기의 Filled IconButton, Checkbox의 round, UnderlineTextInput의 fluid·fixed·search·search-wide 등 기존 예외를 유지합니다.

폰트 파일·Pagination·미완성 모듈·별도 Icon 컴포넌트는 제공하지 않습니다. `Text`의 `as`는 span·p·h1 등 허용된 HTML 태그 선택이며 임의 React 컴포넌트는 받지 않습니다.

## 고정 크기와 반응형

단일 size는 화면 너비와 관계없이 고정입니다. 객체로 지정하면 **프로젝트가 정한 기준 너비**에 따라 기존 크기를 선택합니다.

```ts
// design-system.config.ts — 앱 시작점에서 한 번 import
import { configureDesignSystem } from '@h_designsystem/ui/config';

configureDesignSystem({
  breakpoints: { mobile: 768, tablet: 992 },
});
```

위 숫자는 예시입니다. mobile은 768px 이하, tablet은 768px 초과~992px 이하, desktop은 992px 초과입니다.

```tsx
<Button size="large">항상 large</Button>
<Button size={{ mobile: 'small' }}>모바일 small, 나머지 medium</Button>
<Button size={{ base: 'xlarge', tablet: 'large', mobile: 'medium' }}>
  화면별 크기 선택
</Button>
```

현재 구간의 값, base, 컴포넌트 기본값 순으로 선택합니다. base는 선택 항목이며 너비가 아니라 생략한 구간의 기본값입니다. 설정이 없으면 base 또는 기본값을 사용합니다.

크기 하나를 선택하면 높이·패딩·간격·아이콘·글자 규격 전체가 적용됩니다. 자동 한 단계 축소나 별도 `_res` 타이포그래피는 없습니다. Text도 typography에 화면별 객체를 전달합니다. HTML·JSP도 브라우저 JS에서 같은 설정 함수를 사용합니다. [상세 설정](docs/responsive.md)

## 색상과 페이지 스타일

색상을 지정하지 않으면 **패키지 기본 디자인**을 사용합니다. 프로젝트에서는 배경색·글자색만 공개 CSS 변수로 변경합니다.

```css
h-button.brand-button {
  --h_designSystem-component-bg: purple;
  --h_designSystem-component-text: white;
}

.page-actions {
  display: flex;
  gap: var(--h_designSystem-unit-16);
}
```

```tsx
<Button className="brand-button">확인</Button>
```

오류·비활성화 등 상태 표현은 유지합니다. 외부 CSS에서 Shadow DOM 내부 클래스에 직접 접근하는 방식은 사용하지 않습니다. 반경·패딩·높이는 등록된 size·shape·variant 규격을 사용합니다. 컴포넌트 내부 간격은 패키지, 페이지 간격·배치는 프로젝트가 담당합니다. [색상 안내](docs/theming.md)

## 안내·유효성 문구와 폼

```tsx
<Field label="이메일" error={errorMessage} messageColor="red">
  <TextInput type="email" name="email" />
</Field>
```

Field는 TextInput·UnderlineTextInput·TextArea·AutoHeightTextArea·Select와 조합합니다. 프로젝트가 검증 기준·시점·문구를 결정하며 Field는 표시와 접근성 연결을 맡습니다. error가 있으면 오류, 없으면 description을 표시합니다.

문구 색상은 red·green·blue이며 기본 오류는 빨강, 안내는 파랑입니다. 색상과 오류 여부는 독립입니다. 왼쪽 정렬과 16px 토큰 간격을 유지하며 문구가 없으면 빈 하단 간격을 만들지 않습니다.

입력은 FormData·reset·required·외부 form·fieldset disabled에 연결됩니다. React의 제어형 입력은 `onInput={event => setValue(event.currentTarget.value)}`, 체크박스는 onChange에서 currentTarget.checked를 읽습니다. ref와 이벤트 currentTarget은 웹 컴포넌트이며 네이티브 입력은 읽기 전용 `control` 접근자로 얻습니다. [Field·폼 안내](docs/validation.md)

## SVG

Foundation 패키지에 기존 SVG 394개를 모두 포함하지만 사이트 방문자에게 전부 다운로드시키지는 않습니다. 체크·비밀번호 눈·셀렉트 화살표 등 내부 필수 아이콘은 UI에 포함합니다.

```tsx
import search from '@h_designsystem/foundation/icons/icon_search_medium_2.svg';

<Button icon={<img src={search} alt="" />}>검색</Button>
```

Vue·Svelte도 개별 SVG를 import해 icon 슬롯에 넣습니다. HTML·JSP는 Storybook 아이콘 갤러리에서 필요한 파일만 내려받아 `<img slot="icon" ...>`으로 전달합니다. SVG 원본 이름·폴더는 유지합니다.

## Storybook과 개발 구조

```bash
npm run storybook
```

기본 주소는 http://127.0.0.1:6006 입니다. `localhost:6006`도 같은 로컬 서버로 연결됩니다. 실행 스크립트는 127.0.0.1과 6006을 명시하며, 포트가 사용 중이면 다른 포트로 옮기지 않고 종료합니다.

- Docs: 종류·크기·상태·Field·반응형 옵션으로 선택한 견본 확인
- Playground: 전체 종류·고정 크기·상태와 마지막 반응형 열 확인
- Viewport: 웹 1280px·태블릿 992px·모바일 768px 예시 너비 전환
- 사용 코드: React·Vue·Svelte·HTML·JSP 선택
- 아이콘: 전체 갤러리·개별 SVG 다운로드

Storybook도 공용 UI 패키지 진입점을 import합니다. 개발 중에는 같은 저장소의 소스에 연결하며, 컴포넌트를 복제하거나 Storybook 전용 반응형 컴포넌트를 만들지 않습니다.

SCSS/CSS 원본을 수정하면 `npm run build --workspace=@h_designsystem/foundation`으로 스타일을 다시 만듭니다. Lit 클래스의 구조·동작을 수정한 뒤에는 이미 등록된 태그가 갱신되도록 브라우저를 새로고침합니다.

```text
packages/
  tokens/src/                   색상·4배수 변수
  foundation/src/style/         타이포그래피·공통·컴포넌트별 CSS/SCSS
  foundation/src/icons/         기존 SVG
  ui/src/components/            실제 Lit .ts와 React 연결 .react.tsx
  ui/src/shared/                스타일·크기 선택·폼·이벤트 공통 처리
apps/
  storybook/                    견본과 환경별 사용 코드
  verification/                 비공개 검증 앱·검사 코드
docs/                           상세 사용법과 검증 기록
```

규격이 실제로 같은 CSS만 common에 모으고 고유 패딩·아이콘 배치 등은 각 컴포넌트 파일에 둡니다. SCSS는 크기 Map과 단순 Mixin을 사용합니다. 소비 프로젝트에 Sass 설치는 필요 없습니다. [CSS 파일별 설명](docs/css-structure.md)

| 명령 | 용도 |
|---|---|
| `npm run typecheck` | UI·Storybook TypeScript 확인 |
| `npm run build` | Foundation CSS와 UI JS·타입·브라우저 파일 생성 |
| `npm run build-storybook` | 정적 Storybook 생성 |
| `npm run check --workspace=@h_designsystem/verification` | 브라우저 동작 검사 |
| `npm run check-storybook --workspace=@h_designsystem/verification` | 실제 6006의 전체 Docs·Playground·간격·Viewport 검사 |
| `npm run pack` | 빌드 후 로컬 설치 파일 3개 생성 |

### 미리보기 로딩 오류가 생겼을 때

`/.storybook/preview.tsx`가 404인 경우 실행 중인 Storybook 터미널에서 Ctrl+C로 종료하고 `npm run storybook`을 다시 실행한 뒤 브라우저를 새로고침합니다. `127.0.0.1`에서 표시되는 호스트 안내만으로 주소 문제라고 단정하지 않습니다. 같은 파일이 localhost에서도 404인지 함께 확인합니다. 이미 6006 서버가 실행 중이면 새 서버를 중복 실행하지 않습니다.

## 업데이트와 지원 범위

원본 저장소를 수정해도 **기존 프로젝트에 설치한 버전은 자동으로 바뀌지 않습니다.** 새로운 .tgz를 재설치하거나 배포한 JS·CSS를 교체할 때 반영됩니다. 패키지 버전과 프로젝트 lockfile을 함께 관리하세요.

0.2.0은 웹 컴포넌트 전환으로 DOM·ref·이벤트가 변경되었습니다. 기존 프로젝트의 CSS나 이벤트 코드가 자동 변환되지는 않습니다. [전환 안내](docs/migration.md)를 확인하고 실제 화면·폼·키보드·모바일·프로젝트 빌드를 검증한 뒤 적용합니다.

지원 대상은 Chrome·Edge·Firefox·Safari 최신·직전 주요 버전이며 IE는 제외합니다. UI 등록은 브라우저에서 실행하고 SSR 프로젝트는 클라이언트 영역에서 로드합니다. SSR·hydration과 실제 Safari·스크린리더는 별도 검증 대상입니다. 통과한 자동화와 미확인 항목은 [검증 기록](docs/verification.md)에 구분합니다.
