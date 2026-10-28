import type { Args } from '../preview';
import { model, configure } from './shared';
import { elementMarkup } from './html';
export function svelteSource(args: Args) {
  return `<script>\nimport '@h_designsystem/ui/elements';\nimport '@h_designsystem/ui/styles.css';\n${args.responsive ? `import { configureDesignSystem } from '@h_designsystem/ui/config';\n${configure}\n` : ''}${model(args).hasIcon ? "import searchIcon from '@h_designsystem/foundation/icons/icon_search_medium_2.svg';\n" : ''}</script>\n\n${elementMarkup(args,'Svelte')}${model(args).input ? '\n\n<!-- 값 연결: value={value} oninput={event => value = event.currentTarget.value} -->' : ''}`;
}
