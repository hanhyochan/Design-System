import css from '@h_designsystem/foundation/components/TextArea.css?inline';
import { componentStyles } from '../../shared/styles';
import { html, nothing } from 'lit';
import { FormControlElement } from '../../shared/form-control';
import { styleId } from '../../shared/style-id';
export class HTextArea extends FormControlElement {
  static styles = /* @__PURE__ */ componentStyles(css);
  static properties = { ...FormControlElement.properties, variant: { type: String }, shape: { type: String }, status: { type: String }, inquiry: { type: Boolean } };
  declare variant: 'filled' | 'outline';
  declare shape: 'square' | 'rounded';
  declare status: 'default' | 'error';
  declare inquiry: boolean;
  constructor() { super(); this.variant = 'outline'; this.shape = 'square'; this.status = 'default'; this.inquiry = false; }
  protected override get invalid() { return this.status === 'error' || super.invalid; }
  protected override render() {
    const state = this.effectiveDisabled ? 'disabled' : this.readOnly ? 'view' : this.invalid ? 'error' : this.focused ? 'focus' : this.inquiry ? 'inquiry' : 'default';
    return html`<textarea data-control class="h_designSystem-TextArea" ?disabled=${this.effectiveDisabled} data-inquiry=${this.inquiry || nothing}
      data-spec=${styleId('textarea', this.variant, this.shape !== 'square' && this.shape, state !== 'default' && state, this.resolvedSize)}
      @input=${this.handleInput} @change=${this.handleChange} @focus=${this.handleFocus} @blur=${this.handleBlur}></textarea>${this.descriptionTemplate()}`;
  }
}

declare global { interface HTMLElementTagNameMap { 'h-text-area': HTextArea; } }
