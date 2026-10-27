import type { ReactNode } from 'react';
import './gallery.css';

export function GallerySection({ title, children }: { title: string; children: ReactNode }) {
  return <section className="ds-gallery-section" aria-label={title}>
    <div className="ds-gallery-title" role="heading" aria-level={2}>{title}</div>
    {children}
  </section>;
}

export function GalleryCode({ code }: { code: string }) {
  return <details className="ds-gallery-code"><summary>사용 코드</summary><pre><code>{code}</code></pre></details>;
}

export function GalleryTable({ columns, children, typography = false }: {
  columns: string[]; children: ReactNode; typography?: boolean;
}) {
  return <div className="ds-gallery-scroll" tabIndex={0} role="region" aria-label="전체 규격 표">
    <table className={`ds-gallery-table${typography ? ' ds-gallery-type-table' : ''}`}>
      <thead><tr>{columns.map(column => <th key={column} scope="col">{column}</th>)}</tr></thead>
      <tbody>{children}</tbody>
    </table>
  </div>;
}
