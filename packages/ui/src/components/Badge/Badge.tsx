import type { ComponentPropsWithRef } from 'react';
import { spec, type Size } from '../spec';
export type BadgeProps = ComponentPropsWithRef<'span'> & {
  size?: Size;
  variant?: 'filled' | 'outline';
};
export function Badge({ size = 'medium', variant = 'filled', className, ...props }: BadgeProps) {
  return (
    <span
      {...props}
      className={['h_designSystem-Badge', className].filter(Boolean).join(' ')}
      data-spec={spec(variant === 'filled' ? 'C65' : 'C66', size)}
    />
  );
}
