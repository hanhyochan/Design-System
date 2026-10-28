import type { Shape } from '@h_designsystem/ui';

// Storybook 전용 전시 목록입니다. 배열 순서가 기존 카탈로그 순서입니다.
// 패키지 실행 코드에는 이 목록과 미리보기 상태 조합을 포함하지 않습니다.
type Definition = {
  key: string;
  title: string;
  family: string;
  variant: 'filled' | 'outline' | 'gray-line-outline';
  shape: Shape;
  icon: boolean;
};
export const sizeOptions = ['small', 'medium', 'large', 'xlarge'];
export const fieldFamilies = ['TextInput', 'UnderlineTextInput', 'TextArea', 'AutoHeightTextArea', 'Select'];
export const sizeLabels: Record<string, string> = { small: 'Small', medium: 'Medium (Default)', large: 'Large', xlarge: 'Xlarge' };
export const stateLabels: Record<string, string> = { default: 'Default', focus: 'Focus', complete: 'Complete', error: 'Error', disabled: 'Disabled', view: 'Readonly', password: 'Password', checked: 'Checked', on: 'On', off: 'Off', inquiry: 'Inquiry', fluid: 'Fluid', fixed: 'Fixed', search: 'Search', 'search wide': 'Search Wide' };

const definitions: Definition[] = [
  // Button
  {key: 'btn_primary_filled', title: 'Buttons / Filled', family: 'Button', variant: 'filled', shape: 'square', icon: false},
  {key: 'btn_primary_filled_icon', title: 'Buttons / Filled+icon', family: 'Button', variant: 'filled', shape: 'square', icon: true},
  {key: 'btn_primary_filled_rounded', title: 'Buttons / Filled Rounded', family: 'Button', variant: 'filled', shape: 'rounded', icon: false},
  {key: 'btn_primary_filled_rounded_icon', title: 'Buttons / Filled Rounded+icon', family: 'Button', variant: 'filled', shape: 'rounded', icon: true},
  {key: 'btn_primary_filled_full_rounded', title: 'Buttons / Filled Full Rounded', family: 'Button', variant: 'filled', shape: 'full-rounded', icon: false},
  {key: 'btn_primary_filled_full_rounded_icon', title: 'Buttons / Filled Full Rounded+icon', family: 'Button', variant: 'filled', shape: 'full-rounded', icon: true},
  {key: 'btn_primary_outline', title: 'Buttons / Outline', family: 'Button', variant: 'outline', shape: 'square', icon: false},
  {key: 'btn_primary_outline_icon', title: 'Buttons / Outline+icon', family: 'Button', variant: 'outline', shape: 'square', icon: true},
  {key: 'btn_primary_outline_rounded', title: 'Buttons / Outline Rounded', family: 'Button', variant: 'outline', shape: 'rounded', icon: false},
  {key: 'btn_primary_outline_rounded_icon', title: 'Buttons / Outline Rounded+icon', family: 'Button', variant: 'outline', shape: 'rounded', icon: true},
  {key: 'btn_primary_outline_full_rounded', title: 'Buttons / Outline Full Rounded', family: 'Button', variant: 'outline', shape: 'full-rounded', icon: false},
  {key: 'btn_primary_outline_full_rounded_icon', title: 'Buttons / Outline Full Rounded+icon', family: 'Button', variant: 'outline', shape: 'full-rounded', icon: true},
  // IconButton
  {key: 'btn_icon_filled', title: 'Buttons / Button+icon / Filled', family: 'IconButton', variant: 'filled', shape: 'square', icon: false},
  {key: 'btn_icon_outline', title: 'Buttons / Button+icon / Outline', family: 'IconButton', variant: 'outline', shape: 'square', icon: false},
  {key: 'btn_icon_outline_rounded', title: 'Buttons / Button+icon / Outline Rounded', family: 'IconButton', variant: 'outline', shape: 'rounded', icon: false},
  {key: 'btn_icon_outline_full_rounded', title: 'Buttons / Button+icon / Outline Full Rounded', family: 'IconButton', variant: 'outline', shape: 'full-rounded', icon: false},
  // TextButton
  {key: 'btn_text', title: 'Buttons / Button+text / Text', family: 'TextButton', variant: 'filled', shape: 'square', icon: false},
  {key: 'btn_text_icon', title: 'Buttons / Button+text / Text+icon', family: 'TextButton', variant: 'filled', shape: 'square', icon: true},
  // Tab
  {key: 'tab_filled', title: 'Tab / Filled', family: 'Tab', variant: 'filled', shape: 'square', icon: false},
  {key: 'tab_filled_icon', title: 'Tab / Filled+icon', family: 'Tab', variant: 'filled', shape: 'square', icon: true},
  {key: 'tab_filled_rounded', title: 'Tab / Filled Rounded', family: 'Tab', variant: 'filled', shape: 'rounded', icon: false},
  {key: 'tab_filled_rounded_icon', title: 'Tab / Filled Rounded+icon', family: 'Tab', variant: 'filled', shape: 'rounded', icon: true},
  {key: 'tab_filled_full_rounded', title: 'Tab / Filled Full Rounded', family: 'Tab', variant: 'filled', shape: 'full-rounded', icon: false},
  {key: 'tab_filled_full_rounded_icon', title: 'Tab / Filled Full Rounded+icon', family: 'Tab', variant: 'filled', shape: 'full-rounded', icon: true},
  {key: 'tab_outline', title: 'Tab / Outline', family: 'Tab', variant: 'outline', shape: 'square', icon: false},
  {key: 'tab_outline_icon', title: 'Tab / Outline+icon', family: 'Tab', variant: 'outline', shape: 'square', icon: true},
  {key: 'tab_outline_rounded', title: 'Tab / Outline Rounded', family: 'Tab', variant: 'outline', shape: 'rounded', icon: false},
  {key: 'tab_outline_rounded_icon', title: 'Tab / Outline Rounded+icon', family: 'Tab', variant: 'outline', shape: 'rounded', icon: true},
  {key: 'tab_outline_full_rounded', title: 'Tab / Outline Full Rounded', family: 'Tab', variant: 'outline', shape: 'full-rounded', icon: false},
  {key: 'tab_outline_full_rounded_icon', title: 'Tab / Outline Full Rounded+icon', family: 'Tab', variant: 'outline', shape: 'full-rounded', icon: true},
  {key: 'tab_gray_line_outline', title: 'Tab / Gray Line Outline', family: 'Tab', variant: 'gray-line-outline', shape: 'square', icon: false},
  {key: 'tab_gray_line_outline_icon', title: 'Tab / Gray Line Outline+icon', family: 'Tab', variant: 'gray-line-outline', shape: 'square', icon: true},
  {key: 'tab_gray_line_outline_rounded', title: 'Tab / Gray Line Outline Rounded', family: 'Tab', variant: 'gray-line-outline', shape: 'rounded', icon: false},
  {key: 'tab_gray_line_outline_rounded_icon', title: 'Tab / Gray Line Outline Rounded+icon', family: 'Tab', variant: 'gray-line-outline', shape: 'rounded', icon: true},
  {key: 'tab_gray_line_outline_full_rounded', title: 'Tab / Gray Line Outline Full Rounded', family: 'Tab', variant: 'gray-line-outline', shape: 'full-rounded', icon: false},
  {key: 'tab_gray_line_outline_full_rounded_icon', title: 'Tab / Gray Line Outline Full Rounded+icon', family: 'Tab', variant: 'gray-line-outline', shape: 'full-rounded', icon: true},
  // TextInput
  {key: 'text_input_filled', title: 'Text Input / Filled', family: 'TextInput', variant: 'filled', shape: 'square', icon: false},
  {key: 'text_input_filled_rounded', title: 'Text Input / Filled Rounded', family: 'TextInput', variant: 'filled', shape: 'rounded', icon: false},
  {key: 'text_input_filled_full_rounded', title: 'Text Input / Filled Full Rounded', family: 'TextInput', variant: 'filled', shape: 'full-rounded', icon: false},
  {key: 'text_input_outline', title: 'Text Input / Outline', family: 'TextInput', variant: 'outline', shape: 'square', icon: false},
  {key: 'text_input_outline_rounded', title: 'Text Input / Outline Rounded', family: 'TextInput', variant: 'outline', shape: 'rounded', icon: false},
  {key: 'text_input_outline_full_rounded', title: 'Text Input / Outline Full Rounded', family: 'TextInput', variant: 'outline', shape: 'full-rounded', icon: false},
  // UnderlineTextInput
  {key: 'text_input_underline', title: 'Underline Text Input', family: 'UnderlineTextInput', variant: 'filled', shape: 'square', icon: false},
  // TextArea
  {key: 'textarea_filled', title: 'Text Area / Filled', family: 'TextArea', variant: 'filled', shape: 'square', icon: false},
  {key: 'textarea_filled_rounded', title: 'Text Area / Filled Rounded', family: 'TextArea', variant: 'filled', shape: 'rounded', icon: false},
  {key: 'textarea_outline', title: 'Text Area / Outline', family: 'TextArea', variant: 'outline', shape: 'square', icon: false},
  {key: 'textarea_outline_rounded', title: 'Text Area / Outline Rounded', family: 'TextArea', variant: 'outline', shape: 'rounded', icon: false},
  // AutoHeightTextArea
  {key: 'textarea_auto', title: 'Auto Height Text Area', family: 'AutoHeightTextArea', variant: 'filled', shape: 'square', icon: false},
  // Select
  {key: 'select_filled', title: 'Select / Filled', family: 'Select', variant: 'filled', shape: 'square', icon: false},
  {key: 'select_filled_icon', title: 'Select / Filled+icon', family: 'Select', variant: 'filled', shape: 'square', icon: true},
  {key: 'select_filled_rounded', title: 'Select / Filled Rounded', family: 'Select', variant: 'filled', shape: 'rounded', icon: false},
  {key: 'select_filled_rounded_icon', title: 'Select / Filled Rounded+icon', family: 'Select', variant: 'filled', shape: 'rounded', icon: true},
  {key: 'select_filled_full_rounded', title: 'Select / Filled Full Rounded', family: 'Select', variant: 'filled', shape: 'full-rounded', icon: false},
  {key: 'select_filled_full_rounded_icon', title: 'Select / Filled Full Rounded+icon', family: 'Select', variant: 'filled', shape: 'full-rounded', icon: true},
  {key: 'select_outline', title: 'Select / Outline', family: 'Select', variant: 'outline', shape: 'square', icon: false},
  {key: 'select_outline_icon', title: 'Select / Outline+icon', family: 'Select', variant: 'outline', shape: 'square', icon: true},
  {key: 'select_outline_rounded', title: 'Select / Outline Rounded', family: 'Select', variant: 'outline', shape: 'rounded', icon: false},
  {key: 'select_outline_rounded_icon', title: 'Select / Outline Rounded+icon', family: 'Select', variant: 'outline', shape: 'rounded', icon: true},
  {key: 'select_outline_full_rounded', title: 'Select / Outline Full Rounded', family: 'Select', variant: 'outline', shape: 'full-rounded', icon: false},
  {key: 'select_outline_full_rounded_icon', title: 'Select / Outline Full Rounded+icon', family: 'Select', variant: 'outline', shape: 'full-rounded', icon: true},
  // Chip
  {key: 'chip_filled', title: 'Chip / Filled', family: 'Chip', variant: 'filled', shape: 'square', icon: false},
  {key: 'chip_outline', title: 'Chip / Outline', family: 'Chip', variant: 'outline', shape: 'square', icon: false},
  // ContentTag
  {key: 'chip_content', title: 'Chip / Content Tag', family: 'ContentTag', variant: 'filled', shape: 'square', icon: false},
  // Hashtag
  {key: 'hashtag', title: 'Hashtag', family: 'Hashtag', variant: 'filled', shape: 'square', icon: false},
  // Badge
  {key: 'badge_filled', title: 'Badge / Filled', family: 'Badge', variant: 'filled', shape: 'square', icon: false},
  {key: 'badge_outline', title: 'Badge / Outline', family: 'Badge', variant: 'outline', shape: 'square', icon: false},
  // Toggle
  {key: 'toggle', title: 'Toggle', family: 'Toggle', variant: 'filled', shape: 'square', icon: false},
  // Checkbox
  {key: 'checkbox', title: 'Checkbox', family: 'Checkbox', variant: 'filled', shape: 'square', icon: false},
  {key: 'checkbox_round', title: 'Checkbox / Round', family: 'Checkbox', variant: 'filled', shape: 'square', icon: false},
  // Radio
  {key: 'radio', title: 'Radio Button', family: 'Radio', variant: 'filled', shape: 'square', icon: false},
];

