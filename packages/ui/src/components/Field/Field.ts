import css from '@h_designsystem/foundation/components/Field.css?inline';
import { componentStyles } from '../../shared/styles';
import { ContextProvider } from '@lit/context';
import { html, nothing, type PropertyValues } from 'lit';
import { HElement } from '../../shared/element';
import { fieldContext } from './Field.context';
export class HField extends HElement {
  static styles = /* @__PURE__ */ componentStyles(css);
  static properties = { label: { type: String }, description: { type: String }, error: { type: String }, messageColor: { type: String, attribute: 'message-color' }, htmlFor: { type: String, attribute: 'for' } };
  declare label?: string;
  declare description?: string;
  declare error?: string;
  declare messageColor?: 'red' | 'green' | 'blue';
  declare htmlFor?: string;
  private readonly context = new ContextProvider(this, { context: fieldContext, initialValue: { label: '', description: '', invalid: false } });
  protected override willUpdate(changed: PropertyValues) {
    super.willUpdate(changed);
    const label = this.label ?? this.querySelector('[slot="label"]')?.textContent ?? '';
    const description = this.error || this.description || '';
    const invalid = !!this.error;
    const previous = this.context.value;
    // 문구 색상 등 표시만 바뀔 때는 자식 입력의 갱신을 유발하지 않습니다.
    if (previous.label !== label || previous.description !== description || previous.invalid !== invalid) {
      this.context.setValue({ label, description, invalid });
    }
  }
  private focusInput() {
    const root = this.getRootNode() as Document | ShadowRoot;
    const target = this.htmlFor ? root.getElementById?.(this.htmlFor) : this.querySelector<HTMLElement>('h-text-input, h-underline-text-input, h-text-area, h-auto-height-text-area, h-select');
    target?.focus();
  }
  protected override render() {
    const message = this.error || this.description;
    return html`<div class="h_designSystem-Field">
      ${this.label || this.querySelector('[slot="label"]') ? html`<label class="h_designSystem-Field-label" @click=${this.focusInput}><slot name="label">${this.label}</slot></label>` : nothing}
      <slot></slot>
      <div class="h_designSystem-Field-live" aria-live="polite" aria-atomic="true">${message ? html`<span class="h_designSystem-Field-message" data-error=${!!this.error} data-color=${this.messageColor ?? (this.error ? 'red' : 'blue')}>${message}</span>` : nothing}</div>
    </div>`;
  }
}

declare global { interface HTMLElementTagNameMap { 'h-field': HField; } }
