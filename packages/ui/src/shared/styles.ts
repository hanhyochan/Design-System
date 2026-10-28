import { unsafeCSS } from 'lit';
import foundationCss from '@h_designsystem/foundation/shadow.css?inline';

// 패키지가 빌드한 신뢰 가능한 CSS만 사용합니다. 모든 인스턴스가 이 객체를 공유합니다.
export const componentStyles = unsafeCSS(foundationCss);
