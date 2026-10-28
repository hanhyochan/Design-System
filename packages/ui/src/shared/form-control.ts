import { ContextConsumer } from '@lit/context';
import { html, nothing, type PropertyValues } from 'lit';
import { HElement } from './element';
import { fieldContext } from '../components/Field/Field.context';
import { forwardChange } from './events';

type NativeControl = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

/** 내부 입력을 외부 form의 값·검증·초기화에 연결합니다. */
export abstract class FormControlElement extends HElement {
  static formAssociated = true;
  static properties = {
    ...HElement.properties,
    value: { type: String, noAccessor: true }, checked: { type: Boolean, noAccessor: true },
    defaultValue: { type: String, attribute: 'default-value' }, defaultChecked: { type: Boolean, attribute: 'default-checked' },
    name: { type: String, reflect: true }, disabled: { type: Boolean, reflect: true },
    readOnly: { type: Boolean, attribute: 'readonly', reflect: true }, required: { type: Boolean, reflect: true },
    placeholder: { type: String }, type: { type: String }, pattern: { type: String },
    minLength: { type: Number, attribute: 'minlength' }, maxLength: { type: Number, attribute: 'maxlength' },
    min: { type: String }, max: { type: String }, step: { type: String },
    autoComplete: { type: String, attribute: 'autocomplete' }, autoFocus: { type: Boolean, attribute: 'autofocus' },
    rows: { type: Number }, cols: { type: Number }, wrap: { type: String },
    focused: { state: true }, fieldDisabled: { state: true },
  };
  declare defaultValue?: string;
  declare defaultChecked?: boolean;
  declare name: string;
  declare disabled: boolean;
  declare readOnly: boolean;
  declare required: boolean;
  declare placeholder?: string;
  declare type: string;
  declare pattern?: string;
  declare minLength?: number;
  declare maxLength?: number;
  declare min?: string;
  declare max?: string;
  declare step?: string;
  declare autoComplete?: string;
  declare autoFocus?: boolean;
  declare rows?: number;
  declare cols?: number;
  declare wrap?: string;
  protected declare focused: boolean;
  protected declare fieldDisabled: boolean;
  protected readonly internals = this.attachInternals();
  protected readonly field = new ContextConsumer(this, { context: fieldContext, subscribe: true });
  private storedValue = '';
  private storedChecked = false;
  protected valueAssigned = false;
  private checkedAssigned = false;
  private initialized = false;
  protected customError = '';
  private autofocusApplied = false;
  constructor() {
    super();
    this.name = ''; this.disabled = false; this.readOnly = false; this.required = false;
    this.type = 'text'; this.focused = false; this.fieldDisabled = false;
  }
  get value() { return this.storedValue; }
  set value(next: string) {
    const old = this.storedValue;
    this.storedValue = String(next ?? ''); this.valueAssigned = true; this.requestUpdate('value', old);
  }
  get checked() { return this.storedChecked; }
  set checked(next: boolean) {
    const old = this.storedChecked;
    this.storedChecked = Boolean(next); this.checkedAssigned = true; this.requestUpdate('checked', old);
  }
  override get control(): NativeControl | null { return super.control as NativeControl | null; }
  get form() { return this.internals.form; }
  get validity() { return this.internals.validity; }
  get validationMessage() { return this.internals.validationMessage; }
  get willValidate() { return this.internals.willValidate; }
  get labels() { return this.internals.labels; }
  get effectiveDisabled() { return this.disabled || this.fieldDisabled; }
  protected get choice() { return this.type === 'checkbox' || this.type === 'radio'; }
  protected get invalid() { return !!this.field.value?.invalid || this.getAttribute('aria-invalid') === 'true'; }
  private referencedText(attribute: string) {
    const root = this.getRootNode() as Document | ShadowRoot;
    return (this.getAttribute(attribute) ?? '').split(/\s+/).map(id => root.getElementById?.(id)?.textContent?.trim()).filter(Boolean).join(' ');
  }
  protected override get accessibleLabel() {
    return this.getAttribute('aria-label') ?? (this.referencedText('aria-labelledby') || this.field.value?.label || Array.from(this.labels).map(label => label.textContent?.trim()).filter(Boolean).join(' '));
  }
  protected get description() {
    return [...new Set([this.referencedText('aria-describedby'), this.field.value?.description].filter(Boolean))].join(' ');
  }
  protected descriptionTemplate() {
    return this.description ? html`<span id="h-description" class="h_designSystem-description">${this.description}</span>` : nothing;
  }
  protected override willUpdate(changed: PropertyValues) {
    super.willUpdate(changed);
    if (!this.initialized) {
      if (!this.valueAssigned) this.storedValue = this.defaultValue ?? (this.choice ? 'on' : '');
      if (!this.checkedAssigned) this.storedChecked = this.defaultChecked ?? false;
      this.initialized = true;
    }
  }
  protected override updated(changed: PropertyValues) {
    super.updated(changed);
    const node = this.control;
    if (!node) return;
    if (node.disabled !== this.effectiveDisabled) node.disabled = this.effectiveDisabled;
    if (node.required !== this.required) node.required = this.required;
    if ('readOnly' in node && node.readOnly !== this.readOnly) node.readOnly = this.readOnly;
    if (this.choice && node instanceof HTMLInputElement && node.checked !== this.checked) node.checked = this.checked;
    if (node.value !== this.value) node.value = this.value;
    const attributes: Record<string, string | number | undefined> = {
      name: this.name, placeholder: this.placeholder, pattern: this.pattern,
      minlength: this.minLength, maxlength: this.maxLength, min: this.min, max: this.max, step: this.step,
      autocomplete: this.autoComplete, inputmode: this.getAttribute('inputmode') ?? undefined,
      rows: this.rows, cols: this.cols, wrap: this.wrap,
      'aria-invalid': this.invalid ? 'true' : (this.getAttribute('aria-invalid') ?? undefined),
      'aria-describedby': this.description ? 'h-description' : undefined,
    };
    for (const [name, value] of Object.entries(attributes)) {
      const next = value === undefined ? null : String(value);
      if (node.getAttribute(name) === next) continue;
      if (next === null) node.removeAttribute(name); else node.setAttribute(name, next);
    }
    node.setCustomValidity(this.customError);
    this.syncForm();
    if (this.autoFocus && !this.autofocusApplied) { this.autofocusApplied = true; this.focus(); }
  }
  protected syncForm() {
    const node = this.control;
    this.internals.setFormValue(this.effectiveDisabled || (this.choice && !this.checked) ? null : this.value, JSON.stringify({ value: this.value, checked: this.checked }));
    if (!node || this.effectiveDisabled || this.readOnly) { this.internals.setValidity({}); return; }
    const flags: ValidityStateFlags = {};
    for (const key of ['badInput', 'customError', 'patternMismatch', 'rangeOverflow', 'rangeUnderflow', 'stepMismatch', 'tooLong', 'tooShort', 'typeMismatch', 'valueMissing'] as const) flags[key] = node.validity[key];
    this.internals.setValidity(flags, node.validationMessage, node);
  }
  protected handleInput(event: Event) {
    const node = event.target as NativeControl;
    this.value = node.value;
    if (this.choice && node instanceof HTMLInputElement) this.checked = node.checked;
    this.syncForm();
  }
  protected handleChange(event: Event) { this.handleInput(event); forwardChange(this, event); }
  protected handleFocus() { this.focused = true; }
  protected handleBlur(event: FocusEvent) { if (!this.renderRoot.contains(event.relatedTarget as Node | null)) this.focused = false; }
  formAssociatedCallback() { this.requestUpdate(); }
  formDisabledCallback(disabled: boolean) { this.fieldDisabled = disabled; }
  formResetCallback() {
    this.value = this.defaultValue ?? this.getAttribute('value') ?? (this.choice ? 'on' : '');
    this.checked = this.defaultChecked ?? this.hasAttribute('checked'); this.requestUpdate();
  }
  formStateRestoreCallback(state: string | File | FormData) {
    if (typeof state !== 'string') return;
    try { const value = JSON.parse(state); this.value = value.value; this.checked = value.checked; }
    catch { this.value = state; }
  }
  setCustomValidity(message: string) { this.customError = message; this.control?.setCustomValidity(message); this.syncForm(); }
  checkValidity() { this.syncForm(); return this.internals.checkValidity(); }
  reportValidity() { this.syncForm(); return this.internals.reportValidity(); }
  protected handleKeydown(event: KeyboardEvent) {
    if (event.key !== 'Enter' || event.isComposing || event.defaultPrevented || this.choice || !this.form || !(event.target instanceof HTMLInputElement)) return;
    const submitter = Array.from(this.form.elements).find(element => {
      const candidate = element as HTMLButtonElement;
      return candidate.type === 'submit' && !candidate.disabled;
    }) as HTMLElement | undefined;
    if (submitter) { event.preventDefault(); submitter.click(); }
    else {
      const blocking = Array.from(this.form.elements).filter(element => {
        const control = element instanceof FormControlElement ? element.control : element;
        return control instanceof HTMLInputElement && ['text','search','url','tel','email','password','date','month','week','time','datetime-local','number'].includes(control.type);
      });
      if (blocking.length === 1) { event.preventDefault(); HTMLFormElement.prototype.requestSubmit.call(this.form); }
    }
  }
}

