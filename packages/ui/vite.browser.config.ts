import { defineConfig } from 'vite';
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';

// 단독 복사하는 브라우저 JS에도 포함된 Lit 실행 의존성의 고지를 보존합니다.
const licenses = ['lit', 'lit-html', 'lit-element', '@lit/reactive-element', '@lit/context']
  .map(name => `${name}\n${readFileSync(new URL(`../../node_modules/${name}/LICENSE`, import.meta.url), 'utf8')}`)
  .join('\n\n');

const elements = Object.fromEntries(readdirSync(new URL('./src/elements/', import.meta.url))
  .filter(name => name.endsWith('.ts'))
  .map(name => [`elements/${name.slice(0, -3)}`, `src/elements/${name}`]));

// 전체 단일 파일은 호환용으로 유지합니다. 개별 모드는 Lit과 공통 코드를
// chunks에 한 번 출력하며, HTML/JSP도 사용한 요소의 import 경로만 내려받습니다.
export default defineConfig(({ mode }) => ({
  plugins: [{
    name: 'browser-license',
    writeBundle() { writeFileSync(new URL('./dist/browser/LICENSE.txt', import.meta.url), licenses, 'utf8'); },
  }],
  build: {
    target: 'es2022', outDir: 'dist/browser', emptyOutDir: false, cssCodeSplit: false,
    lib: {
      entry: mode === 'elements' ? { config: 'src/config.ts', ...elements } : 'src/browser.ts',
      formats: ['es'], fileName: (_format, name) => mode === 'elements' ? `${name}.js` : 'h-designsystem.js', cssFileName: 'styles',
    },
    rolldownOptions: { output: {
      codeSplitting: mode === 'elements', chunkFileNames: 'chunks/[name]-[hash].js',
      banner: mode === 'elements'
        ? '/*! Lit: BSD-3-Clause. Copyright 2017 Google LLC. See browser/LICENSE.txt. */'
        : `/*! @license\n${licenses}\n*/`,
    } },
  },
}));
