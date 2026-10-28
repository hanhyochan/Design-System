import type { Args } from '../preview';
import { model, configure } from './shared';
import { elementMarkup } from './html';
export function vueSource(args: Args) {
  return `<!-- Vue 빌드 설정: compilerOptions.isCustomElement: tag => tag.startsWith('h-') -->\n<script setup>\nimport '@h_designsystem/ui/elements';\nimport '@h_designsystem/ui/styles.css';\n${args.responsive ? `import { configureDesignSystem } from '@h_designsystem/ui/config';\n${configure}\n` : ''}${model(args).hasIcon ? "import searchIcon from '@h_designsystem/foundation/icons/icon_search_medium_2.svg';\n" : ''}</script>\n\n<template>\n  ${elementMarkup(args,'Vue').replaceAll('\n','\n  ')}\n</template>${model(args).input ? '\n\n<!-- 값 연결: :value.prop="value" @input="value = $event.target.value" -->' : ''}`;
}
