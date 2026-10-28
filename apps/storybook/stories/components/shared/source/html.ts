import type { Args } from '../preview';
import { model, fieldProps, htmlName, escape, tag, configure, elementImports, type Environment } from './shared';
export function elementMarkup(args: Args, environment: Environment = 'HTML') {
  const { name, props, hasIcon } = model(args);
  const literal = (value: unknown) => escape(value).replaceAll('{', '&#123;').replaceAll('}', '&#125;');
  const attrs = (values: Record<string, unknown>) => Object.entries(values).filter(([,value]) => value !== undefined && value !== false).map(([key,value]) => {
    const attribute = htmlName(key);
    if (typeof value === 'number') {
      if (environment === 'Vue') return `:${attribute}.prop="${value}"`;
      if (environment === 'Svelte') return `${attribute}={${value}}`;
    }
    if(typeof value === 'object') {
      if(environment === 'Vue') return `:${attribute}.prop='${escape(JSON.stringify(value))}'`;
      if(environment === 'Svelte') return `${attribute}={${JSON.stringify(value)}}`;
      return `${attribute}='${escape(JSON.stringify(value))}'`;
    }
    return value === true ? attribute : `${attribute}="${literal(value)}"`;
  }).join(' ');
  const icon = hasIcon ? (environment === 'Vue' ? '<img slot="icon" :src="searchIcon" alt="">' : environment === 'Svelte' ? '<img slot="icon" src={searchIcon} alt="" />' : '<img slot="icon" src="./assets/icons/icon_search_medium_2.svg" alt="">') : '';
  const text = ['IconButton','Toggle','Checkbox','Radio','TextInput','UnderlineTextInput','TextArea','AutoHeightTextArea'].includes(name) ? '' : name === 'Select' ? '\n  <option value="">선택해 주세요</option>\n  <option value="one">첫 번째 항목</option>\n' : literal(args.text);
  let markup = `<${tag(name)} ${attrs(props)}>${icon}${text}</${tag(name)}>`;
  if(name==='Tab') markup = `<h-tabs default-value="first">\n  <h-tab-list aria-label="탭 목록">\n    <h-tab value="first" ${attrs(props)}>${icon}${text}</h-tab>\n    <h-tab value="second" ${attrs({...props,disabled:false})}>두 번째 탭</h-tab>\n  </h-tab-list>\n  <h-tab-panel value="first">첫 번째 내용</h-tab-panel>\n  <h-tab-panel value="second">두 번째 내용</h-tab-panel>\n</h-tabs>`;
  if(args.withField) markup = `<h-field ${attrs(fieldProps(args))}>\n  ${markup.replaceAll('\n','\n  ')}\n</h-field>`;
  return markup;
}
export function htmlSource(args: Args, prefix = './assets') {
  return `<link rel="stylesheet" href="${prefix}/h-designsystem/styles.css">\n\n${elementMarkup(args).replaceAll('./assets',prefix)}\n\n<script type="module">\n${elementImports(args, `${prefix}/h-designsystem/elements`, '.js')}\n${args.responsive ? `import { configureDesignSystem } from '${prefix}/h-designsystem/config.js';\n${configure}` : '// 고정 크기만 사용하면 화면 기준 설정이 필요 없습니다.'}\n${model(args).input ? "document.querySelector('#example-input').addEventListener('input', event => {\n  console.log(event.currentTarget.value);\n});\n" : ''}</script>`;
}
