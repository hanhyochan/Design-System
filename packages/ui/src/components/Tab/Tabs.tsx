import { useId, useState, type ComponentPropsWithRef } from 'react';
import { TabsContext } from './Tab.context';
export type TabsProps = Omit<ComponentPropsWithRef<'div'>, 'defaultValue'> & {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
};
export function Tabs({
  value,
  defaultValue = '',
  onValueChange,
  children,
  className,
  ...props
}: TabsProps) {
  const id = useId();
  const [internal, setInternal] = useState(defaultValue);
  const select = (next: string) => {
    if (value === undefined) setInternal(next);
    onValueChange?.(next);
  };
  return (
    <TabsContext value={{ id, value: value ?? internal, select }}>
      <div {...props} className={['h_designSystem-Tabs', className].filter(Boolean).join(' ')}>
        {children}
      </div>
    </TabsContext>
  );
}
