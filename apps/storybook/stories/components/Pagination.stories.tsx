import { useArgs } from 'storybook/preview-api';
import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Pagination } from '@h_designsystem/ui';
import { GalleryCode, GallerySection } from '../Gallery';
function PaginationExample({ initialPage, totalPages }: { initialPage: number; totalPages: number }) {
  const [page, setPage] = useState(initialPage);
  return <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />;
}
function PaginationGallery() {
  return <div className="ds-gallery">{[
    { label: '첫 페이지 · 이전 비활성', page: 1, total: 10 },
    { label: '중간 페이지', page: 5, total: 10 },
    { label: '마지막 페이지 · 다음 비활성', page: 10, total: 10 },
    { label: '한 페이지 · 이전·다음 비활성', page: 1, total: 1 },
  ].map(({ label, page, total }) => <GallerySection key={label} title={label}>
    <PaginationExample initialPage={page} totalPages={total} />
    <GalleryCode code={`<Pagination page={${page}} totalPages={${total}} onPageChange={setPage} />`} />
  </GallerySection>)}</div>;
}
const meta = {
  title: '컴포넌트/Pagination',
  component: Pagination,
  args: { page: 1, totalPages: 10, onPageChange: () => {} },
  argTypes: {
    page: { control: { type: 'number', min: 1 } },
    totalPages: { control: { type: 'number', min: 0 } },
  },
  render: (args, { viewMode }) => {
    const [, update] = useArgs();
    if (viewMode === 'story') return <PaginationGallery />;
    return <Pagination {...args} onPageChange={(page) => update({ page })} />;
  },
  parameters: {
    docs: {
      source: {
        type: 'dynamic',
        transform: (
          _source: string,
          context: {
            args: {
              page: number;
              totalPages: number;
            };
          },
        ) =>
          `import { useState } from 'react';\nimport { Pagination } from '@h_designsystem/ui';\n\nfunction Example() {\n  const [page, setPage] = useState(${context.args.page});\n  return <Pagination page={page} totalPages={${context.args.totalPages}} onPageChange={setPage} />;\n}`,
      },
    },
  },
} satisfies Meta<typeof Pagination>;
export default meta;
export const Playground: StoryObj<typeof meta> = {};
