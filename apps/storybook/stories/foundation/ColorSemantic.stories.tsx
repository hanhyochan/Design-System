import sourceCss from '../../../../packages/tokens/src/color/semantic.css?raw';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ColorPalette, colorTokenNames, createSemanticPalette } from './ColorPalette';
const names = colorTokenNames(sourceCss);
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
