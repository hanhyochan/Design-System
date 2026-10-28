import type { ForwardRefExoticComponent } from 'react';
import { HToggle } from './Toggle';
import { connectReact, type ReactElementProps, type ChoiceKeys } from '../../shared/react';

export type ToggleProps = ReactElementProps<HToggle, ChoiceKeys>;
export const Toggle = connectReact('h-toggle', HToggle) as ForwardRefExoticComponent<ToggleProps>;
