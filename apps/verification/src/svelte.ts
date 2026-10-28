import { mount } from 'svelte';
import '@h_designsystem/ui/elements/button';
import '@h_designsystem/ui/elements/field';
import '@h_designsystem/ui/elements/text-input';
import '@h_designsystem/ui/styles.css';
import './design-system.config';
import App from './SvelteExample.svelte';
mount(App, { target: document.getElementById('app')! });
