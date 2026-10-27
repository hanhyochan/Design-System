# hyo_designSystem

기존 디자인 규격을 사용하는 React 19 컴포넌트와 공통 CSS 패키지입니다.

```bash
npm install
npm run storybook
```

http://localhost:6006 에서 종류·크기·상태를 선택합니다. **Code** 탭에서 현재 선택한 조합의 사용 코드를 복사합니다. 입력 계열에는 Field 안내·오류 조합도 있습니다.

## 구성

- `packages/tokens`: 색상과 4배수 단위 CSS 변수
- `packages/foundation`: 타이포그래피, 공통·컴포넌트별 CSS, 기존 SVG
- `packages/ui`: React 컴포넌트와 공개 import 진입점
- `apps/storybook`: 같은 UI 패키지를 사용하는 미리보기
- `legacy`: 기존 HTML·CSS·MD·SVG 원본 보관. 새 패키지에서 참조하지 않습니다.

UI는 Foundation을, Foundation은 Tokens를 의존성으로 선언합니다. 폰트 파일, 미완성 Module, 별도 Icon 컴포넌트는 포함하지 않습니다.

## 설치 파일

`npm run pack`으로 루트에 `.tgz` 3개를 만듭니다. 공개 배포 전이므로 다른 프로젝트에 로컬 설치할 때는 필요한 의존 패키지 파일도 함께 지정합니다.

```bash
npm install ./h_designsystem-tokens-0.1.0.tgz ./h_designsystem-foundation-0.1.0.tgz ./h_designsystem-ui-0.1.0.tgz
```

```tsx
import '@h_designsystem/ui/styles.css';
import { Button, Field, TextInput } from '@h_designsystem/ui';

<Field label="이름" description="이름을 입력해 주세요.">
  <TextInput size="medium" />
</Field>
<Button variant="filled" size="medium">확인</Button>
```

상세 사용법은 [사용 안내](docs/usage.md), [CSS 구조](docs/css-structure.md), [안내·오류 문구](docs/validation.md), [색상 변경](docs/theming.md), [기존 규격 대응표](docs/component-map.md)를 참고하세요.

검사 명령은 `npm run typecheck`, `npm run build`, `npm run build-storybook`입니다.
