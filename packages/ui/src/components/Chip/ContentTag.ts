import { html } from 'lit';
import { HElement } from '../../shared/element';
import { styleId } from '../../shared/style-id';
import { defineElement } from '../../register';
export class HContentTag extends HElement {
  protected override render() { return html`<span class="h_designSystem-ContentTag" data-spec=${styleId('chip_content', this.resolvedSize)}><slot></slot></span>`; }
}
defineElement('h-content-tag', HContentTag);

declare global { interface HTMLElementTagNameMap { 'h-content-tag': HContentTag; } }
