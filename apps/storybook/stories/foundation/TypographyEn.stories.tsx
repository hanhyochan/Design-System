import type { Meta, StoryObj } from '@storybook/react-vite';
import { Text } from '@h_designsystem/ui';
import { TypographyGallery } from './FoundationGallery';
import { textStoryArgTypes, textStoryControls, textStorySource } from '../text-story-controls';
const meta: Meta<typeof Text> = {
  title: 'Foundation/TypographyEn',
  component: Text,
  render: (args, { viewMode }) => viewMode === 'story' ? <TypographyGallery language="en" /> : <TypographyGallery language={args.language} selected={args.typography} as={args.as} children={args.children} />,
  args: {
    as: 'span',
    typography: 'body_16_400',
    language: 'en',
    children: 'Good design begins with text that is clear and easy to read.',
  },
  argTypes: textStoryArgTypes,
  parameters: { controls: textStoryControls, docs: { source: textStorySource } },
};
export default meta;
export const Playground: StoryObj<typeof Text> = {};
