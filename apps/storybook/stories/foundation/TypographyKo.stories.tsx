import type { Meta, StoryObj } from '@storybook/react-vite';
import { Text } from '@h_designsystem/ui';
import { TypographyGallery } from './FoundationGallery';
import { textStoryArgTypes, textStoryControls, textStorySource } from '../text-story-controls';
const meta: Meta<typeof Text> = {
  title: 'Foundation/TypographyKo',
  component: Text,
  render: (args, { viewMode }) => viewMode === 'story' ? <TypographyGallery language="ko" /> : <TypographyGallery language={args.language} selected={args.typography} as={args.as} children={args.children} />,
  args: {
    as: 'span',
    typography: 'body_16_400',
    language: 'ko',
    children: '좋은 디자인은 읽기 쉬운 글자에서 시작됩니다.',
  },
  argTypes: textStoryArgTypes,
  parameters: { controls: textStoryControls, docs: { source: textStorySource } },
};
export default meta;
export const Playground: StoryObj<typeof Text> = {};
