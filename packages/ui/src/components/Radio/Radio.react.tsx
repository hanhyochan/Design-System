import type { ForwardRefExoticComponent } from 'react';
import { HRadio } from './Radio';
import { connectReact, type ReactElementProps, type ChoiceKeys } from '../../shared/react';

export type RadioProps = ReactElementProps<HRadio, ChoiceKeys>;
export const Radio = connectReact('h-radio', HRadio) as ForwardRefExoticComponent<RadioProps>;
