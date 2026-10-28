import type { ForwardRefExoticComponent } from 'react';
import { HBadge } from './Badge';
import { connectReact, type ReactElementProps } from '../../shared/react';

export type BadgeProps = ReactElementProps<HBadge, 'size' | 'variant'>;
export const Badge = /* @__PURE__ */ connectReact('h-badge', HBadge) as ForwardRefExoticComponent<BadgeProps>;
