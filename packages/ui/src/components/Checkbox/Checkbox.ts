import { html } from 'lit';
import { FormControlElement } from '../../shared/form-control';
import { styleId } from '../../shared/style-id';
import { defineElement } from '../../register';
import check from '@h_designsystem/foundation/icons/icon_check_1.svg?inline';
export class HCheckbox extends FormControlElement {
  static properties = { ...FormControlElement.properties, shape: { type: String } };
  declare shape: 'square' | 'round';
  constructor() { super(); this.type = 'checkbox'; this.shape = 'square'; }
  protected override render() {
    return html`<span class="h_designSystem-Checkbox" data-spec=${styleId('checkbox', this.shape === 'round' && 'round', this.effectiveDisabled && 'disabled', this.resolvedSize)}><input data-control type="checkbox" ?disabled=${this.effectiveDisabled} @input=${this.handleInput} @change=${this.handleChange}><img src=${check} alt="" aria-hidden="true"></span>${this.descriptionTemplate()}`;
  }
}
defineElement('h-checkbox', HCheckbox);

declare global { interface HTMLElementTagNameMap { 'h-checkbox': HCheckbox; } }
