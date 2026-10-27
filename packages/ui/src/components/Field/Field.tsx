import { useId, type ComponentPropsWithRef, type ReactNode } from 'react';
import { FieldContext } from './Field.context';
export type FieldProps = ComponentPropsWithRef<'div'> & {
  htmlFor?: string;
  label?: ReactNode;
  description?: string;
  error?: string;
  messageColor?: 'red' | 'green' | 'blue';
};
export function Field({
  htmlFor,
  label,
  description,
  error,
  messageColor = error ? 'red' : 'blue',
  children,
  className,
  ...props
}: FieldProps) {
  const generated = useId();
  const id = htmlFor ?? `field-${generated}`;
  const message = error || description;
  const descriptionId = message ? `${id}-description` : undefined;
  return (
    <FieldContext value={{ id, descriptionId, invalid: !!error }}>
      <div {...props} className={['h_designSystem-Field', className].filter(Boolean).join(' ')}>
        {label != null && (
          <label className="h_designSystem-Field-label" htmlFor={id}>
            {label}
          </label>
        )}
        {children}
        <div className="h_designSystem-Field-live" aria-live="polite" aria-atomic="true">
          {message && (
            <span
              id={descriptionId}
              className="h_designSystem-Field-message"
              data-error={!!error}
              data-color={messageColor}
            >
              {message}
            </span>
          )}
        </div>
      </div>
    </FieldContext>
  );
}
