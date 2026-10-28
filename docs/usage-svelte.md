# Svelte 사용

[세 패키지를 설치](usage.md)한 뒤 Svelte 5에서 같은 웹 태그를 사용합니다.

```svelte
<script lang="ts">
  import '@h_designsystem/ui/elements';
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
