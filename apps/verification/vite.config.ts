import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import fs from 'node:fs';
import path from 'node:path';
const browser = path.resolve(import.meta.dirname, '../../packages/ui/dist/browser');
export default defineConfig({
  optimizeDeps: { entries: ['react.html', 'vue.html', 'svelte.html', 'html.html'] },
  plugins: [vue({ template: { compilerOptions: { isCustomElement: tag => tag.startsWith('h-') } } }), svelte(), {
    name: 'browser-distribution',
    configureServer(server) { server.middlewares.use('/assets/h-designsystem', (req, res, next) => {
      const name = req.url?.split('?')[0]?.slice(1);
      if (!name || !['h-designsystem.js', 'styles.css'].includes(name)) return next();
      res.setHeader('Content-Type', name.endsWith('.css') ? 'text/css' : 'application/javascript');
      res.end(fs.readFileSync(path.join(browser, name)));
    }); },
    writeBundle() { const out = path.resolve(import.meta.dirname, 'dist/assets/h-designsystem'); fs.mkdirSync(out, { recursive: true }); for (const name of ['h-designsystem.js', 'styles.css']) fs.copyFileSync(path.join(browser, name), path.join(out, name)); },
  }],
  build: { rolldownOptions: { input: Object.fromEntries(['react','vue','svelte','html'].map(name => [name,path.resolve(import.meta.dirname, name+'.html')])) } },
});
