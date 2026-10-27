# hyo_designSystem 사용법

## 개발

루트에서 `npm install` 후 `npm run storybook`을 실행합니다. 기본 주소는 http://localhost:6006 입니다.

`npm run typecheck`, `npm run build`, `npm run build-storybook`으로 확인합니다.

## 설치 파일 만들기

`npm run pack`은 세 패키지의 .tgz 파일을 만듭니다. 아직 레지스트리에 배포되지 않았습니다.

로컬 전체 설치:

`npm install ./h_designsystem-tokens-0.1.0.tgz ./h_designsystem-foundation-0.1.0.tgz ./h_designsystem-ui-0.1.0.tgz`

Tokens만 필요하면 Tokens 파일만 설치합니다. Foundation만 쓰면 Tokens와 Foundation 파일을 함께 설치합니다. 로컬 tgz는 옆에 놓인 다른 tgz를 자동으로 찾지 않습니다. 향후 세 패키지를 같은 레지스트리에 배포하면 UI 하나를 설치하는 명령으로 하위 의존성까지 가져올 수 있습니다.

## React

`import '@h_designsystem/ui/styles.css';`를 시작 지점에서 한 번 실행하고, `import { Button, TextInput, Field, Text } from '@h_designsystem/ui';`로 사용합니다. React 19가 필요합니다.

## HTML·JSP

Foundation CSS와 SVG를 정적 자산으로 배포해 사용할 수 있습니다. React의 동작은 포함되지 않습니다. CSS에는 컴포넌트 클래스와 data-spec 규격 ID가 필요하며 대응표는 component-map.md에 있습니다. 초기화 CSS는 별도 선택 경로 `@h_designsystem/foundation/reset.css`입니다.

## SVG

`import searchIcon from '@h_designsystem/foundation/icons/icon_search_medium_2.svg';`처럼 가져와 컴포넌트의 icon에 전달합니다. 폰트는 소비 프로젝트가 로딩합니다.
