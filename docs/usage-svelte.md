# Svelte 사용

[세 패키지를 설치](usage.md)한 뒤 Svelte 5에서 같은 웹 태그를 사용합니다.

```svelte
<script lang="ts">
  import '@h_designsystem/ui/elements/button';
  import '@h_designsystem/ui/elements/field';
  import '@h_designsystem/ui/elements/text-input';
  import '@h_designsystem/ui/styles.css';
  import './design-system.config';
  import type { HTextInput } from '@h_designsystem/ui/elements';
  let value = $state('');
  function input(event: Event) { value = (event.currentTarget as HTextInput).value; }
</script>
<h-field label="이름">
  <h-text-input {value} oninput={input}></h-text-input>
</h-field>
<h-button size={{ base: 'large', mobile: 'small' }}>확인</h-button>
```

등록 뒤 객체를 property로 전달합니다. 숫자 IconButton은 `size={16}`입니다. 체크는 onchange에서 currentTarget.checked, Tabs는 `onh-value-change`에서 event.detail.value를 읽습니다. 아이콘은 SVG import 후 `<img slot="icon" src={searchIcon} alt="" />`로 전달합니다. SSR은 클라이언트 전용 영역에서 등록합니다.

위 예시는 사용하는 태그만 등록합니다. `import '@h_designsystem/ui/elements'`도 계속 지원하지만 전체 컴포넌트를 포함합니다. `import type`은 실행 코드와 등록을 추가하지 않습니다.
