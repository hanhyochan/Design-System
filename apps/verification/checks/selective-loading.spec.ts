import { test, expect } from '@playwright/test';

for (const file of ['selective-react', 'selective']) {
  test(`${file}: 버튼만 등록하고 크기·스타일·이벤트 연결`, async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    const requests: string[] = [];
    page.on('request', request => { if (request.url().includes('/assets/h-designsystem/')) requests.push(request.url()); });
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto(`/${file}.html`);
    const button = page.locator('#selective-button');
    await expect(button).toHaveAttribute('data-size', 'xlarge');
    await expect(button.locator('button')).toHaveCSS('min-height', '64px');
    expect(await page.evaluate(() => ['h-text-input', 'h-select', 'h-tabs', 'h-checkbox'].filter(tag => customElements.get(tag)))).toEqual([]);
    await button.locator('button').click();
    await expect(page.locator('body')).toHaveAttribute('data-clicked', 'true');
    await page.setViewportSize({ width: 768, height: 900 });
    await expect(button).toHaveAttribute('data-size', 'small');
    await expect(button.locator('button')).toHaveCSS('min-height', '40px');
    await button.locator('button').focus();
    await expect(button.locator('button')).toBeFocused();
    if (file === 'selective-react') {
      await expect(page.locator('body')).toHaveAttribute('data-registered-before', 'false');
      await expect(page.locator('body')).toHaveAttribute('data-upgraded-ref', 'true');
      await expect(page.locator('#detached-button')).toHaveAttribute('data-size', 'large');
    } else {
      expect(requests.some(url => url.includes('/elements/button.js'))).toBe(true);
      expect(requests.some(url => /h-designsystem\.js|text-input|select\.js|tabs\.js/.test(url))).toBe(false);
    }
    expect(errors).toEqual([]);
  });
}

test('개별 등록 순서가 달라도 Field 설명과 폼 값 연결', async ({ page }) => {
  await page.goto('/selective.html');
  await page.locator('h-button button').waitFor();
  await page.evaluate(async () => {
    const form = document.createElement('form');
    form.id = 'late-form';
    form.innerHTML = '<h-field label="이름" description="입력 안내"><h-text-input name="name" value="기존 값"></h-text-input></h-field>';
    document.body.append(form);
    // HTML이 먼저 있고 입력 요소가 부모 Field보다 먼저 등록되는 경우입니다.
    await import(/* @vite-ignore */ '/assets/h-designsystem/elements/text-input.js');
    await import(/* @vite-ignore */ '/assets/h-designsystem/elements/field.js');
  });
  const input = page.locator('h-text-input input');
  await expect(input).toHaveValue('기존 값');
  await expect(input).toHaveAccessibleName('이름');
  await expect(input).toHaveAccessibleDescription('입력 안내');
  await input.fill('변경');
  expect(await page.locator('#late-form').evaluate(form => new FormData(form as HTMLFormElement).get('name'))).toBe('변경');
});
