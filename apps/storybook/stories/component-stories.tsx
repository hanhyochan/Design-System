import { useEffect, useId, useRef, type ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import * as UI from '@h_designsystem/ui';
import { catalog, spec, type Size, type Shape } from '../../../packages/ui/src/components/spec';
import { GalleryCode, GallerySection, GalleryTable } from './Gallery';
import searchIcon from '@h_designsystem/foundation/icons/icon_search_medium_2.svg';
type Args = {
  kind: string;
  size: Size;
  iconSize: 8 | 12 | 16 | 20 | 24 | 28 | 32 | 40;
  state: string;
  text: string;
  withField: boolean;
  message: 'none' | 'description' | 'error';
  description: string;
  error: string;
  messageColor: 'red' | 'green' | 'blue';
};
const sizeOptions = ['small', 'medium', 'large', 'xlarge'];
function settings(args: Args) {
  const group = catalog.find((g) => g.code === args.kind)!;
  const title = group.title;
  return {
    group,
    variant: title.includes('Gray Line')
      ? 'gray-line-outline'
      : title.includes('Outline')
        ? 'outline'
        : 'filled',
    shape: (title.includes('Full Rounded')
      ? 'full-rounded'
      : title.includes('Rounded')
        ? 'rounded'
        : 'square') as Shape,
    icon:
      title.includes('+icon') && group.family !== 'IconButton' ? (
        <img src={searchIcon} alt="" />
      ) : undefined,
    disabled: args.state === 'disabled',
  };
}
function Demo({ args, gallery = false }: { args: Args; gallery?: boolean }) {
  const inputId = useId();
  const area = useRef<HTMLDivElement>(null);
  const { group, variant, shape, icon, disabled } = settings(args);
  const size = args.size;
  const native = { disabled, 'aria-label': args.text };
  useEffect(() => {
    if (args.state !== 'focus') return;
    if (gallery) {
      // 여러 Focus 견본을 동시에 비교하므로 실제 키보드 포커스는 이동시키지 않습니다.
      // 새 디자인 값을 만들지 않고 패키지에 있는 Focus 규격을 표시합니다.
      const control = area.current?.querySelector<HTMLElement>('[data-spec]');
      if (control) control.dataset.spec = spec(args.kind, args.size, 'focus');
    } else {
      area.current?.querySelector<HTMLElement>('input,textarea,select,button')?.focus();
    }
  }, [args.state, args.kind, args.size, gallery]);
  let content: ReactNode;
  const key = `${args.kind}/${args.size}/${args.state}`;
  switch (group.family) {
    case 'Button':
      content = (
        <UI.Button
          variant={variant as 'filled' | 'outline'}
          shape={shape}
          size={size}
          icon={icon}
          disabled={disabled}
        >
          {args.text}
        </UI.Button>
      );
      break;
    case 'IconButton':
      content =
        group.code === 'C13' ? (
          <UI.IconButton
            variant="filled"
            size={args.iconSize}
            icon={<img src={searchIcon} alt="" />}
            {...native}
          />
        ) : (
          <UI.IconButton
            variant="outline"
            shape={shape}
            size={size}
            icon={<img src={searchIcon} alt="" />}
            {...native}
          />
        );
      break;
    case 'TextButton':
      content = (
        <UI.TextButton size={size} icon={icon}>
          {args.text}
        </UI.TextButton>
      );
      break;
    case 'Tab':
      content = (
        <UI.Tabs defaultValue="first">
          <UI.TabList aria-label="탭 예시">
            <UI.Tab
              value="first"
              size={size}
              variant={variant as 'filled' | 'outline' | 'gray-line-outline'}
              shape={shape}
              icon={icon}
              disabled={disabled}
            >
              {args.text}
            </UI.Tab>
            {!gallery && <UI.Tab
              value="second"
              size={size}
              variant={variant as 'filled' | 'outline' | 'gray-line-outline'}
              shape={shape}
              icon={icon}
            >
              두 번째 탭
            </UI.Tab>}
          </UI.TabList>
          <UI.TabPanel value="first">{!gallery && '첫 번째 내용'}</UI.TabPanel>
          {!gallery && <UI.TabPanel value="second">두 번째 내용</UI.TabPanel>}
        </UI.Tabs>
      );
      break;
    case 'TextInput':
      content = (
        <UI.TextInput
          key={key}
          id={inputId}
          size={size}
          variant={variant as 'filled' | 'outline'}
          shape={shape}
          status={
            args.state === 'complete' ? 'complete' : args.state === 'error' ? 'error' : 'default'
          }
          type={args.state === 'password' ? 'password' : 'text'}
          readOnly={args.state === 'view'}
          defaultValue={
            args.state === 'password'
              ? 'password123'
              : args.state === 'view'
                ? '읽기 전용 내용'
                : undefined
          }
          placeholder={args.text}
          {...native}
        />
      );
      break;
    case 'UnderlineTextInput':
      content = (
        <UI.UnderlineTextInput
          key={key}
          id={inputId}
          size={size}
          variant={
            args.state.replace(' ', '-') as 'responsive' | 'fixed' | 'search' | 'search-wide'
          }
          placeholder={args.text}
          {...native}
        />
      );
      break;
    case 'TextArea':
      content = (
        <UI.TextArea
          key={key}
          id={inputId}
          size={size}
          variant={variant as 'filled' | 'outline'}
          shape={shape as 'square' | 'rounded'}
          status={args.state === 'error' ? 'error' : 'default'}
          inquiry={args.state === 'inquiry'}
          readOnly={args.state === 'view'}
          defaultValue={args.state === 'view' ? '읽기 전용 내용' : undefined}
          placeholder={args.text}
          {...native}
        />
      );
      break;
    case 'AutoHeightTextArea':
      content = (
        <UI.AutoHeightTextArea id={inputId} size={size} placeholder={args.text} {...native} />
      );
      break;
    case 'Select':
      content = (
        <UI.Select
          id={inputId}
          size={size}
          variant={variant as 'filled' | 'outline'}
          shape={shape}
          icon={icon}
          {...native}
        >
          <option value="">선택해 주세요</option>
          <option value="one">첫 번째 항목</option>
          <option value="two">두 번째 항목</option>
        </UI.Select>
      );
      break;
    case 'Chip':
      content = (
        <UI.Chip
          size={size}
          variant={variant as 'filled' | 'outline'}
          disabled={disabled}
        >
          {args.text}
        </UI.Chip>
      );
      break;
    case 'ContentTag':
      content = <UI.ContentTag size={size}>{args.text}</UI.ContentTag>;
      break;
    case 'Hashtag':
      content = <UI.Hashtag size={size}>{args.text}</UI.Hashtag>;
      break;
    case 'Badge':
      content = (
        <UI.Badge size={size} variant={variant as 'filled' | 'outline'}>
          {args.text}
        </UI.Badge>
      );
      break;
    case 'Toggle':
      content = (
        <UI.Toggle key={key} size={size} defaultChecked={args.state === 'on'} {...native} />
      );
      break;
    case 'Checkbox':
      content = (
        <UI.Checkbox
          key={key}
          size={size}
          shape={group.code === 'C69' ? 'round' : 'square'}
          defaultChecked={args.state === 'checked'}
          {...native}
        />
      );
      break;
    case 'Radio':
      content = (
        <UI.Radio
          key={key}
          size={size}
          name={gallery ? inputId : 'demo-radio'}
          value="one"
          defaultChecked={args.state === 'checked'}
          {...native}
        />
      );
      break;
  }
  return (
    <div ref={area} data-gallery-family={gallery ? group.family : undefined} style={{ width: '100%', minWidth: 0 }}>
      {args.withField ? (
        <UI.Field
          htmlFor={inputId}
          label="입력 항목"
          description={args.message === 'description' ? args.description : undefined}
          error={args.message === 'error' ? args.error : undefined}
          messageColor={args.messageColor}
        >
          {content}
        </UI.Field>
      ) : (
        content
      )}
    </div>
  );
}
export function usage(args: Args) {
  const { group, variant, shape, icon, disabled } = settings(args);
  const name = group.family;
  const props: string[] = [];
  const add = (k: string, v: unknown) => {
    if (v !== undefined)
      props.push(
        typeof v === 'boolean'
          ? v
            ? k
            : ''
          : typeof v === 'number'
            ? `${k}={${v}}`
            : `${k}=${JSON.stringify(v)}`,
      );
  };
  if (['Button', 'TextInput', 'TextArea', 'Select', 'Chip', 'Badge', 'Tab'].includes(name))
    add('variant', variant);
  if (['Button', 'TextInput', 'TextArea', 'Select', 'Tab'].includes(name)) add('shape', shape);
  if (name === 'IconButton') {
    add('variant', group.code === 'C13' ? 'filled' : 'outline');
    if (group.code !== 'C13') add('shape', shape);
  }
  add('size', name === 'IconButton' && group.code === 'C13' ? args.iconSize : args.size);
  if (disabled) add('disabled', true);
  if (['TextInput', 'TextArea'].includes(name)) {
    if (['error', 'complete'].includes(args.state)) add('status', args.state);
    if (args.state === 'view') { add('readOnly', true); add('defaultValue', '읽기 전용 내용'); }
  }
  if (name === 'TextInput' && args.state === 'password') { add('type', 'password'); add('defaultValue', 'password123'); }
  if (name === 'TextArea' && args.state === 'inquiry') add('inquiry', true);
  if (name === 'UnderlineTextInput') add('variant', args.state.replace(' ', '-'));
  if (name === 'Checkbox') add('shape', group.code === 'C69' ? 'round' : 'square');
  if (['Toggle', 'Checkbox', 'Radio'].includes(name)) {
    add('aria-label', args.text);
    if (['checked', 'on'].includes(args.state)) add('defaultChecked', true);
    if (name === 'Radio') {
      add('name', 'choice');
      add('value', 'one');
    }
  }
  if (name === 'IconButton') add('aria-label', args.text);
  const hasIcon = !!icon || name === 'IconButton';
  if (hasIcon) props.push('icon={<img src={searchIcon} alt="" />}');
  const input = [
    'TextInput',
    'TextArea',
    'UnderlineTextInput',
    'AutoHeightTextArea',
    'Select',
  ].includes(name);
  if (input) {
    add('id', 'example-input');
    if (!args.withField) add('aria-label', '입력 항목');
    if (name !== 'Select') add('placeholder', args.text);
  }
  const attrs = props.filter(Boolean).join(' ');
  let element =
    (input && name !== 'Select') || ['IconButton', 'Checkbox', 'Radio', 'Toggle'].includes(name)
      ? `<${name} ${attrs} />`
      : `<${name} ${attrs}>${name === 'Select' ? '\n  <option value="">선택해 주세요</option>\n  <option value="one">첫 번째 항목</option>\n' : args.text}</${name}>`;
  let imports: string = name;
  if (name === 'Tab') {
    imports = 'Tabs, TabList, Tab, TabPanel';
    const secondAttrs = props.filter(p => p && p !== 'disabled').join(' ');
    element = `<Tabs defaultValue="first">\n  <TabList aria-label="탭 목록">\n    <Tab value="first" ${attrs}>${args.text}</Tab>\n    <Tab value="second" ${secondAttrs}>두 번째 탭</Tab>\n  </TabList>\n  <TabPanel value="first">첫 번째 내용</TabPanel>\n  <TabPanel value="second">두 번째 내용</TabPanel>\n</Tabs>`;
  }
  if (args.withField) {
    imports += ', Field';
    element = `<Field htmlFor="example-input" label="입력 항목" messageColor="${args.messageColor}"${args.message === 'description' ? ` description=${JSON.stringify(args.description)}` : args.message === 'error' ? ` error=${JSON.stringify(args.error)}` : ''}>\n  ${element.replaceAll('\n', '\n  ')}\n</Field>`;
  }
  return `import '@h_designsystem/ui/styles.css';\nimport { ${imports} } from '@h_designsystem/ui';\n${hasIcon ? "import searchIcon from '@h_designsystem/foundation/icons/icon_search_medium_2.svg';\n" : ''}\n${args.state === 'focus' ? '// 실제 포커스는 ref.current?.focus() 또는 키보드 이동으로 적용합니다.\n' : ''}${element}`;
}
export function createStory(family: string) {
  const groups = catalog.filter((g) => g.family === family);
  const states = [...new Set(groups.flatMap((g) => g.variants.map((v) => v.state)))];
  const isInput = [
    'TextInput',
    'TextArea',
    'UnderlineTextInput',
    'AutoHeightTextArea',
    'Select',
  ].includes(family);
  const args: Args = {
    kind: groups[0].code,
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
    render: (a, { viewMode }) => viewMode === 'docs' ? <Demo args={a} /> : <ComponentGallery family={family} defaults={args} fieldsOnly={a.withField} />,
    argTypes: {
      kind: {
        name: '종류',
        control: {
          type: 'radio',
          labels: Object.fromEntries(groups.map((g) => [g.code, g.title])),
        },
        options: groups.map((g) => g.code),
      },
      size: {
        name: '크기',
        control: 'radio',
        options: sizeOptions,
        ...(family === 'IconButton' ? { if: { arg: 'kind', neq: 'C13' } } : {}),
      },
      iconSize: {
        name: '아이콘 외곽 크기',
        control: 'radio',
        options: [8, 12, 16, 20, 24, 28, 32, 40],
        ...(family === 'IconButton'
          ? { if: { arg: 'kind', eq: 'C13' } }
          : { table: { disable: true } }),
      },
      state: {
        name: isInput ? '컴포넌트 상태' : '상태',
        control: {
          type: 'radio',
          labels: {
            view: 'Readonly',
            default: 'Default',
            disabled: 'Disabled',
            focus: 'Focus',
            complete: 'Complete',
            error: 'Error',
            password: 'Password',
            checked: 'Checked',
            on: 'On',
            off: 'Off',
          },
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

const sizeLabels: Record<string, string> = { small: 'Small', medium: 'Medium (Default)', large: 'Large', xlarge: 'Xlarge' };
const stateLabels: Record<string, string> = { default: 'Default', focus: 'Focus', complete: 'Complete', error: 'Error', disabled: 'Disabled', view: 'Readonly', password: 'Password', checked: 'Checked', on: 'On', off: 'Off', inquiry: 'Inquiry', responsive: 'Responsive', fixed: 'Fixed', search: 'Search', 'search wide': 'Search Wide' };
const fieldFamilies = ['TextInput', 'UnderlineTextInput', 'TextArea', 'AutoHeightTextArea', 'Select'];

function ComponentGallery({ family, defaults, fieldsOnly }: { family: string; defaults: Args; fieldsOnly: boolean }) {
  const groups = catalog.filter(group => group.family === family);
  return <div className="ds-gallery">
    {!fieldsOnly && groups.map(group => {
      const sizes = [...new Set(group.variants.map(v => v.size))];
      const states = [...new Set(group.variants.map(v => v.state))];
      const variantArgs = (size: string, state: string): Args => ({ ...defaults, kind: group.code,
        size: sizeOptions.includes(size) ? size as Size : 'medium',
        iconSize: (Number(size.replace(/[^\d]/g, '')) || 16) as Args['iconSize'], state,
      });
      return <GallerySection key={group.code} title={group.title}>
        <GalleryTable columns={['분류', ...sizes.map(size => sizeLabels[size] ?? size.replace('width ', ''))]}>
          {states.map(state => <tr key={state}><th scope="row">{stateLabels[state] ?? state}</th>
            {sizes.map(size => {
              const variant = group.variants.find(v => v.size === size && v.state === state);
              return <td key={size} data-gallery-spec={variant?.id}>
                {variant && <Demo args={variantArgs(size, state)} gallery />}
              </td>;
            })}
          </tr>)}
        </GalleryTable>
        <GalleryCode code={group.variants.map(v => `// ${v.size} · ${stateLabels[v.state] ?? v.state}\n${usage(variantArgs(v.size, v.state))}`).join('\n\n')} />
      </GallerySection>;
    })}
    {fieldFamilies.includes(family) && <FieldGallery family={family} defaults={defaults} />}
  </div>;
}

export function FieldGallery({ family, defaults }: { family?: string; defaults?: Args }) {
  const groups = catalog.filter(group => family ? group.family === family : fieldFamilies.includes(group.family));
  const base: Args = defaults ?? { kind: 'C37', size: 'medium', iconSize: 16, state: 'default', text: '내용을 입력해 주세요', withField: true, message: 'description', description: '입력 내용을 확인해 주세요.', error: '필수 항목을 입력해 주세요.', messageColor: 'blue' };
  const messages = (['description', 'error'] as const).flatMap(message => (['red', 'green', 'blue'] as const).map(messageColor => ({ message, messageColor })));
  const colorLabels = { red: '빨강', green: '초록', blue: '파랑' };
  return <div className="ds-gallery ds-gallery-field">
    {groups.flatMap(group => {
      const states = group.family === 'UnderlineTextInput' ? [...new Set(group.variants.map(v => v.state))] : [group.variants[0].state];
      return states.map(state => {
        const getArgs = (size: Size, message: Args['message'], messageColor: Args['messageColor']): Args => ({ ...base, kind: group.code, size, state, withField: true, message, messageColor });
        return <GallerySection key={`${group.code}-${state}`} title={`${group.title}${group.family === 'UnderlineTextInput' ? ` / ${stateLabels[state]}` : ''} · Field 조합`}>
          <GalleryTable columns={['상태 · 문구 색상', ...sizeOptions.map(size => sizeLabels[size])]}>
            {messages.map(({ message, messageColor }) => <tr key={`${message}-${messageColor}`}>
              <th scope="row">{message === 'error' ? '오류' : '안내'} · {colorLabels[messageColor]}</th>
              {sizeOptions.map(size => <td key={size} data-gallery-field={`${group.code}-${state}-${size}-${message}-${messageColor}`}><Demo args={getArgs(size as Size, message, messageColor)} gallery /></td>)}
            </tr>)}
          </GalleryTable>
          <GalleryCode code={messages.map(({ message, messageColor }) => usage(getArgs('medium', message, messageColor))).join('\n\n')} />
        </GallerySection>;
      });
    })}
  </div>;
}
