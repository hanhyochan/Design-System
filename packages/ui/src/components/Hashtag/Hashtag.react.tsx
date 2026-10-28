import type { ForwardRefExoticComponent } from 'react';
import { HHashtag } from './Hashtag';
import { connectReact, type ReactElementProps } from '../../shared/react';

export type HashtagProps = ReactElementProps<HHashtag, 'size'>;
export const Hashtag = connectReact('h-hashtag', HHashtag) as ForwardRefExoticComponent<HashtagProps>;
