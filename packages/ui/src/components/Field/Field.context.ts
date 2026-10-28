import { createContext } from '@lit/context';
export type FieldState = { label: string; description: string; invalid: boolean };
export const fieldContext = /* @__PURE__ */ createContext<FieldState>(Symbol('h-field'));
