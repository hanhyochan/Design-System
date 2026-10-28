import { ContextConsumer } from '@lit/context';
import { html, nothing, type PropertyValues } from 'lit';
import { ButtonElement } from '../../shared/form-control';
import { styleId } from '../../shared/style-id';
import type { Shape } from '../../shared/types';
import { tabContext } from './Tab.context';
import { defineElement } from '../../register';
export class HTab extends ButtonElement {
  static shadowRootOptions = { ...ButtonElement.shadowRootOptions, delegatesFocus: false };
  static properties = { ...ButtonElement.properties, value: { type: String, reflect: true }, variant: { type: String }, shape: { type: String } };
  declare variant: 'filled' | 'outline' | 'gray-line-outline';
  declare shape: Shape;
  private readonly tabs = new ContextConsumer(this, { context: tabContext, subscribe: true });
  constructor() {
    super(); this.variant = 'filled'; this.shape = 'square';
    this.addEventListener('keydown', event => { if (!event.defaultPrevented && [' ', 'Enter'].includes(event.key)) { event.preventDefault(); this.click(); } });
  }
  override focus(options?: FocusOptions) { HTMLElement.prototype.focus.call(this, options); }
  private select(event: MouseEvent) { if (!this.effectiveDisabled) setTimeout(() => { if (!event.defaultPrevented) this.tabs.value?.select(this.value); }, 0); }
  protected override updated(changed: PropertyValues) {
    super.updated(changed);
    const tabs = this.tabs.value;
    if (!tabs) return;
    this.id = `${tabs.id}-tab-${encodeURIComponent(this.value)}`;
    this.setAttribute('role', 'tab');
    this.setAttribute('aria-selected', String(tabs.value === this.value));
    this.setAttribute('aria-controls', `${tabs.id}-panel-${encodeURIComponent(this.value)}`);
    this.setAttribute('aria-disabled', String(this.effectiveDisabled));
    this.tabIndex = !this.effectiveDisabled && tabs.value === this.value ? 0 : -1;
  }
  protected override render() {
    return html`<button data-control type="button" role="presentation" tabindex="-1" ?disabled=${this.effectiveDisabled} class="h_designSystem-Tab" aria-selected=${this.tabs.value?.value === this.value}
      data-spec=${styleId('tab', this.variant, this.shape !== 'square' && this.shape, this.hasIcon && 'icon', this.effectiveDisabled && 'disabled', this.resolvedSize)} @click=${this.select}>${this.hasIcon ? this.iconSlot() : nothing}<slot></slot></button>`;
  }
}
defineElement('h-tab', HTab);

declare global { interface HTMLElementTagNameMap { 'h-tab': HTab; } }
