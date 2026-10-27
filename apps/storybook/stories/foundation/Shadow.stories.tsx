import type { Meta, StoryObj } from '@storybook/react-vite';
import { FoundationGallery, galleryShadows } from './FoundationGallery';
const shadows = galleryShadows;
const meta: Meta<{
  shadow: string;
}> = {
  title: 'Foundation/Shadow',
  args: { shadow: shadows[0] ?? '0 1px 2px rgba(0,0,0,.05)' },
  argTypes: { shadow: { control: 'radio', options: shadows } },
  render: ({ shadow }, { viewMode }) => <FoundationGallery kind="Shadow" selected={viewMode === 'docs' ? shadow : undefined} />,
  parameters: {
    docs: {
      source: {
        transform: (
          _s: string,
          c: {
            args: {
              shadow: string;
            };
          },
        ) => `box-shadow: ${c.args.shadow};`,
      },
    },
  },
};
export default meta;
export const Playground: StoryObj = {};
