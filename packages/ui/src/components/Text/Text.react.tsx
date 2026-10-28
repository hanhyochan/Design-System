import type { ForwardRefExoticComponent } from 'react';
import { HText } from './Text';
import { connectReact, type ReactElementProps } from '../../shared/react';

export type TextProps = ReactElementProps<HText, 'as' | 'typography' | 'language'>;
export const Text = connectReact('h-text', HText) as ForwardRefExoticComponent<TextProps>;
