import type { ForwardRefExoticComponent, ReactNode } from 'react';
import { HSelect } from './Select';
import { connectReact, type ReactElementProps, type SelectKeys } from '../../shared/react';

export type SelectProps = ReactElementProps<HSelect, SelectKeys | 'variant' | 'shape'> & { icon?: ReactNode; };
export const Select = /* @__PURE__ */ connectReact('h-select', HSelect) as ForwardRefExoticComponent<SelectProps>;
