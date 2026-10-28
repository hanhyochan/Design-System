import type { ForwardRefExoticComponent, ReactNode } from 'react';
import { HButton } from './Button';
import { connectReact, type ReactElementProps, type ButtonKeys } from '../../shared/react';

export type ButtonProps = ReactElementProps<HButton, ButtonKeys | 'variant' | 'shape' | 'as' | 'href' | 'target' | 'rel'> & { icon?: ReactNode; formAction?: string; formMethod?: string; formNoValidate?: boolean; formTarget?: string; formEncType?: string; };
export const Button = connectReact('h-button', HButton) as ForwardRefExoticComponent<ButtonProps>;
