import { test, expect } from '@playwright/test';
test('폼 제출·검증·reset·외부 form·fieldset', async ({ page }) => {
  await page.goto('/html.html');
  await page.locator('#submit button').click();
  expect(await page.evaluate(() => (window as any).submitted)).toBeUndefined();
  await page.locator('#required input').fill('이름');
  await page.locator('#radio-a input').check();
  await page.locator('#submit button').click();
  await expect.poll(() => page.evaluate(() => (window as any).submitted)).toEqual(expect.arrayContaining([['name','이름'],['choice','a'],['item','two'],['agree','yes'],['external','외부'],['action','save']]));
  expect(await page.evaluate(() => (window as any).submitted)).not.toEqual(expect.arrayContaining([['excluded','제외']]));
  await page.locator('#check input').uncheck();
  await page.locator('#select select').selectOption('one');
  await page.locator('#reset button').click();
  await expect(page.locator('#required input')).toHaveValue('');
  await expect(page.locator('#check input')).toBeChecked();
  await expect(page.locator('#select select')).toHaveValue('two');
  await expect(page.locator('#fieldset-disabled input')).toBeDisabled();
});
test('라디오 그룹은 같은 form과 name 안에서만 변경', async ({ page }) => {
  await page.goto('/html.html');
  await page.locator('#radio-a input').check();
  await page.locator('#radio-a input').press('ArrowRight');
  await expect(page.locator('#radio-b input')).toBeChecked();
  await expect(page.locator('#radio-a input')).not.toBeChecked();
  await expect(page.locator('#other-radio input')).toBeChecked();
});
test('Select 옵션·그룹의 동적 변경', async ({ page }) => {
  await page.goto('/html.html');
  await expect(page.locator('#select select optgroup')).toHaveAttribute('label','항목');
  await page.locator('#select').evaluate(element => { const option = document.createElement('option'); option.value='three'; option.textContent='셋째'; element.append(option); });
  await page.locator('#select select').selectOption('three');
  expect(await page.locator('#select').evaluate((element:any) => element.value)).toBe('three');
  await page.locator('#select > option[value="three"]').evaluate(element => element.remove());
  await expect(page.locator('#select select')).toHaveValue('two');
  expect(await page.locator('#select').evaluate((element:any) => element.value)).toBe('two');
  await page.locator('#select').evaluate((element:any) => { element.value='missing'; });
  await expect(page.locator('#select select')).toHaveValue('');
  expect(await page.locator('#form').evaluate((element:HTMLFormElement) => new FormData(element).has('item'))).toBe(false);
});
