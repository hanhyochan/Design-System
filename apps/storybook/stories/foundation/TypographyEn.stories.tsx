import type { Meta, StoryObj } from '@storybook/react-vite';
import { Text } from '@h_designsystem/ui';
import { typographyNames } from '../../../../packages/ui/src/components/spec';
const meta: Meta<typeof Text> = {
  title: 'Foundation/TypographyEn',
  component: Text,
  args: {
    typography: 'body_16_400',
    language: 'en',
    children: 'Good design begins with text that is clear and easy to read.',
  },
  argTypes: { typography: { control: 'select', options: typographyNames } },
  parameters: { docs: { source: { type: 'dynamic' } } },
};
export default meta;
export const Playground: StoryObj<typeof Text> = {};
