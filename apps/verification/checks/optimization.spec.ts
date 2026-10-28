import { test, expect } from '@playwright/test';

test('같은 값의 갱신은 DOM 속성을 다시 쓰지 않고 변경된 값은 전달함', async ({ page }) => {
  await page.goto('/html.html');
  await page.locator('#controlled input').waitFor();
  const mutations = await page.evaluate(async () => {
    const elements = ['#controlled', '#fixed'].map(selector => document.querySelector(selector) as any);
    await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
    const records: string[] = [];
    const observer = new MutationObserver(changes => records.push(...changes.map(change => change.attributeName!)));
    for (const element of elements) {
      observer.observe(element, { attributes: true });
      observer.observe(element.control, { attributes: true });
      element.requestUpdate();
    }
    await Promise.all(elements.map(element => element.updateComplete));
    await new Promise(resolve => requestAnimationFrame(resolve));
    observer.disconnect();
    return records;
  });
  expect(mutations).toEqual([]);
  await page.locator('#controlled').evaluate((element: any) => {
    element.placeholder = '새 안내'; element.required = true; element.readOnly = true;
    element.setAttribute('aria-label', '변경된 이름');
  });
  await expect(page.locator('#controlled input')).toHaveAccessibleName('변경된 이름');
  await expect(page.locator('#controlled input')).toHaveAttribute('placeholder', '새 안내');
  await expect(page.locator('#controlled input')).toHaveAttribute('required', '');
  await expect(page.locator('#controlled input')).toHaveAttribute('readonly', '');
});

test('Field·Tabs의 표시만 바꾸면 자식은 갱신하지 않고 의미가 바뀔 때 반영함', async ({ page }) => {
  await page.goto('/html.html');
  await page.locator('#controlled input').waitFor();
  await page.evaluate(async () => {
    const tabs = document.createElement('h-tabs'); tabs.id = 'optimization-tabs';
    tabs.innerHTML = '<h-tab-list><h-tab value="one">첫째</h-tab><h-tab value="two">둘째</h-tab></h-tab-list><h-tab-panel value="one">첫 패널</h-tab-panel><h-tab-panel value="two">둘째 패널</h-tab-panel>';
    document.body.append(tabs);
  });
  await expect(page.locator('#optimization-tabs h-tab').first()).toHaveAttribute('aria-selected', 'true');
  const mutations = await page.evaluate(async () => {
    await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
    const records: string[] = [];
    const observer = new MutationObserver(changes => records.push(...changes.map(change => change.attributeName!)));
    observer.observe((document.querySelector('#controlled') as any).control, { attributes: true });
    for (const element of document.querySelectorAll('#optimization-tabs h-tab, #optimization-tabs h-tab-panel')) observer.observe(element, { attributes: true });
    const field = document.querySelector('#field') as any;
    const tabs = document.querySelector('#optimization-tabs') as any;
    field.messageColor = 'green'; tabs.requestUpdate();
    await Promise.all([field.updateComplete, tabs.updateComplete]);
    await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
    observer.disconnect();
    return records;
  });
  expect(mutations).toEqual([]);
  await page.locator('#field').evaluate((field: any) => { field.label = '새 이름'; field.error = '이름 확인'; });
  await expect(page.locator('#controlled input')).toHaveAccessibleName('새 이름');
  await expect(page.locator('#controlled input')).toHaveAccessibleDescription('이름 확인');
  await page.locator('#optimization-tabs h-tab').nth(1).focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('#optimization-tabs h-tab-panel').nth(1)).toBeVisible();
  await expect(page.locator('#optimization-tabs h-tab-panel').first()).toBeHidden();
});

for (const fallback of [false, true]) {
  test(`자동 높이 ${fallback ? 'JS 보완' : '브라우저 기본'}: 입력·너비·재연결`, async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.addInitScript(fallback => {
      const supports = CSS.supports.bind(CSS);
      if (fallback) CSS.supports = ((...args: string[]) => args[0] === 'field-sizing' ? false : (supports as any)(...args)) as typeof CSS.supports;
      const Observer = window.ResizeObserver;
      (window as any).resizeObservations = 0;
      window.ResizeObserver = class extends Observer {
        override observe(target: Element, options?: ResizeObserverOptions) {
          (window as any).resizeObservations++;
          super.observe(target, options);
        }
      };
    }, fallback);
    await page.goto('/html.html');
    const input = page.locator('#auto textarea');
    await input.waitFor();
    await page.locator('#auto').evaluate((element: any, fallback) => {
      element.style.width = '360px';
      if (fallback) element.control.style.setProperty('field-sizing', 'fixed');
    }, fallback);
    await input.fill('한 줄');
    const shortHeight = await input.evaluate(element => element.getBoundingClientRect().height);
    await input.fill('길이가 변하는 한글 내용 '.repeat(40));
    await expect.poll(() => input.evaluate(element => element.getBoundingClientRect().height)).toBeGreaterThan(shortHeight);
    const wideHeight = await input.evaluate(element => element.getBoundingClientRect().height);
    await page.locator('#auto').evaluate(element => { (element as HTMLElement).style.width = '180px'; });
    await expect.poll(() => input.evaluate(element => element.getBoundingClientRect().height)).toBeGreaterThan(wideHeight);
    await page.locator('#auto').evaluate(element => { element.remove(); document.querySelector('main')!.append(element); });
    await input.fill('한 줄');
    await expect.poll(() => input.evaluate(element => element.getBoundingClientRect().height)).toBe(shortHeight);
    await expect(input).toBeFocused();
    const native = await page.evaluate(() => CSS.supports('field-sizing', 'content'));
    const observations = await page.evaluate(() => (window as any).resizeObservations);
    expect(observations).toBe(native ? 0 : 2);
    expect(errors).toEqual([]);
  });
}
