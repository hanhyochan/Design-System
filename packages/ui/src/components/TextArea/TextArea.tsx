import { useState, type ComponentPropsWithRef } from 'react';
import { spec, type Size } from '../spec';
import { useField } from '../Field/Field.context';
export type TextAreaProps = ComponentPropsWithRef<'textarea'> & {
  size?: Size;
  variant?: 'filled' | 'outline';
  shape?: 'square' | 'rounded';
  status?: 'default' | 'error';
  inquiry?: boolean;
};
export function TextArea({
  size = 'medium',
  variant = 'outline',
  shape = 'square',
  status = 'default',
  inquiry = false,
  disabled,
  readOnly,
  className,
  onFocus,
  onBlur,
  ...props
}: TextAreaProps) {
  const field = useField(props);
  const [focused, setFocused] = useState(false);
  const invalid =
    status === 'error' || field['aria-invalid'] === true || field['aria-invalid'] === 'true';
  const code = `C${(variant === 'filled' ? 44 : 46) + (shape === 'rounded' ? 1 : 0)}`;
  const state = disabled
    ? 'disabled'
    : readOnly
      ? 'view'
      : invalid
        ? 'error'
        : focused
          ? 'focus'
          : inquiry
            ? 'inquiry'
            : 'default';
  return (
    <textarea
      {...props}
      {...field}
      disabled={disabled}
      readOnly={readOnly}
      aria-invalid={invalid || field['aria-invalid']}
      className={['h_designSystem-TextArea', className].filter(Boolean).join(' ')}
      data-spec={spec(code, size, state)}
      data-inquiry={inquiry || undefined}
      onFocus={(e) => {
        setFocused(true);
        onFocus?.(e);
      }}
      onBlur={(e) => {
        setFocused(false);
        onBlur?.(e);
      }}
    />
  );
}
