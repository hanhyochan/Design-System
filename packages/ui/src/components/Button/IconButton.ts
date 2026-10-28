import css from '@h_designsystem/foundation/components/IconButton.css?inline';
import { componentStyles } from '../../shared/styles';
import { html, nothing } from 'lit';
import { ButtonElement } from '../../shared/form-control';
import { styleId } from '../../shared/style-id';
import type { Shape } from '../../shared/types';

const aliases: Record<number, string> = { 8: 'small', 16: 'medium', 24: 'large', 40: 'xlarge' };
export class HIconButton extends ButtonElement {
  static styles = /* @__PURE__ */ componentStyles(css);
  static properties = { ...ButtonElement.properties, variant: { type: String }, shape: { type: String } };
  declare variant: 'filled' | 'outline';
  declare shape: Shape;
  constructor() { super(); this.variant = 'outline'; this.shape = 'square'; }
  override get resolvedSize() { return this.responsive.resolve(this.size, this.variant === 'filled' ? 16 : 'medium'); }
  protected override render() {
    const size = this.resolvedSize;
    const active = !!this.querySelector('[slot="active-icon"]');
    return html`<button data-control class="h_designSystem-IconButton" type="button" ?disabled=${this.effectiveDisabled} @click=${this.activate}
      data-spec=${styleId('btn_icon', this.variant, this.variant !== 'filled' && this.shape !== 'square' && this.shape, this.effectiveDisabled && 'disabled', typeof size === 'number' ? aliases[size] ?? size : size)}>
      <span class="h_designSystem-icon" aria-hidden="true" data-has-active=${active}>
        <span class="h_designSystem-icon-default"><slot name="icon"></slot></span>
        ${active ? html`<span class="h_designSystem-icon-active"><slot name="active-icon"></slot></span>` : nothing}
      </span>
    </button>`;
  }
}

declare global { interface HTMLElementTagNameMap { 'h-icon-button': HIconButton; } }
