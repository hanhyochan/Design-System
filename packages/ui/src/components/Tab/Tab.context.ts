import { createContext } from '@lit/context';
export type TabState = { id: string; value: string; select: (value: string) => void };
export const tabContext = createContext<TabState>(Symbol('h-tabs'));
