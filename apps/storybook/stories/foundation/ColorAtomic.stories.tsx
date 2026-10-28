import sourceCss from '../../../../packages/tokens/src/color/atomic.css?raw';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ColorPalette, colorTokenNames, createAtomicPalette } from './ColorPalette';
import aliasCss from '../../../../packages/tokens/src/color/aliases.css?raw';
const names = colorTokenNames(sourceCss, aliasCss);
const palette = createAtomicPalette(names);
const meta: Meta<{
  token: string;
}> = {
  title: 'Foundation/ColorAtomic',
  args: { token: names[0] },
  argTypes: { token: { control: 'select', options: names } },
  render: ({ token }, { viewMode }) => <ColorPalette groups={palette} kind="atomic" selected={viewMode === 'docs' ? token : undefined} />,
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
