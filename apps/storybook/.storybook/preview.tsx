import type { Preview } from '@storybook/react-vite';
import '@h_designsystem/foundation/styles.css';
import './controls.css';
const preview: Preview = {
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: { expanded: false },
    options: {
      storySort: {
        order: [
          'Foundation',
          ['ColorAtomic', 'ColorSemantic', 'TypographyKo', 'TypographyEn', 'Padding', 'BorderRadius', 'BorderWidth', 'Shadow', 'Gap', 'Icons', 'Units'],
          '컴포넌트',
          ['Button', 'IconButton', 'TextButton', 'Tab', 'TextInput', 'UnderlineTextInput', 'TextArea', 'AutoHeightTextArea', 'Select', 'Chip', 'ContentTag', 'Hashtag', 'Badge', 'Toggle', 'Checkbox', 'Radio', 'Pagination', 'Text', 'Field'],
        ],
      },
    },
    docs: { codePanel: true, source: { type: 'dynamic' } },
    a11y: { test: 'todo' },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          fontFamily: 'Arial, "Malgun Gothic", sans-serif',
          display: 'flex',
          flexDirection: 'column',
          gap: 24,
          padding: 16,
          minWidth: 0,
        }}
      >
        <Story />
      </div>
    ),
  ],
};
export default preview;
