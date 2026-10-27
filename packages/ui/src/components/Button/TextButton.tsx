import type { ComponentPropsWithRef, ReactNode } from 'react';
import { spec, type Size } from '../spec';
export type TextButtonProps = ComponentPropsWithRef<'button'> & {
  size?: Size;
  icon?: ReactNode;
};
export function TextButton({
  size = 'medium',
  icon,
  children,
  className,
  type = 'button',
  ...props
}: TextButtonProps) {
  return (
    <button
      {...props}
      type={type}
      className={['h_designSystem-TextButton', className].filter(Boolean).join(' ')}
      data-spec={spec(icon ? 'C18' : 'C17', size)}
    >
      {children}
      {icon && (
        <span className="h_designSystem-icon" aria-hidden="true">
          {icon}
        </span>
      )}
    </button>
  );
}
