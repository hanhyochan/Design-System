import type { ForwardRefExoticComponent } from 'react';
import { HTabs } from './Tabs';
import { connectReact, type ReactElementProps } from '../../shared/react';

export type TabsProps = ReactElementProps<HTabs, 'value' | 'defaultValue'> & { onValueChange?: (value: string) => void; };
export const Tabs = /* @__PURE__ */ connectReact('h-tabs', HTabs) as ForwardRefExoticComponent<TabsProps>;
