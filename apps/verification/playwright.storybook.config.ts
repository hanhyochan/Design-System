import { defineConfig, devices } from '@playwright/test';
import path from 'node:path';

// 실제 npm run storybook 명령과 6006 포트를 검사합니다.
export default defineConfig({
  testDir: './checks',
  testMatch: 'storybook.spec.ts',
  timeout: 60000,
  workers: 1,
  reporter: [['list'], ['json', { outputFile: 'results/storybook-report.json' }]],
  use: { ...devices['Desktop Chrome'], screenshot: 'only-on-failure' },
  webServer: {
    command: 'npm run storybook',
    cwd: path.resolve(import.meta.dirname, '../..'),
    url: 'http://127.0.0.1:6006/index.json',
    reuseExistingServer: true,
    timeout: 60000,
    env: { BROWSER: 'none' },
  },
});
