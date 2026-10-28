import type { Meta, StoryObj } from '@storybook/react-vite';
import { usage, environments, type Environment } from '../components/shared/source';
import { IconButton } from '@h_designsystem/ui';
import { GalleryCode, GallerySection } from '../Gallery';
import { iconGalleryGroups, iconGallerySizes } from './icon-gallery-groups';

const files = import.meta.glob<string>('../../../../packages/foundation/src/icons/*.svg', { eager: true, query: '?url', import: 'default' });
const icons = Object.fromEntries(Object.entries(files).map(([path, url]) => [path.split('/').pop()!, url]));
const iconWidth = (file: string) => {
  const size = iconGallerySizes[file] ?? 24;
  return size % 4 === 0 ? `var(--h_designSystem-unit-${size})` : `${size}px`;
};
function iconSource(icon: string, codeEnvironment: Environment = 'React') {
  return usage({kind:'btn_icon_filled',size:'medium',iconSize:24,state:'default',text:'아이콘 설명',withField:false,message:'none',description:'',error:'',messageColor:'blue',codeEnvironment}).replaceAll('icon_search_medium_2.svg',icon).replaceAll('searchIcon','icon');
}
const meta: Meta<{ icon: string; codeEnvironment: Environment }> = {
  title: 'Foundation/Icons',
  args: { icon: 'icon_search_medium_2.svg', codeEnvironment:'React' },
  argTypes: { codeEnvironment:{name:'사용 코드 환경',control:'inline-radio',options:environments}, icon: { name: '아이콘', control: 'select', options: Object.keys(icons) } },
  render: ({ icon }, { viewMode }) => <div className="ds-gallery">
    {iconGalleryGroups.map(group => ({ ...group, files: group.files.filter(file => viewMode === 'story' || file === icon) })).filter(group => group.files.length).map(group => <GallerySection key={group.name} title={group.name}>
      <div className="ds-gallery-icons">{group.files.map(file => <div key={file} className="ds-gallery-icon" data-gallery-icon={file}>
        <IconButton variant="filled" size={24} icon={<img src={icons[file]} alt="" style={{ width: iconWidth(file), height: 'auto', maxHeight: 'var(--h_designSystem-unit-24)', objectFit: 'contain' }} />} aria-label={file.replace('.svg', '')} />
        <span>{file.replace('.svg', '')}</span>
        <a href={icons[file]} download={file}>SVG 내려받기</a>
      </div>)}</div>
    </GallerySection>)}
    <GalleryCode codes={Object.fromEntries(environments.map(environment=>[environment,iconSource(icon,environment)]))} />
  </div>,
  parameters: { docs:{ source:{ type:'dynamic', transform:(_source:string,{args}:{args:{icon:string;codeEnvironment:Environment}})=>iconSource(args.icon,args.codeEnvironment) } } },
};
export default meta;
export const Playground: StoryObj<typeof meta> = {};
