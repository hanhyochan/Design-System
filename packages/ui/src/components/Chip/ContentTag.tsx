import type { ComponentPropsWithRef } from 'react';
import { spec, type Size } from '../spec';
export type ContentTagProps = ComponentPropsWithRef<'span'> & {
  size?: Size;
};
export function ContentTag({ size = 'medium', className, ...props }: ContentTagProps) {
  return (
    <span
      {...props}
      className={['h_designSystem-ContentTag', className].filter(Boolean).join(' ')}
      data-spec={spec('C63', size)}
    />
  );
}
