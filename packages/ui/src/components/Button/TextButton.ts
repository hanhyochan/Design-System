import css from '@h_designsystem/foundation/components/TextButton.css?inline';
import { componentStyles } from '../../shared/styles';
import { html, nothing } from 'lit';
import { ButtonElement } from '../../shared/form-control';
import { styleId } from '../../shared/style-id';
export class HTextButton extends ButtonElement {
  static styles = /* @__PURE__ */ componentStyles(css);
  protected override render() {
    return html`<button data-control class="h_designSystem-TextButton" type="button" ?disabled=${this.effectiveDisabled} @click=${this.activate} data-spec=${styleId('btn_text', this.hasIcon && 'icon', this.resolvedSize)}><slot></slot>${this.hasIcon ? this.iconSlot() : nothing}</button>`;
  }
}

declare global { interface HTMLElementTagNameMap { 'h-text-button': HTextButton; } }
