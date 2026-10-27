import type { ComponentPropsWithRef, ReactNode } from 'react';
import { spec, type Size, type Shape } from '../spec';
type StyleProps = {
  variant?: 'filled' | 'outline';
  shape?: Shape;
  size?: Size;
  icon?: ReactNode;
  children: ReactNode;
};
export type ButtonProps = StyleProps &
  (
    | (ComponentPropsWithRef<'button'> & {
        as?: 'button';
      })
    | (Omit<ComponentPropsWithRef<'a'>, 'type'> & {
        as: 'a';
        disabled?: boolean;
      })
  );
export function Button({
  variant = 'filled',
  shape = 'square',
  size = 'medium',
  icon,
  className,
  children,
  ...rest
}: ButtonProps) {
  const code = `C${String((variant === 'outline' ? 7 : 1) + ['square', 'rounded', 'full-rounded'].indexOf(shape) * 2 + (icon ? 1 : 0)).padStart(2, '0')}`;
  const shared = {
    className: ['h_designSystem-Button', className].filter(Boolean).join(' '),
    'data-size': size,
    'data-spec': spec(code, size, rest.disabled ? 'disabled' : 'default'),
    'data-disabled': rest.disabled || undefined,
  };
  const content = (
    <>
      {icon && <span className="h_designSystem-icon" aria-hidden="true">{icon}</span>}
      {children}
    </>
  );
  if (rest.as === 'a') {
    const { as, disabled, onClick, href, tabIndex, ...props } = rest;
    return (
      <a
        {...props}
        {...shared}
        href={disabled ? undefined : href}
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : tabIndex}
        onClick={(e) => {
          if (disabled) {
            e.preventDefault();
            return;
          }
          onClick?.(e);
        }}
      >
        {content}
      </a>
    );
  }
  const { as, type = 'button', ...props } = rest;
  return (
    <button {...props} {...shared} type={type}>
      {content}
    </button>
  );
}
