import type { ComponentPropsWithRef } from 'react';
import { spec, type Size } from '../spec';
export type ToggleProps = Omit<ComponentPropsWithRef<'input'>, 'size' | 'type' | 'children'> & {
  size?: Size;
};
export function Toggle({ size = 'medium', className, disabled, ...props }: ToggleProps) {
  return (
    <span
      className={['h_designSystem-Toggle', className].filter(Boolean).join(' ')}
      data-spec={spec('C67', size, disabled ? 'disabled' : 'off')}
    >
      <input {...props} type="checkbox" role="switch" disabled={disabled} />
    </span>
  );
}
