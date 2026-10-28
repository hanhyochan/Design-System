# Vue 사용

[세 패키지를 설치](usage.md)한 뒤 웹 태그를 직접 사용합니다.

```ts
// vite.config.ts — Vue 템플릿 설정. 반응형 설정이 아닙니다.
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
export default defineConfig({ plugins: [vue({ template: { compilerOptions: {
  isCustomElement: tag => tag.startsWith('h-'),
} } })] });
```

```vue
<script setup lang="ts">
import { ref } from 'vue';
import '@h_designsystem/ui/elements';
import '@h_designsystem/ui/styles.css';
import './design-system.config';
import type { HTextInput } from '@h_designsystem/ui/elements';
const value = ref('');
const input = (event: Event) => { value.value = (event.currentTarget as HTextInput).value; };
</script>
<template>
  <h-field label="이름">
    <h-text-input :value.prop="value" @input="input"></h-text-input>
  </h-field>
  <h-button :size.prop="{ base: 'large', mobile: 'small' }">확인</h-button>
</template>
```

등록 import를 먼저 실행합니다. 객체·숫자는 .prop으로 전달하고 숫자 IconButton은 `:size.prop="16"`입니다. v-model을 가정하지 않고 value/input, checked/change를 연결합니다. Tabs는 `@h-value-change`의 event.detail.value를 읽습니다. 아이콘은 SVG import 후 `<img slot="icon" :src="searchIcon" alt="">`로 전달합니다.
