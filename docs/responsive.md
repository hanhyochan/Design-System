# 프로젝트 화면 기준과 크기 선택

```ts
// design-system.config.ts — 앱 시작점에서 한 번 import
import { configureDesignSystem } from '@h_designsystem/ui/config';
configureDesignSystem({ breakpoints: { mobile: 768, tablet: 992 } });
```

숫자는 예시이며 프로젝트의 기준값을 사용합니다. mobile 이하, mobile 초과~tablet 이하, tablet 초과가 각각 mobile·tablet·desktop입니다. `0 <= mobile < tablet`인 유한한 숫자만 허용하며 잘못된 설정은 오류를 냅니다. CSS 변수나 Vite 설정을 자동으로 읽지 않습니다.

Tailwind처럼 **768px부터 태블릿, 1024px부터 데스크톱**인 프로젝트는 경계를 다음 구간에 포함하도록 명시합니다. 소수 너비를 임의로 빼서 맞출 필요가 없습니다.

```ts
configureDesignSystem({
  breakpoints: { mobile: 768, tablet: 1024 },
  breakpointBoundary: 'exclusive',
});
```

이 경우 mobile은 768px 미만, tablet은 768px 이상~1024px 미만, desktop은 1024px 이상입니다. `breakpointBoundary`를 생략하거나 `inclusive`로 쓰면 기존의 경계 포함 방식을 사용합니다. 이 설정은 패키지의 화면별 옵션만 제어하며 프로젝트 CSS를 변경하지 않습니다.

```tsx
<Button /> // medium
<Button size="large" /> // 모든 너비에서 large
<Button size={{ mobile: 'small' }} /> // 모바일 small, 그 외 medium
<Button size={{ base: 'large', desktop: 'xlarge' }} />
<Button size={{ base: 'xlarge', tablet: 'large', mobile: 'medium' }} />
```

선택 순서는 현재 구간 값, base, 컴포넌트 기본값입니다. 다른 구간의 값을 추측해 상속하지 않습니다. base는 너비가 아니라 생략 구간의 기본 옵션이며 선택 항목입니다. large·medium 같은 이름을 프로젝트 변수로 선언할 필요는 없습니다.

일반 기본값은 medium, Filled IconButton은 16, Text는 body_16_400입니다. 설정이 없으면 base 또는 기본값을 표시하며 Lit 개발 빌드에서는 안내합니다. 프로덕션 브라우저 파일에는 개발 경고가 없습니다.

```tsx
<Text typography={{ base: 'body_16_400', tablet: 'body_15_400', mobile: 'meta_13_400' }}>
  화면별 본문
</Text>
```

선택한 기존 규격의 높이·패딩·간격·아이콘·글자 전체를 적용합니다. `_res`, 자동 한 단계 축소, 별도 글자 축소표는 없습니다. 고정값 요소는 화면 감지를 구독하지 않습니다. 화면별 키가 있는 객체만 공통 Controller를 구독하고 연결 해제 시 구독을 해제합니다. 크기 변경은 기존 입력 요소를 유지합니다.

HTML은 `size='{"base":"large","mobile":"small"}'` 또는 등록 후 `element.size = { mobile: 'small' }`로 전달합니다. Vue는 `:size.prop="{ mobile: 'small' }"`, Svelte는 `size={{ mobile: 'small' }}`입니다. 모두 동일한 설정 함수를 사용합니다.

Storybook의 반응형 체크는 예제 선택용입니다. UI에 별도 responsive boolean은 없습니다. Playground 마지막 열도 같은 size 객체를 전달하며 Viewport로 실제 미리보기 너비를 전환합니다.
