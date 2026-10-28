import { defineConfig } from 'vite';
import { readFileSync } from 'node:fs';

// 단독 복사하는 브라우저 JS에도 포함된 Lit 실행 의존성의 고지를 보존합니다.
const licenses = ['lit', 'lit-html', 'lit-element', '@lit/reactive-element', '@lit/context']
  .map(name => `${name}\n${readFileSync(new URL(`../../node_modules/${name}/LICENSE`, import.meta.url), 'utf8')}`)
  .join('\n\n');

// HTML/JSP는 이 폴더만 복사합니다. React 연결 파일은 진입점에 포함하지 않습니다.
export default defineConfig({
  build: {
    target: 'es2022', outDir: 'dist/browser', emptyOutDir: false, cssCodeSplit: false,
    lib: { entry: 'src/browser.ts', formats: ['es'], fileName: () => 'h-designsystem.js', cssFileName: 'styles' },
    rolldownOptions: { output: { codeSplitting: false, banner: `/*! @license\n${licenses}\n*/` } },
  },
});
