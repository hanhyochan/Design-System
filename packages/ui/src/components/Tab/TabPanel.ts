import { ContextConsumer } from '@lit/context';
import { html, type PropertyValues } from 'lit';
import { HElement } from '../../shared/element';
import { tabContext } from './Tab.context';
import { defineElement } from '../../register';
export class HTabPanel extends HElement {
  static properties = { value: { type: String, reflect: true } };
  declare value: string;
  private readonly tabs = new ContextConsumer(this, { context: tabContext, subscribe: true });
  constructor() { super(); this.value = ''; }
  protected override updated(changed: PropertyValues) {
    super.updated(changed);
    const tabs = this.tabs.value;
    if (!tabs) return;
    this.id = `${tabs.id}-panel-${encodeURIComponent(this.value)}`;
    this.setAttribute('role', 'tabpanel');
    this.setAttribute('aria-labelledby', `${tabs.id}-tab-${encodeURIComponent(this.value)}`);
    this.hidden = tabs.value !== this.value; this.tabIndex = 0;
  }
  protected override render() { return html`<slot></slot>`; }
}
defineElement('h-tab-panel', HTabPanel);

declare global { interface HTMLElementTagNameMap { 'h-tab-panel': HTabPanel; } }
