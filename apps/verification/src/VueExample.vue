<script setup lang="ts">
import { ref } from 'vue';
const value = ref('처음');
const sizes = { base: 'xlarge', tablet: 'large', mobile: 'medium' };
</script>
<template>
  <main style="display:grid;gap:var(--h_designSystem-unit-16);padding:var(--h_designSystem-unit-24)">
    <h-button id="responsive" :size.prop="sizes">반응형 버튼</h-button>
    <h-field label="이름" description="이름을 입력해 주세요."><h-text-input id="controlled" :value.prop="value" @input="value = $event.target.value" /></h-field>
    <output id="value">{{value}}</output>
  </main>
</template>
