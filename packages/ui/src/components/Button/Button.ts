import { html, nothing } from 'lit';
import { ButtonElement } from '../../shared/form-control';
import { styleId } from '../../shared/style-id';
import type { Shape } from '../../shared/types';
import { defineElement } from '../../register';

export class HButton extends ButtonElement {
  static properties = { ...ButtonElement.properties, variant: { type: String }, shape: { type: String }, as: { type: String }, href: { type: String }, target: { type: String }, rel: { type: String } };
  declare variant: 'filled' | 'outline';
  declare shape: Shape;
  declare as: 'button' | 'a';
  declare href?: string;
  declare target?: string;
  declare rel?: string;
  constructor() { super(); this.variant = 'filled'; this.shape = 'square'; this.as = 'button'; }
  protected override render() {
    const spec = styleId('btn_primary', this.variant, this.shape !== 'square' && this.shape, this.hasIcon && 'icon', this.effectiveDisabled && 'disabled', this.resolvedSize);
    const content = html`${this.hasIcon ? this.iconSlot() : nothing}<slot></slot>`;
    if (this.as === 'a') return html`<a data-control class="h_designSystem-Button" data-spec=${spec} data-disabled=${this.effectiveDisabled || nothing} href=${this.effectiveDisabled ? nothing : this.href ?? nothing} target=${this.target ?? nothing} rel=${this.rel ?? nothing} aria-disabled=${this.effectiveDisabled || nothing} tabindex=${this.effectiveDisabled ? -1 : 0} @click=${(event: MouseEvent) => { if (this.effectiveDisabled) { event.preventDefault(); event.stopImmediatePropagation(); } }}>${content}</a>`;
    return html`<button data-control class="h_designSystem-Button" data-spec=${spec} data-disabled=${this.effectiveDisabled || nothing} type="button" ?disabled=${this.effectiveDisabled} @click=${this.activate}>${content}</button>`;
  }
}
defineElement('h-button', HButton);

declare global { interface HTMLElementTagNameMap { 'h-button': HButton; } }
