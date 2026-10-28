import { test, expect } from '@playwright/test';

test('색상 변경과 오류·disabled 상태, Field 설명 병합', async ({ page }) => {
  await page.goto('/html.html');
  await page.locator('#controlled input').waitFor();
  await page.evaluate(async () => {
    const field = document.querySelector('#field') as any;
    const input = document.querySelector('#controlled') as any;
    const description = document.createElement('span'); description.id = 'additional'; description.textContent = '추가 설명'; document.body.append(description);
    input.setAttribute('aria-label', '프로젝트 이름'); input.setAttribute('aria-describedby', 'additional');
    input.style.setProperty('--h_designSystem-component-bg', 'purple'); input.style.setProperty('--h_designSystem-component-text', 'white');
    field.style.setProperty('--h_designSystem-component-text', 'yellow');
    await input.updateComplete;
  });
  await expect(page.locator('#controlled input')).toHaveAccessibleName('프로젝트 이름');
  await expect(page.locator('#controlled input')).toHaveAccessibleDescription('추가 설명 입력 안내');
  await expect(page.locator('#controlled .h_designSystem-TextInput')).toHaveCSS('background-color','rgb(128, 0, 128)');
  await page.locator('#controlled input').focus();
  await expect(page.locator('#controlled .h_designSystem-TextInput')).toHaveCSS('background-color','rgb(128, 0, 128)');
  await page.locator('#field').evaluate((element:any) => { element.error='이름을 확인하세요'; });
  await expect(page.locator('#controlled input')).toHaveAttribute('aria-invalid','true');
  await expect(page.locator('#controlled input')).toHaveAccessibleDescription('추가 설명 이름을 확인하세요');
  const colors = await page.locator('#controlled').evaluate((element:any) => {
    const root = element.shadowRoot.querySelector('.h_designSystem-TextInput');
    return { bg:getComputedStyle(root).backgroundColor, placeholder:getComputedStyle(element.control,'::placeholder').color };
  });
  expect(colors.bg).not.toBe('rgb(128, 0, 128)');
  expect(colors.placeholder).not.toBe('rgb(255, 255, 255)');
  await expect(page.locator('#field .h_designSystem-Field-message')).not.toHaveCSS('color','rgb(255, 255, 0)');
  await page.locator('#controlled').evaluate((element:any) => { element.disabled=true; });
  await expect(page.locator('#controlled input')).toBeDisabled();
  await expect(page.locator('#controlled .h_designSystem-TextInput')).not.toHaveCSS('background-color','rgb(128, 0, 128)');
  await page.locator('#controlled').evaluate((element:any) => { element.disabled=false; });
  await page.locator('#field label').click();
  await expect(page.locator('#controlled input')).toBeFocused();
  await expect(page.locator('#field .h_designSystem-Field')).toHaveCSS('gap','16px');
  await expect(page.locator('#field .h_designSystem-Field')).toHaveCSS('text-align','left');
  await page.locator('#field').evaluate((element:any) => { element.error=''; element.description=''; });
  await expect(page.locator('#field .h_designSystem-Field-live')).toHaveCSS('display','none');
});

test('submit 취소·Enter 제출·Radio 사용자 검증', async ({ page }) => {
  await page.goto('/html.html');
  await page.locator('#required input').fill('이름');
  await page.locator('#radio-a input').check();
  await page.locator('#radio-a').evaluate((element:any) => { element.setCustomValidity('선택 확인'); });
  expect(await page.locator('#radio-a').evaluate((element:any) => element.checkValidity())).toBe(false);
  await page.locator('#radio-a').evaluate(async (element:any) => { element.requestUpdate(); await element.updateComplete; });
  expect(await page.locator('#radio-a').evaluate((element:any) => element.validationMessage)).toBe('선택 확인');
  await page.locator('#radio-a').evaluate((element:any) => element.setCustomValidity(''));
  await page.locator('#submit').evaluate(element => element.addEventListener('click',event=>event.preventDefault(),{once:true}));
  await page.locator('#submit button').click();
  expect(await page.evaluate(() => (window as any).submitted)).toBeUndefined();
  await page.locator('#required input').press('Enter');
  await expect.poll(()=>page.evaluate(()=>(window as any).submitted)).toEqual(expect.arrayContaining([['action','save']]));
});

test('기본 IconButton·Chip·Badge 및 세로 Tabs', async ({ page }) => {
  await page.goto('/react.html');
  await expect(page.locator('h-icon-button')).toHaveAttribute('data-size','16');
  await page.evaluate(async()=>{
    for(const tag of ['h-chip','h-badge']) { const element=document.createElement(tag) as any; element.size='small'; element.textContent='확인'; document.body.append(element); await element.updateComplete; }
    (document.querySelector('h-tab-list') as any).orientation='vertical';
  });
  await expect(page.locator('h-chip [data-spec]')).toHaveCSS('height','32px');
  await expect(page.locator('h-badge [data-spec]')).toHaveCSS('height','32px');
  await expect(page.locator('h-tab-list .h_designSystem-TabList')).toHaveCSS('flex-direction','column');
  await page.locator('h-tab').first().focus();
  await page.keyboard.press('ArrowDown');
  await expect(page.locator('h-tab').nth(1)).toHaveAttribute('aria-selected','true');
});

test('소수 너비에서도 구간 사이 공백 없음', async ({ page }) => {
  await page.goto('/html.html');
  for (const [width, size] of [[768.5,'large'],[992.5,'xlarge']] as const) {
    const frame = await page.evaluateHandle(width=>{ const frame=document.createElement('iframe'); frame.style.width=width+'px'; frame.style.border='0'; frame.src='/html.html'; document.body.append(frame); return frame; },width);
    const content = await frame.asElement()!.contentFrame();
    await expect(content!.locator('#responsive')).toHaveAttribute('data-size',size);
    await frame.evaluate(element=>element.remove()); await frame.dispose();
  }
});
