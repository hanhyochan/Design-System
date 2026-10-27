import type { ComponentPropsWithRef, ElementType } from 'react';
import { typographyNames } from '../spec';
export type Typography = (typeof typographyNames)[number];
export type TextProps<T extends ElementType = 'span'> = {
  as?: T;
  typography?: Typography;
  language?: 'ko' | 'en';
} & Omit<ComponentPropsWithRef<T>, 'as' | 'typography' | 'language'>;
export function Text<T extends ElementType = 'span'>({
  as,
  typography = 'body_16_400',
  language = 'ko',
  className,
  ...props
}: TextProps<T>) {
  const Tag = as ?? 'span';
  return (
    <Tag
      {...props}
      data-language={language}
      className={['h_designSystem-Text', `h_designSystem-type-${typography}`, className]
        .filter(Boolean)
        .join(' ')}
    />
  );
}
