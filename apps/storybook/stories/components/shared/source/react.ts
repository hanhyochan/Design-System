import type { Args } from '../preview';
import { model, fieldProps, configure } from './shared';
const attributes = (props: Record<string, unknown>) => Object.entries(props).filter(([, value]) => value !== undefined && value !== false).map(([key, value]) => value === true ? key : `${key}={${JSON.stringify(value)}}`).join(' ');
export function reactSource(args: Args) {
  const { name, props, input, hasIcon } = model(args);
  const attrs = attributes(props) + (hasIcon ? ' icon={<img src={searchIcon} alt="" />}' : '');
  const content = name === 'Select' ? '\n  <option value="">선택해 주세요</option>\n  <option value="one">첫 번째 항목</option>\n' : `{${JSON.stringify(args.text)}}`;
  let element = input && name !== 'Select' || ['Toggle','Checkbox','Radio','IconButton'].includes(name) ? `<${name} ${attrs} />` : `<${name} ${attrs}>${content}</${name}>`;
  let imports = name;
  if (name === 'Tab') {
    imports = 'Tabs, TabList, Tab, TabPanel';
    element = `<Tabs defaultValue="first">\n  <TabList aria-label="탭 목록">\n    <Tab value="first" ${attrs}>${content}</Tab>\n    <Tab value="second" ${attrs.replace(/\bdisabled\b/g,'')}>두 번째 탭</Tab>\n  </TabList>\n  <TabPanel value="first">첫 번째 내용</TabPanel>\n  <TabPanel value="second">두 번째 내용</TabPanel>\n</Tabs>`;
  }
  if(args.withField) { imports += ', Field'; element = `<Field ${attributes(fieldProps(args))}>\n  ${element.replaceAll('\n','\n  ')}\n</Field>`; }
  return `import '@h_designsystem/ui/styles.css';\nimport { ${imports} } from '@h_designsystem/ui';\n${args.responsive ? `import { configureDesignSystem } from '@h_designsystem/ui/config';\n${configure}\n` : ''}${hasIcon ? "import searchIcon from '@h_designsystem/foundation/icons/icon_search_medium_2.svg';\n" : ''}\n${element}${input ? '\n\n// 값 연결: value={value}, onInput={event => setValue(event.currentTarget.value)}\n// ref.current는 웹 컴포넌트입니다. 내부 네이티브 입력은 ref.current.control입니다.' : ''}`;
}
