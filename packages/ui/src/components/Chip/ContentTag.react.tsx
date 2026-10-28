import type { ForwardRefExoticComponent } from 'react';
import { HContentTag } from './ContentTag';
import { connectReact, type ReactElementProps } from '../../shared/react';

export type ContentTagProps = ReactElementProps<HContentTag, 'size'>;
export const ContentTag = connectReact('h-content-tag', HContentTag) as ForwardRefExoticComponent<ContentTagProps>;
