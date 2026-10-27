import type { StorybookConfig } from '@storybook/react-vite';
import path from 'node:path';
const config: StorybookConfig = {
  stories: ['../stories/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-docs', '@storybook/addon-a11y'],
  framework: '@storybook/react-vite',
  core: { disableTelemetry: true },
  async viteFinal(config) {
    config.resolve ??= {};
    config.resolve.alias = {
      ...(config.resolve.alias as Record<string, string>),
      '@h_designsystem/ui': path.resolve(process.cwd(), '../../packages/ui/src/index.ts'),
    };
    return config;
  },
};
export default config;
