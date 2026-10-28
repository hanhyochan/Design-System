import type { ForwardRefExoticComponent } from 'react';
import { HUnderlineTextInput } from './UnderlineTextInput';
import { connectReact, type ReactElementProps, type InputKeys } from '../../shared/react';

export type UnderlineTextInputProps = ReactElementProps<HUnderlineTextInput, InputKeys | 'variant'>;
export const UnderlineTextInput = connectReact('h-underline-text-input', HUnderlineTextInput) as ForwardRefExoticComponent<UnderlineTextInputProps>;
