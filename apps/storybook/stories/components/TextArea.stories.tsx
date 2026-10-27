import { createStory } from '../component-stories';
const config = createStory('TextArea');
const meta = { ...config.meta, title: '컴포넌트/TextArea' };
export default meta;
export const Playground = { ...config.example };
export const WithField = { ...config.field };
