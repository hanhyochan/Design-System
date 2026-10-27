import { createContext, useContext } from 'react';
export const TabsContext = createContext<{
  id: string;
  value: string;
  select: (value: string) => void;
} | null>(null);
export function useTabs() {
  const context = useContext(TabsContext);
  if (!context) throw new Error('Tab 구성 요소는 Tabs 안에 넣어 주세요.');
  return context;
}
