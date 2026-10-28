import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Button } from '@h_designsystem/ui';
import '@h_designsystem/ui/styles.css';
import './design-system.config';

// import만으로 등록되지 않으며, 최초 렌더에서도 객체 props와 ref가 연결되어야 합니다.
document.body.dataset.registeredBefore = String(!!customElements.get('h-button'));
createRoot(document.getElementById('app')!).render(<StrictMode>
  <Button id="selective-button" size={{ base: 'xlarge', mobile: 'small' }}
    ref={element => { document.body.dataset.upgradedRef = String(!!element && typeof element.focus === 'function' && 'resolvedSize' in element); }}
    onClick={() => { document.body.dataset.clicked = 'true'; }}>선택한 버튼</Button>
</StrictMode>);

// 아직 문서에 붙지 않은 React 루트에서도 업그레이드와 속성 전달을 보존합니다.
const detached = document.createElement('div');
createRoot(detached).render(<Button id="detached-button" size="large" ref={element => {
  if (element) queueMicrotask(() => document.body.append(detached));
}}>분리된 루트</Button>);
