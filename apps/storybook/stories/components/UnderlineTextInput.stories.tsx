import { createStory } from '../component-stories';
const config = createStory('UnderlineTextInput');
const meta = { ...config.meta, title: '컴포넌트/UnderlineTextInput' };
export default meta;
export const Playground = { ...config.example };
export const WithField = { ...config.field };
