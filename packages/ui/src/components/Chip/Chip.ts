import css from '@h_designsystem/foundation/components/Chip.css?inline';
import { componentStyles } from '../../shared/styles';
import { html } from 'lit';
import { ButtonElement } from '../../shared/form-control';
import { styleId } from '../../shared/style-id';
export class HChip extends ButtonElement {
  static styles = /* @__PURE__ */ componentStyles(css);
  static properties = { ...ButtonElement.properties, variant: { type: String } };
  declare variant: 'filled' | 'outline';
  constructor() { super(); this.variant = 'filled'; }
  protected override render() {
    return html`<button data-control class="h_designSystem-Chip" type="button" ?disabled=${this.effectiveDisabled} @click=${this.activate} data-spec=${styleId('chip', this.variant, this.effectiveDisabled && 'disabled', this.resolvedSize)}><slot></slot></button>`;
  }
}

declare global { interface HTMLElementTagNameMap { 'h-chip': HChip; } }
