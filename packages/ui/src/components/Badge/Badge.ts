import css from '@h_designsystem/foundation/components/Badge.css?inline';
import { componentStyles } from '../../shared/styles';
import { html } from 'lit';
import { HElement } from '../../shared/element';
import { styleId } from '../../shared/style-id';
export class HBadge extends HElement {
  static styles = /* @__PURE__ */ componentStyles(css);
  static properties = { ...HElement.properties, variant: { type: String } };
  declare variant: 'filled' | 'outline';
  constructor() { super(); this.variant = 'filled'; }
  protected override render() { return html`<span class="h_designSystem-Badge" data-spec=${styleId('badge', this.variant, this.resolvedSize)}><slot></slot></span>`; }
}

declare global { interface HTMLElementTagNameMap { 'h-badge': HBadge; } }
