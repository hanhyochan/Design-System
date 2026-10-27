import type { ComponentPropsWithRef } from 'react';
import { spec, type Size } from '../spec';
export type ChipProps = ComponentPropsWithRef<'button'> & {
  size?: Size;
  variant?: 'filled' | 'outline';
};
export function Chip({
  size = 'medium',
  variant = 'filled',
  className,
  type = 'button',
  disabled,
  ...props
}: ChipProps) {
  return (
    <button
      {...props}
      type={type}
      disabled={disabled}
      className={['h_designSystem-Chip', className].filter(Boolean).join(' ')}
      data-spec={spec(
        variant === 'filled' ? 'C61' : 'C62',
        size,
        disabled ? 'disabled' : 'default',
      )}
    />
  );
}
