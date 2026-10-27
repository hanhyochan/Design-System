import type { Meta } from '@storybook/react-vite';
import type { Text } from '@h_designsystem/ui';
import { typographyNames } from '../../../packages/ui/src/components/spec';

// ElementType / ReactNode를 Storybook이 객체 입력란으로 추론하지 않도록 명시합니다.
export const textStoryArgTypes = {
  as: {
    name: 'HTML 태그 (as)',
    control: 'radio',
    options: ['span', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'label'],
  },
  typography: { name: '타이포그래피', control: 'select', options: typographyNames },
  language: { name: '언어', control: 'radio', options: ['ko', 'en'] },
  children: { name: '내용', control: 'text' },
} satisfies NonNullable<Meta<typeof Text>['argTypes']>;

export const textStoryControls = {
  include: Object.values(textStoryArgTypes).map((argType) => argType.name),
};

export const textStorySource = {
  type: 'dynamic' as const,
  transform: (_source: string, { args }: { args: { as?: unknown; typography?: string; language?: string; children?: unknown } }) => {
    const props = [['as', args.as], ['typography', args.typography], ['language', args.language]]
      .filter(([, value]) => typeof value === 'string')
      .map(([name, value]) => `${name}=${JSON.stringify(value)}`).join(' ');
    return `import '@h_designsystem/ui/styles.css';\nimport { Text } from '@h_designsystem/ui';\n\n<Text ${props}>{${JSON.stringify(typeof args.children === 'string' ? args.children : '텍스트')}}</Text>`;
  },
};
