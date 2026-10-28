import { defineConfig } from 'vite';
import fs from 'node:fs';
import path from 'node:path';
const baseline = process.env.H_DESIGNSYSTEM_BASELINE;
if (!baseline) throw new Error('H_DESIGNSYSTEM_BASELINE에 전환 전 보관 폴더를 지정해 주세요.');
const id = (name: string) => path.resolve(import.meta.dirname, `.comparison-${name}`).replaceAll('\\','/');
export default defineConfig({
  optimizeDeps: { noDiscovery: true, include: ['react', 'react-dom/client', 'react/jsx-runtime', 'react/jsx-dev-runtime'] },
  server: { host:'127.0.0.1', port:6175 },
  plugins: [{
    name:'preserved-baseline',
    resolveId(source) { if(source.startsWith('baseline:')) return id(source.slice(9)); },
    load(source) {
      if(source===id('ui.js')) return fs.readFileSync(path.join(baseline!, 'packages/ui/dist/index.js'),'utf8');
      if(source===id('styles.css')) return fs.readFileSync(path.join(baseline!, 'packages/foundation/dist/styles.css'),'utf8');
      if(source===id('preview.tsx')) return fs.readFileSync(path.join(baseline!, 'apps/storybook/stories/components/shared/preview.tsx'),'utf8')
        .replaceAll("'@h_designsystem/ui'", "'baseline:ui.js'")
        .replace("'./catalog'", JSON.stringify(path.resolve(import.meta.dirname, '../storybook/stories/components/shared/catalog.ts').replaceAll('\\','/')));
    },
  }],
});
