# 설치와 React 사용

## 로컬 설치

디자인 시스템 저장소에서 `npm run pack`을 실행합니다. 소비 프로젝트에 세 파일을 복사하고 설치합니다.

```bash
npm install ./h_designsystem-tokens-0.2.0.tgz ./h_designsystem-foundation-0.2.0.tgz ./h_designsystem-ui-0.2.0.tgz
```

Tokens만 필요하면 Tokens만, Foundation은 Tokens와 함께 설치합니다. 레지스트리 배포 전에는 UI `.tgz` 하나가 옆의 다른 파일을 자동으로 찾지 않습니다. 설치는 node_modules에 파일을 넣으며 원래 디자인 시스템 폴더를 연결하지 않습니다.

## 시작점과 컴포넌트

```tsx
// main.tsx
import '@h_designsystem/ui/styles.css';
import './design-system.config'; // 화면별 옵션을 사용할 때만 필요
```

```tsx
import { useState, useRef } from 'react';
import { Button, Field, TextInput } from '@h_designsystem/ui';
import type { HTextInput } from '@h_designsystem/ui/elements';
import search from '@h_designsystem/foundation/icons/icon_search_medium_2.svg';

export function Example() {
  const [value, setValue] = useState('');
  const ref = useRef<HTextInput>(null);
  return <>
    <Field label="이름" description="이름을 입력하세요.">
      <TextInput ref={ref} name="name" value={value}
        onInput={event => setValue(event.currentTarget.value)} />
    </Field>
    <Button icon={<img src={search} alt="" />}>검색</Button>
  </>;
}
```

React 19를 사용합니다. ref와 이벤트 currentTarget은 웹 컴포넌트입니다. `value`, `checked`, `focus()`를 사용하고 내부 네이티브 요소는 읽기 전용 접근자 `control`로 가져옵니다. React SyntheticEvent가 아닌 네이티브 이벤트입니다. 입력은 onInput, 변경 확정은 onChange이며 체크박스·라디오는 onChange에서 currentTarget.checked를 읽습니다.

제어형은 value/checked와 핸들러를 함께, 비제어형은 defaultValue/defaultChecked를 사용합니다. 외부 값 변경은 사용자 입력 이벤트를 만들지 않습니다. `form="폼ID"`로 외부 폼을 연결합니다. Button의 기본 type은 button, 제출은 submit, 초기화는 reset입니다.

```tsx
<Button size="large">고정</Button>
<Button size={{ base: 'xlarge', tablet: 'large', mobile: 'medium' }}>화면별 선택</Button>
```

[반응형 설정](responsive.md)을 참고하세요. shape는 square·rounded·full-rounded이며 각 컴포넌트에 제공되는 옵션만 사용합니다. 일반 size 기본값은 medium, Filled IconButton은 숫자 16입니다. 아이콘 버튼에는 icon과 aria-label을 제공합니다.

## 환경

UI 등록은 브라우저에서 실행합니다. SSR 프로젝트는 클라이언트 영역에서 로드해야 하며 SSR·hydration은 이번 검증 범위가 아닙니다. Tokens·Foundation CSS만 사용하면 React가 필요 없고 소비 프로젝트에 Sass 설치도 요구하지 않습니다.

Chrome·Edge·Firefox·Safari 최신·직전 주요 버전이 지원 대상이며 IE는 제외합니다. 실제 확인한 환경은 [검증 기록](verification.md)과 구분합니다.
