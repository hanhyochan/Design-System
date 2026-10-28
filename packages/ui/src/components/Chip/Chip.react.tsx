import type { ForwardRefExoticComponent } from 'react';
import { HChip } from './Chip';
import { connectReact, type ReactElementProps, type ButtonKeys } from '../../shared/react';

export type ChipProps = ReactElementProps<HChip, ButtonKeys | 'variant'>;
export const Chip = connectReact('h-chip', HChip) as ForwardRefExoticComponent<ChipProps>;
