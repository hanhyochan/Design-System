import { createContext, useContext } from 'react';
export const FieldContext = createContext<{
  id?: string;
  descriptionId?: string;
  invalid: boolean;
}>({ invalid: false });
export function useField(props: {
  id?: string;
  'aria-describedby'?: string;
  'aria-invalid'?: boolean | 'true' | 'false' | 'grammar' | 'spelling';
}) {
  const field = useContext(FieldContext);
  return {
    id: props.id ?? field.id,
    'aria-describedby':
      [
        ...new Set(
          [props['aria-describedby'], field.descriptionId]
            .filter(Boolean)
            .flatMap((x) => x!.split(/\s+/)),
        ),
      ].join(' ') || undefined,
    'aria-invalid': field.invalid ? true : props['aria-invalid'],
  };
}
