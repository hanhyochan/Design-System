import { useEffect, useId, useRef, useSyncExternalStore, type ReactNode } from 'react';
import * as UI from '@h_designsystem/ui';
import { currentBreakpoint, subscribeBreakpoints } from '@h_designsystem/ui/config';
import type { Size, IconSize, ResponsiveValue } from '@h_designsystem/ui';
import searchIcon from '@h_designsystem/foundation/icons/icon_search_medium_2.svg';
import { catalog, previewSpec } from './catalog';

// 실제 패키지 컴포넌트로 Docs와 전체 갤러리를 그립니다.
export type Args = {
  responsive?: boolean;
  baseSize?: string; mobileSize?: string; tabletSize?: string; desktopSize?: string;
  baseIconSize?: string; mobileIconSize?: string; tabletIconSize?: string; desktopIconSize?: string;
  codeEnvironment?: 'React' | 'Vue' | 'Svelte' | 'HTML' | 'JSP';
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
export function selectedSize(args: Args) {
  if (!args.responsive) return args.kind === 'btn_icon_filled' ? args.iconSize : args.size;
  const values: Record<string, Size | number> = {};
  for (const key of ['base', 'mobile', 'tablet', 'desktop'] as const) {
    const value = args.kind === 'btn_icon_filled'
      ? args[(key + 'IconSize') as 'baseIconSize'] ?? args[(key + 'Size') as 'baseSize']
      : args[(key + 'Size') as 'baseSize'];
    if (value && value !== 'unset') values[key] = /^\d+$/.test(value) ? Number(value) : value as Size;
  }
  return values;
}
export function responsiveExample(args: Args): Args {
  const numeric = args.kind === 'btn_icon_filled';
  return { ...args, responsive: true, baseSize: 'xlarge', tabletSize: 'large', mobileSize: 'medium', desktopSize: 'unset', ...(numeric ? { baseIconSize: '40', tabletIconSize: '32', mobileIconSize: '28', desktopIconSize: 'unset' } : {}) };
}
export function settings(args: Args) {
  const group = catalog.find(g => g.key === args.kind)!;
  return {
    group,
    variant: group.variant,
    shape: group.shape,
    icon: group.icon ? <img src={searchIcon} alt="" /> : undefined,
    disabled: args.state === 'disabled',
  };
}
export function Demo({ args, gallery = false }: { args: Args; gallery?: boolean }) {
  const inputId = useId();
  const area = useRef<HTMLDivElement>(null);
  const { group, variant, shape, icon, disabled } = settings(args);
  const size = selectedSize(args) as ResponsiveValue<Size> | undefined;
  const breakpoint = useSyncExternalStore(subscribeBreakpoints, () => currentBreakpoint() ?? '미설정');
  const native = { disabled, 'aria-label': args.text };
  useEffect(() => {
    if (args.state !== 'focus') return;
    const host = area.current?.querySelector<HTMLElement & { updateComplete: Promise<boolean>; resolvedSize: Size }>('h-text-input,h-text-area');
    if (!host) return;
    void host.updateComplete.then(() => {
      if (gallery) {
        const control = host.shadowRoot?.querySelector<HTMLElement>('[data-spec]');
        const spec = previewSpec(args.kind, host.resolvedSize, 'focus');
        if (control && spec) control.dataset.spec = spec;
      } else host.focus();
    });
  }, [args.state, args.kind, args.size, gallery, breakpoint]);
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
        group.key === 'btn_icon_filled' ? (
          <UI.IconButton
            variant="filled"
            size={selectedSize(args) as ResponsiveValue<IconSize> | undefined}
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
            args.state.replace(' ', '-') as 'fluid' | 'fixed' | 'search' | 'search-wide'
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
          shape={group.key === 'checkbox_round' ? 'round' : 'square'}
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
      {args.responsive && <div className="ds-responsive-label">{breakpoint} · {String((typeof size === 'object' ? size[breakpoint as 'mobile' | 'tablet' | 'desktop'] ?? size.base : size) ?? (args.kind === 'btn_icon_filled' ? 16 : 'medium'))}</div>}
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
