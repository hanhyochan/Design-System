import css from '@h_designsystem/foundation/components/UnderlineTextInput.css?inline';
import { componentStyles } from '../../shared/styles';
import { html } from 'lit';
import { FormControlElement } from '../../shared/form-control';
import { styleId } from '../../shared/style-id';
export class HUnderlineTextInput extends FormControlElement {
  static styles = /* @__PURE__ */ componentStyles(css);
  static properties = { ...FormControlElement.properties, variant: { type: String, reflect: true } };
  declare variant: 'fluid' | 'fixed' | 'search' | 'search-wide';
  constructor() { super(); this.variant = 'fluid'; }
  protected override render() {
    return html`<input data-control class="h_designSystem-UnderlineTextInput" type=${this.type === 'text' && this.variant.startsWith('search') ? 'search' : this.type}
      data-spec=${styleId('text_input_underline', this.variant !== 'fluid' && this.variant, this.resolvedSize)} ?disabled=${this.effectiveDisabled}
      @input=${this.handleInput} @change=${this.handleChange} @keydown=${this.handleKeydown}>${this.descriptionTemplate()}`;
  }
}

declare global { interface HTMLElementTagNameMap { 'h-underline-text-input': HUnderlineTextInput; } }
