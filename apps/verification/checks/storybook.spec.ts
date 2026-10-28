import { test, expect } from '@playwright/test';

for (const host of ['127.0.0.1', 'localhost']) {
  test(`${host}: preview 모듈과 모든 Docs·Playground`, async ({ page, request }) => {
    test.setTimeout(240000);
    const base = `http://${host}:6006`;
    const preview = await request.get(`${base}/.storybook/preview.tsx`);
    expect(preview.status()).toBe(200);
    expect(preview.headers()['content-type']).toContain('javascript');
    const index = await (await request.get(`${base}/index.json`)).json();
    const entries = Object.values(index.entries) as { id: string; type: string; title: string }[];
    expect(entries.filter(entry => entry.type === 'docs')).toHaveLength(27);
    expect(entries.filter(entry => entry.type === 'story')).toHaveLength(32);
    const failures: string[] = [];
    let current = '';
    page.on('pageerror', error => failures.push(`${current}: ${error.message}`));
    page.on('console', message => { if (message.type() === 'error') failures.push(`${current}: ${message.text()}`); });
    page.on('response', response => { if (response.status() >= 400) failures.push(`${current}: ${response.status()} ${response.url()}`); });
    for (const entry of entries) {
      current = entry.id;
      await page.goto(`${base}/iframe.html?id=${encodeURIComponent(entry.id)}&viewMode=${entry.type === 'docs' ? 'docs' : 'story'}`);
      const container = page.locator(entry.type === 'docs' ? '#storybook-docs .sbdocs-content' : '#storybook-root');
      await expect(container).toBeVisible();
      if (entry.title.startsWith('컴포넌트/')) {
        await expect(container.locator('[data-size]').first()).toBeVisible();
      } else {
        await expect(container.locator('table, [class*="palette"], [class*="gallery"]').first()).toBeVisible();
      }
      // 자식 Lit 요소의 비동기 렌더까지 기다려 로딩 직후 오류를 놓치지 않습니다.
      await page.evaluate(async () => {
        await Promise.all(Array.from(document.querySelectorAll('*')).filter(element => 'updateComplete' in element).map((element: any) => element.updateComplete));
        await new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve())));
      });
      expect(failures, entry.id).toEqual([]);
    }
  });
}

test('실제 Viewport가 고정 열을 유지하고 반응형 열만 바꿈', async ({ page }) => {
  await page.goto('http://127.0.0.1:6006/?path=/story/컴포넌트-button--playground');
  const preview = page.frameLocator('#storybook-preview-iframe');
  await preview.locator('h-button').first().waitFor();
  await page.getByRole('button', { name: 'Viewport size', exact: true }).click();
  await page.getByText('모바일 768px', { exact: true }).click();
  await expect.poll(() => page.locator('#storybook-preview-iframe').evaluate((element: HTMLIFrameElement) => element.contentWindow!.innerWidth)).toBe(768);
  await expect.poll(() => preview.locator('h-button').evaluateAll(elements => elements.slice(0, 5).map(element => element.getAttribute('data-size')))).toEqual(['small', 'medium', 'large', 'xlarge', 'medium']);
});

test('전체 컴포넌트 표가 셀 간격을 유지하고 겹치지 않음', async ({ page, request }) => {
  test.setTimeout(240000);
  const base = 'http://127.0.0.1:6006';
  const index = await (await request.get(`${base}/index.json`)).json();
  const entries = (Object.values(index.entries) as { id: string; type: string; title: string }[])
    .filter(entry => entry.type === 'story' && entry.title.startsWith('컴포넌트/'));
  for (const entry of entries) {
    await page.goto(`${base}/iframe.html?id=${encodeURIComponent(entry.id)}&viewMode=story`);
    await page.locator('[data-gallery-family]').first().waitFor();
    for (const width of [1440, 1024, 992, 900, 768, 375]) {
      await page.setViewportSize({ width, height: 900 });
      const overflow = await page.evaluate(async () => {
        await new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve())));
        function find(root: ParentNode): HTMLElement[] {
          return [...root.querySelectorAll<HTMLElement>('[data-spec]'), ...Array.from(root.querySelectorAll('*')).flatMap(element => element.shadowRoot ? find(element.shadowRoot) : [])];
        }
        return Array.from(document.querySelectorAll<HTMLTableCellElement>('.ds-gallery-table td')).flatMap(cell => {
          if (!cell.querySelector('[data-gallery-family]')) return [];
          const rect = cell.getBoundingClientRect();
          const style = getComputedStyle(cell);
          const left = rect.left + parseFloat(style.paddingLeft);
          const right = rect.right - parseFloat(style.paddingRight);
          return find(cell).flatMap(element => {
            const box = element.getBoundingClientRect();
            if (box.width === 0 || box.height === 0) return [];
            return box.left < left - 1 || box.right > right + 1
              ? [{ spec: element.dataset.spec, cell: [left, right], element: [box.left, box.right] }] : [];
          });
        });
      });
      expect(overflow, `${entry.id} at ${width}px`).toEqual([]);
      await expect(page.locator('.ds-gallery-table td').first()).toHaveCSS('padding-left', '16px');
      await expect(page.locator('.ds-gallery-table td').first()).toHaveCSS('padding-right', '16px');
    }
  }
});
