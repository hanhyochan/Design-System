import { createRoot } from 'react-dom/client';
import { Demo as Before } from 'baseline:preview.tsx';
import 'baseline:styles.css';
import { Demo as After, type Args } from '../../storybook/stories/components/shared/preview';
import { catalog, fieldFamilies } from '../../storybook/stories/components/shared/catalog';
import '@h_designsystem/ui/styles.css';

const defaults: Args = { kind:'',size:'medium',iconSize:16,state:'default',text:'컴포넌트',withField:false,message:'description',description:'입력 안내',error:'오류 문구',messageColor:'blue' };
const cases = catalog.flatMap(group=>group.variants.map(variant=>({ id:variant.id,args:{...defaults,kind:group.key,state:variant.state,size:['small','medium','large','xlarge'].includes(variant.size)?variant.size:'medium',iconSize:Number(variant.size.replace(/[^\d]/g,''))||16} as Args })));
const fields = catalog.filter(group=>fieldFamilies.includes(group.family)).flatMap(group=>['small','medium','large','xlarge'].flatMap(size=>(['description','error'] as const).map(message=>({ id:`field-${group.key}-${size}-${message}`,args:{...defaults,kind:group.key,size,state:group.variants[0].state,withField:true,message,messageColor:message==='error'?'red':'blue'} as Args }))));
createRoot(document.getElementById('app')!).render(<main style={{fontFamily:'Arial',display:'grid',gap:24}}>{[...cases,...fields].map(({id,args})=><section key={id} data-comparison={id} style={{display:'flex',gap:24}}><div data-before style={{width:320}}><Before args={args} gallery/></div><div data-after style={{width:320}}><After args={args} gallery/></div></section>)}</main>);
