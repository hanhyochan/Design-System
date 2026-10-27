import type { Meta, StoryObj } from '@storybook/react-vite';
const meta: Meta<{
  value: number;
}> = {
  title: 'Foundation/BorderWidth',
  args: { value: 1 },
  argTypes: { value: { control: 'radio', options: [0, 0.5, 1, 2, 3] } },
  render: ({ value }) => {
    const v = value > 0 && value % 4 === 0 ? `var(--h_designSystem-unit-${value})` : `${value}px`;
    return (
      <div
        style={{
          display: 'flex',
          gap: '16px',
          padding: 16,
          border: v + ' solid #171717',
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
