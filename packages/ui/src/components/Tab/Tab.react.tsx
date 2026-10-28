import type { ForwardRefExoticComponent, ReactNode } from 'react';
import { HTab } from './Tab';
import { connectReact, type ReactElementProps, type ButtonKeys } from '../../shared/react';

export type TabProps = ReactElementProps<HTab, ButtonKeys | 'variant' | 'shape'> & { value: string; icon?: ReactNode; };
export const Tab = /* @__PURE__ */ connectReact('h-tab', HTab) as ForwardRefExoticComponent<TabProps>;
