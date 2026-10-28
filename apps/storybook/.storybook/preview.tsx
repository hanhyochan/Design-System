import type { Preview } from '@storybook/react-vite';
import '@h_designsystem/ui/styles.css';
import './design-system.config';
import './controls.css';
const preview: Preview = {
  tags: ['autodocs'],
  parameters: {
    viewport: { options: { desktop: { name: '웹 1280px', styles: { width: '1280px', height: '900px' }, type: 'desktop' }, tablet: { name: '태블릿 992px', styles: { width: '992px', height: '900px' }, type: 'tablet' }, mobile: { name: '모바일 768px', styles: { width: '768px', height: '900px' }, type: 'mobile' } } },
    layout: 'padded',
    controls: { expanded: false },
    options: {
      storySort: {
        order: [
          'Foundation',
          ['ColorAtomic', 'ColorSemantic', 'TypographyKo', 'TypographyEn', 'Padding', 'BorderRadius', 'BorderWidth', 'Shadow', 'Gap', 'Icons', 'Units'],
          '컴포넌트',
          ['Button', 'IconButton', 'TextButton', 'Tab', 'TextInput', 'UnderlineTextInput', 'TextArea', 'AutoHeightTextArea', 'Select', 'Chip', 'ContentTag', 'Hashtag', 'Badge', 'Toggle', 'Checkbox', 'Radio'],
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
