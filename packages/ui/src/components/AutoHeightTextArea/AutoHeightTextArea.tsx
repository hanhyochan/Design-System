import { useLayoutEffect, useRef, useCallback, type ComponentPropsWithRef } from 'react';
import { spec, type Size } from '../spec';
import { useField } from '../Field/Field.context';
export type AutoHeightTextAreaProps = ComponentPropsWithRef<'textarea'> & {
  size?: Size;
};
export function AutoHeightTextArea({
  size = 'medium',
  className,
  ref,
  onInput,
  value,
  defaultValue,
  ...props
}: AutoHeightTextAreaProps) {
  const field = useField(props);
  const local = useRef<HTMLTextAreaElement | null>(null);
  const resize = useCallback(() => {
    const node = local.current;
    if (!node || CSS.supports('field-sizing', 'content')) return;
    node.style.height = 'auto';
    const style = getComputedStyle(node);
    node.style.height = `${node.scrollHeight + parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth)}px`;
  }, []);
  useLayoutEffect(() => {
    resize();
    const node = local.current;
    if (!node) return;
    let width = node.clientWidth;
    const observer = new ResizeObserver(() => {
      if (node.clientWidth !== width) {
        width = node.clientWidth;
        resize();
      }
    });
    observer.observe(node);
    // 부모 너비가 고정되어 있어도 반응형 글자 크기가 바뀌면 높이를 다시 계산합니다.
    const responsiveFont = window.matchMedia('(max-width: 992px)');
    responsiveFont.addEventListener('change', resize);
    const form = node.form;
    const reset = () => requestAnimationFrame(resize);
    form?.addEventListener('reset', reset);
    return () => {
      observer.disconnect();
      responsiveFont.removeEventListener('change', resize);
      form?.removeEventListener('reset', reset);
    };
  }, [resize, size, value, defaultValue]);
  return (
    <textarea
      {...props}
      {...field}
      value={value}
      defaultValue={defaultValue}
      rows={1}
      ref={(node) => {
        local.current = node;
        if (typeof ref === 'function') return ref(node);
        if (ref) ref.current = node;
      }}
      className={['h_designSystem-AutoHeightTextArea', className].filter(Boolean).join(' ')}
      data-spec={spec('C48', size)}
      onInput={(e) => {
        resize();
        onInput?.(e);
      }}
    />
  );
}
