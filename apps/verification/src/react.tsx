import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Button, TextInput, Select, Checkbox, Field, Tabs, TabList, Tab, TabPanel, Text, IconButton } from '@h_designsystem/ui';
import '@h_designsystem/ui/styles.css';
import './design-system.config';
import search from '@h_designsystem/foundation/icons/icon_search_medium_2.svg';
function App() {
  const [value, setValue] = useState('처음');
  const [checked, setChecked] = useState(false);
  return <main style={{display:'grid',gap:'var(--h_designSystem-unit-16)',padding:'var(--h_designSystem-unit-24)',fontFamily:'Arial'}}>
    <Button id="responsive" size={{base:'xlarge',tablet:'large',mobile:'medium'}}>반응형 버튼</Button>
    <Button id="fixed" size="large">고정 버튼</Button>
    <Button id="default">기본 버튼</Button>
    <IconButton variant="filled" icon={<img src={search} alt="" />} aria-label="검색" />
    <Field label="이름" description="이름을 입력해 주세요."><TextInput id="controlled" value={value} onInput={event=>setValue(event.currentTarget.value)} /></Field>
    <TextInput id="locked" value="고정값" />
    <output id="value">{value}</output>
    <Checkbox id="check" checked={checked} onChange={event=>setChecked(event.currentTarget.checked)} aria-label="동의" />
    <Select id="select" defaultValue="two"><option value="one">하나</option><option value="two">둘</option></Select>
    <Tabs defaultValue="a"><TabList aria-label="내용"><Tab value="a">첫째</Tab><Tab value="b">둘째</Tab><Tab value="c" disabled>비활성</Tab></TabList><TabPanel value="a">첫 내용</TabPanel><TabPanel value="b">둘 내용</TabPanel></Tabs>
    <Text id="responsive-text" typography={{base:'title_20_700',mobile:'body_16_400'}}>반응형 텍스트</Text>
  </main>;
}
createRoot(document.getElementById('app')!).render(<App/>);
