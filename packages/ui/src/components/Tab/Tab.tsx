import { useEffect, useRef, type ComponentPropsWithRef, type ReactNode } from 'react';
import { useTabs } from './Tab.context';
import { spec, type Size, type Shape } from '../spec';
export type TabProps = Omit<ComponentPropsWithRef<'button'>, 'value'> & {
  value: string;
  size?: Size;
  shape?: Shape;
  variant?: 'filled' | 'outline' | 'gray-line-outline';
  icon?: ReactNode;
};
export function Tab({
  value,
  size = 'medium',
  shape = 'square',
  variant = 'filled',
  icon,
  children,
  className,
  disabled,
  onClick,
  ref,
  ...props
}: TabProps) {
  const tabs = useTabs();
  const local = useRef<HTMLButtonElement | null>(null);
  useEffect(() => {
    const list = local.current?.closest('[role="tablist"]');
    if (!disabled && list &&
      !list.querySelector('[role="tab"][aria-selected="true"]:not(:disabled)') &&
      list.querySelector('[role="tab"]:not(:disabled)') === local.current) {
      tabs.select(value);
    }
  }, [tabs.value, disabled, value]);
  const selected = tabs.value === value;
  const code = `C${19 + ['filled', 'outline', 'gray-line-outline'].indexOf(variant) * 6 + ['square', 'rounded', 'full-rounded'].indexOf(shape) * 2 + (icon ? 1 : 0)}`;
  return (
    <button
      {...props}
      ref={(node) => {
        local.current = node;
        if (typeof ref === 'function') return ref(node);
        if (ref) ref.current = node;
      }}
      type="button"
      role="tab"
      id={`${tabs.id}-tab-${value}`}
      aria-controls={`${tabs.id}-panel-${value}`}
      aria-selected={selected}
      disabled={disabled}
      tabIndex={selected ? 0 : -1}
      className={['h_designSystem-Tab', className].filter(Boolean).join(' ')}
      data-spec={spec(code, size, disabled ? 'disabled' : 'default')}
      onClick={(e) => {
        onClick?.(e);
        if (!e.defaultPrevented) tabs.select(value);
      }}
    >
      {icon && (
        <span className="h_designSystem-icon" aria-hidden="true">
          {icon}
        </span>
      )}
      {children}
    </button>
  );
}
