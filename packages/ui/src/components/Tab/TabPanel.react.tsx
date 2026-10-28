import type { ForwardRefExoticComponent } from 'react';
import { HTabPanel } from './TabPanel';
import { connectReact, type ReactElementProps } from '../../shared/react';

export type TabPanelProps = ReactElementProps<HTabPanel, 'value'> & { value: string;  };
export const TabPanel = connectReact('h-tab-panel', HTabPanel) as ForwardRefExoticComponent<TabPanelProps>;
