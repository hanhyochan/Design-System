import type { ForwardRefExoticComponent } from 'react';
import { HAutoHeightTextArea } from './AutoHeightTextArea';
import { connectReact, type ReactElementProps, type TextAreaKeys } from '../../shared/react';

export type AutoHeightTextAreaProps = ReactElementProps<HAutoHeightTextArea, TextAreaKeys>;
export const AutoHeightTextArea = /* @__PURE__ */ connectReact('h-auto-height-text-area', HAutoHeightTextArea) as ForwardRefExoticComponent<AutoHeightTextAreaProps>;
