import { html } from 'lit';
import { ButtonElement } from '../../shared/form-control';
import { styleId } from '../../shared/style-id';
import { defineElement } from '../../register';
export class HChip extends ButtonElement {
  static properties = { ...ButtonElement.properties, variant: { type: String } };
  declare variant: 'filled' | 'outline';
  constructor() { super(); this.variant = 'filled'; }
  protected override render() {
    return html`<button data-control class="h_designSystem-Chip" type="button" ?disabled=${this.effectiveDisabled} @click=${this.activate} data-spec=${styleId('chip', this.variant, this.effectiveDisabled && 'disabled', this.resolvedSize)}><slot></slot></button>`;
  }
}
defineElement('h-chip', HChip);

declare global { interface HTMLElementTagNameMap { 'h-chip': HChip; } }
