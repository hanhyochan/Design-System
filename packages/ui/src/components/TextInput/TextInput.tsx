import { useState, type ComponentPropsWithRef } from 'react';
import { spec, icons, type Size, type Shape } from '../spec';
import { useField } from '../Field/Field.context';
import checkIcon from '@h_designsystem/foundation/icons/icon_check_1.svg';
import eyeIcon from '@h_designsystem/foundation/icons/icon_eye_1.svg';
import eyeOffIcon from '@h_designsystem/foundation/icons/icon_eye_off_1.svg';
export type TextInputProps = Omit<ComponentPropsWithRef<'input'>, 'size' | 'children'> & {
  size?: Size;
  variant?: 'filled' | 'outline';
  shape?: Shape;
  status?: 'default' | 'complete' | 'error';
};
export function TextInput({
  size = 'medium',
  variant = 'outline',
  shape = 'square',
  status = 'default',
  type = 'text',
  className,
  disabled,
  readOnly,
  onFocus,
  onBlur,
  ...props
}: TextInputProps) {
  const field = useField(props);
  const [focused, setFocused] = useState(false);
  const [visible, setVisible] = useState(false);
  const code = `C${(variant === 'filled' ? 37 : 40) + ['square', 'rounded', 'full-rounded'].indexOf(shape)}`;
  const invalid =
    status === 'error' || field['aria-invalid'] === true || field['aria-invalid'] === 'true';
  const state = disabled
    ? 'disabled'
    : readOnly
      ? 'view'
      : invalid
        ? 'error'
        : focused
          ? 'focus'
          : status === 'complete'
            ? 'complete'
            : type === 'password'
              ? 'password'
              : 'default';
  const iconState = type === 'password' ? 'password' : 'complete';
  const width = icons(code, size, iconState)[0]?.split('_')[1] ?? '16';
  const iconWidth = Number(width) % 4 === 0 ? `var(--h_designSystem-unit-${width})` : `${width}px`;
  return (
    <span
      className={['h_designSystem-TextInput', className].filter(Boolean).join(' ')}
      data-spec={spec(code, size, state)}
      data-disabled={disabled || undefined}
      data-password={type === 'password' || undefined}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setFocused(false);
      }}
    >
      <input
        {...props}
        {...field}
        aria-invalid={invalid || field['aria-invalid']}
        type={type === 'password' && visible ? 'text' : type}
        disabled={disabled}
        readOnly={readOnly}
        onFocus={(e) => {
          setFocused(true);
          onFocus?.(e);
        }}
        onBlur={(e) => {
          if (!e.currentTarget.parentElement?.contains(e.relatedTarget)) setFocused(false);
          onBlur?.(e);
        }}
      />
      {type === 'password' ? (
        <button
          className="h_designSystem-password-action h_designSystem-icon"
          type="button"
          disabled={disabled}
          aria-label={visible ? '비밀번호 숨기기' : '비밀번호 표시'}
          aria-pressed={visible}
          onClick={() => setVisible(!visible)}
          style={{ width: iconWidth }}
        >
          <img src={visible ? eyeOffIcon : eyeIcon} alt="" />
        </button>
      ) : status === 'complete' && !disabled && !invalid ? (
        <img
          className="h_designSystem-icon"
          src={checkIcon}
          alt=""
          aria-hidden="true"
          style={{ width: iconWidth }}
        />
      ) : null}
    </span>
  );
}
