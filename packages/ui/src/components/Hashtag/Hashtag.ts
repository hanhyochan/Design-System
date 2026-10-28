import { html } from 'lit';
import { HElement } from '../../shared/element';
import { styleId } from '../../shared/style-id';
import { defineElement } from '../../register';
export class HHashtag extends HElement {
  protected override render() { return html`<span class="h_designSystem-Hashtag" data-spec=${styleId('hashtag', this.resolvedSize)}><slot></slot></span>`; }
}
defineElement('h-hashtag', HHashtag);

declare global { interface HTMLElementTagNameMap { 'h-hashtag': HHashtag; } }
