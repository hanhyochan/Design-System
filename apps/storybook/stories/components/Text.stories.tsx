import type { Meta, StoryObj } from '@storybook/react-vite';
import { Text } from '@h_designsystem/ui';
import { typographyNames } from '../../../../packages/ui/src/components/spec';
const meta = {
  title: '컴포넌트/Text',
  component: Text,
  args: {
    as: 'span',
    typography: 'body_16_400',
    language: 'ko',
    children: '좋은 디자인은 읽기 쉬운 글자에서 시작됩니다.',
  },
  argTypes: {
    as: { control: 'radio', options: ['span', 'p', 'h1', 'h2', 'h3', 'label'] },
    typography: { control: 'select', options: typographyNames },
    language: { control: 'radio', options: ['ko', 'en'] },
    children: { control: 'text' },
  },
  parameters: { docs: { source: { type: 'dynamic' } } },
} satisfies Meta<typeof Text>;
export default meta;
export const Playground: StoryObj<typeof meta> = {};
