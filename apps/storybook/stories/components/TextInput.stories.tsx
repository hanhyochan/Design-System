import { createStory } from './shared';
const config = createStory('TextInput');
const meta = { ...config.meta, title: '컴포넌트/TextInput' };
export default meta;
export const Playground = { ...config.example };
export const WithField = { ...config.field };
