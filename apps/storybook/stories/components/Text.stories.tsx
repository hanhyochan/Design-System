import type { Meta, StoryObj } from '@storybook/react-vite';
import { Text } from '@h_designsystem/ui';
import { TypographyGallery } from '../foundation/FoundationGallery';
import { textStoryArgTypes, textStoryControls, textStorySource } from '../text-story-controls';
const meta = {
  title: '컴포넌트/Text',
  component: Text,
  render: (args, { viewMode }) => viewMode === 'story' ? <TypographyGallery /> : <Text {...args} />,
  args: {
    as: 'span',
    typography: 'body_16_400',
    language: 'ko',
    children: '좋은 디자인은 읽기 쉬운 글자에서 시작됩니다.',
  },
  argTypes: textStoryArgTypes,
  parameters: { controls: textStoryControls, docs: { source: textStorySource } },
} satisfies Meta<typeof Text>;
export default meta;
export const Playground: StoryObj<typeof meta> = {};
