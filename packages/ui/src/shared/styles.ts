import { unsafeCSS } from 'lit';
import commonCss from '@h_designsystem/foundation/components/common.css?inline';

// 공통 호스트·슬롯 스타일은 한 번 만들고 모든 컴포넌트가 공유합니다.
export const commonStyles = /* @__PURE__ */ unsafeCSS(commonCss);

// 빌드가 추린 고유 규격 + 해당 컴포넌트에 적용되는 공통 규격만 전달받습니다.
export function componentStyles(css: string) {
  return [commonStyles, unsafeCSS(css)];
}
