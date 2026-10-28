import { html, unsafeStatic } from 'lit/static-html.js';
import { HElement } from '../../shared/element';
import { responsiveConverter, type ResponsiveValue } from '../../shared/types';
import { typographyNames } from './typography';
import { defineElement } from '../../register';
export type Typography = (typeof typographyNames)[number];
export type TextTag = 'span' | 'p' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'label' | 'strong' | 'em' | 'small';
const tags = new Set<string>(['span', 'p', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'label', 'strong', 'em', 'small']);
export class HText extends HElement {
  static properties = { typography: { converter: responsiveConverter }, as: { type: String }, language: { type: String } };
  declare typography?: ResponsiveValue<Typography>;
  declare as: TextTag;
  declare language: 'ko' | 'en';
  constructor() { super(); this.as = 'span'; this.language = 'ko'; }
  protected override get responsiveValue() { return this.typography; }
  get resolvedTypography() { return this.responsive.resolve(this.typography, 'body_16_400'); }
  protected override render() {
    // 태그 이름은 허용한 HTML 태그만 정적 템플릿으로 전달합니다.
    const tag = unsafeStatic(tags.has(this.as) ? this.as : 'span');
    return html`<${tag} class=${`h_designSystem-native-text h_designSystem-Text h_designSystem-type-${this.resolvedTypography}`} data-language=${this.language}><slot></slot></${tag}>`;
  }
}
defineElement('h-text', HText);

declare global { interface HTMLElementTagNameMap { 'h-text': HText; } }
