import type { ComponentPropsWithRef } from 'react';
import { spec, type Size } from '../spec';
export type RadioProps = Omit<ComponentPropsWithRef<'input'>, 'size' | 'type' | 'children'> & {
  size?: Size;
};
export function Radio({ size = 'medium', className, disabled, ...props }: RadioProps) {
  return (
    <input
      {...props}
      type="radio"
      disabled={disabled}
      className={['h_designSystem-Radio', className].filter(Boolean).join(' ')}
      data-spec={spec('C70', size, disabled ? 'disabled' : 'default')}
    />
  );
}
