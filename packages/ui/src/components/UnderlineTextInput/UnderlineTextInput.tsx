import type { ComponentPropsWithRef } from 'react';
import { spec, type Size } from '../spec';
import { useField } from '../Field/Field.context';
export type UnderlineTextInputProps = Omit<ComponentPropsWithRef<'input'>, 'size'> & {
  size?: Size;
  variant?: 'responsive' | 'fixed' | 'search' | 'search-wide';
};
export function UnderlineTextInput({
  size = 'medium',
  variant = 'responsive',
  className,
  type,
  ...props
}: UnderlineTextInputProps) {
  const field = useField(props);
  return (
    <input
      {...props}
      {...field}
      type={type ?? (variant.startsWith('search') ? 'search' : 'text')}
      className={['h_designSystem-UnderlineTextInput', className].filter(Boolean).join(' ')}
      data-spec={spec('C43', size, variant.replace('-', ' '))}
    />
  );
}
