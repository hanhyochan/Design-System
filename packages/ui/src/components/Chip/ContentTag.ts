import css from '@h_designsystem/foundation/components/ContentTag.css?inline';
import { componentStyles } from '../../shared/styles';
import { html } from 'lit';
import { HElement } from '../../shared/element';
import { styleId } from '../../shared/style-id';
export class HContentTag extends HElement {
  static styles = /* @__PURE__ */ componentStyles(css);
  protected override render() { return html`<span class="h_designSystem-ContentTag" data-spec=${styleId('chip_content', this.resolvedSize)}><slot></slot></span>`; }
}

declare global { interface HTMLElementTagNameMap { 'h-content-tag': HContentTag; } }
