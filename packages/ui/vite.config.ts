import { defineConfig } from 'vite';
import fs from 'node:fs';
import path from 'node:path';

// React 공개 진입점과 웹 컴포넌트 개별 등록 진입점을 함께 배포합니다.
const elements = Object.fromEntries(fs.readdirSync(new URL('./src/elements/', import.meta.url))
  .filter(name => name.endsWith('.ts'))
  .map(name => [`elements/${name.slice(0, -3)}`, `src/elements/${name}`]));

// 현재 Windows/Node 환경의 재귀 디렉터리 삭제 오류를 피하면서 이전 산출물은 제거합니다.
function cleanDirectory(directory: string) {
  if (!fs.existsSync(directory)) return;
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const target = path.join(directory, entry.name);
    if (entry.isDirectory() && !entry.isSymbolicLink()) {
      cleanDirectory(target);
      fs.rmdirSync(target);
    } else {
      fs.unlinkSync(target);
    }
  }
}

export default defineConfig({
  plugins: [
    {
      name: 'clean-ui-output',
      buildStart() {
        cleanDirectory(path.resolve(import.meta.dirname, 'dist'));
      },
    },
  ],
  build: {
    emptyOutDir: false,
    target: 'es2022',
    lib: { entry: { index: 'src/index.ts', elements: 'src/elements.ts', config: 'src/config.ts', ...elements }, formats: ['es'], fileName: (_format, name) => `${name}.js` },
    rolldownOptions: { external: [/^react(?:\/|$)/, /^react-dom(?:\/|$)/, /^lit(?:\/|$)/, /^lit-html(?:\/|$)/, /^lit-element(?:\/|$)/, /^@lit\//] },
  },
});
