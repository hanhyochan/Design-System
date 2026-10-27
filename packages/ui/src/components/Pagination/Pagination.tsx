import type { ComponentPropsWithRef } from 'react';
import arrow from '@h_designsystem/foundation/icons/icon_chevron_down_light.svg';
export type PaginationProps = ComponentPropsWithRef<'nav'> & {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};
export function Pagination({
  page,
  totalPages,
  onPageChange,
  className,
  ...props
}: PaginationProps) {
  const total = Math.max(0, Math.floor(totalPages));
  if (!total) return null;
  const current = Math.max(1, Math.min(total, Math.floor(page)));
  const start = Math.max(1, Math.min(current - 2, total - 4));
  const pages = Array.from({ length: Math.min(5, total) }, (_, i) => start + i);
  return (
    <nav
      aria-label="목록 페이지"
      {...props}
      className={['h_designSystem-Pagination', className].filter(Boolean).join(' ')}
    >
      <div className="h_designSystem-pagination-pages">
        {pages.map((p) => (
          <button
            key={p}
            type="button"
            className="h_designSystem-pagination-page"
            aria-current={p === current ? 'page' : undefined}
            aria-label={`${p}페이지`}
            onClick={() => onPageChange(p)}
          >
            {p}
          </button>
        ))}
      </div>
      <div className="h_designSystem-pagination-navigation">
        <button
          type="button"
          className="h_designSystem-pagination-prev"
          disabled={current <= 1}
          onClick={() => onPageChange(current - 1)}
        >
          <img src={arrow} alt="" />
          이전
        </button>
        <button
          type="button"
          className="h_designSystem-pagination-next"
          disabled={current >= total}
          onClick={() => onPageChange(current + 1)}
        >
          다음
          <img src={arrow} alt="" />
        </button>
      </div>
    </nav>
  );
}
