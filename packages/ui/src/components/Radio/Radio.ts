import css from '@h_designsystem/foundation/components/Radio.css?inline';
import { componentStyles } from '../../shared/styles';
import { html, type PropertyValues } from 'lit';
import { FormControlElement } from '../../shared/form-control';
import { styleId } from '../../shared/style-id';
import { radioGroup, registerRadio } from './Radio.group';
export class HRadio extends FormControlElement {
  static styles = /* @__PURE__ */ componentStyles(css);
  private unregister?: () => void;
  constructor() { super(); this.type = 'radio'; }
  override connectedCallback() { super.connectedCallback(); this.unregister = registerRadio(this); }
  override disconnectedCallback() { this.unregister?.(); super.disconnectedCallback(); }
  protected override updated(changed: PropertyValues) {
    if (this.checked && (changed.has('checked') || changed.has('name'))) {
      for (const radio of radioGroup(this)) if (radio !== this && radio.checked) radio.checked = false;
    }
    super.updated(changed);
    const group = radioGroup(this);
    for (const radio of group) radio.syncGroup(group);
  }
  private syncGroup(group = radioGroup(this)) {
    const control = this.control;
    if (!control) return;
    const enabled = group.filter(radio => !radio.effectiveDisabled);
    const selected = enabled.find(radio => radio.checked);
    control.tabIndex = (selected ?? enabled[0]) === this ? 0 : -1;
    const missing = group.some(radio => radio.required) && !group.some(radio => radio.checked);
    this.internals.setValidity(this.effectiveDisabled ? {} : { valueMissing: missing, customError: !!this.customError }, this.customError || (missing ? '항목을 선택해 주세요.' : ''), control);
  }
  protected override syncForm() { super.syncForm(); this.syncGroup(); }
  private move(event: KeyboardEvent) {
    if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) return;
    event.preventDefault();
    const group = radioGroup(this).filter(radio => !radio.effectiveDisabled);
    const direction = ['ArrowLeft', 'ArrowUp'].includes(event.key) ? -1 : 1;
    const target = group[(group.indexOf(this) + direction + group.length) % group.length];
    target?.focus(); target?.control?.click();
  }
  protected override render() {
    return html`<input data-control class="h_designSystem-Radio" type="radio" ?disabled=${this.effectiveDisabled} data-spec=${styleId('radio', this.effectiveDisabled && 'disabled', this.resolvedSize)} @input=${this.handleInput} @change=${this.handleChange} @keydown=${this.move}>${this.descriptionTemplate()}`;
  }
}

declare global { interface HTMLElementTagNameMap { 'h-radio': HRadio; } }
