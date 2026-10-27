import type { ComponentPropsWithRef, ReactNode } from 'react';
import { spec, type Size, type Shape } from '../spec';
import { useField } from '../Field/Field.context';
import arrow from '@h_designsystem/foundation/icons/icon_chevron_down_light.svg';
export type SelectProps = Omit<ComponentPropsWithRef<'select'>, 'size' | 'multiple'> & {
  size?: Size;
  variant?: 'filled' | 'outline';
  shape?: Shape;
  icon?: ReactNode;
};
export function Select({
  size = 'medium',
  variant = 'outline',
  shape = 'square',
  icon,
  className,
  disabled,
  children,
  ...props
}: SelectProps) {
  const field = useField(props);
  const code = `C${(variant === 'filled' ? 49 : 55) + ['square', 'rounded', 'full-rounded'].indexOf(shape) * 2 + (icon ? 1 : 0)}`;
  return (
    <span
      className={['h_designSystem-Select', className].filter(Boolean).join(' ')}
      data-spec={spec(code, size, disabled ? 'disabled' : 'default')}
    >
      <select {...props} {...field} disabled={disabled}>
        {children}
      </select>
      {icon && (
        <span className="h_designSystem-icon" aria-hidden="true">
          {icon}
        </span>
      )}
      <img src={arrow} alt="" aria-hidden="true" />
    </span>
  );
}
