import css from '@h_designsystem/foundation/components/Hashtag.css?inline';
import { componentStyles } from '../../shared/styles';
import { html } from 'lit';
import { HElement } from '../../shared/element';
import { styleId } from '../../shared/style-id';
export class HHashtag extends HElement {
  static styles = /* @__PURE__ */ componentStyles(css);
  protected override render() { return html`<span class="h_designSystem-Hashtag" data-spec=${styleId('hashtag', this.resolvedSize)}><slot></slot></span>`; }
}

declare global { interface HTMLElementTagNameMap { 'h-hashtag': HHashtag; } }
