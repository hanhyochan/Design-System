import { html, type PropertyValues } from 'lit';
import { FormControlElement } from '../../shared/form-control';
import { styleId } from '../../shared/style-id';
import { defineElement } from '../../register';
export class HAutoHeightTextArea extends FormControlElement {
  private readonly nativeSizing = CSS.supports('field-sizing', 'content');
  private lastWidth = -1;
  private resizeObserver?: ResizeObserver;
  private resizeFrame = 0;
  constructor() { super(); this.rows = 1; }
  override connectedCallback() {
    super.connectedCallback();
    if (this.hasUpdated && !this.nativeSizing) this.requestUpdate();
  }
  private resize() {
    const node = this.control;
    if (!node) return;
    this.lastWidth = node.clientWidth;
    node.style.height = 'auto';
    const style = getComputedStyle(node);
    node.style.height = `${node.scrollHeight + parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth)}px`;
  }
  protected override updated(changed: PropertyValues) {
    super.updated(changed);
    // 지원 브라우저는 CSS에 맡깁니다. JS 보완도 값 반영 후 한 번만 측정합니다.
    if (this.nativeSizing || !this.control) return;
    this.resize();
    if (!this.resizeObserver) {
      this.resizeObserver = new ResizeObserver(() => {
        if (!this.control || this.control.clientWidth === this.lastWidth || this.resizeFrame) return;
        // 관찰 콜백 안에서 높이를 바꾸면 ResizeObserver 순환 경고가 생깁니다.
        this.resizeFrame = requestAnimationFrame(() => {
          this.resizeFrame = 0;
          if (this.control && this.control.clientWidth !== this.lastWidth) this.resize();
        });
      });
      this.resizeObserver.observe(this.control);
    }
  }
  override disconnectedCallback() {
    cancelAnimationFrame(this.resizeFrame);
    this.resizeFrame = 0;
    this.resizeObserver?.disconnect();
    this.resizeObserver = undefined;
    super.disconnectedCallback();
  }
  protected override render() {
    return html`<textarea data-control class="h_designSystem-AutoHeightTextArea" ?disabled=${this.effectiveDisabled} data-spec=${styleId('textarea_auto', this.resolvedSize)} @input=${this.handleInput} @change=${this.handleChange}></textarea>${this.descriptionTemplate()}`;
  }
}
defineElement('h-auto-height-text-area', HAutoHeightTextArea);

declare global { interface HTMLElementTagNameMap { 'h-auto-height-text-area': HAutoHeightTextArea; } }
