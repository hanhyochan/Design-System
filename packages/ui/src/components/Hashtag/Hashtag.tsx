import type { ComponentPropsWithRef } from 'react';
import { spec, type Size } from '../spec';
export type HashtagProps = ComponentPropsWithRef<'span'> & {
  size?: Size;
};
export function Hashtag({ size = 'medium', className, ...props }: HashtagProps) {
  return (
    <span
      {...props}
      className={['h_designSystem-Hashtag', className].filter(Boolean).join(' ')}
      data-spec={spec('C64', size)}
    />
  );
}
