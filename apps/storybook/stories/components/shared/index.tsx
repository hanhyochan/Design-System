import type { Meta, StoryObj } from '@storybook/react-vite';
import { catalog, sizeOptions, stateLabels, fieldFamilies } from './catalog';
import { Demo, type Args } from './preview';
import { usage } from './source';
import { ComponentGallery } from './gallery';

// Docs 옵션과 Playground 연결만 담당합니다.
export function createStory(family: string) {
  const groups = catalog.filter((g) => g.family === family);
  const states = [...new Set(groups.flatMap((g) => g.variants.map((v) => v.state)))];
  const isInput = fieldFamilies.includes(family);
  const args: Args = {
    responsive: false, baseSize: 'unset', mobileSize: 'unset', tabletSize: 'unset', desktopSize: 'unset', codeEnvironment: 'React',
    baseIconSize: 'unset', mobileIconSize: 'unset', tabletIconSize: 'unset', desktopIconSize: 'unset',
    kind: groups[0].key,
    size: 'medium',
    iconSize: 16,
    state: states[0],
    text: family === 'Hashtag' ? '#디자인시스템' : isInput ? '내용을 입력해 주세요' : '컴포넌트',
    withField: false,
    message: 'description',
    description: '입력 내용을 확인해 주세요.',
    error: '필수 항목을 입력해 주세요.',
    messageColor: 'blue',
  };
  const meta: Meta<Args> = {
    title: `컴포넌트/${family}`,
    args,
    render: (a, { viewMode }) => viewMode === 'docs' ? <Demo args={a} /> : <ComponentGallery family={family} defaults={{...args, codeEnvironment:a.codeEnvironment}} fieldsOnly={a.withField} />,
    argTypes: {
      codeEnvironment: { name: '사용 코드 환경', control: 'inline-radio', options: ['React','Vue','Svelte','HTML','JSP'] },
      responsive: { name: '반응형', control: 'boolean' },
      ...Object.fromEntries(['base', 'mobile', 'tablet', 'desktop'].map(key => [key+'Size', { name: family === 'IconButton' ? `${key} (반응형)` : key, control: { type: 'select', labels: { unset: '미지정' } }, options: ['unset', ...sizeOptions], if: family === 'IconButton' ? { arg: 'kind', neq: 'btn_icon_filled' } : { arg: 'responsive' } }])),
      ...Object.fromEntries(['base', 'mobile', 'tablet', 'desktop'].map(key => [key+'IconSize', { name: `${key} (반응형 px)`, control: { type: 'select', labels: { unset: '미지정' } }, options: ['unset','8','12','16','20','24','28','32','40'], ...(family === 'IconButton' ? { if: { arg: 'kind', eq: 'btn_icon_filled' } } : { table: { disable: true } }) }])),
      kind: {
        name: '종류',
        control: {
          type: 'radio',
          labels: Object.fromEntries(groups.map((g) => [g.key, g.title])),
        },
        options: groups.map((g) => g.key),
      },
      size: {
        name: '크기',
        control: 'radio',
        options: sizeOptions,
        ...(family === 'IconButton' ? { if: { arg: 'kind', neq: 'btn_icon_filled' } } : {}),
      },
      iconSize: {
        name: '아이콘 외곽 크기',
        control: 'radio',
        options: [8, 12, 16, 20, 24, 28, 32, 40],
        ...(family === 'IconButton'
          ? { if: { arg: 'kind', eq: 'btn_icon_filled' } }
          : { table: { disable: true } }),
      },
      state: {
        name: isInput ? '컴포넌트 상태' : '상태',
        control: {
          type: 'radio',
          labels: stateLabels,
        },
        options: states,
      },
      text: { name: '내용', control: 'text' },
      withField: { name: 'Field 조합', control: 'boolean', table: { disable: !isInput } },
      message: {
        name: '상태',
        control: { type: 'radio', labels: { none: '없음', description: '안내', error: '오류' } },
        options: ['none', 'description', 'error'],
        if: { arg: 'withField' },
      },
      messageColor: {
        name: '문구 색상',
        control: { type: 'radio', labels: { red: '빨강', green: '초록', blue: '파랑' } },
        options: ['red', 'green', 'blue'],
        if: { arg: 'withField' },
      },
      description: { name: '안내 문구', control: 'text', if: { arg: 'withField' } },
      error: { name: '오류 문구', control: 'text', if: { arg: 'withField' } },
    },
    parameters: {
      docs: {
        source: {
          type: 'dynamic',
          transform: (
            _source: string,
            context: {
              args: Args;
            },
          ) => usage(context.args),
        },
      },
    },
  };
  const example: StoryObj<Args> = { name: '전체 종류·크기·상태' };
  const field: StoryObj<Args> = { name: 'Field 안내·오류 조합', args: { withField: true } };
  return { meta, example, field };
}

