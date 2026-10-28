import { test, expect } from '@playwright/test';
test('748개 고정 규격과 Field 192개 조합의 전환 전후 외형', async ({ page }) => {
  test.skip(!process.env.H_DESIGNSYSTEM_BASELINE || test.info().project.name!=='chromium', '전환 전 보관본을 지정한 Chromium 비교에서 실행합니다.');
  test.setTimeout(90000);
  await page.goto('http://127.0.0.1:6175/appearance.html');
  await expect(page.locator('[data-comparison]')).toHaveCount(940);
  await page.waitForFunction(()=>Array.from(document.querySelectorAll('[data-after]')).every(element=>element.querySelector('[data-size]')));
  const differences = await page.evaluate(async () => {
    const properties=['height','minHeight','width','paddingTop','paddingRight','paddingBottom','paddingLeft','borderTopWidth','borderRadius','fontSize','fontWeight','lineHeight','gap','color','backgroundColor'];
    function find(root: ParentNode, selector:string): HTMLElement | null {
      const direct=root.querySelector<HTMLElement>(selector); if(direct)return direct;
      for(const node of root.querySelectorAll('*'))if(node.shadowRoot){const found=find(node.shadowRoot,selector);if(found)return found;}
      return null;
    }
    await Promise.all(Array.from(document.querySelectorAll('*')).filter(element=>'updateComplete' in element).map((element:any)=>element.updateComplete));
    return Array.from(document.querySelectorAll('[data-comparison]')).flatMap(row=>{
      const before=find(row.querySelector('[data-before]')!,'[data-spec]')!;
      const after=find(row.querySelector('[data-after]')!,'[data-spec]')!;
      if(!before||!after)return [{id:row.getAttribute('data-comparison'),property:'missing',before:!!before,after:!!after}];
      const a=getComputedStyle(before),b=getComputedStyle(after);
      return properties.filter(property=>{
        // Field의 직접 flex 자식이 Shadow 내부 요소가 되면 auto가 0px로 계산됩니다.
        // 실제 높이가 같은 경우에만 이 계산값 차이를 허용합니다.
        if(property==='minHeight' && a.minHeight==='auto' && b.minHeight==='0px' && before.getBoundingClientRect().height===after.getBoundingClientRect().height) return false;
        return a[property as any]!==b[property as any];
      }).map(property=>({id:row.getAttribute('data-comparison'),property,before:a[property as any],after:b[property as any]}));
    });
  });
  await test.info().attach('appearance-differences',{body:JSON.stringify(differences,null,2),contentType:'application/json'});
  expect(differences).toEqual([]);
});
