import { createStory } from '../component-stories';
const config = createStory('Select');
const meta = { ...config.meta, title: '컴포넌트/Select' };
export default meta;
export const Playground = { ...config.example };
export const WithField = { ...config.field };
