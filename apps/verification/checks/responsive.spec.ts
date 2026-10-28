import { test, expect } from '@playwright/test';
for (const environment of ['react', 'vue', 'svelte', 'html']) {
  test(`${environment}: 화면별 크기와 입력값 유지`, async ({ page }) => {
    const errors: string[] = []; page.on('pageerror', error => errors.push(error.message));
    await page.goto(`/${environment}.html`);
    const button = page.locator('#responsive button');
    const input = page.locator('#controlled input');
    await input.fill('한글 입력');
    for (const [width, size, height] of [[1280,'xlarge',64],[993,'xlarge',64],[992,'large',56],[769,'large',56],[768,'medium',52],[375,'medium',52]] as const) {
      await page.setViewportSize({width,height:900});
      await expect(page.locator('#responsive')).toHaveAttribute('data-size',size);
      await expect(button).toHaveCSS('height',`${height}px`);
      await expect(input).toHaveValue('한글 입력');
      await expect(input).toBeFocused();
    }
    expect(errors).toEqual([]);
  });
}
test('고정값·기본값·키 생략·설정 변경', async ({ page }) => {
  await page.goto('/html.html');
  await page.setViewportSize({width:375,height:900});
  await expect(page.locator('#fixed')).toHaveAttribute('data-size','large');
  await expect(page.locator('#default')).toHaveAttribute('data-size','medium');
  await expect(page.locator('#mobile-only')).toHaveAttribute('data-size','small');
  await page.setViewportSize({width:900,height:900});
  await expect(page.locator('#mobile-only')).toHaveAttribute('data-size','medium');
  await page.evaluate(() => (window as any).configureDesignSystem({breakpoints:{mobile:950,tablet:1100}}));
  await expect(page.locator('#mobile-only')).toHaveAttribute('data-size','small');
  expect(await page.evaluate(() => { try { (window as any).configureDesignSystem({breakpoints:{mobile:1000,tablet:900}}); return false; } catch { return true; } })).toBe(true);
});
test('설정 누락은 base 또는 medium', async ({ page }) => {
  await page.goto('/html.html?unconfigured');
  await expect(page.locator('#responsive')).toHaveAttribute('data-size','xlarge');
  await expect(page.locator('#mobile-only')).toHaveAttribute('data-size','medium');
});

test('프로젝트의 경계 미포함 규칙과 설정 변경', async ({ page }) => {
  await page.goto('/html.html');
  await page.waitForFunction(() => typeof (window as any).configureDesignSystem === 'function');
  await page.evaluate(() => (window as any).configureDesignSystem({
    breakpoints: { mobile: 768, tablet: 1024 }, breakpointBoundary: 'exclusive',
  }));
  const input = page.locator('#controlled input');
  await input.fill('경계 전환 유지');
  for (const [width, size] of [[767, 'medium'], [768, 'large'], [992, 'large'], [1023, 'large'], [1024, 'xlarge']] as const) {
    await page.setViewportSize({ width, height: 900 });
    await expect(page.locator('#responsive')).toHaveAttribute('data-size', size);
    await expect(input).toHaveValue('경계 전환 유지');
    await expect(input).toBeFocused();
  }
  await page.evaluate(() => (window as any).configureDesignSystem({ breakpoints: { mobile: 768, tablet: 1024 } }));
  await expect(page.locator('#responsive')).toHaveAttribute('data-size', 'large');
  expect(await page.evaluate(() => {
    try { (window as any).configureDesignSystem({ breakpoints: { mobile: 768, tablet: 1024 }, breakpointBoundary: 'invalid' }); return false; }
    catch { return true; }
  })).toBe(true);
});
