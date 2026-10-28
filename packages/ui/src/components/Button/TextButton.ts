import { html, nothing } from 'lit';
import { ButtonElement } from '../../shared/form-control';
import { styleId } from '../../shared/style-id';
import { defineElement } from '../../register';
export class HTextButton extends ButtonElement {
  protected override render() {
    return html`<button data-control class="h_designSystem-TextButton" type="button" ?disabled=${this.effectiveDisabled} @click=${this.activate} data-spec=${styleId('btn_text', this.hasIcon && 'icon', this.resolvedSize)}><slot></slot>${this.hasIcon ? this.iconSlot() : nothing}</button>`;
  }
}
defineElement('h-text-button', HTextButton);

declare global { interface HTMLElementTagNameMap { 'h-text-button': HTextButton; } }
