import type { ComponentPropsWithRef, ReactNode } from 'react';
import { spec, type Size, type Shape } from '../spec';
export type IconButtonProps = Omit<ComponentPropsWithRef<'button'>, 'children'> & {
  icon: ReactNode;
  activeIcon?: ReactNode;
  'aria-label': string;
} & (
    | {
        variant: 'filled';
        size?: 8 | 12 | 16 | 20 | 24 | 28 | 32 | 40;
        shape?: never;
      }
    | {
        variant?: 'outline';
        size?: Size;
        shape?: Shape;
      }
  );
export function IconButton({
  variant = 'outline',
  size,
  shape = 'square',
  icon,
  activeIcon,
  className,
  type = 'button',
  disabled,
  ...props
}: IconButtonProps) {
  const code =
    variant === 'filled' ? 'C13' : `C${14 + ['square', 'rounded', 'full-rounded'].indexOf(shape)}`;
  return (
    <button
      {...props}
      disabled={disabled}
      type={type}
      className={['h_designSystem-IconButton', className].filter(Boolean).join(' ')}
      data-spec={spec(
        code,
        size ?? (variant === 'filled' ? 16 : 'medium'),
        disabled ? 'disabled' : 'default',
      )}
    >
      <span className="h_designSystem-icon" aria-hidden="true" data-has-active={!!activeIcon}>
        <span className="h_designSystem-icon-default">{icon}</span>
        {activeIcon && <span className="h_designSystem-icon-active">{activeIcon}</span>}
      </span>
    </button>
  );
}
