import type { ComponentPropsWithRef } from 'react';
import { useTabs } from './Tab.context';
export type TabPanelProps = ComponentPropsWithRef<'div'> & {
  value: string;
};
export function TabPanel({ value, ...props }: TabPanelProps) {
  const tabs = useTabs();
  return (
    <div
      {...props}
      role="tabpanel"
      id={`${tabs.id}-panel-${value}`}
      aria-labelledby={`${tabs.id}-tab-${value}`}
      hidden={tabs.value !== value}
      tabIndex={0}
    />
  );
}
