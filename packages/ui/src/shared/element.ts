import { LitElement, html, type PropertyValues, type PropertyDeclarations } from 'lit';
import { componentStyles } from './styles';
import { ResponsiveController } from './responsive';
import { responsiveConverter, type ResponsiveValue, type Size } from './types';

/** 모든 요소의 스타일 공유, 크기 선택과 네이티브 요소 접근입니다. */
export class HElement extends LitElement {
  static styles = componentStyles;
  static shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true };
  static properties: PropertyDeclarations = { size: { converter: responsiveConverter } };
  declare size?: ResponsiveValue<Size | number>;
  protected readonly responsive = new ResponsiveController(this, () => this.responsiveValue);
  protected get responsiveValue(): unknown { return this.size; }
  get resolvedSize(): Size | number { return this.responsive.resolve(this.size, 'medium'); }
  get control(): HTMLElement | null { return this.renderRoot.querySelector('[data-control]'); }
  protected get accessibleLabel() { return this.getAttribute('aria-label') ?? ''; }
  override focus(options?: FocusOptions) { this.control?.focus(options); }
  protected get hasIcon() { return !!this.querySelector('[slot="icon"]'); }
  protected iconSlot(name = 'icon') {
    return html`<span class="h_designSystem-icon" aria-hidden="true"><slot name=${name}></slot></span>`;
  }
  private readonly contentObserver = new MutationObserver(records => {
    if (records.some(record => record.type !== 'attributes' || record.oldValue !== (record.target as Element).getAttribute(record.attributeName!))) this.requestUpdate();
  });
  override connectedCallback() {
    super.connectedCallback();
    this.contentObserver.observe(this, {
      childList: true, subtree: true, characterData: true, attributes: true, attributeOldValue: true,
      attributeFilter: ['aria-label', 'aria-labelledby', 'aria-describedby', 'aria-invalid', 'aria-pressed', 'aria-expanded', 'aria-haspopup', 'title', 'slot', 'selected', 'disabled', 'value', 'label', 'id'],
    });
  }
  override disconnectedCallback() { this.contentObserver.disconnect(); super.disconnectedCallback(); }
  protected override updated(_changed: PropertyValues) {
    const size = String(this.resolvedSize);
    if (this.getAttribute('data-size') !== size) this.setAttribute('data-size', size);
    const control = this.control;
    if (!control) return;
    // 같은 속성을 다시 쓰면 MutationObserver도 다시 호출됩니다. 바뀐 값만 전달합니다.
    for (const name of ['title', 'aria-label', 'aria-pressed', 'aria-expanded', 'aria-haspopup']) {
      const value = name === 'aria-label' ? this.accessibleLabel || null : this.getAttribute(name);
      if (control.getAttribute(name) === value) continue;
      if (value !== null) control.setAttribute(name, value);
      else control.removeAttribute(name);
    }
  }
}
