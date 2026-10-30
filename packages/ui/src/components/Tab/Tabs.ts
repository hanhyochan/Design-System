import css from '@h_designsystem/foundation/components/Tabs.css?inline';
import { componentStyles } from '../../shared/styles';
import { ContextProvider } from '@lit/context';
import { html, type PropertyValues } from 'lit';
import { HElement } from '../../shared/element';
import { emitValueChange } from '../../shared/events';
import { tabContext } from './Tab.context';
let nextId = 0;
export class HTabs extends HElement {
  static styles = /* @__PURE__ */ componentStyles(css);
  static properties = { value: { type: String }, defaultValue: { type: String, attribute: 'default-value' } };
  declare value?: string;
  declare defaultValue?: string;
  readonly tabId = `h-tabs-${++nextId}`;
  private initialized = false;
  private readonly context = new ContextProvider(this, { context: tabContext });
  private readonly selectTab = (value: string) => this.select(value);
  select(value: string) { if (this.value !== value) { this.value = value; emitValueChange(this, value); } }
  protected override willUpdate(changed: PropertyValues) {
    super.willUpdate(changed);
    if (!this.initialized) { this.value ??= this.defaultValue; this.initialized = true; }
    if (!Array.from(this.querySelectorAll('h-tab')).some(tab => tab.getAttribute('value') === this.value && !tab.hasAttribute('disabled'))) {
      this.value = this.querySelector('h-tab:not([disabled])')?.getAttribute('value') ?? this.value;
    }
    const value = this.value ?? '';
    // 선택이 그대로면 탭과 패널에 같은 정보를 다시 알리지 않습니다.
    if (this.context.value?.value !== value) {
      this.context.setValue({ id: this.tabId, value, select: this.selectTab });
    }
  }
  protected override render() { return html`<slot></slot>`; }
}

declare global { interface HTMLElementTagNameMap { 'h-tabs': HTabs; } }
