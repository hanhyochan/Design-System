import type { Meta, StoryObj } from '@storybook/react-vite';
import { Text } from '@h_designsystem/ui';
import { typographyNames } from '../../../../packages/ui/src/components/spec';
const meta: Meta<typeof Text> = {
  title: 'Foundation/TypographyKo',
  component: Text,
  args: {
    typography: 'body_16_400',
    language: 'ko',
    children: '좋은 디자인은 읽기 쉬운 글자에서 시작됩니다.',
  },
  argTypes: { typography: { control: 'select', options: typographyNames } },
  parameters: { docs: { source: { type: 'dynamic' } } },
};
export default meta;
export const Playground: StoryObj<typeof Text> = {};
