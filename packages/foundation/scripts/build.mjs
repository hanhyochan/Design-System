import { mkdirSync, writeFileSync } from 'node:fs';
import { compile } from 'sass';
import postcss from 'postcss';
import selectorParser from 'postcss-selector-parser';

// 원본 SCSS와 공통 규격은 그대로 둡니다. 배포할 CSS만 컴포넌트별로 추립니다.
const components = [
  'Button', 'IconButton', 'TextButton', 'Tabs', 'TabList', 'Tab', 'TabPanel',
  'TextInput', 'UnderlineTextInput', 'TextArea', 'AutoHeightTextArea', 'Select',
  'Field', 'Chip', 'ContentTag', 'Hashtag', 'Badge', 'Toggle', 'Checkbox', 'Radio', 'Text',
];
const tags = new Map(components.map(name => [
  `h-${name.replace(/[A-Z]/g, (letter, index) => `${index ? '-' : ''}${letter.toLowerCase()}`)}`, name,
]));
const helpers = new Set(['icon', 'icon-default', 'icon-active', 'description', 'options']);

function classOwner(value) {
  if (!value.startsWith('h_designSystem-')) return;
  const name = value.slice('h_designSystem-'.length);
  if (name.startsWith('type-') || name === 'native-text') return 'Text';
  if (name === 'password-action') return 'TextInput';
  if (helpers.has(name)) return;
  const owner = components.find(component => name === component || name.startsWith(`${component}-`));
  if (!owner) throw new Error(`CSS 소유 컴포넌트를 지정해 주세요: ${value}`);
  return owner;
}

mkdirSync('dist/components', { recursive: true });
for (const [source, output] of [['index', 'styles'], ['base', 'base'], ['shadow', 'shadow']]) {
  const { css } = compile(`src/style/${source}.scss`, { style: 'compressed', charset: false });
  writeFileSync(`dist/${output}.css`, `${css}\n`, 'utf8');
  if (source !== 'shadow') continue;

  const root = postcss.parse(css);
  // 쉼표로 나뉜 최상위 선택자만 분리합니다. :is/:where/:has 내부를 바꾸면
  // 우선순위가 달라질 수 있으므로 해당 부분은 원문 그대로 보존합니다.
  const selectors = new Map();
  root.walkRules(rule => {
    selectors.set(rule.selector, selectorParser().astSync(rule.selector).nodes.map(selector => {
      const owners = new Set();
      selector.walkClasses(node => { const owner = classOwner(node.value); if (owner) owners.add(owner); });
      selector.walkTags(node => {
        const owner = tags.get(node.value);
        if (node.value.startsWith('h-') && !owner) throw new Error(`CSS 소유 태그를 지정해 주세요: ${node.value}`);
        if (owner) owners.add(owner);
      });
      return { text: selector.toString(), owners };
    }));
  });

  for (const name of ['common', ...components]) {
    const output = root.clone();
    output.walkRules(rule => {
      const selected = selectors.get(rule.selector).filter(({ owners }) => name === 'common' ? owners.size === 0 : owners.has(name));
      if (selected.length) rule.selector = selected.map(({ text }) => text).join(',');
      else rule.remove();
    });
    output.walkComments(comment => comment.remove());
    // 빈 @layer 등은 결과물에 남기지 않습니다.
    output.walkAtRules(rule => { if (rule.nodes?.length === 0) rule.remove(); });
    writeFileSync(`dist/components/${name}.css`, `${output.toString()}\n`, 'utf8');
  }
}
