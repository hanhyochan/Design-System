import { html, type PropertyValues } from 'lit';
import { HElement } from '../../shared/element';
import type { HTab } from './Tab';
import { defineElement } from '../../register';
export class HTabList extends HElement {
  static properties = { orientation: { type: String } };
  declare orientation: 'horizontal' | 'vertical';
  constructor() { super(); this.orientation = 'horizontal'; this.addEventListener('keydown', this.move); }
  protected override updated(changed: PropertyValues) { super.updated(changed); this.setAttribute('role', 'tablist'); this.setAttribute('aria-orientation', this.orientation); }
  private move = (event: KeyboardEvent) => {
    if (event.defaultPrevented) return;
    const tabs = Array.from(this.querySelectorAll<HTab>('h-tab')).filter(tab => !tab.disabled && tab.closest('h-tab-list') === this);
    if (!tabs.length) return;
    const current = tabs.indexOf(event.composedPath().find(node => tabs.includes(node as HTab)) as HTab);
    const next = this.orientation === 'horizontal' ? 'ArrowRight' : 'ArrowDown';
    const previous = this.orientation === 'horizontal' ? 'ArrowLeft' : 'ArrowUp';
    const index = event.key === next ? (current + 1) % tabs.length : event.key === previous ? (current - 1 + tabs.length) % tabs.length : event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : -1;
    if (index < 0) return;
    event.preventDefault(); tabs[index].focus(); tabs[index].click();
  };
  protected override render() { return html`<div class="h_designSystem-TabList" aria-orientation=${this.orientation}><slot></slot></div>`; }
}
defineElement('h-tab-list', HTabList);

declare global { interface HTMLElementTagNameMap { 'h-tab-list': HTabList; } }
