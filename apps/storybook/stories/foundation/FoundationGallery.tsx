import type { CSSProperties, ElementType, ReactNode } from 'react';
import { Button, Text } from '@h_designsystem/ui';
import { typographyNames } from '../../../../packages/ui/src/components/spec';
import unitCss from '../../../../packages/tokens/src/unit.css?raw';
import { GalleryCode, GallerySection, GalleryTable } from '../Gallery';

const units = [...unitCss.matchAll(/--h_designSystem-unit-(\d+)\s*:/g)].map(match => Number(match[1]));
export const foundationValues = {
  Padding: [0, 2, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 60],
  BorderRadius: [0, 2, 4, 8, 10, 12, 16, 20, 24, 32, 40, 9999],
  BorderWidth: [0, 0.5, 1, 2, 3],
  Gap: [0, 4, 8, 12, 16, 20, 24, 28, 32, 40, 60],
  Units: units,
};
export const galleryShadows = [
  '0 8px 14px rgba(34, 34, 34, 0.18)',
  '8px 8px 20px rgb(33 34 37 / 0.2)',
  '0 0 2px 0 rgba(0, 0, 0, 0.08), 0 16px 24px 0 rgba(0, 0, 0, 0.12)',
  '0 24px 24px -4px rgba(34, 34, 34, 0.18)',
  '0 24px 40px rgba(0, 0, 0, 0.1)',
];
const length = (value: number) => units.includes(value) ? `var(--h_designSystem-unit-${value})` : `${value}px`;

export function FoundationGallery({ kind, selected }: { kind: keyof typeof foundationValues | 'Shadow'; selected?: number | string }) {
  if (kind === 'Shadow') return <GallerySection title="Shadow">
    <div className="ds-gallery-specimens">
      {galleryShadows.map((shadow, index) => ({ shadow, index })).filter(({ shadow }) => selected === undefined || selected === shadow).map(({ shadow, index }) => <div className="ds-gallery-specimen" key={shadow} data-gallery-value={index + 1}>
        <Button className="ds-gallery-shadow" style={{ boxShadow: shadow }}>Button</Button>
        <span>shadow_{index + 1}</span>
        <GalleryCode code={`box-shadow: ${shadow};`} />
      </div>)}
    </div>
  </GallerySection>;
  if (kind === 'Units') return <GallerySection title="4배수 단위 토큰">
    <div className="ds-gallery-scroll ds-gallery-units" tabIndex={0} role="region" aria-label="단위 전체 견본">
      {units.filter(value => selected === undefined || selected === value).map(value => <div className="ds-gallery-unit-row" key={value} data-gallery-value={value}>
        <code>--h_designSystem-unit-{value} · {value}px</code>
        <div className="ds-gallery-unit-bar" style={{ width: length(value) }} />
      </div>)}
    </div>
    <GalleryCode code={units.filter(value => selected === undefined || selected === value).map(value => `gap: var(--h_designSystem-unit-${value});`).join('\n')} />
  </GallerySection>;
  return <GallerySection title={kind.replace(/([a-z])([A-Z])/g, '$1 $2')}>
    <div className="ds-gallery-specimens">
      {foundationValues[kind].filter(value => selected === undefined || selected === value).map(value => {
        const style: CSSProperties = kind === 'Padding' ? { padding: length(value) }
          : kind === 'BorderRadius' ? { border: '2px solid var(--h_designSystem-color-blue-45)', borderRadius: length(value) }
          : kind === 'BorderWidth' ? { border: `${length(value)} solid var(--h_designSystem-color-blue-45)` }
          : { gap: length(value) };
        const property = { Padding: 'padding', BorderRadius: 'border-radius', BorderWidth: 'border-width', Gap: 'gap' }[kind];
        return <div className="ds-gallery-specimen" key={value} data-gallery-value={value}>
          <div className={`ds-gallery-unit-preview${kind === 'Padding' ? ' ds-gallery-padding' : kind === 'Gap' ? ' ds-gallery-gap' : ''}`} style={style} aria-hidden="true">
            {kind === 'Padding' && <span />}{kind === 'Gap' && <><span /><span /></>}
          </div>
          <span>{value}px</span>
          <GalleryCode code={`${property}: ${length(value)};`} />
        </div>;
      })}
    </div>
  </GallerySection>;
}

export function TypographyGallery({ language, selected, as, children }: { language?: 'ko' | 'en'; selected?: (typeof typographyNames)[number]; as?: ElementType; children?: ReactNode }) {
  const languages = language ? [language] : ['ko', 'en'] as const;
  const weights: Record<string, string> = { 400: 'Regular', 500: 'Medium', 600: 'Semibold', 700: 'Bold' };
  return <div className="ds-gallery">
    {languages.map(lang => <GallerySection key={lang} title={`Typography · ${lang === 'ko' ? '국문' : '영문'}`}>
      <GalleryTable typography columns={['이름', '크기', '굵기', '행간', '예시 텍스트']}>
        {typographyNames.filter(name => !selected || selected === name).map(name => {
          const [category, size, weight] = name.split('_');
          const lineHeight = lang === 'en' && size === '115' ? 1.2 : ['display', 'headline'].includes(category) ? 1.25 : 1.5;
          return <tr key={name} data-gallery-typography={name}>
            <th scope="row">{name}</th><td>{size}px</td><td>{weight} · {weights[weight]}</td><td>{lineHeight}</td>
            <td><Text as={as} typography={name} language={lang} lang={lang}>{children ?? (lang === 'ko' ? '좋은 디자인은 읽기 쉬운 글자에서 시작됩니다.' : 'Good design begins with text that is clear and easy to read.')}</Text></td>
          </tr>;
        })}
      </GalleryTable>
      <GalleryCode code={`import { Text } from '@h_designsystem/ui';\n\n${typographyNames.filter(name => !selected || selected === name).map(name => `<Text typography="${name}" language="${lang}">텍스트</Text>`).join('\n')}`} />
    </GallerySection>)}
  </div>;
}
