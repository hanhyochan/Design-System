import type { Args } from '../preview';
import { reactSource } from './react';
import { vueSource } from './vue';
import { svelteSource } from './svelte';
import { htmlSource } from './html';
import { jspSource } from './jsp';
export { environments } from './shared';
export type { Environment } from './shared';
export function usage(args: Args) {
  return ({ React: reactSource, Vue: vueSource, Svelte: svelteSource, HTML: htmlSource, JSP: jspSource }[args.codeEnvironment ?? 'React'])(args);
}
