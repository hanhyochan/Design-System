import { defineConfig } from 'vite';
import fs from 'node:fs';
import path from 'node:path';

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
    lib: { entry: 'src/index.ts', formats: ['es'], fileName: 'index' },
    rolldownOptions: { external: [/^react(?:\/|$)/, /^react-dom(?:\/|$)/, /^@h_designsystem\//] },
  },
});
