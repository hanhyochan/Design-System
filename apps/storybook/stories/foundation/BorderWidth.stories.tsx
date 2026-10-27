import type { Meta, StoryObj } from '@storybook/react-vite';
import { FoundationGallery, foundationValues } from './FoundationGallery';
const meta: Meta<{
  value: number;
}> = {
  title: 'Foundation/BorderWidth',
  args: { value: 1 },
  argTypes: { value: { control: 'radio', options: foundationValues.BorderWidth } },
  render: ({ value }, { viewMode }) => <FoundationGallery kind="BorderWidth" selected={viewMode === 'docs' ? value : undefined} />,
  parameters: {
    docs: {
      source: {
        transform: (
          _s: string,
          c: {
            args: {
              value: number;
            };
          },
        ) =>
          c.args.value > 0 && c.args.value % 4 === 0
            ? `var(--h_designSystem-unit-${c.args.value})`
            : `${c.args.value}px`,
      },
    },
  },
};
export default meta;
export const Playground: StoryObj = {};
