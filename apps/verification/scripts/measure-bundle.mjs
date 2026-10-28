import { build } from 'vite';
import { gzipSync } from 'node:zlib';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';

// React 자체는 외부 처리하고 라이브러리 + Lit + 공개 styles.css를 같은 조건으로 측정합니다.
const fixtures = {
  button: "import { Button } from '@h_designsystem/ui'; console.log(Button);",
  all: "import * as UI from '@h_designsystem/ui'; console.log(UI);",
  'element-button': "import '@h_designsystem/ui/elements/button';",
};
const report = {};
for (const [name, source] of Object.entries(fixtures)) {
  const result = await build({
    configFile: false, logLevel: 'error',
    plugins: [{ name: 'bundle-measurement',
      resolveId(id) { if (id === 'virtual:measurement') return '\0virtual:measurement'; },
      load(id) { if (id === '\0virtual:measurement') return `${source}\nimport '@h_designsystem/ui/styles.css';`; },
    }],
    build: { write: false, target: 'es2022', minify: true,
      rolldownOptions: { input: 'virtual:measurement', external: [/^react(?:\/|$)/, /^react-dom(?:\/|$)/] },
    },
  });
  const output = (Array.isArray(result) ? result : [result]).flatMap(result => result.output);
  const js = output.filter(file => file.type === 'chunk').map(file => file.code).join('\n');
  report[name] = output.map(file => ({ file: file.fileName, bytes: Buffer.byteLength(file.code ?? file.source), gzip: gzipSync(file.code ?? file.source).length }));
  if (name !== 'all') {
    assert(!/h-(?:text-input|select|tabs|checkbox|toggle|radio)/.test(js), `${name}: 미사용 컴포넌트 코드 포함`);
    assert(!js.includes('.h_designSystem-Select[data-spec'), `${name}: Select 고유 CSS 포함`);
  }
}

// 번들러 없는 HTML/JSP: 선택한 진입점에서 실제 import되는 파일만 합산합니다.
const browser = path.resolve('../../packages/ui/dist/browser');
const files = new Set(['styles.css']);
function visit(name) {
  if (files.has(name)) return;
  files.add(name);
  const source = readFileSync(path.join(browser, name), 'utf8');
  for (const match of source.matchAll(/(?:from\s*|import\s*)["'](\.[^"']+\.js)["']/g)) {
    visit(path.posix.join(path.posix.dirname(name), match[1]));
  }
}
visit('elements/button.js');
report['browser-button'] = [...files].map(file => {
  const content = readFileSync(path.join(browser, file));
  return { file, bytes: content.length, gzip: gzipSync(content).length };
});
report['browser-all'] = ['h-designsystem.js', 'styles.css'].map(file => {
  const content = readFileSync(path.join(browser, file));
  return { file, bytes: content.length, gzip: gzipSync(content).length };
});
mkdirSync('results/selective-loading', { recursive: true });
writeFileSync('results/selective-loading/bundle-sizes.json', JSON.stringify(report, null, 2), 'utf8');
for (const [name, files] of Object.entries(report)) {
  console.log(`${name}: ${files.reduce((total, file) => total + file.gzip, 0)} bytes gzip (${files.length} files)`);
}
