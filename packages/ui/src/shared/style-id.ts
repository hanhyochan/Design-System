/**
 * 옵션 이름을 기존 Foundation CSS의 data-spec 값으로 연결합니다.
 * 번호나 전체 규격 목록을 조회하지 않으며, 값이 없는 옵션은 생략합니다.
 * 예: styleId('btn_primary', 'filled', false, 'medium')
 *     → btn_primary_filled_medium
 */
export function styleId(...parts: (string | number | false | undefined)[]) {
  return parts.filter(part => part !== false && part !== undefined).join('_').replaceAll('-', '_');
}
