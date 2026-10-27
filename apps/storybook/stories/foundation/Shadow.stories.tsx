import type { Meta, StoryObj } from '@storybook/react-vite';
const shadows = [
  '0 8px 14px rgba(34, 34, 34, 0.18)',
  '8px 8px 20px rgb(33 34 37 / 0.2)',
  '0 0 2px 0 rgba(0, 0, 0, 0.08), 0 16px 24px 0 rgba(0, 0, 0, 0.12)',
  '0 24px 24px -4px rgba(34, 34, 34, 0.18)',
  '0 24px 40px rgba(0, 0, 0, 0.1)',
];
const meta: Meta<{
  shadow: string;
}> = {
  title: 'Foundation/Shadow',
  args: { shadow: shadows[0] ?? '0 1px 2px rgba(0,0,0,.05)' },
  argTypes: { shadow: { control: 'radio', options: shadows } },
  render: ({ shadow }) => <div style={{ padding: 32, boxShadow: shadow }}>그림자 예시</div>,
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
