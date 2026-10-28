import type { StorybookConfig } from '@storybook/react-vite';
import path from 'node:path';
const config: StorybookConfig = {
  stories: ['../stories/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-docs', '@storybook/addon-a11y'],
  framework: '@storybook/react-vite',
  core: { disableTelemetry: true },
  async viteFinal(config) {
    config.resolve ??= {};
    config.resolve.alias = [
      { find: /^@h_designsystem\/ui$/, replacement: path.resolve(import.meta.dirname, '../../../packages/ui/src/index.ts') },
      { find: '@h_designsystem/ui/config', replacement: path.resolve(import.meta.dirname, '../../../packages/ui/src/config.ts') },
      { find: '@h_designsystem/ui/elements', replacement: path.resolve(import.meta.dirname, '../../../packages/ui/src/elements.ts') },
      { find: '@h_designsystem/ui/styles.css', replacement: path.resolve(import.meta.dirname, '../../../packages/ui/src/styles.css') },
    ];
    return config;
  },
};
export default config;
