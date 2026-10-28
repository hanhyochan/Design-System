import { html } from 'lit';
import { FormControlElement } from '../../shared/form-control';
import { styleId } from '../../shared/style-id';
import { defineElement } from '../../register';
export class HToggle extends FormControlElement {
  constructor() { super(); this.type = 'checkbox'; }
  protected override render() {
    return html`<span class="h_designSystem-Toggle" data-spec=${styleId('toggle', this.effectiveDisabled ? 'disabled' : 'off', this.resolvedSize)}><input data-control type="checkbox" role="switch" ?disabled=${this.effectiveDisabled} @input=${this.handleInput} @change=${this.handleChange}></span>${this.descriptionTemplate()}`;
  }
}
defineElement('h-toggle', HToggle);

declare global { interface HTMLElementTagNameMap { 'h-toggle': HToggle; } }
