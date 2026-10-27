import type { Meta, StoryObj } from '@storybook/react-vite';
import { ColorPalette, createSemanticPalette } from './ColorPalette';
const names = [
  '--h_designSystem-color-text-primary',
  '--h_designSystem-color-text-secondary',
  '--h_designSystem-color-text-tertiary',
  '--h_designSystem-color-text-disabled',
  '--h_designSystem-color-text-inverse',
  '--h_designSystem-color-focus-ring',
  '--h_designSystem-color-overlay-dimmer',
  '--h_designSystem-color-status-positive',
  '--h_designSystem-color-status-cautionary',
  '--h_designSystem-color-status-negative',
  '--h_designSystem-color-status-informative',
];
const palette = createSemanticPalette(names);
const meta: Meta<{
  token: string;
}> = {
  title: 'Foundation/ColorSemantic',
  args: { token: names[0] },
  argTypes: { token: { control: 'select', options: names } },
  render: ({ token }, { viewMode }) => <ColorPalette groups={palette} kind="semantic" selected={viewMode === 'docs' ? token : undefined} />,
  parameters: {
    docs: {
      source: {
        transform: (
          _s: string,
          c: {
            args: {
              token: string;
            };
          },
        ) => `color: var(${c.args.token});`,
      },
    },
  },
};
export default meta;
export const Playground: StoryObj = {};
