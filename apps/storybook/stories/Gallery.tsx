import { useId, useState, type ReactNode } from 'react';
import './gallery.css';

export function GallerySection({ title, children }: { title: string; children: ReactNode }) {
  return <section className="ds-gallery-section" aria-label={title}>
    <div className="ds-gallery-title" role="heading" aria-level={2}>{title}</div>
    {children}
  </section>;
}

export function GalleryCode({ code, codes }: { code?: string; codes?: Record<string, string> }) {
  const id = useId();
  const [environment, setEnvironment] = useState('React');
  return <details className="ds-gallery-code"><summary>사용 코드</summary>
    {codes && <label htmlFor={id}>사용 환경 <select id={id} value={environment} onChange={event => setEnvironment(event.target.value)}>{Object.keys(codes).map(name => <option key={name}>{name}</option>)}</select></label>}
    <pre><code>{codes ? codes[environment] : code}</code></pre></details>;
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