// 같은 상태 목록과 크기 목록을 748번 복제하지 않고 전시할 조합만 만듭니다.
const statesByFamily: Record<string, string[]> = {
  Button: ['default', 'disabled'],
  IconButton: ['default', 'disabled'],
  Tab: ['default', 'disabled'],
  TextInput: ['default', 'focus', 'complete', 'error', 'disabled', 'view', 'password'],
  UnderlineTextInput: ['fluid', 'fixed', 'search', 'search wide'],
  TextArea: ['default', 'focus', 'error', 'disabled', 'view', 'inquiry'],
  Select: ['default', 'disabled'],
  Chip: ['default', 'disabled'],
  Toggle: ['on', 'off', 'disabled'],
  Checkbox: ['default', 'checked', 'disabled'],
  Radio: ['default', 'checked', 'disabled'],
};
const iconSizes = [8, 12, 16, 20, 24, 28, 32, 40];
const iconSizeNames: Record<number, string> = { 8: 'small', 16: 'medium', 24: 'large', 40: 'xlarge' };

export const catalog = definitions.map(group => {
  const sizes = group.key === 'btn_icon_filled' ? iconSizes.map(size => 'width ' + size + 'px') : sizeOptions;
  const states = statesByFamily[group.family] ?? ['default'];
  const variants = states.flatMap(state => sizes.map(size => {
    const width = Number(size.replace(/[^\d]/g, ''));
    const suffix = width ? iconSizeNames[width] ?? String(width) : size;
    const stateName = ['default', 'checked', 'fluid'].includes(state) ? '' : state.replaceAll(' ', '_');
    return { id: [group.key, stateName, suffix].filter(Boolean).join('_'), size, state };
  }));
  return { ...group, variants };
});

export function previewSpec(key: string, size: string, state: string) {
  return catalog.find(group => group.key === key)?.variants.find(v => v.size === size && v.state === state)?.id;
}
