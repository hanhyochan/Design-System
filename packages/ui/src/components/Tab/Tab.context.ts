import { createContext } from '@lit/context';
export type TabState = { id: string; value: string; select: (value: string) => void };
export const tabContext = /* @__PURE__ */ createContext<TabState>(Symbol('h-tabs'));
