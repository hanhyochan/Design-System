import type { Meta, StoryObj } from '@storybook/react-vite';
import { Field, TextInput } from '@h_designsystem/ui';
const meta = {
  title: '컴포넌트/Field',
  component: Field,
  args: {
    htmlFor: 'field-example',
    label: '이메일',
    description: '연락받을 이메일을 입력해 주세요.',
    error: '',
    messageColor: 'blue',
  },
  argTypes: {
    messageColor: {
      name: '문구 색상',
      control: { type: 'radio', labels: { red: '빨강', green: '초록', blue: '파랑' } },
      options: ['red', 'green', 'blue'],
    },
  },
  render: (args) => (
    <Field {...args}>
      <TextInput type="email" />
    </Field>
  ),
  parameters: { docs: { source: { type: 'dynamic', transform: (_source: string, context: {args: {htmlFor?: string;label?: string;description?: string;error?: string;messageColor?: string}}) => {
    const props = Object.entries(context.args).filter(([key,value]) => ['htmlFor','label','description','error','messageColor'].includes(key) && value).map(([key,value]) => `${key}=${JSON.stringify(value)}`).join(' ');
    return `import '@h_designsystem/ui/styles.css';\nimport { Field, TextInput } from '@h_designsystem/ui';\n\n<Field ${props}>\n  <TextInput type="email" />\n</Field>`;
  } } } },
} satisfies Meta<typeof Field>;
export default meta;
export const Playground: StoryObj<typeof meta> = {};
