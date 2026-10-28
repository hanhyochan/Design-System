import type { ForwardRefExoticComponent, ReactNode } from 'react';
import { HTextButton } from './TextButton';
import { connectReact, type ReactElementProps, type ButtonKeys } from '../../shared/react';

export type TextButtonProps = ReactElementProps<HTextButton, ButtonKeys> & { icon?: ReactNode; };
export const TextButton = connectReact('h-text-button', HTextButton) as ForwardRefExoticComponent<TextButtonProps>;
