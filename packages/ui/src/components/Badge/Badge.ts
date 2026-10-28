import { html } from 'lit';
import { HElement } from '../../shared/element';
import { styleId } from '../../shared/style-id';
import { defineElement } from '../../register';
export class HBadge extends HElement {
  static properties = { ...HElement.properties, variant: { type: String } };
  declare variant: 'filled' | 'outline';
  constructor() { super(); this.variant = 'filled'; }
  protected override render() { return html`<span class="h_designSystem-Badge" data-spec=${styleId('badge', this.variant, this.resolvedSize)}><slot></slot></span>`; }
}
defineElement('h-badge', HBadge);

declare global { interface HTMLElementTagNameMap { 'h-badge': HBadge; } }
