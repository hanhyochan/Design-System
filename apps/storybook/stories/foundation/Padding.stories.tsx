import type { Meta, StoryObj } from '@storybook/react-vite';
const meta: Meta<{
  value: number;
}> = {
  title: 'Foundation/Padding',
  args: { value: 12 },
  argTypes: {
    value: { control: 'radio', options: [4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 60] },
  },
  render: ({ value }) => {
    const v = value > 0 && value % 4 === 0 ? `var(--h_designSystem-unit-${value})` : `${value}px`;
    return (
      <div
        style={{
          display: 'flex',
          gap: '16px',
          padding: v,
          border: '1px solid #777',
          borderRadius: 0,
          alignItems: 'center',
          background: '#f0f0f0',
        }}
      >
        <div style={{ width: 40, height: 40, background: '#0054d1' }} />
        <span>{value}px</span>
      </div>
    );
  },
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
