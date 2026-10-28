import type { ForwardRefExoticComponent } from 'react';
import { HTabList } from './TabList';
import { connectReact, type ReactElementProps } from '../../shared/react';

export type TabListProps = ReactElementProps<HTabList, 'orientation'>;
export const TabList = /* @__PURE__ */ connectReact('h-tab-list', HTabList) as ForwardRefExoticComponent<TabListProps>;
