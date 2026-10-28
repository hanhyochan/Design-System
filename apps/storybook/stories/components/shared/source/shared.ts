import { fieldFamilies } from '../catalog';
import { settings, selectedSize, type Args } from '../preview';
export type Environment = 'React' | 'Vue' | 'Svelte' | 'HTML' | 'JSP';
export const environments: Environment[] = ['React','Vue','Svelte','HTML','JSP'];
export const escape = (value: unknown) => String(value).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#39;');
export const tag = (name: string) => 'h-' + name.replace(/([a-z])([A-Z])/g,'$1-$2').toLowerCase();
// 표시 중인 조합의 태그만 등록합니다. Field와 Tabs의 자식도 빠뜨리지 않습니다.
export function elementImports(args: Args, prefix = '@h_designsystem/ui/elements', extension = '') {
  const name = model(args).name;
  const names = name === 'Tab' ? ['Tabs', 'TabList', 'Tab', 'TabPanel'] : [name];
  if (args.withField) names.unshift('Field');
  return names.map(name => `import '${prefix}/${tag(name).slice(2)}${extension}';`).join('\n');
}
export function model(args: Args) {
  const { group, variant, shape, icon, disabled } = settings(args);
  const name = group.family; const input = fieldFamilies.includes(name);
  const props: Record<string, unknown> = { size: selectedSize(args) };
  if (['Button','IconButton','Tab','TextInput','TextArea','Select','Chip','Badge'].includes(name)) props.variant=variant;
  if (['Button','Tab','TextInput','TextArea','Select'].includes(name) || name==='IconButton' && group.key!=='btn_icon_filled') props.shape=shape;
  if (disabled) props.disabled=true;
  if (['TextInput','TextArea'].includes(name)) {
    if (['error','complete'].includes(args.state)) props.status=args.state;
    if (args.state==='view') {props.readOnly=true;props.defaultValue='읽기 전용 내용';}
  }
  if(name==='TextInput' && args.state==='password') {props.type='password';props.defaultValue='password123';}
  if(name==='TextArea' && args.state==='inquiry') props.inquiry=true;
  if(name==='UnderlineTextInput') props.variant=args.state.replace(' ','-');
  if(name==='Checkbox') props.shape=group.key==='checkbox_round'?'round':'square';
  if(['Toggle','Checkbox','Radio'].includes(name)) {
    props['aria-label']=args.text;
    if(['on','checked'].includes(args.state)) props.defaultChecked=true;
    if(name==='Radio') {props.name='choice';props.value='one';}
  }
  if(name==='IconButton') props['aria-label']=args.text;
  if(input) {props.id='example-input'; if(!args.withField)props['aria-label']='입력 항목';if(name!=='Select')props.placeholder=args.text;}
  return { name, props, input, hasIcon: !!icon || name==='IconButton' };
}
export function fieldProps(args: Args) { return { htmlFor:'example-input',label:'입력 항목',messageColor:args.messageColor,...(args.message==='error'?{error:args.error}:args.message==='description'?{description:args.description}:{}) }; }
export const htmlName = (key: string) => ({readOnly:'readonly',defaultValue:'default-value',defaultChecked:'default-checked',messageColor:'message-color',htmlFor:'for'}[key] ?? key);
export const configure = "configureDesignSystem({ breakpoints: { mobile: 768, tablet: 992 } });";
