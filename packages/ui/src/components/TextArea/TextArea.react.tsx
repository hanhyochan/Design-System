import type { ForwardRefExoticComponent } from 'react';
import { HTextArea } from './TextArea';
import { connectReact, type ReactElementProps, type TextAreaKeys } from '../../shared/react';

export type TextAreaProps = ReactElementProps<HTextArea, TextAreaKeys | 'variant' | 'shape' | 'status' | 'inquiry'>;
export const TextArea = connectReact('h-text-area', HTextArea) as ForwardRefExoticComponent<TextAreaProps>;
