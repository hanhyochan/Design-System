import { useArgs } from 'storybook/preview-api';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Pagination } from '@h_designsystem/ui';
const meta = {
  title: '컴포넌트/Pagination',
  component: Pagination,
  args: { page: 1, totalPages: 10, onPageChange: () => {} },
  argTypes: {
    page: { control: { type: 'number', min: 1 } },
    totalPages: { control: { type: 'number', min: 0 } },
  },
  render: (args) => {
    const [, update] = useArgs();
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
