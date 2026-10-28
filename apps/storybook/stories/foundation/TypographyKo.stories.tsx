import type { Meta, StoryObj } from '@storybook/react-vite';
import { TypographyGallery } from './FoundationGallery';
import { textStoryArgTypes, textStorySource, textSelection, type TextStoryArgs } from '../text-story-controls';
const meta: Meta<TextStoryArgs> = {
  title: 'Foundation/TypographyKo',
  render: (args, { viewMode }) => viewMode === 'story' ? <><TypographyGallery language="ko"/><div className="ds-responsive-description">반응형 예시는 화면 구간별로 지정한 타이포그래피를 적용합니다.</div><TypographyGallery language="ko" selected={{base:'title_20_700',tablet:'title_18_600',mobile:'body_16_400'}} /></> : <TypographyGallery language={args.language} selected={textSelection(args)} as={args.as} children={args.children} />,
  args: { as:'span',typography:'body_16_400',language:'ko',children:"좋은 디자인은 읽기 쉬운 글자에서 시작됩니다.",responsive:false,baseTypography:'unset',mobileTypography:'unset',tabletTypography:'unset',desktopTypography:'unset',codeEnvironment:'React' },
  argTypes:textStoryArgTypes,
  parameters:{docs:{source:textStorySource}},
};
export default meta;
export const Playground: StoryObj<TextStoryArgs> = {};
