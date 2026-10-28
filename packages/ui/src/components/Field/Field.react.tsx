import type { ForwardRefExoticComponent, ReactNode } from 'react';
import { HField } from './Field';
import { connectReact, type ReactElementProps } from '../../shared/react';

export type FieldProps = ReactElementProps<HField, 'description' | 'error' | 'messageColor' | 'htmlFor'> & { label?: ReactNode; };
export const Field = /* @__PURE__ */ connectReact('h-field', HField) as ForwardRefExoticComponent<FieldProps>;
