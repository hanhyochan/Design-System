import type { ComponentPropsWithRef } from 'react';
import { spec, type Size } from '../spec';
import check from '@h_designsystem/foundation/icons/icon_check_1.svg';
export type CheckboxProps = Omit<ComponentPropsWithRef<'input'>, 'size' | 'type' | 'children'> & {
  size?: Size;
  shape?: 'square' | 'round';
};
export function Checkbox({
  size = 'medium',
  shape = 'square',
  className,
  disabled,
  ...props
}: CheckboxProps) {
  return (
    <span
      className={['h_designSystem-Checkbox', className].filter(Boolean).join(' ')}
      data-spec={spec(shape === 'round' ? 'C69' : 'C68', size, disabled ? 'disabled' : 'default')}
    >
      <input {...props} type="checkbox" disabled={disabled} />
      <img src={check} alt="" aria-hidden="true" />
    </span>
  );
}
