import './color-palette.css';

// CSS 선언을 직접 읽으므로 토큰 추가 시 별도 이름 목록을 수정하지 않습니다.
export function colorTokenNames(...sources: string[]): string[] {
  return [...new Set(sources.flatMap(css => [...css.matchAll(/(--h_designSystem-color-[\w-]+)\s*:/g)].map(match => match[1])))];
}

type ColorSwatch = { token: string; label: string };
type ColorGroup = { name: string; colors: ColorSwatch[] };

const atomicGroups = [
  ['common', 'Common'],
  ['neutral', 'Neutral'],
  ['cool-neutral', 'Cool Neutral'],
  ['blue', 'Blue'],
  ['red', 'Red'],
  ['red-orange', 'Red Orange'],
  ['orange', 'Orange'],
  ['yellow', 'Yellow'],
  ['green', 'Green'],
  ['lime', 'Lime'],
  ['cyan', 'Cyan'],
  ['light-blue', 'Light Blue'],
  ['violet', 'Violet'],
  ['purple', 'Purple'],
  ['pink', 'Pink'],
  ['newsroll-purple', 'Purple_newstant'],
  ['yellow_artkorealab', 'Yellow_artkorealab'],
  ['cyan_artkorealab', 'Cyan_artkorealab'],
  ['purple_artkorealab', 'Purple_artkorealab'],
] as const;

export function createAtomicPalette(tokens: string[]): ColorGroup[] {
  const groups = new Map<string, ColorSwatch[]>();

  for (const token of tokens) {
    const name = token.replace('--h_designSystem-color-', '');
    const match = name.match(/^(.+)-(\d+)(_artkorealab)?$/);
    if (!match) continue;
    const key = `${match[1]}${match[3] ?? ''}`;
    // Atomic에는 색상군별 명도 단계만 전시합니다. 내부 상태 색상·별칭은 제외합니다.
    if (!atomicGroups.some(([group]) => group === key)) continue;
    const colors = groups.get(key) ?? [];
    colors.push({ token, label: match[2] });
    groups.set(key, colors);
  }

  const palette = atomicGroups.map(([key, name]) => ({
    name,
    colors: (groups.get(key) ?? []).sort((a, b) => Number(b.label) - Number(a.label)),
  }));
  return palette.filter(({ colors }) => colors.length);
}

const semanticLabels: Record<string, string> = {
  'status-positive': 'Positive · 성공·검증 통과',
  'status-cautionary': 'Cautionary · 주의·경고',
  'status-negative': 'Negative · 오류·실패',
  'status-informative': 'Informative · 안내·올바른 예시',
  'text-primary': 'Primary · 본문',
  'text-secondary': 'Secondary · 보조 설명',
  'text-tertiary': 'Tertiary · 날짜·흐린 설명',
  'text-disabled': 'Disabled · 비활성 글자',
  'text-inverse': 'Inverse · 진한 배경 위 글자',
  'focus-ring': 'Ring · 키보드 포커스 외곽선',
  'overlay-dimmer': 'Dimmer · 모달 뒤 화면 가림',
};

export function createSemanticPalette(tokens: string[]): ColorGroup[] {
  return ['Status', 'Text', 'Focus', 'Overlay'].map((name) => ({
    name,
    colors: tokens
      .filter((token) => token.startsWith(`--h_designSystem-color-${name.toLowerCase()}-`))
      .map((token) => {
        const key = token.replace('--h_designSystem-color-', '');
        return { token, label: semanticLabels[key] ?? key };
      }),
  }));
}

export function ColorPalette({ groups, kind, selected }: { groups: ColorGroup[]; kind: 'atomic' | 'semantic'; selected?: string }) {
  return (
    <div className="color-palette" data-kind={kind}>
      {groups.map(group => ({ ...group, colors: group.colors.filter(color => !selected || color.token === selected) })).filter(group => group.colors.length).map(({ name, colors }) => (
        <section key={name} className="color-palette-group" aria-label={name}>
          <div className="color-palette-heading" role="heading" aria-level={2}>{name}</div>
          <div className="color-palette-row">
            {colors.map(({ token, label }) => (
              <div key={token} className="color-palette-item" title={token}>
                <div className="color-palette-swatch" style={{ background: `var(${token})` }} />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
