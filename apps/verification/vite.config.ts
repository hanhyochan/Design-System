import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import fs from 'node:fs';
import path from 'node:path';
const browser = path.resolve(import.meta.dirname, '../../packages/ui/dist/browser');
export default defineConfig({
  optimizeDeps: { entries: ['react.html', 'vue.html', 'svelte.html', 'html.html', 'selective-react.html'] },
  plugins: [vue({ template: { compilerOptions: { isCustomElement: tag => tag.startsWith('h-') } } }), svelte(), {
    name: 'browser-distribution',
    configureServer(server) {
      // HTML/JSP 배포 검증은 Vite의 import 재작성 없이 실제 정적 HTML로 제공합니다.
      server.middlewares.use((req, res, next) => {
        if (req.url?.split('?')[0] !== '/selective.html') return next();
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.end(fs.readFileSync(path.resolve(import.meta.dirname, 'selective.html')));
      });
      server.middlewares.use('/assets/h-designsystem', (req, res, next) => {
      const name = req.url?.split('?')[0]?.slice(1);
      if (!name) return next();
      const target = path.resolve(browser, name);
      if (!target.startsWith(browser + path.sep) || !/\.(js|css)$/.test(target) || !fs.existsSync(target)) return next();
      res.setHeader('Content-Type', name.endsWith('.css') ? 'text/css' : 'application/javascript');
      res.end(fs.readFileSync(target));
    }); },
    writeBundle() {
      const out = path.resolve(import.meta.dirname, 'dist/assets/h-designsystem');
      // Windows/Node의 재귀 fs.cpSync 종료 오류를 피해 일반 파일 단위로 복사합니다.
      function copy(directory: string) {
        const destination = path.join(out, path.relative(browser, directory));
        fs.mkdirSync(destination, { recursive: true });
        for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
          const source = path.join(directory, entry.name);
          if (entry.isDirectory()) copy(source);
          else fs.copyFileSync(source, path.join(destination, entry.name));
        }
      }
      copy(browser);
      fs.copyFileSync(path.resolve(import.meta.dirname, 'selective.html'), path.resolve(import.meta.dirname, 'dist/selective.html'));
    },
  }],
  build: { rolldownOptions: { input: Object.fromEntries(['react','vue','svelte','html','selective-react'].map(name => [name,path.resolve(import.meta.dirname, name+'.html')])) } },
});
