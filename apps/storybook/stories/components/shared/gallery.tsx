import type { Size } from '@h_designsystem/ui';
import { GalleryCode, GallerySection, GalleryTable } from '../../Gallery';
import { catalog, sizeOptions, sizeLabels, stateLabels, fieldFamilies } from './catalog';
import { Demo, responsiveExample, type Args } from './preview';
import { usage, environments } from './source';

// 전체 종류·크기·상태, Field 조합을 같은 미리보기로 비교합니다.
export function ComponentGallery({ family, defaults, fieldsOnly }: { family: string; defaults: Args; fieldsOnly: boolean }) {
  const groups = catalog.filter(group => group.family === family);
  return <div className="ds-gallery">
    <div className="ds-responsive-description">반응형 예시는 화면 구간별로 지정한 크기를 적용합니다. 글자·여백·아이콘도 해당 크기 규격을 따릅니다.</div>
    {!fieldsOnly && groups.map(group => {
      const sizes = [...new Set(group.variants.map(v => v.size))];
      const states = [...new Set(group.variants.map(v => v.state))];
      const variantArgs = (size: string, state: string): Args => ({ ...defaults, kind: group.key,
        size: sizeOptions.includes(size) ? size as Size : 'medium',
        iconSize: (Number(size.replace(/[^\d]/g, '')) || 16) as Args['iconSize'], state,
      });
      return <GallerySection key={group.key} title={group.title}>
        <GalleryTable columns={['분류', ...sizes.map(size => sizeLabels[size] ?? size.replace('width ', '')), '반응형']}>
          {states.map(state => <tr key={state}><th scope="row">{stateLabels[state] ?? state}</th>
            {sizes.map(size => {
              const variant = group.variants.find(v => v.size === size && v.state === state);
              return <td key={size} data-gallery-spec={variant?.id}>
                {variant && <Demo args={variantArgs(size, state)} gallery />}
              </td>;
            })}
            <td><Demo args={responsiveExample(variantArgs('xlarge', state))} gallery /></td>
          </tr>)}
        </GalleryTable>
        <GalleryCode codes={Object.fromEntries(environments.map(codeEnvironment => [codeEnvironment, [...group.variants.map(v => usage({...variantArgs(v.size, v.state), codeEnvironment})), usage({...responsiveExample(variantArgs('xlarge', states[0])), codeEnvironment})].join('\n\n')]))} />
      </GallerySection>;
    })}
    {fieldFamilies.includes(family) && <FieldGallery family={family} defaults={defaults} />}
  </div>;
}

export function FieldGallery({ family, defaults }: { family?: string; defaults?: Args }) {
  const groups = catalog.filter(group => family ? group.family === family : fieldFamilies.includes(group.family));
  const base: Args = defaults ?? { kind: 'text_input_filled', size: 'medium', iconSize: 16, state: 'default', text: '내용을 입력해 주세요', withField: true, message: 'description', description: '입력 내용을 확인해 주세요.', error: '필수 항목을 입력해 주세요.', messageColor: 'blue' };
  const messages = (['description', 'error'] as const).flatMap(message => (['red', 'green', 'blue'] as const).map(messageColor => ({ message, messageColor })));
  const colorLabels = { red: '빨강', green: '초록', blue: '파랑' };
  return <div className="ds-gallery ds-gallery-field">
    {groups.flatMap(group => {
      const states = group.family === 'UnderlineTextInput' ? [...new Set(group.variants.map(v => v.state))] : [group.variants[0].state];
      return states.map(state => {
        const getArgs = (size: Size, message: Args['message'], messageColor: Args['messageColor']): Args => ({ ...base, kind: group.key, size, state, withField: true, message, messageColor });
        return <GallerySection key={`${group.key}-${state}`} title={`${group.title}${group.family === 'UnderlineTextInput' ? ` / ${stateLabels[state]}` : ''} · Field 조합`}>
          <GalleryTable columns={['상태 · 문구 색상', ...sizeOptions.map(size => sizeLabels[size]), '반응형']}>
            {messages.map(({ message, messageColor }) => <tr key={`${message}-${messageColor}`}>
              <th scope="row">{message === 'error' ? '오류' : '안내'} · {colorLabels[messageColor]}</th>
              {sizeOptions.map(size => <td key={size} data-gallery-field={`${group.key}-${state}-${size}-${message}-${messageColor}`}><Demo args={getArgs(size as Size, message, messageColor)} gallery /></td>)}
              <td><Demo args={responsiveExample(getArgs('xlarge', message, messageColor))} gallery /></td>
            </tr>)}
          </GalleryTable>
          <GalleryCode codes={Object.fromEntries(environments.map(codeEnvironment => [codeEnvironment, [...messages.map(({ message, messageColor }) => usage({...getArgs('medium', message, messageColor), codeEnvironment})), usage({...responsiveExample(getArgs('xlarge','error','red')),codeEnvironment})].join('\n\n')]))} />
        </GallerySection>;
      });
    })}
  </div>;
}
