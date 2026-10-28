export type ValueChangeEvent = CustomEvent<{ value: string }>;

export function emitValueChange(host: HTMLElement, value: string): void {
  host.dispatchEvent(new CustomEvent('h-value-change', { detail: { value }, bubbles: true, composed: true }));
}

/** change는 네이티브 Shadow 경계를 넘지 않으므로 한 번만 다시 전달합니다. */
export function forwardChange(host: HTMLElement, event: Event): void {
  event.stopPropagation();
  host.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
}
