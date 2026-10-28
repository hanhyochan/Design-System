import type { ForwardRefExoticComponent } from 'react';
import { HCheckbox } from './Checkbox';
import { connectReact, type ReactElementProps, type ChoiceKeys } from '../../shared/react';

export type CheckboxProps = ReactElementProps<HCheckbox, ChoiceKeys | 'shape'>;
export const Checkbox = /* @__PURE__ */ connectReact('h-checkbox', HCheckbox) as ForwardRefExoticComponent<CheckboxProps>;
