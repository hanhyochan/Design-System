import type { ForwardRefExoticComponent, ReactNode } from 'react';
import { HIconButton } from './IconButton';
import { connectReact, type ReactElementProps, type ButtonKeys } from '../../shared/react';
import type { ResponsiveValue, Size, Shape } from '../../shared/types';
export type IconSize = 8 | 12 | 16 | 20 | 24 | 28 | 32 | 40;
export type IconButtonProps = Omit<ReactElementProps<HIconButton, ButtonKeys>, 'size'> & {
  icon: ReactNode; activeIcon?: ReactNode; 'aria-label': string;
} & ({ variant: 'filled'; size?: ResponsiveValue<IconSize>; shape?: never } | { variant?: 'outline'; size?: ResponsiveValue<Size>; shape?: Shape });
export const IconButton = /* @__PURE__ */ connectReact('h-icon-button', HIconButton) as unknown as ForwardRefExoticComponent<IconButtonProps>;
