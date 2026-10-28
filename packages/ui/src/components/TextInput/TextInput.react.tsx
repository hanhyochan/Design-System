import type { ForwardRefExoticComponent } from 'react';
import { HTextInput } from './TextInput';
import { connectReact, type ReactElementProps, type InputKeys } from '../../shared/react';

export type TextInputProps = ReactElementProps<HTextInput, InputKeys | 'variant' | 'shape' | 'status'>;
export const TextInput = connectReact('h-text-input', HTextInput) as ForwardRefExoticComponent<TextInputProps>;
