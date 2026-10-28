import * as React from 'react';
import { createComponent, type EventName } from '@lit/react';
import type { ResponsiveValue, Size } from './types';
import type { HElement } from './element';
import type { ValueChangeEvent } from './events';
import { defineElement } from '../register';

export type ElementEvent<E, T extends Event = Event> = T & { currentTarget: E; target: E };
export type ReactElementProps<E extends HElement, K extends keyof E> =
  Omit<React.HTMLAttributes<E>, K | 'onChange' | 'onInput' | 'onFocus' | 'onBlur'> & Partial<Omit<Pick<E, K>, 'size'>> & ('size' extends K ? { size?: ResponsiveValue<Size> } : {}) & React.RefAttributes<E> & {
    form?: string;
    onChange?: (event: ElementEvent<E>) => void;
    onInput?: (event: ElementEvent<E, InputEvent>) => void;
    onFocus?: (event: ElementEvent<E, FocusEvent>) => void;
    onBlur?: (event: ElementEvent<E, FocusEvent>) => void;
  };
export type InputKeys = 'size' | 'value' | 'defaultValue' | 'disabled' | 'readOnly' | 'required' | 'name' | 'placeholder' | 'type' | 'pattern' | 'minLength' | 'maxLength' | 'min' | 'max' | 'step' | 'autoComplete' | 'autoFocus';
export type TextAreaKeys = 'size' | 'value' | 'defaultValue' | 'disabled' | 'readOnly' | 'required' | 'name' | 'placeholder' | 'minLength' | 'maxLength' | 'autoComplete' | 'autoFocus' | 'rows' | 'cols' | 'wrap';
export type SelectKeys = 'size' | 'value' | 'defaultValue' | 'disabled' | 'required' | 'name' | 'autoComplete' | 'autoFocus';
export type ChoiceKeys = 'size' | 'value' | 'checked' | 'defaultChecked' | 'disabled' | 'required' | 'name' | 'autoFocus';
export type ButtonKeys = 'size' | 'disabled' | 'type' | 'name' | 'value';

/** 공식 Lit 연결 위에 슬롯과 React 제어형 값의 복원만 더합니다. */
export function connectReact<E extends HElement>(tagName: string, elementClass: (new () => E) & { readonly observedAttributes: string[] }) {
  // 태그 등록 없이 Lit 속성 접근자만 준비합니다. @lit/react가 첫 렌더에서도
  // size 객체 등을 HTML 문자열 속성이 아닌 실제 JS 프로퍼티로 구분해야 합니다.
  void elementClass.observedAttributes;
  type Props = {
    children?: React.ReactNode; icon?: React.ReactNode; activeIcon?: React.ReactNode; label?: React.ReactNode;
    form?: string; ref?: React.Ref<E>; value?: string; checked?: boolean;
    onInput?: (event: ElementEvent<E, InputEvent>) => void;
    onChange?: (event: ElementEvent<E>) => void;
    onValueChange?: (value: string) => void;
    onValueChangeEvent?: (event: ValueChangeEvent) => void;
  };
  const Component = createComponent({
    react: React, tagName, elementClass,
    events: { onChange: 'change' as EventName<ElementEvent<E>>, onInput: 'input' as EventName<ElementEvent<E, InputEvent>>, onFocus: 'focusin' as EventName<ElementEvent<E, FocusEvent>>, onBlur: 'focusout' as EventName<ElementEvent<E, FocusEvent>>, onValueChangeEvent: 'h-value-change' as EventName<ValueChangeEvent> },
  }) as unknown as React.ComponentType<Props>;
  return React.forwardRef<E, Props>(function Connected({ icon, activeIcon, label, form, children, ...props }, ref) {
    const local = React.useRef<E | null>(null);
    const latest = React.useRef(props);
    latest.current = props;
    const setRef = React.useCallback((element: E | null) => {
      // 사용한 React 컴포넌트만 DOM에 연결되는 시점에 등록합니다.
      // 분리된 React 루트에서도 외부 ref와 Lit 속성 적용 전에 업그레이드합니다.
      if (element) {
        defineElement(tagName, elementClass);
        customElements.upgrade(element);
      }
      local.current = element;
      if (typeof ref === 'function') return ref(element);
      if (ref) ref.current = element;
    }, [ref]);
    React.useLayoutEffect(() => {
      if (form === undefined) local.current?.removeAttribute('form'); else local.current?.setAttribute('form', form);
    }, [form]);
    const restore = (includeChecked = true) => queueMicrotask(() => {
      const element = local.current;
      if (!element) return;
      for (const key of ['value', 'checked'] as const) {
        if (key === 'checked' && !includeChecked) continue;
        const value = latest.current[key];
        if (value !== undefined && key in element) {
          (element as unknown as Record<string, unknown>)[key] = value;
          element.requestUpdate();
        }
      }
    });
    return <Component {...props} ref={setRef}
      onInput={event => { props.onInput?.(event); restore(false); }}
      onChange={event => { props.onChange?.(event); restore(); }}
      onValueChangeEvent={event => { props.onValueChange?.(event.detail.value); restore(); }}>
      {icon != null && <span slot="icon" style={{ display: 'contents' }}>{icon}</span>}
      {activeIcon != null && <span slot="active-icon" style={{ display: 'contents' }}>{activeIcon}</span>}
      {label != null && <span slot="label">{label}</span>}
      {children}
    </Component>;
  });
}
