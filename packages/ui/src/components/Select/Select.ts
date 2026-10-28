import css from '@h_designsystem/foundation/components/Select.css?inline';
import { componentStyles } from '../../shared/styles';
import { html, nothing, type PropertyValues } from 'lit';
import { FormControlElement } from '../../shared/form-control';
import { styleId } from '../../shared/style-id';
import type { Shape } from '../../shared/types';
import arrow from '@h_designsystem/foundation/icons/icon_chevron_down_light.svg?inline';
export class HSelect extends FormControlElement {
  static styles = /* @__PURE__ */ componentStyles(css);
  static properties = { ...FormControlElement.properties, variant: { type: String }, shape: { type: String } };
  declare variant: 'filled' | 'outline';
  declare shape: Shape;
  private optionsSignature = '';
  constructor() { super(); this.variant = 'outline'; this.shape = 'square'; }
  protected override updated(changed: PropertyValues) {
    const node = this.control as HTMLSelectElement | null;
    // 네이티브 select는 슬롯의 option을 인식하지 않으므로 안전한 DOM 복제만 수행합니다.
    const options = Array.from(this.children).filter(child => child.matches('option,optgroup'));
    const signature = options.map(child => child.outerHTML).join('');
    if (node && signature !== this.optionsSignature) {
      this.optionsSignature = signature;
      node.replaceChildren(...options.map(child => child.cloneNode(true)));
      const retained = Array.from(node.options).some(option => option.value === this.value);
      if ((!this.valueAssigned && this.defaultValue === undefined) || (!changed.has('value') && !retained)) this.value = node.value;
    }
    super.updated(changed);
  }
  protected override syncForm() {
    super.syncForm();
    // 네이티브 select와 같이 선택 항목이 없으면 제출 값도 없습니다.
    if ((this.control as HTMLSelectElement | null)?.selectedIndex === -1) this.internals.setFormValue(null);
  }
  override formResetCallback() {
    super.formResetCallback();
    if (this.defaultValue === undefined && !this.hasAttribute('value')) {
      const options = Array.from(this.querySelectorAll<HTMLOptionElement>('option'));
      this.value = (options.find(option => option.defaultSelected) ?? options.find(option => !option.disabled))?.value ?? '';
    }
  }
  protected override render() {
    return html`<span class="h_designSystem-Select" data-spec=${styleId('select', this.variant, this.shape !== 'square' && this.shape, this.hasIcon && 'icon', this.effectiveDisabled && 'disabled', this.resolvedSize)}>
      <select data-control ?disabled=${this.effectiveDisabled} @input=${this.handleInput} @change=${this.handleChange}></select>
      ${this.hasIcon ? this.iconSlot() : nothing}<img src=${arrow} alt="" aria-hidden="true">
    </span>${this.descriptionTemplate()}`;
  }
}

declare global { interface HTMLElementTagNameMap { 'h-select': HSelect; } }
