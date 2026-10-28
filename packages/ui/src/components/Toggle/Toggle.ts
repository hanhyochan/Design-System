import css from '@h_designsystem/foundation/components/Toggle.css?inline';
import { componentStyles } from '../../shared/styles';
import { html } from 'lit';
import { FormControlElement } from '../../shared/form-control';
import { styleId } from '../../shared/style-id';
export class HToggle extends FormControlElement {
  static styles = /* @__PURE__ */ componentStyles(css);
  constructor() { super(); this.type = 'checkbox'; }
  protected override render() {
    return html`<span class="h_designSystem-Toggle" data-spec=${styleId('toggle', this.effectiveDisabled ? 'disabled' : 'off', this.resolvedSize)}><input data-control type="checkbox" role="switch" ?disabled=${this.effectiveDisabled} @input=${this.handleInput} @change=${this.handleChange}></span>${this.descriptionTemplate()}`;
  }
}

declare global { interface HTMLElementTagNameMap { 'h-toggle': HToggle; } }