/** 네이티브 submitter로 제출 버튼의 name/value와 form* 옵션도 전달합니다. */
export class ButtonElement extends HElement {
  static formAssociated = true;
  static properties = { ...HElement.properties, disabled: { type: Boolean, reflect: true }, type: { type: String }, name: { type: String }, value: { type: String }, fieldDisabled: { state: true } };
  declare disabled: boolean;
  declare type: 'button' | 'submit' | 'reset';
  declare name: string;
  declare value: string;
  protected declare fieldDisabled: boolean;
  protected readonly internals = this.attachInternals();
  constructor() { super(); this.disabled = false; this.type = 'button'; this.name = ''; this.value = ''; this.fieldDisabled = false; }
  get effectiveDisabled() { return this.disabled || this.fieldDisabled; }
  get form() { return this.internals.form; }
  formDisabledCallback(disabled: boolean) { this.fieldDisabled = disabled; }
  override click() { if (!this.effectiveDisabled) this.control?.click(); }
  protected activate(event: MouseEvent) {
    if (this.effectiveDisabled) { event.preventDefault(); event.stopImmediatePropagation(); return; }
    // 바깥 프로젝트의 click 핸들러까지 전파된 뒤 preventDefault 여부를 확인합니다.
    setTimeout(() => {
      if (event.defaultPrevented || !this.form) return;
      if (this.type === 'reset') { HTMLFormElement.prototype.reset.call(this.form); return; }
      if (this.type !== 'submit') return;
      const submitter = this.ownerDocument.createElement('button');
      submitter.hidden = true; submitter.type = 'submit'; submitter.name = this.name; submitter.value = this.value;
      for (const attribute of ['formaction', 'formenctype', 'formmethod', 'formnovalidate', 'formtarget']) if (this.hasAttribute(attribute)) submitter.setAttribute(attribute, this.getAttribute(attribute)!);
      this.form.append(submitter);
      try { HTMLFormElement.prototype.requestSubmit.call(this.form, submitter); } finally { submitter.remove(); }
    }, 0);
  }
}
