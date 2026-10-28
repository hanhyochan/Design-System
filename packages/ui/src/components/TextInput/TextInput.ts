import { html, nothing } from 'lit';
import { FormControlElement } from '../../shared/form-control';
import { styleId } from '../../shared/style-id';
import type { Shape } from '../../shared/types';
import { defineElement } from '../../register';
import check from '@h_designsystem/foundation/icons/icon_check_1.svg?inline';
import eye from '@h_designsystem/foundation/icons/icon_eye_1.svg?inline';
import eyeOff from '@h_designsystem/foundation/icons/icon_eye_off_1.svg?inline';

export class HTextInput extends FormControlElement {
  static properties = { ...FormControlElement.properties, variant: { type: String }, shape: { type: String }, status: { type: String }, visible: { state: true } };
  declare variant: 'filled' | 'outline';
  declare shape: Shape;
  declare status: 'default' | 'complete' | 'error';
  private declare visible: boolean;
  constructor() { super(); this.variant = 'outline'; this.shape = 'square'; this.status = 'default'; this.visible = false; }
  protected override get invalid() { return this.status === 'error' || super.invalid; }
  protected override render() {
    const state = this.effectiveDisabled ? 'disabled' : this.readOnly ? 'view' : this.invalid ? 'error' : this.focused ? 'focus' : this.status === 'complete' ? 'complete' : this.type === 'password' ? 'password' : 'default';
    return html`<span class="h_designSystem-TextInput" data-disabled=${this.effectiveDisabled || nothing} data-password=${this.type === 'password' || nothing}
      data-spec=${styleId('text_input', this.variant, this.shape !== 'square' && this.shape, state !== 'default' && state, this.resolvedSize)} @focusout=${this.handleBlur}>
      <input data-control type=${this.type === 'password' && this.visible ? 'text' : this.type} ?disabled=${this.effectiveDisabled}
        @input=${this.handleInput} @change=${this.handleChange} @focus=${this.handleFocus} @keydown=${this.handleKeydown}>
      ${this.type === 'password' ? html`<button class="h_designSystem-password-action h_designSystem-icon" type="button" ?disabled=${this.effectiveDisabled} aria-label=${this.visible ? '비밀번호 숨기기' : '비밀번호 표시'} aria-pressed=${this.visible} @click=${() => { this.visible = !this.visible; }}><img src=${this.visible ? eyeOff : eye} alt=""></button>`
        : this.status === 'complete' && !this.effectiveDisabled && !this.invalid ? html`<img class="h_designSystem-icon" src=${check} alt="" aria-hidden="true">` : nothing}
    </span>${this.descriptionTemplate()}`;
  }
}
defineElement('h-text-input', HTextInput);

declare global { interface HTMLElementTagNameMap { 'h-text-input': HTextInput; } }
