import { ContextRoot } from '@lit/context';

// HTML이 먼저 존재할 때 자식이 부모보다 먼저 등록되어도 Field/Tabs를 연결합니다.
const contextRoot = new ContextRoot();
contextRoot.attach(document.documentElement);

/** 각 공개 모듈에서 필요한 태그만 등록하며 중복 import는 허용합니다. */
export function defineElement(name: string, element: CustomElementConstructor) {
  if (!customElements.get(name)) customElements.define(name, element);
}
