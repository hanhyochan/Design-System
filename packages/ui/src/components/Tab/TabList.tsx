import type { ComponentPropsWithRef } from 'react';
export type TabListProps = ComponentPropsWithRef<'div'> & {
  'aria-label': string;
  orientation?: 'horizontal' | 'vertical';
};
export function TabList({
  orientation = 'horizontal',
  onKeyDown,
  className,
  ...props
}: TabListProps) {
  return (
    <div
      {...props}
      role="tablist"
      aria-orientation={orientation}
      className={['h_designSystem-TabList', className].filter(Boolean).join(' ')}
      onKeyDown={(e) => {
        onKeyDown?.(e);
        if (e.defaultPrevented) return;
        const tabs = Array.from(
          e.currentTarget.querySelectorAll<HTMLButtonElement>('[role="tab"]:not(:disabled)'),
        ).filter((t) => t.closest('[role="tablist"]') === e.currentTarget);
        const current = tabs.indexOf(document.activeElement as HTMLButtonElement);
        const nextKey = orientation === 'horizontal' ? 'ArrowRight' : 'ArrowDown';
        const prevKey = orientation === 'horizontal' ? 'ArrowLeft' : 'ArrowUp';
        let index: number;
        if (e.key === nextKey) index = (current + 1) % tabs.length;
        else if (e.key === prevKey) index = (current - 1 + tabs.length) % tabs.length;
        else if (e.key === 'Home') index = 0;
        else if (e.key === 'End') index = tabs.length - 1;
        else return;
        e.preventDefault();
        tabs[index]?.focus();
        tabs[index]?.click();
      }}
    />
  );
}
