import type { HRadio } from './Radio';
const radios = new Set<HRadio>();
export function registerRadio(radio: HRadio) { radios.add(radio); return () => radios.delete(radio); }
export function radioGroup(radio: HRadio) {
  if (!radio.name) return [radio];
  return [...radios].filter(item => item.isConnected && item.name === radio.name && item.form === radio.form && item.getRootNode() === radio.getRootNode()).sort((a, b) => a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1);
}
