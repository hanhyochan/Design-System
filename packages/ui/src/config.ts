/** 프로젝트 화면 기준. 숫자는 각 구간의 최대 CSS 픽셀 너비입니다. */
export type Breakpoint = 'mobile' | 'tablet' | 'desktop';
export type DesignSystemConfig = {
  breakpoints: { mobile: number; tablet: number };
  /** 기본은 경계 포함. Tailwind처럼 다음 구간이 경계에서 시작하면 exclusive를 사용합니다. */
  breakpointBoundary?: 'inclusive' | 'exclusive';
};

let config: DesignSystemConfig | undefined;
let queries: MediaQueryList[] = [];
const listeners = new Set<() => void>();
const notify = () => listeners.forEach(listener => listener());

function mediaQueries(): MediaQueryList[] {
  if (!config) return [];
  const operator = config.breakpointBoundary === 'exclusive' ? '<' : '<=';
  return [config.breakpoints.mobile, config.breakpoints.tablet].map(width =>
    window.matchMedia(`(width ${operator} ${width}px)`));
}

function releaseQueries() {
  queries.forEach(query => query.removeEventListener('change', notify));
  queries = [];
}
function observeQueries() {
  releaseQueries();
  if (!config || !listeners.size || typeof window === 'undefined') return;
  queries = mediaQueries();
  queries.forEach(query => query.addEventListener('change', notify));
}

export function configureDesignSystem(next: DesignSystemConfig): void {
  const { mobile, tablet } = next?.breakpoints ?? {};
  if (!Number.isFinite(mobile) || !Number.isFinite(tablet) || mobile < 0 || tablet <= mobile) {
    throw new TypeError('hyo_designSystem: mobile과 tablet은 유한한 숫자이며 0 ≤ mobile < tablet이어야 합니다.');
  }
  if (next.breakpointBoundary !== undefined && !['inclusive', 'exclusive'].includes(next.breakpointBoundary)) {
    throw new TypeError('hyo_designSystem: breakpointBoundary는 inclusive 또는 exclusive여야 합니다.');
  }
  config = { breakpoints: { mobile, tablet }, breakpointBoundary: next.breakpointBoundary };
  observeQueries();
  notify();
}

/** 내부 Controller가 공유합니다. 고정값은 이 구독을 만들지 않습니다. */
export function subscribeBreakpoints(listener: () => void): () => void {
  listeners.add(listener);
  if (listeners.size === 1) observeQueries();
  return () => {
    listeners.delete(listener);
    if (!listeners.size) releaseQueries();
  };
}
export function currentBreakpoint(): Breakpoint | undefined {
  if (!config || typeof window === 'undefined') return undefined;
  const [mobile, tablet] = queries.length ? queries : mediaQueries();
  return mobile.matches ? 'mobile' : tablet.matches ? 'tablet' : 'desktop';
}
