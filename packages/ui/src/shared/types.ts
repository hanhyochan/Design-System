/** 컴포넌트가 공통으로 사용하는 크기와 외곽 모양입니다. */
export type Size = 'small' | 'medium' | 'large' | 'xlarge';
export type Shape = 'square' | 'rounded' | 'full-rounded';

export type ResponsiveValue<T> = T | {
  base?: T;
  mobile?: T;
  tablet?: T;
  desktop?: T;
};

/** HTML에서는 JSON 속성, 프레임워크에서는 객체 속성을 받을 수 있습니다. */
export const responsiveConverter = {
  fromAttribute(value: string | null): unknown {
    if (value === null) return undefined;
    if (value.trim().startsWith('{')) {
      try { return JSON.parse(value); }
      catch { console.warn('hyo_designSystem: 화면별 옵션의 JSON 형식을 확인해 주세요.'); return undefined; }
    }
    return /^\d+$/.test(value) ? Number(value) : value;
  },
};
