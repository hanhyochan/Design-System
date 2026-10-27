import type { Meta, StoryObj } from '@storybook/react-vite';
import { IconButton } from '@h_designsystem/ui';
import { GalleryCode, GallerySection } from '../Gallery';
import { iconGalleryGroups, iconGallerySizes } from './icon-gallery-groups';

const files = import.meta.glob<string>('../../../../packages/foundation/src/icons/*.svg', { eager: true, query: '?url', import: 'default' });
const icons = Object.fromEntries(Object.entries(files).map(([path, url]) => [path.split('/').pop()!, url]));
const iconWidth = (file: string) => {
  const size = iconGallerySizes[file] ?? 24;
  return size % 4 === 0 ? `var(--h_designSystem-unit-${size})` : `${size}px`;
};
const meta: Meta<{ icon: string }> = {
  title: 'Foundation/Icons',
  args: { icon: 'icon_search_medium_2.svg' },
  argTypes: { icon: { name: '아이콘', control: 'select', options: Object.keys(icons) } },
  render: ({ icon }, { viewMode }) => <div className="ds-gallery">
    {iconGalleryGroups.map(group => ({ ...group, files: group.files.filter(file => viewMode === 'story' || file === icon) })).filter(group => group.files.length).map(group => <GallerySection key={group.name} title={group.name}>
      <div className="ds-gallery-icons">{group.files.map(file => <div key={file} className="ds-gallery-icon" data-gallery-icon={file}>
        <IconButton variant="filled" size={24} icon={<img src={icons[file]} alt="" style={{ width: iconWidth(file), height: 'auto', maxHeight: 'var(--h_designSystem-unit-24)', objectFit: 'contain' }} />} aria-label={file.replace('.svg', '')} />
        <span>{file.replace('.svg', '')}</span>
      </div>)}</div>
    </GallerySection>)}
    <GalleryCode code={`import icon from '@h_designsystem/foundation/icons/${icon}';\nimport { IconButton } from '@h_designsystem/ui';\n\n<IconButton variant="filled" size={24} icon={<img src={icon} alt="" />} aria-label="아이콘 설명" />`} />
  </div>,
  parameters: { docs: { source: { type: 'dynamic', transform: (_source: string, { args }: { args: { icon: string } }) => `import icon from '@h_designsystem/foundation/icons/${args.icon}';\nimport { IconButton } from '@h_designsystem/ui';\n\n<IconButton variant="filled" size={24} icon={<img src={icon} alt="" />} aria-label="아이콘 설명" />` } } },
};
export default meta;
export const Playground: StoryObj<typeof meta> = {};
