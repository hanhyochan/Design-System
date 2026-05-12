# Design System Guide

This file is the single source of truth to give to an AI when creating a new project from this design system.

The AI must be able to generate:

- A global stylesheet containing the reset CSS and every foundation token from this document.
- Reusable component styles that consume those global foundation token variables.
- Component CSS whose computed style matches the current design system for the requested component, variant, state, shape, and size.

Important distinction:

- Mandatory: use only the tokens in this document.
- Mandatory: generate global CSS first, then build component styles on top of those global tokens.
- Mandatory: follow component color tokens, layout, sizing, spacing, typography, radius, border-width, shadow, icon, and state-structure rules for the default design-system reproduction.
- Mandatory: when the source component CSS uses a token variable, the generated component CSS must use the same token variable.
- Flexible only when explicitly requested: project-specific brand colors may change, but only by swapping to other color tokens from this document.
- Exception: variants named `gray line` must keep their gray/neutral line behavior by using neutral/line tokens.

Do not hardcode new values. If a component is rebuilt as React/Vue/etc., keep the same CSS specs and consume the foundation variables from the global stylesheet.

## 1. AI Instruction

Use this instruction when sending this file to an AI:

```text
Follow design-system.md strictly.
Create the project using the boilerplate structure.
First generate global CSS with the reset code and all foundation tokens from this file.
Then generate component styles that use those global token variables.
For the default design-system reproduction, component classes must match the exact source component CSS specs in this document.
Do not invent new raw CSS values.
Use only the tokens defined in this file.
Do not change component color tokens, typography tokens, radius tokens, border tokens, shadow tokens, or state tokens unless the user explicitly asks for a project-specific token swap.
Component specs are mandatory: background, color, border, height, min-height, padding, gap, font-size, font-weight, line-height, radius, border width, shadow, icon size, and state structure must follow this document.
If the project uses Tailwind CSS, put foundation tokens and reset/base rules inside @layer base, reusable component classes inside @layer components, and leave utility overrides to @layer utilities. Do not emit unlayered reset CSS.
If the project uses CSS Modules, scoped styles, CSS-in-JS, Shadow DOM, portals, or a UI framework, keep foundation tokens and reset/base rules global and load them before component styles.
When generating CSS classes, follow the component class naming policy in this document. The class name must describe the visual component spec, not the HTML tag.
Build reusable components instead of copying every one-off class from the original design system.
```

### 1.1 Required Generation Flow

When this markdown file is used to create or update a project, follow this order:

1. Create the project structure.
2. Create `global.css` or the framework's global stylesheet.
3. Put every foundation token from section 4 into the global stylesheet before component styles.
4. Put the reset/base CSS from section 3 into the same global stylesheet after the tokens.
5. Generate reusable component CSS or component-level styles from section 6.
6. Make every component style reference the global foundation variables when the source spec uses variables.
7. Use exact px values only where the source component CSS uses exact px values or where the spec says fixed dimensions are intentional.

Required result:

- If a user asks for `badge filled medium`, generate `badge_filled_medium` with the exact CSS properties in section 6.11, using `var(--font-size-14)`, `var(--line-height-20)`, `var(--font-weight-500)`, `var(--radius-full)`, `var(--color-blue-50)`, and `var(--color-common-100)`.
- If a user asks for `filled rounded small button`, generate `btn_primary_filled_rounded_small` with the exact CSS properties in section 6.11.
- The generated components may be implemented as React/Vue/Svelte/etc. components, but the rendered class or computed CSS must still match the documented design-system spec.
- Do not generate a component first and then invent local values. The component must be derived from the already-defined global foundation tokens.

## 2. Boilerplate Structure

```text
project-root/
  index.html
  global.css
  layout.css
  design-system.md
  system/
    foundation/
      color.css
      spacing.css
      decorate.css
      typography.css
      icons.js
      icons/
    component/
      button.css
      tab.css
      text_input.css
      textarea.css
      chip.css
      badge.css
      toggle.css
      select.css
      checkbox.css
      radio.css
```

If CSS files are imported separately, keep this order:

```html
<link rel="stylesheet" href="./system/foundation/color.css" />
<link rel="stylesheet" href="./system/foundation/spacing.css" />
<link rel="stylesheet" href="./system/foundation/decorate.css" />
<link rel="stylesheet" href="./system/foundation/typography.css" />
<link rel="stylesheet" href="./global.css" />
<link rel="stylesheet" href="./layout.css" />
<link rel="stylesheet" href="./system/component/button.css" />
<link rel="stylesheet" href="./system/component/tab.css" />
<link rel="stylesheet" href="./system/component/text_input.css" />
<link rel="stylesheet" href="./system/component/textarea.css" />
<link rel="stylesheet" href="./system/component/chip.css" />
<link rel="stylesheet" href="./system/component/badge.css" />
<link rel="stylesheet" href="./system/component/toggle.css" />
<link rel="stylesheet" href="./system/component/select.css" />
<link rel="stylesheet" href="./system/component/checkbox.css" />
<link rel="stylesheet" href="./system/component/radio.css" />
```

If a project uses one global stylesheet, generate it in this order:

1. Foundation tokens: color, spacing, decorate, typography.
2. Reset and base styles.
3. Layout utilities.
4. Reusable component styles.

`global.css` must be the source of the foundation variables. Component CSS must consume these variables with `var(--...)`; it must not redefine token variables locally or replace documented token variables with ad hoc raw values.

### 2.1 Tailwind CSS / Cascade Layer Policy

If the project uses Tailwind CSS, especially Tailwind v4, do not paste the reset as unlayered CSS.

CSS cascade layers change priority. Unlayered CSS can override layered Tailwind utilities even when the selector looks weaker. This can break utility-driven colors such as button text color when reset rules like `a { color: inherit; }` or form-control inheritance are outside Tailwind layers.

Tailwind projects must place design-system CSS in explicit layers:

`````css
@layer base {
  /* foundation tokens and reset/base styles */
}

@layer components {
  /* reusable component classes, if generated as CSS classes */
}

@layer utilities {
  /* project utilities and Tailwind utilities */
}
```

Layer rules:

- Put `:root` foundation tokens in `@layer base`.
- Put the reset block in `@layer base`.
- Put reusable component classes in `@layer components`.
- Let Tailwind utilities remain in `@layer utilities`.
- Do not place reset/base rules as unlayered CSS in a Tailwind project.
- Do not use `!important` to fight cascade layer issues. Fix the layer placement instead.
- If a framework has its own CSS layer convention, map foundation/reset to the lowest/base layer, components to the component layer, and one-off utilities to the utility layer.

### 2.2 Framework Integration Policy

The design system must survive different project stacks. Do not assume plain static CSS unless the project actually uses it.

Framework rules:

- Plain CSS: import foundation tokens first, then reset/base, layout utilities, then component styles.
- Tailwind CSS v4: place foundation tokens and reset/base rules inside `@layer base`; place reusable component classes inside `@layer components`; leave one-off utilities in `@layer utilities`.
- CSS Modules: do not put `:root`, `html`, `body`, reset selectors, or element selectors in a module file. Put them in a real global stylesheet such as `global.css` or `globals.css`.
- Vue scoped styles and Svelte scoped styles: do not put foundation tokens or reset/base rules inside scoped blocks. Use a global style block or project global CSS entry.
- CSS-in-JS, styled-components, emotion, or stitches: create one global style injection for tokens and reset/base rules, mount it at the app root, and ensure it loads before component styles.
- Next.js, Nuxt, Remix, Vite, and similar bundlers: import the global design-system stylesheet only from the framework's global entry point. Do not import global reset CSS from leaf components.
- Bootstrap, MUI, Ant Design, Radix, shadcn/ui, or any external UI kit: wrap or restyle components so their sizing, spacing, typography, radius, border width, focus, disabled, and state structure match this document. Do not let the external library's default theme replace these specs.
- SSR/hydration projects: keep token and reset injection deterministic so server-rendered and client-rendered CSS order match.

### 2.3 Scope, Portal, And Shadow DOM Policy

Global styles do not always reach every rendered node.

- `:root` tokens and reset/base rules must exist in the main document before components render.
- Portaled UI such as modals, dropdowns, popovers, tooltips, toasts, and date pickers must still inherit the same tokens and reset/base rules. If a portal mounts outside the main app root, verify its container inherits the global CSS.
- Shadow DOM and Web Components do not automatically receive document reset rules. For Shadow DOM components, expose the design-system tokens through `:host` and include the required base/reset behavior inside the shadow root when needed.
- Iframes are separate documents. If UI is rendered inside an iframe, inject the same foundation tokens and reset/base CSS into the iframe document.
- Do not assume component styles attached to one root node will affect portals, shadow roots, iframes, or external widget containers.

### 2.4 Token Implementation Policy

The numeric values in the spec tables are design targets. Implementation should use existing tokens whenever a matching token exists.

- Use CSS variables from this document for colors, spacing, radius, border width, shadow, font size, line height, and font weight.
- Do not write raw hex/rgb/hsl colors.
- Do not invent new spacing, typography, radius, border, or shadow values.
- Component-only dimensions such as button min-height, toggle track size, or icon control size may use the exact documented px value when no matching token exists.
- If a documented value exists as a token, use the token instead of repeating the raw number.
- If a source component spec already uses a token variable, generated component CSS must use that same token variable and rely on the global stylesheet to define it.
- Do not define component-private token aliases such as `--button-height-small` unless the project separately maps them to the exact documented global tokens and fixed values.
- Font loading is part of implementation. If using `"Noto Sans KR"`, load it through the project font system or accept the documented fallback stack.

## 3. Global Reset

Copy this reset into the global stylesheet after the foundation tokens. In Tailwind projects, do not paste this as unlayered CSS; wrap it in `@layer base` with the foundation tokens.

`````css
*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  font-size: var(--font-size-16);
  -webkit-text-size-adjust: 100%;
}

body {
  min-height: 100vh;
  margin: 0;
  color: var(--color-label-strong);
  font-family:
    "Noto Sans KR", "Apple SD Gothic Neo", "Malgun Gothic", sans-serif;
  line-height: var(--line-height-32);
}

button,
input,
select,
textarea {
  margin: 0;
  color: inherit;
  font: inherit;
}

button {
  border: 0;
  background: none;
  cursor: pointer;
}

a {
  color: inherit;
  text-decoration: none;
}

ul,
ol {
  margin: 0;
  padding: 0;
  list-style: none;
}

img,
picture,
video,
canvas,
svg {
  display: block;
  max-width: 100%;
}

table {
  border-collapse: collapse;
  border-spacing: 0;
}

fieldset {
  min-width: 0;
  margin: 0;
  padding: 0;
  border: 0;
}

legend {
  padding: 0;
}
```

Reset rules:

- All elements and pseudo-elements use `box-sizing: border-box`.
- `html` uses `--font-size-16` and disables mobile text auto scaling with `-webkit-text-size-adjust: 100%`.
- `body` has no margin, fills at least the viewport height, and uses the default design-system font stack.
- Form controls inherit text color and font.
- Buttons start from a neutral reset: no border, no background, pointer cursor.
- Links inherit color and remove default underline.
- Lists remove default margin, padding, and markers.
- Media elements are block-level and cannot exceed container width.
- Tables collapse borders and remove spacing.
- Fieldset and legend defaults are removed.
- `svg { display: block; }` is the default media reset. Inline text icons must be handled by the icon/button component with `display: inline-block` or flex alignment when inline behavior is needed.

## 4. Foundation Tokens

The following CSS blocks are the complete foundation token set. A generated project must include all of them.

### 4.1 Color Tokens

`````css
:root {
    /* color: atomic / common */
    --color-common-0: #000000;
    --color-common-100: #ffffff;

    /* color: atomic / neutral */
    --color-neutral-0: #000000;
    --color-neutral-5: #0f0f0f;
    --color-neutral-10: #171717;
    --color-neutral-15: #1c1c1c;
    --color-neutral-20: #2a2a2a;
    --color-neutral-22: #303030;
    --color-neutral-30: #474747;
    --color-neutral-40: #5c5c5c;
    --color-neutral-50: #737373;
    --color-neutral-60: #8a8a8a;
    --color-neutral-70: #9b9b9b;
    --color-neutral-80: #b0b0b0;
    --color-neutral-90: #c4c4c4;
    --color-neutral-95: #dcdcdc;
    --color-neutral-97: #f0f0f0;
    --color-neutral-99: #f7f7f7;
    --color-neutral-100: #ffffff;

    /* color: atomic / cool neutral */
    --color-cool-neutral-0: #000000;
    --color-cool-neutral-5: #0f0f10;
    --color-cool-neutral-7: #141415;
    --color-cool-neutral-10: #171719;
    --color-cool-neutral-15: #1b1c1e;
    --color-cool-neutral-17: #212225;
    --color-cool-neutral-20: #292a2d;
    --color-cool-neutral-22: #2e2f33;
    --color-cool-neutral-23: #333438;
    --color-cool-neutral-25: #37383c;
    --color-cool-neutral-30: #46474c;
    --color-cool-neutral-40: #5a5c63;
    --color-cool-neutral-50: #70737c;
    --color-cool-neutral-60: #878a93;
    --color-cool-neutral-70: #989ba2;
    --color-cool-neutral-80: #aeb0b6;
    --color-cool-neutral-90: #c2c4c8;
    --color-cool-neutral-95: #dbdcdf;
    --color-cool-neutral-96: #e1e2e4;
    --color-cool-neutral-97: #eaebec;
    --color-cool-neutral-98: #f4f4f5;
    --color-cool-neutral-99: #f7f7f8;
    --color-cool-neutral-100: #ffffff;

    /* color: atomic / blue */
    --color-blue-0: #000000;
    --color-blue-10: #001536;
    --color-blue-20: #002966;
    --color-blue-30: #003e9c;
    --color-blue-40: #0054d1;
    --color-blue-45: #005eeb;
    --color-blue-50: #0066ff;
    --color-blue-55: #1a75ff;
    --color-blue-60: #3385ff;
    --color-blue-65: #4f95ff;
    --color-blue-70: #69a5ff;
    --color-blue-80: #9ec5ff;
    --color-blue-90: #c9defe;
    --color-blue-95: #eaf2fe;
    --color-blue-99: #f7fbff;
    --color-blue-100: #ffffff;

    /* color: atomic / red */
    --color-red-0: #000000;
    --color-red-10: #3b0101;
    --color-red-20: #730303;
    --color-red-30: #b00c0c;
    --color-red-40: #e52222;
    --color-red-50: #ff4242;
    --color-red-60: #ff6363;
    --color-red-70: #ff8c8c;
    --color-red-80: #ffb5b5;
    --color-red-90: #fed5d5;
    --color-red-95: #feecec;
    --color-red-99: #fffafa;
    --color-red-100: #ffffff;

    /* color: atomic / red orange */
    --color-red-orange-0: #000000;
    --color-red-orange-10: #290f00;
    --color-red-orange-20: #592100;
    --color-red-orange-30: #913500;
    --color-red-orange-40: #c94a00;
    --color-red-orange-48: #f55a00;
    --color-red-orange-50: #ff5e00;
    --color-red-orange-60: #ff7b2e;
    --color-red-orange-70: #ff9b61;
    --color-red-orange-80: #ffbd96;
    --color-red-orange-90: #fed9c4;
    --color-red-orange-95: #feeee5;
    --color-red-orange-99: #fffaf7;
    --color-red-orange-100: #ffffff;

    /* color: atomic / orange */
    --color-orange-0: #000000;
    --color-orange-10: #361e00;
    --color-orange-20: #663a00;
    --color-orange-30: #9c5800;
    --color-orange-39: #d17600;
    --color-orange-40: #d47800;
    --color-orange-50: #ff9200;
    --color-orange-60: #ffa938;
    --color-orange-70: #ffc06e;
    --color-orange-80: #ffd49c;
    --color-orange-90: #fee6c6;
    --color-orange-95: #fef4e6;
    --color-orange-99: #fffcf7;
    --color-orange-100: #ffffff;

    /* color: atomic / yellow */
    --color-yellow-0: #000000;
    --color-yellow-10: #666600;
    --color-yellow-20: #999900;
    --color-yellow-30: #cccc00;
    --color-yellow-40: #e6e600;
    --color-yellow-50: #ffff00;
    --color-yellow-60: #ffff33;
    --color-yellow-70: #ffff66;
    --color-yellow-80: #ffff99;
    --color-yellow-90: #ffffcc;
    --color-yellow-100: #ffffff;

    /* color: atomic / green */
    --color-green-0: #000000;
    --color-green-10: #00240c;
    --color-green-20: #004517;
    --color-green-30: #006e25;
    --color-green-40: #009632;
    --color-green-50: #00bf40;
    --color-green-60: #1ed45a;
    --color-green-70: #49e57d;
    --color-green-80: #7df5a5;
    --color-green-90: #acfcc7;
    --color-green-95: #d9ffe6;
    --color-green-99: #f2fff6;
    --color-green-100: #ffffff;

    /* color: atomic / lime */
    --color-lime-0: #000000;
    --color-lime-10: #112900;
    --color-lime-20: #225200;
    --color-lime-30: #347d00;
    --color-lime-37: #429e00;
    --color-lime-40: #48ad00;
    --color-lime-50: #58cf04;
    --color-lime-60: #6be016;
    --color-lime-70: #88f03e;
    --color-lime-80: #aef779;
    --color-lime-90: #ccfca9;
    --color-lime-95: #e6ffd4;
    --color-lime-99: #f8fff2;
    --color-lime-100: #ffffff;

    /* color: atomic / cyan */
    --color-cyan-0: #000000;
    --color-cyan-10: #00252b;
    --color-cyan-20: #004854;
    --color-cyan-30: #006f82;
    --color-cyan-40: #0098b2;
    --color-cyan-50: #00bdde;
    --color-cyan-60: #28d0ed;
    --color-cyan-70: #57dff7;
    --color-cyan-80: #8aedff;
    --color-cyan-90: #b5f4ff;
    --color-cyan-95: #defaff;
    --color-cyan-99: #f7feff;
    --color-cyan-100: #ffffff;

    /* color: atomic / light blue */
    --color-light-blue-0: #000000;
    --color-light-blue-10: #002130;
    --color-light-blue-20: #004261;
    --color-light-blue-30: #006796;
    --color-light-blue-40: #008dcf;
    --color-light-blue-50: #00aeff;
    --color-light-blue-60: #3dc2ff;
    --color-light-blue-70: #70d2ff;
    --color-light-blue-80: #a1e1ff;
    --color-light-blue-90: #c4ecfe;
    --color-light-blue-95: #e5f6fe;
    --color-light-blue-99: #f7fdff;
    --color-light-blue-100: #ffffff;

    /* color: atomic / violet */
    --color-violet-0: #000000;
    --color-violet-10: #11024d;
    --color-violet-20: #23098f;
    --color-violet-30: #3a16c9;
    --color-violet-40: #4f29e5;
    --color-violet-45: #5b37ed;
    --color-violet-50: #6541f2;
    --color-violet-60: #7d5ef7;
    --color-violet-70: #9e86fc;
    --color-violet-80: #c0b0ff;
    --color-violet-90: #dbd3fe;
    --color-violet-95: #f0ecfe;
    --color-violet-99: #fbfaff;
    --color-violet-100: #ffffff;

    /* color: atomic / purple */
    --color-purple-0: #000000;
    --color-purple-10: #290247;
    --color-purple-20: #580a7d;
    --color-purple-30: #861cb8;
    --color-purple-40: #ad36e3;
    --color-purple-50: #cb59ff;
    --color-purple-60: #d478ff;
    --color-purple-70: #de96ff;
    --color-purple-80: #e9baff;
    --color-purple-90: #f2d6ff;
    --color-purple-95: #f9edff;
    --color-purple-99: #fefbff;
    --color-purple-100: #ffffff;

    /* color: atomic / pink */
    --color-pink-0: #000000;
    --color-pink-10: #3d0133;
    --color-pink-20: #730560;
    --color-pink-30: #a81690;
    --color-pink-40: #d331b8;
    --color-pink-46: #e846cd;
    --color-pink-50: #f553da;
    --color-pink-60: #fa73e3;
    --color-pink-70: #ff94ed;
    --color-pink-80: #ffb8f3;
    --color-pink-90: #fed3f7;
    --color-pink-95: #feecfb;
    --color-pink-99: #fffafe;
    --color-pink-100: #ffffff;

    /* color: semantic / accent */
    --color-accent-background-red-orange: #ff5e00;
    --color-accent-foreground-red-orange: #f55a00;
    --color-accent-foreground-red: #e52222;
    --color-accent-foreground-orange: #d17600;
    --color-accent-background-lime: #58cf04;
    --color-accent-foreground-lime: #429e00;
    --color-accent-foreground-green: #009632;
    --color-accent-background-cyan: #00bdde;
    --color-accent-foreground-cyan: #0098b2;
    --color-accent-background-light-blue: #00aeff;
    --color-accent-foreground-light-blue: #008dcf;
    --color-accent-foreground-blue: #005eeb;
    --color-accent-background-violet: #6541f2;
    --color-accent-foreground-violet: #5b37ed;
    --color-accent-background-purple: #cb59ff;
    --color-accent-foreground-purple: #ad36e3;
    --color-accent-background-pink: #f553da;
    --color-accent-foreground-pink: #e846cd;

    /* color: semantic / background */
    --color-background-elevated-alternative: #f7f7f8;
    --color-background-elevated-normal: #ffffff;
    --color-background-normal-alternative: #f7f7f8;
    --color-background-normal-normal: #ffffff;
    --color-background-transparent-alternative: rgb(255 255 255 / 28%);
    --color-background-transparent-normal: rgb(255 255 255 / 8%);

    /* color: semantic / fill */
    --color-fill-alternative: rgb(112 115 124 / 5%);
    --color-fill-normal: rgb(112 115 124 / 8%);
    --color-fill-strong: rgb(112 115 124 / 16%);

    /* color: semantic / interaction */
    --color-interaction-disable: #f4f4f5;
    --color-interaction-inactive: #989ba2;

    /* color: semantic / inverse */
    --color-inverse-background: #1b1c1e;
    --color-inverse-label: #f7f7f8;
    --color-inverse-primary: #3385ff;

    /* color: semantic / label */
    --color-label-alternative: rgb(55 56 60 / 61%);
    --color-label-assistive: rgb(55 56 60 / 28%);
    --color-label-disable: rgb(55 56 60 / 16%);
    --color-label-neutral: rgb(46 47 51 / 88%);
    --color-label-normal: #171719;
    --color-label-strong: #000000;

    /* color: semantic / line */
    --color-line-normal-alternative: rgb(112 115 124 / 8%);
    --color-line-normal-neutral: rgb(112 115 124 / 16%);
    --color-line-normal-normal: rgb(112 115 124 / 22%);
    --color-line-normal-strong: rgb(112 115 124 / 52%);
    --color-line-solid-0: #000000;
    --color-line-solid-10: #1a0f26;
    --color-line-solid-20: #34204c;
    --color-line-solid-alternative: #f4f4f5;
    --color-line-solid-neutral: #eaebec;
    --color-line-solid-normal: #e1e2e4;
    --color-line-solid-strong: #aeb0b6;

    /* color: semantic / material */
    --color-material-dimmer: rgb(23 23 25 / 52%);

    /* color: semantic / static */
    --color-static-black: #000000;
    --color-static-white: #ffffff;

    /* color: semantic / status */
    --color-status-cautionary: #ff9200;
    --color-status-negative: #ff4242;
    --color-status-positive: #00bf40;

    /* color: shadow */
    --color-alpha-shadow1: rgb(0 0 0 / 5%);
    --color-alpha-shadow2: rgb(0 0 0 / 8%);
    --color-alpha-shadow3: rgb(0 0 0 / 12%);

    /* color: opacity */
    --color-opacity-0: #000000;
    --color-opacity-0-2: #000000;
    --color-opacity-0-3: #000000;
    --color-opacity-0-4: #000000;
    --color-opacity-0-5: #000000;
    --color-opacity-0-6: #000000;
    --color-opacity-0-7: #000000;

    /* opacity */
    --opacity-0: 0;
    --opacity-5: 5%;
    --opacity-8: 8%;
    --opacity-12: 12%;
    --opacity-16: 16%;
    --opacity-22: 22%;
    --opacity-28: 28%;
    --opacity-35: 35%;
    --opacity-43: 43%;
    --opacity-52: 52%;
    --opacity-61: 61%;
    --opacity-74: 74%;
    --opacity-88: 88%;
    --opacity-97: 97%;
    --opacity-100: 100%;

    /* custom brand colors */
    /* brand color: artskorealab / yellow */
    --color-artskorealab-yellow-0: #000000;
    --color-artskorealab-yellow-10: #333300;
    --color-artskorealab-yellow-20: #666600;
    --color-artskorealab-yellow-30: #999900;
    --color-artskorealab-yellow-40: #cccc00;
    --color-artskorealab-yellow-50: #ffff00;
    --color-artskorealab-yellow-60: #ffff33;
    --color-artskorealab-yellow-70: #ffff66;
    --color-artskorealab-yellow-80: #ffff99;
    --color-artskorealab-yellow-90: #ffffcc;
    --color-artskorealab-yellow-100: #ffffff;

    /* brand color: artskorealab / cyan */
    --color-artskorealab-cyan-0: #000000;
    --color-artskorealab-cyan-10: #00292a;
    --color-artskorealab-cyan-20: #005255;
    --color-artskorealab-cyan-30: #007c7f;
    --color-artskorealab-cyan-40: #00a5aa;
    --color-artskorealab-cyan-50: #00ced4;
    --color-artskorealab-cyan-60: #33d8dd;
    --color-artskorealab-cyan-70: #66e2e5;
    --color-artskorealab-cyan-80: #99ebee;
    --color-artskorealab-cyan-90: #ccf5f6;
    --color-artskorealab-cyan-100: #ffffff;

    /* brand color: artskorealab / purple */
    --color-artskorealab-purple-0: #000000;
    --color-artskorealab-purple-10: #2a1d33;
    --color-artskorealab-purple-20: #543a66;
    --color-artskorealab-purple-30: #7f5699;
    --color-artskorealab-purple-40: #a973cc;
    --color-artskorealab-purple-50: #d390ff;
    --color-artskorealab-purple-60: #dca6ff;
    --color-artskorealab-purple-70: #e5bcff;
    --color-artskorealab-purple-80: #edd3ff;
    --color-artskorealab-purple-90: #f6e9ff;
    --color-artskorealab-purple-100: #ffffff;

    /* brand color: virtualdream / red */
    --color-virtualdream-red-0: #000000;
    --color-virtualdream-red-10: #2a0707;
    --color-virtualdream-red-20: #540e0e;
    --color-virtualdream-red-30: #7f1515;
    --color-virtualdream-red-40: #a91a1a;
    --color-virtualdream-red-50: #d31c1c;
    --color-virtualdream-red-60: #dc4747;
    --color-virtualdream-red-70: #e57373;
    --color-virtualdream-red-80: #ee9e9e;
    --color-virtualdream-red-90: #f6caca;
    --color-virtualdream-red-100: #ffffff;
}
```

Color token rules:

- Use color tokens only. Never add raw hex/rgb/hsl values in product CSS.
- Semantic tokens are preferred for common UI surfaces, text, lines, fills, and states.
- Atomic palette tokens may be used when a semantic token does not express the needed role.
- Default component reproduction must use the exact component color tokens documented in section 6.11.
- Button, badge, chip, tab active, hover, and text colors may be swapped only when the user explicitly requests project-specific color customization, and only to other tokens in this document.
- `gray line` variants must keep gray/neutral line colors by using neutral/line tokens.

### 4.2 Spacing Tokens

```css
:root {
  /* spacing: base */
  --spacing-0: 0;

  /* spacing: padding / horizontal */
  --spacing-padding-horizontal-4: 4px;
  --spacing-padding-horizontal-12: 12px;
  --spacing-padding-horizontal-16: 16px;
  --spacing-padding-horizontal-24: 24px;
  --spacing-padding-horizontal-32: 32px;
  --spacing-padding-horizontal-40: 40px;
  --spacing-padding-horizontal-60: 60px;

  /* spacing: padding / vertical */
  --spacing-padding-vertical-4: 4px;
  --spacing-padding-vertical-8: 8px;
  --spacing-padding-vertical-12: 12px;
  --spacing-padding-vertical-16: 16px;
  --spacing-padding-vertical-24: 24px;
  --spacing-padding-vertical-32: 32px;
  --spacing-padding-vertical-40: 40px;
  --spacing-padding-vertical-60: 60px;

  /* spacing: margin / horizontal */
  --spacing-margin-horizontal-4: 4px;
  --spacing-margin-horizontal-12: 12px;
  --spacing-margin-horizontal-16: 16px;
  --spacing-margin-horizontal-24: 24px;
  --spacing-margin-horizontal-32: 32px;
  --spacing-margin-horizontal-40: 40px;
  --spacing-margin-horizontal-60: 60px;

  /* spacing: margin / vertical */
  --spacing-margin-vertical-4: 4px;
  --spacing-margin-vertical-8: 8px;
  --spacing-margin-vertical-12: 12px;
  --spacing-margin-vertical-16: 16px;
  --spacing-margin-vertical-24: 24px;
  --spacing-margin-vertical-32: 32px;
  --spacing-margin-vertical-40: 40px;
  --spacing-margin-vertical-60: 60px;

  /* spacing: gap / horizontal */
  --spacing-gap-horizontal-4: 4px;
  --spacing-gap-horizontal-8: 8px;
  --spacing-gap-horizontal-16: 16px;
  --spacing-gap-horizontal-20: 20px;
  --spacing-gap-horizontal-24: 24px;
  --spacing-gap-horizontal-32: 32px;
  --spacing-gap-horizontal-40: 40px;
  --spacing-gap-horizontal-60: 60px;

  /* spacing: gap / vertical */
  --spacing-gap-vertical-4: 4px;
  --spacing-gap-vertical-8: 8px;
  --spacing-gap-vertical-16: 16px;
  --spacing-gap-vertical-20: 20px;
  --spacing-gap-vertical-24: 24px;
  --spacing-gap-vertical-32: 32px;
  --spacing-gap-vertical-40: 40px;
  --spacing-gap-vertical-60: 60px;
}
```

Spacing rules:

- Use padding tokens for internal component/container spacing.
- Use margin tokens for external spacing.
- Use gap tokens for flex/grid gaps.
- Do not create arbitrary values such as 5px, 10px, 18px, or 30px.
- Cards usually use 16px, 24px, or 32px internal padding.
- Page sections usually use 40px or 60px vertical rhythm.

### 4.3 Decoration Tokens

```css
:root {
  /* size */
  --size-44: 44px;
  --size-52: 52px;
  --size-72: 72px;
  --size-112: 112px;
  --size-320: 320px;

  /* radius */
  --radius-0: 0;
  --radius-2: 2px;
  --radius-8: 8px;
  --radius-16: 16px;
  --radius-20: 20px;
  --radius-24: 24px;
  --radius-32: 32px;
  --radius-40: 40px;
  --radius-full: 9999px;

  /* border */
  --border-0-5: 0.5px;
  --border-1: 1px;
  --border-2: 2px;
  --border-3: 3px;

  /* shadow: position */
  --shadow-y-3: 8px;
  --shadow-blur-3: 16px;
  --shadow-y-4: 16px;
  --shadow-blur-4: 24px;

  /* shadow: preset */
  --shadow-1: 0 1px 2px 0 var(--color-alpha-shadow1, rgba(0, 0, 0, 0.05));
  --shadow-2: 0 0 2px 0 var(--color-alpha-shadow1, rgba(0, 0, 0, 0.05)),
    0 4px 8px 0 var(--color-alpha-shadow2, rgba(0, 0, 0, 0.08));
  --shadow-3: 0 0 2px 0 var(--color-alpha-shadow2, rgba(0, 0, 0, 0.08)),
    0 var(--shadow-y-3, 8px) var(--shadow-blur-3, 16px) 0
      var(--color-alpha-shadow3, rgba(0, 0, 0, 0.12));
  --shadow-4: 0 0 2px 0 var(--color-alpha-shadow2, rgba(0, 0, 0, 0.08)),
    0 var(--shadow-y-4, 16px) var(--shadow-blur-4, 24px) 0
      var(--color-alpha-shadow3, rgba(0, 0, 0, 0.12));
}
```

Decoration rules:

- `--radius-0` is the default square control radius.
- `--radius-8` is the default rounded field/card radius.
- `--radius-full` is used for pill controls such as chips, badges, and full-rounded buttons.
- `--border-1` is the standard border width.
- `--border-2` is used for focus or stronger emphasis.
- Shadows are allowed only for elevated surfaces, popovers, modals, and shadow button variants.

### 4.4 Typography Tokens

```css
:root {
  /* typography: font size */
  --font-size-10: 10px;
  --font-size-11: 11px;
  --font-size-12: 12px;
  --font-size-14: 14px;
  --font-size-15: 15px;
  --font-size-16: 16px;
  --font-size-18: 18px;
  --font-size-20: 20px;
  --font-size-24: 24px;
  --font-size-28: 28px;
  --font-size-32: 32px;
  --font-size-40: 40px;
  --font-size-48: 48px;
  --font-size-52: 52px;
  --font-size-60: 60px;

  /* typography: font weight */
  --font-weight-300: 300;
  --font-weight-400: 400;
  --font-weight-500: 500;
  --font-weight-600: 600;
  --font-weight-700: 700;

  /* typography: line height */
  --line-height-16: 16px;
  --line-height-20: 20px;
  --line-height-24: 24px;
  --line-height-32: 32px;
  --line-height-40: 40px;
  --line-height-44: 44px;
  --line-height-48: 48px;
  --line-height-60: 60px;
  --line-height-72: 72px;
  --line-height-90: 90px;
}

/* typography: display */
.type-display_1 {
  font-size: var(--font-size-60);
  font-weight: var(--font-weight-400);
  line-height: var(--line-height-90);
}

.type-display_2 {
  font-size: var(--font-size-48);
  font-weight: var(--font-weight-400);
  line-height: var(--line-height-72);
}

.type-display_3 {
  font-size: var(--font-size-40);
  font-weight: var(--font-weight-400);
  line-height: var(--line-height-60);
}

/* typography: headline */
.type-headline_1 {
  font-size: var(--font-size-32);
  font-weight: var(--font-weight-400);
  line-height: var(--line-height-48);
}

.type-headline_2 {
  font-size: var(--font-size-28);
  font-weight: var(--font-weight-400);
  line-height: var(--line-height-44);
}

.type-headline_3 {
  font-size: var(--font-size-24);
  font-weight: var(--font-weight-400);
  line-height: var(--line-height-40);
}

/* typography: title */
.type-title_1 {
  font-size: var(--font-size-20);
  font-weight: var(--font-weight-500);
  line-height: var(--line-height-40);
}

.type-title_2 {
  font-size: var(--font-size-18);
  font-weight: var(--font-weight-500);
  line-height: var(--line-height-32);
}

/* typography: body */
.type-body_1 {
  font-size: var(--font-size-16);
  font-weight: var(--font-weight-400);
  line-height: var(--line-height-32);
}

.type-body_2 {
  font-size: var(--font-size-15);
  font-weight: var(--font-weight-400);
  line-height: var(--line-height-24);
}

/* typography: label */
.type-label_1 {
  font-size: var(--font-size-14);
  font-weight: var(--font-weight-500);
  line-height: var(--line-height-24);
}

/* typography: caption */
.type-caption_1 {
  font-size: var(--font-size-12);
  font-weight: var(--font-weight-500);
  line-height: var(--line-height-20);
}

.type-caption_2 {
  font-size: var(--font-size-11);
  font-weight: var(--font-weight-500);
  line-height: var(--line-height-20);
}

.type-caption_3 {
  font-size: var(--font-size-10);
  font-weight: var(--font-weight-500);
  line-height: var(--line-height-16);
}
```

Typography scale:

| Role | Class | Size | Line height | Weight | Usage |
| --- | --- | ---: | ---: | ---: | --- |
| Display 1 | `type-display_1` | 60px | 90px | 400 | Main display title |
| Display 2 | `type-display_2` | 48px | 72px | 400 | Secondary display title |
| Display 3 | `type-display_3` | 40px | 60px | 400 | Small display title |
| Headline 1 | `type-headline_1` | 32px | 48px | 400 | Page headline |
| Headline 2 | `type-headline_2` | 28px | 44px | 400 | Section headline |
| Headline 3 | `type-headline_3` | 24px | 40px | 400 | Subsection headline |
| Title 1 | `type-title_1` | 20px | 40px | 500 | Large title |
| Title 2 | `type-title_2` | 18px | 32px | 500 | Medium title |
| Body 1 | `type-body_1` | 16px | 32px | 400 | Primary body text |
| Body 2 | `type-body_2` | 15px | 24px | 400 | Secondary body text |
| Label 1 | `type-label_1` | 14px | 24px | 500 | Label and control text |
| Caption 1 | `type-caption_1` | 12px | 20px | 500 | Caption text |
| Caption 2 | `type-caption_2` | 11px | 20px | 500 | Small caption text |
| Caption 3 | `type-caption_3` | 10px | 16px | 500 | Tiny caption text |

Typography rules:

- Use typography classes as complete type styles. Do not independently combine font-size and line-height tokens for these named styles.
- Typography classes include size, weight, and line-height together.
- Font-family utility tokens such as `--font-sans` and `--font-mono` are not part of this foundation token set.
- Line-height tokens are px tokens only: `--line-height-16`, `--line-height-20`, `--line-height-24`, `--line-height-32`, `--line-height-40`, `--line-height-44`, `--line-height-48`, `--line-height-60`, `--line-height-72`, and `--line-height-90`.
- `--line-height-44` and `--line-height-90` are intentional tuned values in the current scale.
- Do not recreate percentage, ratio, or unapproved line-height tokens.
- Do not recreate 13px or 115px font tokens.
- Storybook must list Typography Styles first, then Typography Variables.
- Typography style previews should render one full-width row per style, show the style name with the small chip component, display the applied font-size and line-height, and include a two-line sample.

### 4.5 Foundation Storybook Organization

Foundation stories are split by token family:

- Colors
- Spacing
- Radius
- Border
- Shadow
- Typography

Foundation Storybook rules:

- Do not keep a combined Tokens story after the foundation pages are split.
- Do not create Size or Opacity foundation pages.
- Colors must be grouped in this order: Color Tokens, Brand Color Tokens, Semantic Color Tokens.
- Color Tokens contain atomic palettes such as common, neutral, cool-neutral, blue, red, red-orange, orange, yellow, green, lime, cyan, light-blue, violet, purple, and pink.
- Brand Color Tokens contain brand palettes such as artskorealab-yellow, artskorealab-cyan, artskorealab-purple, and virtualdream-red. Brand palettes are placed at the bottom of the color-token area.
- Semantic Color Tokens are grouped below token and brand palettes.
- Radius previews must show only documented radius tokens: `--radius-0`, `--radius-2`, `--radius-8`, `--radius-16`, `--radius-20`, `--radius-24`, `--radius-32`, `--radius-40`, and `--radius-full`.
- Do not document or preview Tailwind internal radius aliases.
- Radius preview boxes must be wide enough that only `--radius-full` appears fully rounded.
- Border previews must draw an actual line using the border-width token.
- Shadow previews must list `--shadow-1` through `--shadow-4` in order. Do not expose shadow blur helper tokens as display items.

## 5. Component Implementation Model

The original design-system CSS has many one-off classes for copy/paste inspection. New projects should implement reusable components instead.

Recommended API style:

```tsx
<Button variant="filled" size="medium" shape="square">Save</Button>
<Button variant="outline" size="small" icon="alarm">Notify</Button>
<Button as="a" href="/settings" variant="filled" size="medium">Go to settings</Button>
<TextInput variant="outline" size="medium" state="error" />
<Tab variant="grayLineOutline" size="medium" active />
```

Component rules:

- Default component colors must match the exact component color tokens documented in section 6.11.
- Component layout specs are not configurable unless a new official variant is created.
- Required fixed specs: background token, text/icon color token, border token, height/min-height, padding, gap, font-size, font-weight, line-height, radius, border width, shadow, icon size, and state structure.
- Color specs are not examples in default reproduction mode. They may be swapped only when the user explicitly asks for project-specific color customization, and swaps must stay inside the documented token set.
- Component visual specs are independent from the final HTML tag. A component may render as `button`, `a`, or another semantic element when appropriate, as long as the layout specs and accessibility rules are preserved.

### 5.1 Component Class Naming Policy

Generated component CSS must use stable design-system class names. The class name describes the component's visual spec and may be applied to different semantic tags.

Class naming rules:

- Use `snake_case`.
- Do not use camelCase, PascalCase, BEM, utility-only naming, or tag-based names for design-system component classes.
- Class names must not depend on the HTML tag. A button-like visual rendered as `button`, `a`, router `Link`, or another valid semantic element uses the same `btn_...` class.
- Use this order: component prefix, optional role, variant, shape, feature, state/effect, size.
- Omit segments that do not apply.
- `primary`, `text`, and `icon` in button class names describe the component role/type. In default reproduction mode they still use the exact documented button color tokens.
- The reusable component API may expose props such as `variant`, `size`, `shape`, `state`, `icon`, `disabled`, `as`, or `href`, but the emitted CSS class must still follow this naming policy when classes are generated.

Component prefixes:

| Component | Prefix | Example |
| --- | --- | --- |
| Button | `btn` | `.btn_primary_filled_small` |
| Icon button | `btn_icon` | `.btn_icon_outline_rounded_medium` |
| Text button | `btn_text` | `.btn_text_medium` |
| Tab | `tab` | `.tab_filled_active_medium` |
| Text input | `text_input` | `.text_input_outline_error_medium` |
| Textarea | `textarea` | `.textarea_outline_focus_large` |
| Select | `select` | `.select_filled_rounded_icon_medium` |
| Chip | `chip` | `.chip_gray_line_outline_disabled_small` |
| Badge | `badge` | `.badge_outline_small` |
| Toggle | `toggle` | `.toggle_disabled_medium` |
| Checkbox | `checkbox` | `.checkbox_disabled_small` |
| Radio | `radio` | `.radio_disabled_medium` |
| Card pattern | `card` | `.card` |
| Form pattern | `form`, `field` | `.form_stack`, `.field_label` |
| Table pattern | `table` | `.table_wrap`, `.data_table` |

Class examples:

```html
<button type="button" class="btn_primary_filled_small">Save</button>
<a href="/settings" class="btn_primary_filled_xlarge">Settings</a>
<button type="button" class="btn_primary_outline_rounded_icon_medium">Notify</button>
<button type="button" class="btn_icon_outline_full_rounded_large" aria-label="Open menu"></button>
<a href="/help" class="btn_text_xlarge">Help</a>
<button type="button" class="tab_gray_line_outline_active_medium" role="tab" aria-selected="true">Tab</button>
<label class="text_input_outline_error_medium"><input type="text" /></label>
<select class="select_filled_rounded_icon_medium"></select>
<span class="badge_filled_small">New</span>
```

Class segment examples:

- Variant: `filled`, `outline`, `gray_line_outline`.
- Shape: `rounded`, `full_rounded`; omit for square/default.
- Feature: `icon`, `password`.
- State/effect: `active`, `focus`, `complete`, `error`, `disabled`, `view`, `shadow`.
- Size: `small`, `medium`, `large`, `xlarge` when the component supports it.

### 5.2 Semantic Element Policy

Use the semantic element that matches the behavior.

- Use `button` for in-page actions: submit, save, open modal, toggle, delete, filter, apply, cancel, and any JavaScript action that does not navigate.
- Use `a` for navigation: moving to another URL, route, file, section, mail link, phone link, or external page. Anchor-style buttons must have a valid `href`.
- A visual button may be implemented as `button` or `a`. The visual component API should support this with an `as`, `href`, or equivalent prop.
- Do not use `div` or `span` for interactive button/link behavior unless there is no native semantic alternative. If unavoidable, add keyboard support, focus handling, and ARIA role explicitly.
- Disabled `button` elements must use the actual `disabled` attribute.
- Disabled `a` elements cannot use `disabled`. Use `aria-disabled="true"`, remove or guard navigation/click behavior, keep it focus-safe according to product needs, and apply the disabled visual state.
- Link-style buttons and button-style links must keep the same height, padding, font-size, font-weight, line-height, radius, border width, icon size, and alignment specs as the corresponding button variant.

### 5.3 DOM And Accessibility Policy

The visual component is not the same thing as the DOM node. Preserve semantic HTML, accessibility, and valid nesting.

- Do not nest interactive elements. Avoid structures such as `a > button`, `button > a`, `button > input`, or a clickable card link containing other buttons or links.
- Router links such as Next.js `Link`, React Router `Link`, NuxtLink, and similar components should receive the visual button/link class directly or through an `as`/`asChild`/`component` API. Do not wrap them in another `a` or `button`.
- Button components rendered as `button` must default to `type="button"` unless the intended behavior is form submission. Use `type="submit"` only for submit actions.
- Icon-only buttons and icon-only links must have an accessible name such as `aria-label`.
- Decorative icons inside text buttons, tabs, chips, inputs, and badges must use `aria-hidden="true"` or an equivalent hidden-from-assistive-tech setting.
- Every interactive component must have a visible `:focus-visible` state using design-system tokens.
- Disabled visuals must match real behavior. Use `disabled` for native controls, `readonly` for read-only text entry, and `aria-disabled` plus event/navigation guards for disabled links or custom controls.
- Custom controls that replace native elements must implement keyboard behavior, focus management, and ARIA roles matching the native pattern.
- Visually hidden native inputs must remain focusable and operable. Do not hide checkbox, radio, or toggle inputs with `display: none` when they are the real control.
- Dynamic state changes such as validation errors, loading, selected tab, expanded menu, or async completion must update ARIA attributes and visible state together.
- Color choices must preserve text/icon contrast. Tokens are mandatory, but token usage alone is not enough if the chosen foreground/background pair has poor contrast.

## 6. Component Specs

### 6.0 Exact Reconstruction Contract

This section is normative. A project generated from this document must be able to reproduce the same computed CSS as the source design system for every supported component/variant/size.

Implementation format is flexible:

- You may use one full class per variant, composed classes, CSS modules, CSS-in-JS, Tailwind utilities, or component props.
- The rendered computed style must match the component specs below.
- If exporting design-system CSS classes, use snake_case class names that describe the visual spec.
- The semantic element is flexible only where HTML behavior allows it. For example, a visual button may render as `button`, `a`, or a router link, but the visual CSS must stay identical.

Class naming order:

```text
{component}_{variant}_{shape}_{feature}_{state}_{size}
```

Omit parts that do not apply. Keep the remaining order stable.

Examples:

- `btn_primary_filled_small`
- `btn_primary_filled_rounded_small`
- `btn_primary_filled_rounded_shadow_small`
- `btn_primary_filled_rounded_icon_disabled_small`
- `btn_text_icon_xlarge`
- `btn_icon_outline_full_rounded_large`
- `chip_filled_small`
- `tab_gray_line_outline_active_medium`
- `text_input_outline_rounded_error_large`
- `select_filled_icon_disabled_medium`
- `toggle_on_large`
- `checkbox_disabled_medium`

Token and unit rules:

- All color, radius, shadow, typography, border, and spacing decisions must come from the foundation tokens in this document.
- Fixed component dimensions such as `min-height`, `width`, `height`, icon size, background-position, and transform distances may be written as exact px values when the source component CSS uses exact px values.
- Match the source component CSS notation. If the source uses `var(--font-size-14)`, output `var(--font-size-14)`, not `14px`. If the source uses raw `12px`, output raw `12px`.
- When the user asks for a concrete component class, expand the matching base, size, variant, shape, feature, and state rows into a complete CSS selector that can be copied directly.
- Do not invent new sizes, states, radii, shadows, border widths, typography levels, or component variants.
- Default reproduction mode must use the exact tokens listed in the component matrices below.
- If a product intentionally changes brand colors, it may only swap to existing color tokens. Layout, spacing, typography, border width, radius, shadow, state behavior, and icon sizing still follow this system exactly.
- In Tailwind v4 or any cascade-layer setup, put reset code in `@layer base`; put component classes in `@layer components` or a later layer. Never leave reset as unlayered CSS above generated component utilities, because unlayered CSS can override layered utilities.

### 6.1 Button

Base:

- `display: inline-flex`
- `align-items: center`
- `justify-content: center`
- `font-weight: 500`
- `white-space: nowrap`
- `appearance: none`
- `cursor: pointer`

Primary button size:

| Size | Min height | Padding X | Font size | Line height |
| --- | ---: | ---: | ---: | ---: |
| small | 32px | 16px | 12px | 16px |
| medium | 40px | 24px | 14px | 20px |
| large | 48px | 24px | 16px | 20px |
| xlarge | 60px | 24px | 16px | 20px |

Primary button support:

- `small`, `medium`, `large`, and `xlarge` are available for the main `Buttons` tables.
- `xlarge` exists for filled, outline, rounded, full rounded, icon, shadow, and disabled primary button variants.
- `xlarge` keeps the same typography and horizontal padding as `large`; only `min-height` changes from `48px` to `60px`.
- Primary button classes use the same visual class on `button`, `a`, and router-link components. Do not create tag-specific class names.

Primary button with text icon:

| Size | Icon size | Gap |
| --- | ---: | ---: |
| small | 12px | 8px |
| medium | 16px | 8px |
| large | 16px | 8px |
| xlarge | 16px | 8px |

Variant layout:

| Variant | Required layout | Color rule |
| --- | --- | --- |
| filled | border 0 | Default exact tokens are in 6.11. Product-specific color swaps must use color tokens only. |
| outline | `--border-1` solid | Default exact tokens are in 6.11. Product-specific color swaps must use color tokens only. |
| disabled | same size, cursor default | Default exact tokens are in 6.11. Use `disabled` for `button`; use `aria-disabled` and guarded navigation for `a`. |

Shape:

| Shape | Radius |
| --- | --- |
| square/default | `--radius-0` |
| rounded | `--radius-8` |
| full rounded | `--radius-full` |

Shadow:

- Small shadow variant uses `--shadow-2`.
- Medium shadow variant uses `--shadow-3`.
- Large and xlarge shadow variants use `--shadow-4`.
- Hover may remove shadow following the original pattern.

Icon-only Button+icon size:

| Variant group | Size | Control size | Icon size |
| --- | --- | ---: | ---: |
| filled | small | auto | 12px |
| filled | medium | auto | 16px |
| filled | large | auto | 20px |
| filled | xlarge | auto | 22px |
| outline / outline rounded / outline full rounded | small | 32px | 12px |
| outline / outline rounded / outline full rounded | medium | 40px | 16px |
| outline / outline rounded / outline full rounded | large | 48px | 16px |

Text button size:

| Size | Min height | Padding X | Font size | Line height | Weight |
| --- | ---: | ---: | ---: | ---: | ---: |
| small | 32px | 0 | 14px | 20px | 500 |
| medium | 40px | 0 | 15px | 20px | 500 |
| xlarge | 60px | 0 | 15px | 20px | 500 |

Text button with icon:

- Uses the same size table as text button.
- Uses `gap: 16px`.
- Uses a 20px trailing icon for `small`, `medium`, and `xlarge`.
- Text button supports `small`, `medium`, and `xlarge`; it does not currently define `large`.

Button rules:

- Use one primary filled action per action group.
- Secondary actions should use outline or text button structure.
- Use `xlarge` for high-emphasis primary or text actions that need a 60px touch/click target.
- Do not invent a `large` text button unless the source design system adds it.
- Do not add icon-only outline `xlarge` unless the source design system adds it; current icon-only outline variants stop at `large`.
- The same visual button spec may render as `button` or `a`.
- Use `button` for actions and `a` for navigation.
- `button` elements must default to `type="button"` unless the button submits a form.
- Anchor buttons must include `href` unless intentionally disabled.
- Do not build button/link interactions with `div` or `span` when a native `button` or `a` can be used.
- Disabled `button` elements must use the actual `disabled` attribute.
- Disabled anchor buttons must use `aria-disabled="true"` and must not navigate or trigger the disabled action.
- Icon-only buttons must have an accessible name such as `aria-label`.
- Buttons with decorative icons must hide the icon from assistive technology.

### 6.2 Tab

Base:

- `display: inline-flex`
- `align-items: center`
- `justify-content: center`
- `font-weight: 500`
- `white-space: nowrap`
- `cursor: pointer`

Size:

| Size | Min height | Padding X | Font size | Line height |
| --- | ---: | ---: | ---: | ---: |
| small | 32px | 12px | 14px | 20px |
| medium | 40px | 16px | 15px | 20px |
| large | 48px | 24px | 16px | 20px |

Variant layout:

- Filled: no border; default exact tokens are in 6.11.
- Outline: border layout; default exact tokens are in 6.11.
- Gray line outline: neutral/line gray border token is mandatory.
- Icon: keeps text/icon alignment and spacing from the original pattern.
- Rounded: `--radius-8`.
- Full rounded: `--radius-full`.

Tab rules:

- Active tab must use `aria-selected="true"`.
- Use `role="tablist"` and `role="tab"` where applicable.
- Connect tabs and panels with `aria-controls`, `aria-labelledby`, and matching IDs.
- Support keyboard navigation for tab groups: arrow keys move between tabs, and Home/End move to first/last tab when appropriate.
- Do not mix size or shape inside one tab group.

### 6.3 Text Input

Wrapper base:

- `display: inline-flex`
- `align-items: center`
- `width: 100%`
- `min-width: 0`
- `cursor: text`

Inner input:

- `width: 100%`
- `min-width: 0`
- `border: 0`
- `outline: 0`
- `background: transparent`

Size:

| Size | Min height | Padding X | Font size | Line height |
| --- | ---: | ---: | ---: | ---: |
| small | 40px | 12px | 14px | 20px |
| medium | 48px | 16px | 15px | 20px |
| large | 52px | 16px | 16px | 24px |
| xlarge | 56px | 16px | 16px | 24px |

Variant layout:

| Variant | Required layout | Color rule |
| --- | --- | --- |
| filled | border 0, default radius `--radius-0` | Default exact background/text/placeholder tokens are in 6.11. |
| outline | `--border-1` solid | Default exact background/text/border/placeholder tokens are in 6.11. |
| rounded | `--radius-8` | Colors follow selected variant. |
| full rounded | `--radius-full` | Colors follow selected variant. |

State structure:

| State | Required behavior |
| --- | --- |
| focus | Visual emphasis using token colors. |
| complete | Success affordance/icon using token colors. |
| error | Error visual and error message. |
| disabled | Disabled visual and actual `disabled`. |
| view | Read-only visual and actual `readonly`. |
| password | Password input plus visibility icon. |

### 6.4 Textarea

Base:

- `display: block`
- `width: 100%`
- `resize: vertical`
- `outline: 0`
- `cursor: text`

Size:

| Size | Min height | Padding | Font size | Line height |
| --- | ---: | --- | ---: | ---: |
| small | 96px | 12px 12px | 14px | 20px |
| medium | 112px | 12px 16px | 15px | 20px |
| large | 128px | 12px 16px | 16px | 24px |

Variant/state layout:

- Filled: border 0, radius `--radius-0`; default exact tokens are in 6.11.
- Filled rounded: radius `--radius-8`.
- Outline: `--border-1` solid, radius `--radius-8`; default exact tokens are in 6.11.
- Focus/error/disabled/view states must exist when the product needs them; default exact tokens are in 6.11.

### 6.5 Select

Base:

- `width: 100%`
- `appearance: none`
- `cursor: pointer`
- Native arrow is drawn with the existing background-image pattern.

Size:

| Size | Min height | Padding X | Font size | Line height |
| --- | ---: | ---: | ---: | ---: |
| small | 40px | 12px | 14px | 20px |
| medium | 48px | 16px | 15px | 20px |
| large | 52px | 24px | 16px | 24px |

Variant/state layout:

- Filled: border 0; default exact tokens are in 6.11.
- Outline: line border layout; default exact tokens are in 6.11.
- Icon: left icon plus arrow.
- Rounded: `--radius-8`.
- Full rounded: `--radius-full`.
- Disabled: disabled visual and actual `disabled`.
- Prefer native `select` when possible. If a custom select is required, implement combobox/listbox semantics, keyboard navigation, focus management, and outside-click behavior.

### 6.6 Chip

Base:

- `display: inline-flex`
- `align-items: center`
- `justify-content: center`
- `border-radius: --radius-full`
- `font-weight: var(--font-weight-500)`

Size:

| Size | Min height | Padding X | Font size | Line height |
| --- | ---: | ---: | --- | --- |
| small | 32px | 12px | `var(--font-size-14)` | `var(--line-height-20)` |
| medium | 40px | 16px | `var(--font-size-15)` | `var(--line-height-20)` |
| large | 48px | 24px | `var(--font-size-16)` | `var(--line-height-24)` |

Variant/state layout:

- Filled: border 0; default exact tokens are in 6.11.
- Outline: border layout; default exact tokens are in 6.11.
- Gray line outline: neutral/line gray border token is mandatory; default exact tokens are in 6.11.
- Disabled: disabled visual and actual `disabled` when interactive.

### 6.7 Badge

Base:

- `display: inline-flex`
- `align-items: center`
- `justify-content: center`
- `border-radius: --radius-full`
- Badge is read-only.

Size:

| Size | Padding | Font size | Line height |
| --- | --- | --- | --- |
| small | 4px 8px | `var(--font-size-12)` | `var(--line-height-16)` |
| medium | 4px 10px | `var(--font-size-14)` | `var(--line-height-20)` |

Variant layout:

- Filled: border 0; default exact tokens are in 6.11.
- Outline: `--border-1` solid; default exact tokens are in 6.11.

Badge rules:

- Do not attach click actions to badges.
- Use chip for clickable selection/filter UI.

### 6.8 Toggle

States:

- off
- on
- disabled

Sizes:

- small
- medium
- large

Rules:

- Use an inner `input type="checkbox"`.
- Use toggle for immediately applied settings.
- Use checkbox for multiple selections.
- Disabled state must use the actual `disabled` attribute.
- Keep the native input accessible. Do not hide the real input with `display: none` if it is the operable control.
- Default exact tokens are in 6.11. Product-specific color swaps must use color tokens only.

### 6.9 Checkbox

Sizes:

- small
- medium

States:

- default
- checked
- disabled

Rules:

- Use checkbox for multiple selection or independent boolean input.
- Use gap tokens when paired with text labels.
- Disabled state must use the actual `disabled` attribute.
- Keep the native input accessible and associated with a label.
- Default exact tokens are in 6.11. Product-specific color swaps must use color tokens only.

### 6.10 Radio

Sizes:

- small
- medium

States:

- default
- checked
- disabled

Rules:

- Use radio when only one option in a group can be selected.
- Do not mix sizes inside one radio group.
- Use the `name` attribute to bind the group.
- Disabled state must use the actual `disabled` attribute.
- Keep the native input accessible and associated with a label.
- Default exact tokens are in 6.11. Product-specific color swaps must use color tokens only.

### 6.11 Exact CSS Reconstruction Matrix

Use this matrix when an AI or developer needs to generate actual component CSS. Combine the relevant base, size, variant, shape, feature, and state rows. The implementation may split these rules across reusable classes or component props, but the final computed style must match.

#### 6.11.1 Button Exact Recipe

Primary button class pattern:

```text
btn_primary_{filled|outline}_{rounded|full_rounded?}_{icon?}_{shadow|disabled?}_{small|medium|large|xlarge}
```

Primary button base:

```css
display: inline-flex;
align-items: center;
justify-content: center;
font-weight: 500;
white-space: nowrap;
appearance: none;
cursor: pointer;
```

Primary button size rules:

| Size | Min height | Padding | Font size | Line height |
| --- | ---: | --- | ---: | ---: |
| small | 32px | 0 16px | 12px | 16px |
| medium | 40px | 0 24px | 14px | 20px |
| large | 48px | 0 24px | 16px | 20px |
| xlarge | 60px | 0 24px | 16px | 20px |

Primary button shape rules:

| Shape name | Class segment | CSS |
| --- | --- | --- |
| default/square | omitted | `border-radius: var(--radius-0);` |
| rounded | `rounded` | `border-radius: var(--radius-8);` |
| full rounded | `full_rounded` | `border-radius: var(--radius-full);` |

Primary button variant/state rules:

| Variant/state | Border | Background | Color | Extra |
| --- | --- | --- | --- | --- |
| filled | `border: 0;` | `var(--color-blue-50)` | `var(--color-common-100)` | hover background `var(--color-blue-40)` |
| filled shadow | `border: 0;` | `var(--color-blue-50)` | `var(--color-common-100)` | shadow by size; hover background `var(--color-blue-40)` and `box-shadow: none;` |
| filled disabled | `border: 0;` | `var(--color-interaction-disable)` | `var(--color-label-disable)` | `box-shadow: none; text-decoration: none; cursor: default;` |
| outline | `1px solid var(--color-blue-50)` | `var(--color-common-100)` | `var(--color-blue-50)` | hover border/background `var(--color-blue-50)`, hover color `var(--color-common-100)` |
| outline shadow | `1px solid var(--color-blue-50)` | `var(--color-common-100)` | `var(--color-blue-50)` | shadow by size; hover same as outline and `box-shadow: none;` |
| outline disabled | `1px solid var(--color-line-solid-normal)` | `var(--color-common-100)` | `var(--color-label-disable)` | `box-shadow: none; text-decoration: none; cursor: default;` |

Primary button shadow by size:

| Size | Box shadow |
| --- | --- |
| small | `var(--shadow-2)` |
| medium | `var(--shadow-3)` |
| large | `var(--shadow-4)` |
| xlarge | `var(--shadow-4)` |

Primary button text+icon feature:

```css
gap: 8px;
```

The icon pseudo-element must use `display: block`, `flex-shrink: 0`, `content: ""`, `background: currentColor`, `mask-repeat: no-repeat`, `mask-position: center`, and `mask-size: contain`.

| Size | Icon width/height |
| --- | ---: |
| small | 12px |
| medium | 16px |
| large | 16px |
| xlarge | 16px |

Exact example: filled rounded small button.

```html
<button class="btn_primary_filled_rounded_small" type="button">Button</button>
<a class="btn_primary_filled_rounded_small" href="/path">Button</a>
```

```css
.btn_primary_filled_rounded_small {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  white-space: nowrap;
  appearance: none;
  cursor: pointer;
  min-height: 32px;
  padding: 0 16px;
  font-size: 12px;
  line-height: 16px;
  border: 0;
  border-radius: var(--radius-8);
  background: var(--color-blue-50);
  color: var(--color-common-100);
}
```

Text button class pattern:

```text
btn_text_{icon?}_{small|medium|xlarge}
```

Text button base:

```css
display: inline-flex;
align-items: center;
justify-content: center;
font-weight: 500;
white-space: nowrap;
appearance: none;
cursor: pointer;
padding: 0;
border: 0;
border-radius: var(--radius-0);
background: none;
color: var(--color-label-neutral);
text-decoration: none;
```

| Size | Min height | Font size | Line height |
| --- | ---: | ---: | ---: |
| small | 32px | 14px | 20px |
| medium | 40px | 15px | 20px |
| xlarge | 60px | 15px | 20px |

Text button hover uses `text-decoration: underline; text-underline-offset: 0.12em;`. Text+icon uses `gap: 16px` and a 20px trailing icon.

Icon-only button class pattern:

```text
btn_icon_{filled|outline}_{rounded|full_rounded?}_{shadow|disabled?}_{small|medium|large|xlarge?}
```

| Variant group | Size | Control width/height/min-height | Icon width/height | Radius |
| --- | --- | ---: | ---: | --- |
| filled icon | small | auto | 12px | `var(--radius-0)` |
| filled icon | medium | auto | 16px | `var(--radius-0)` |
| filled icon | large | auto | 20px | `var(--radius-0)` |
| filled icon | xlarge | auto | 22px | `var(--radius-0)` |
| outline icon | small | 32px | 12px | by shape |
| outline icon | medium | 40px | 16px | by shape |
| outline icon | large | 48px | 16px | by shape |

Filled icon-only buttons support `small`, `medium`, `large`, and `xlarge`; filled disabled supports the same sizes. Filled icon-only buttons use `padding: 0`, `border: 0`, `border-radius: var(--radius-0)`, `background: transparent`, `color: var(--color-blue-50)`, and `box-shadow: none`.

Outline icon-only buttons support `small`, `medium`, and `large` only. They use fixed `width`, `min-width`, `height`, and `min-height`; `padding: 0`; `border: 1px solid var(--color-blue-50)`; `background: transparent`; and `color: var(--color-blue-50)`. Outline shadow uses `background: var(--color-common-100)`, the shadow size table, and removes shadow on hover. Outline disabled uses `border-color: var(--color-line-solid-normal)`, `background: var(--color-interaction-disable)`, `color: var(--color-label-disable)`, `box-shadow: none`, `text-decoration: none`, and `cursor: default`.

#### 6.11.2 Tab Exact Recipe

Tab class pattern:

```text
tab_{filled|outline|gray_line_outline}_{rounded|full_rounded?}_{icon?}_{active|disabled?}_{small|medium|large}
```

Tab base:

```css
display: inline-flex;
align-items: center;
justify-content: center;
font-weight: var(--font-weight-500);
white-space: nowrap;
appearance: none;
cursor: pointer;
```

| Size | Min height | Padding | Font size | Line height | Icon size |
| --- | ---: | --- | ---: | ---: | ---: |
| small | 32px | 0 12px | `var(--font-size-14)` | `var(--line-height-20)` | 12px |
| medium | 40px | 0 16px | `var(--font-size-15)` | `var(--line-height-20)` | 16px |
| large | 48px | 0 24px | `var(--font-size-16)` | `var(--line-height-20)` | 16px |

| Variant/state | Border | Background | Color |
| --- | --- | --- | --- |
| filled | `border: 0;` | `var(--color-fill-normal)` | `var(--color-label-normal)` |
| filled active | `border: 0;` | `var(--color-blue-50)` | `var(--color-common-100)` |
| filled disabled | `border: 0;` | `var(--color-interaction-disable)` | `var(--color-label-disable)` |
| outline | `1px solid var(--color-common-0)` | `var(--color-common-100)` | `var(--color-common-0)` |
| outline active | `1px solid var(--color-common-0)` | `var(--color-common-0)` | `var(--color-common-100)` |
| outline disabled | `1px solid var(--color-line-solid-normal)` | `var(--color-interaction-disable)` | `var(--color-label-disable)` |
| gray line outline | `1px solid var(--color-line-normal-normal)` | `var(--color-common-100)` | `var(--color-common-0)` |
| gray line outline active | `1px solid var(--color-common-0)` | `var(--color-common-0)` | `var(--color-common-100)` |
| gray line outline disabled | `1px solid var(--color-line-solid-normal)` | `var(--color-interaction-disable)` | `var(--color-label-disable)` |

Shape radius is `var(--radius-0)`, `var(--radius-8)`, or `var(--radius-full)`. Icon tabs use `gap: 8px` and the icon size from the size table. Disabled tabs use `cursor: default`.

#### 6.11.3 Text Input Exact Recipe

Text input class pattern:

```text
text_input_{filled|outline}_{rounded|full_rounded?}_{complete|focus|error|disabled|view|password?}_{small|medium|large|xlarge}
```

Wrapper base:

```css
display: inline-flex;
align-items: center;
width: 100%;
min-width: 0;
cursor: text;
```

Inner `input` base:

```css
width: 100%;
min-width: 0;
border: 0;
outline: 0;
background: transparent;
```

Placeholder color is `var(--color-label-assistive)`.

| Size | Min height | Padding | Font size | Line height | State icon size |
| --- | ---: | --- | ---: | ---: | ---: |
| small | 40px | 0 12px | `var(--font-size-14)` | `var(--line-height-20)` | 16px |
| medium | 48px | 0 16px | `var(--font-size-15)` | `var(--line-height-20)` | 18px |
| large | 52px | 0 16px | `var(--font-size-16)` | `var(--line-height-24)` | 20px |
| xlarge | 56px | 0 16px | `var(--font-size-16)` | `var(--line-height-24)` | 20px |

| Variant/state | Border | Radius | Background | Color | Extra |
| --- | --- | --- | --- | --- | --- |
| filled | `border: 0;` | by shape | `var(--color-fill-normal)` | `var(--color-label-normal)` | - |
| filled focus | `border: 0;` | by shape | `var(--color-fill-strong)` | `var(--color-label-normal)` | - |
| filled complete | `border: 0;` | by shape | `var(--color-fill-normal)` | `var(--color-label-normal)` | `column-gap: 8px`; success icon `var(--color-status-positive)` |
| filled error | `border: 0;` | by shape | `var(--color-red-95)` | `var(--color-label-normal)` | - |
| filled disabled | `border: 0;` | by shape | `var(--color-interaction-disable)` | `var(--color-label-disable)` | wrapper and input `cursor: default` |
| filled view | `border: 0;` | by shape | `var(--color-background-normal-alternative)` | `var(--color-label-neutral)` | use `readonly` when applicable |
| filled password | `border: 0;` | by shape | `var(--color-fill-normal)` | `var(--color-label-normal)` | `column-gap: 8px`; eye icon `var(--color-label-neutral)` |
| outline | `1px solid var(--color-line-solid-0)` | by shape | `var(--color-common-100)` | `var(--color-label-normal)` | - |
| outline focus | `2px solid var(--color-blue-50)` | by shape | `var(--color-common-100)` | `var(--color-label-normal)` | - |
| outline error | `2px solid var(--color-status-negative)` | by shape | `var(--color-common-100)` | `var(--color-label-normal)` | - |
| outline disabled | `1px solid var(--color-line-solid-normal)` | by shape | `var(--color-interaction-disable)` | `var(--color-label-disable)` | wrapper and input `cursor: default` |
| outline view | `1px solid var(--color-line-solid-normal)` | by shape | `var(--color-background-normal-alternative)` | `var(--color-label-neutral)` | use `readonly` when applicable |

Text input shape radius is `var(--radius-0)`, `var(--radius-8)`, or `var(--radius-full)`. Complete/password pseudo-icons use `flex: 0 0 {icon-size}` and mask icons with `center / contain no-repeat`.

#### 6.11.4 Textarea Exact Recipe

Textarea class pattern:

```text
textarea_{filled|outline}_{rounded?}_{focus|error|disabled|view?}_{small|medium|large}
```

Textarea base:

```css
display: block;
width: 100%;
resize: vertical;
outline: 0;
cursor: text;
```

| Size | Min height | Padding | Font size | Line height |
| --- | ---: | --- | ---: | ---: |
| small | 96px | 12px 12px | `var(--font-size-14)` | `var(--line-height-20)` |
| medium | 112px | 12px 16px | `var(--font-size-15)` | `var(--line-height-20)` |
| large | 128px | 12px 16px | `var(--font-size-16)` | `var(--line-height-24)` |

| Variant/state | Border | Radius | Background | Color |
| --- | --- | --- | --- | --- |
| filled | `border: 0;` | `var(--radius-0)` or `var(--radius-8)` | `var(--color-fill-normal)` | `var(--color-label-normal)` |
| filled focus | `border: 0;` | by shape | `var(--color-fill-strong)` | `var(--color-label-normal)` |
| filled error | `border: 0;` | by shape | `var(--color-red-95)` | `var(--color-label-normal)` |
| filled disabled | `border: 0;` | by shape | `var(--color-interaction-disable)` | `var(--color-label-disable)` |
| filled view | `border: 0;` | by shape | `var(--color-background-normal-alternative)` | `var(--color-label-neutral)` |
| outline | `1px solid var(--color-line-solid-0)` | `var(--radius-8)` | `var(--color-common-100)` | `var(--color-label-normal)` |
| outline focus | `2px solid var(--color-blue-50)` | `var(--radius-8)` | `var(--color-common-100)` | `var(--color-label-normal)` |
| outline error | `2px solid var(--color-status-negative)` | `var(--radius-8)` | `var(--color-common-100)` | `var(--color-label-normal)` |
| outline disabled | `1px solid var(--color-line-solid-normal)` | `var(--radius-8)` | `var(--color-interaction-disable)` | `var(--color-label-disable)` |
| outline view | `1px solid var(--color-line-solid-normal)` | `var(--radius-8)` | `var(--color-background-normal-alternative)` | `var(--color-label-neutral)` |

Placeholder color is `var(--color-label-assistive)`. Disabled textarea uses `cursor: default`.

#### 6.11.5 Select Exact Recipe

Select class pattern:

```text
select_{filled|outline}_{rounded|full_rounded?}_{icon?}_{disabled?}_{small|medium|large}
```

Select base:

```css
width: 100%;
appearance: none;
cursor: pointer;
background-repeat: no-repeat;
```

Default arrow:

```css
background-image:
  linear-gradient(45deg, transparent 50%, currentColor 50%),
  linear-gradient(135deg, currentColor 50%, transparent 50%);
background-position: calc(100% - 18px) 50%, calc(100% - 12px) 50%;
background-size: 6px 6px, 6px 6px;
```

| Size | Min height | Padding without icon | Padding with icon | Font size | Line height | Icon size/position |
| --- | ---: | --- | --- | ---: | ---: | --- |
| small | 40px | 0 12px 0 12px | 0 12px 0 40px | `var(--font-size-14)` | `var(--line-height-20)` | 16px at 12px 50% |
| medium | 48px | 0 16px 0 16px | 0 16px 0 46px | `var(--font-size-15)` | `var(--line-height-20)` | 18px at 16px 50% |
| large | 52px | 0 24px 0 24px | 0 24px 0 56px | `var(--font-size-16)` | `var(--line-height-24)` | 20px at 24px 50% |

| Variant/state | Border | Radius | Background | Color |
| --- | --- | --- | --- | --- |
| filled | `border: 0;` | by shape | `var(--color-fill-normal)` | `var(--color-label-normal)` |
| filled disabled | `border: 0;` | by shape | `var(--color-interaction-disable)` | `var(--color-label-disable)` |
| outline | `1px solid var(--color-line-solid-0)` | by shape | `var(--color-common-100)` | `var(--color-label-normal)` |
| outline disabled | `1px solid var(--color-line-solid-normal)` | by shape | `var(--color-interaction-disable)` | `var(--color-label-disable)` |

Select shape radius is `var(--radius-0)`, `var(--radius-8)`, or `var(--radius-full)`. Disabled select uses the actual `disabled` attribute and `cursor: default`.

Exact example: filled rounded large select.

```html
<select class="select_filled_rounded_large">
  <option>Select</option>
</select>
```

```css
.select_filled_rounded_large {
  width: 100%;
  appearance: none;
  background-image: linear-gradient(45deg, transparent 50%, currentColor 50%), linear-gradient(135deg, currentColor 50%, transparent 50%);
  background-position: calc(100% - 18px) 50%, calc(100% - 12px) 50%;
  background-size: 6px 6px, 6px 6px;
  background-repeat: no-repeat;
  min-height: 52px;
  padding: 0 24px 0 24px;
  border: 0;
  border-radius: var(--radius-8);
  background-color: var(--color-fill-normal);
  color: var(--color-label-normal);
  font-size: var(--font-size-16);
  line-height: var(--line-height-24);
  cursor: pointer;
}
```

#### 6.11.6 Chip Exact Recipe

Chip class pattern:

```text
chip_{filled|outline|gray_line_outline}_{active|disabled?}_{small|medium|large}
```

Chip base:

```css
display: inline-flex;
align-items: center;
justify-content: center;
border-radius: var(--radius-full);
font-weight: var(--font-weight-500);
white-space: nowrap;
cursor: pointer;
```

| Size | Min height | Padding | Font size | Line height |
| --- | ---: | --- | ---: | ---: |
| small | 32px | 0 12px | `var(--font-size-14)` | `var(--line-height-20)` |
| medium | 40px | 0 16px | `var(--font-size-15)` | `var(--line-height-20)` |
| large | 48px | 0 24px | `var(--font-size-16)` | `var(--line-height-24)` |

| Variant/state | Border | Background | Color | Cursor |
| --- | --- | --- | --- | --- |
| filled | `border: 0;` | `var(--color-blue-50)` | `var(--color-common-100)` | pointer |
| filled active | `border: 0;` | `var(--color-blue-40)` | `var(--color-common-100)` | pointer |
| filled disabled | `border: 0;` | `var(--color-interaction-disable)` | `var(--color-label-disable)` | default |
| outline | `1px solid var(--color-common-0)` | `var(--color-common-100)` | `var(--color-common-0)` | pointer |
| outline active | `1px solid var(--color-common-0)` | `var(--color-common-0)` | `var(--color-common-100)` | pointer |
| outline disabled | `1px solid var(--color-line-solid-normal)` | `var(--color-interaction-disable)` | `var(--color-label-disable)` | default |
| gray line outline | `1px solid var(--color-line-normal-normal)` | `var(--color-common-100)` | `var(--color-common-0)` | pointer |
| gray line outline active | `1px solid var(--color-common-0)` | `var(--color-common-0)` | `var(--color-common-100)` | pointer |
| gray line outline disabled | `1px solid var(--color-line-solid-normal)` | `var(--color-interaction-disable)` | `var(--color-label-disable)` | default |

#### 6.11.7 Badge Exact Recipe

Badge class pattern:

```text
badge_{filled|outline}_{small|medium}
```

Badge base:

```css
display: inline-flex;
align-items: center;
justify-content: center;
border-radius: var(--radius-full);
font-weight: var(--font-weight-500);
white-space: nowrap;
vertical-align: middle;
```

| Size | Padding | Font size | Line height |
| --- | --- | ---: | ---: |
| small | 4px 8px | `var(--font-size-12)` | `var(--line-height-16)` |
| medium | 4px 10px | `var(--font-size-14)` | `var(--line-height-20)` |

| Variant | Border | Background | Color |
| --- | --- | --- | --- |
| filled | `border: 0;` | `var(--color-blue-50)` | `var(--color-common-100)` |
| outline | `1px solid var(--color-common-0)` | `var(--color-common-100)` | `var(--color-common-0)` |

Exact example: filled medium badge.

```html
<span class="badge_filled_medium">Badge</span>
```

```css
.badge_filled_medium {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 4px 10px;
  border: 0;
  border-radius: var(--radius-full);
  background: var(--color-blue-50);
  color: var(--color-common-100);
  font-size: var(--font-size-14);
  line-height: var(--line-height-20);
  font-weight: var(--font-weight-500);
  white-space: nowrap;
  vertical-align: middle;
}
```

#### 6.11.8 Toggle Exact Recipe

Toggle class pattern:

```text
toggle_{off|on|disabled}_{small|medium|large}
```

Toggle track base:

```css
position: relative;
display: inline-flex;
align-items: center;
padding: 2px;
border: 0;
cursor: pointer;
```

Toggle input base:

```css
position: absolute;
inset: 0;
opacity: 0;
cursor: pointer;
```

| Size | Track width | Track height | Track radius | Thumb size | On transform |
| --- | ---: | ---: | --- | ---: | ---: |
| small | 36px | 20px | `var(--radius-20)` | 16px | translateX(16px) |
| medium | 44px | 24px | `var(--radius-24)` | 20px | translateX(20px) |
| large | 52px | 32px | `var(--radius-32)` | 24px | translateX(24px) |

| State | Track background | Thumb background | Thumb transform | Cursor |
| --- | --- | --- | --- | --- |
| off | `var(--color-line-solid-strong)` | `var(--color-common-100)` | translateX(0px) | pointer |
| on | `var(--color-blue-50)` | `var(--color-common-100)` | by size table | pointer |
| disabled | `var(--color-interaction-disable)` | `var(--color-label-disable)` | translateX(0px) | default |

Thumb pseudo-element uses `border-radius: var(--radius-full); content: "";`. Disabled toggle input also uses `cursor: default`.

#### 6.11.9 Checkbox Exact Recipe

Checkbox class pattern:

```text
checkbox_{disabled?}_{small|medium}
```

| Size | Width | Height | Border | Radius |
| --- | ---: | ---: | --- | --- |
| small | 16px | 16px | `2px solid var(--color-line-solid-strong)` | `var(--radius-2)` |
| medium | 20px | 20px | `2px solid var(--color-line-solid-strong)` | `var(--radius-2)` |

Checkbox base uses `position: relative`, `appearance: none`, `background: var(--color-common-100)`, and `cursor: pointer`.

Checked state:

```css
border-color: var(--color-blue-50);
background: var(--color-blue-50);
```

Checked icon pseudo-element:

```css
position: absolute;
inset: 1px;
background: var(--color-common-100);
content: "";
mask: {check-icon} center / contain no-repeat;
-webkit-mask: {check-icon} center / contain no-repeat;
```

Disabled checkbox uses `border: 2px solid var(--color-line-solid-normal)`, `background: var(--color-interaction-disable)`, and `cursor: default`.

#### 6.11.10 Radio Exact Recipe

Radio class pattern:

```text
radio_{disabled?}_{small|medium}
```

| Size | Width | Height | Border | Outer radius | Checked dot size |
| --- | ---: | ---: | --- | --- | ---: |
| small | 16px | 16px | `2px solid var(--color-line-solid-strong)` | `var(--radius-full)` | 8px |
| medium | 20px | 20px | `2px solid var(--color-line-solid-strong)` | `var(--radius-full)` | 10px |

Radio base uses `position: relative`, `appearance: none`, `background: var(--color-common-100)`, and `cursor: pointer`.

Checked state uses `border-color: var(--color-blue-50)`. The checked dot pseudo-element uses `position: absolute`, `top: 50%`, `left: 50%`, `border-radius: var(--radius-full)`, `background: var(--color-blue-50)`, `transform: translate(-50%, -50%)`, and `content: ""`.

Disabled radio uses `border: 2px solid var(--color-line-solid-normal)`, `background: var(--color-interaction-disable)`, and `cursor: default`.

## 7. Common Patterns

### 7.1 Card

There is no dedicated card component CSS in the original system. Use this reusable pattern.

`````css
.card {
  padding: var(--spacing-padding-vertical-24) var(--spacing-padding-horizontal-24);
  border: var(--border-1) solid var(--color-line-normal-neutral);
  border-radius: var(--radius-8);
  background: var(--color-background-elevated-normal);
  box-shadow: var(--shadow-1);
}
```

Card rules:

- The layout specs above are the default pattern.
- Default table colors must use the listed tokens. Project-specific color changes are allowed only when explicitly requested and must stay inside the token set.
- Internal padding should be 16px, 24px, or 32px.
- Do not nest cards inside cards.
- Clickable cards need a visible focus state.
- If the whole card is clickable, render the card as one `a` or `button` only when it does not contain other interactive elements.
- If a card contains internal buttons, links, menus, checkboxes, or form controls, do not make the whole card one large interactive element. Use a separate link/action area instead.

### 7.2 Form

`````css
.form_stack {
  display: grid;
  gap: var(--spacing-gap-vertical-16);
}

.field {
  display: grid;
  gap: var(--spacing-gap-vertical-8);
}

.field_label {
  font-size: var(--font-size-14);
  font-weight: var(--font-weight-500);
  line-height: var(--line-height-20);
}
```

Form rules:

- Do not replace labels with placeholders.
- Use medium as the default form control size.
- Do not mix control sizes inside one form unless the hierarchy requires it.
- Error states need both visual treatment and message text.
- Colors may change within tokens.

### 7.3 Table

`````css
.table_wrap {
  overflow-x: auto;
  border: var(--border-1) solid var(--color-line-normal-neutral);
  border-radius: var(--radius-8);
  background: var(--color-background-elevated-normal);
}

.data_table {
  width: 100%;
  min-width: 640px;
}

.data_table th,
.data_table td {
  padding: var(--spacing-padding-vertical-12) var(--spacing-padding-horizontal-16);
  border-bottom: var(--border-1) solid var(--color-line-normal-alternative);
  font-size: var(--font-size-14);
  line-height: var(--line-height-20);
  text-align: left;
  vertical-align: middle;
}

.data_table th {
  font-weight: var(--font-weight-500);
}
```

Table rules:

- Use badge for status display.
- Use text button or icon button for row actions.
- Use horizontal scroll wrapper on narrow screens.
- Do not nest cards inside tables.
- Use real table semantics for data tables: `table`, `thead`, `tbody`, `tr`, `th`, and `td`.
- Use `scope="col"` or `scope="row"` on header cells when applicable.
- Use `caption` or an accessible label when the table needs a name.
- Sortable headers must expose sort state with `aria-sort` and use a button inside the header cell for the sort action.
- Colors may change within tokens.

## 8. Prohibited

- Do not create raw hex/rgb/hsl colors.
- Do not create arbitrary spacing values.
- Do not use font sizes outside the token scale.
- Do not recreate 13px or 115px font tokens.
- Do not create `Label_2`, `Display_4`, `Title_3`, or `Body_3`.
- Do not override component height, padding, font-size, font-weight, line-height, radius, border width, or icon size in page CSS.
- Do not change documented component color tokens unless the user explicitly requests project-specific color customization.
- Do not create design-system component class names outside the documented `snake_case` naming policy.
- Do not make component class names depend on the rendered HTML tag.
- Do not make disabled-looking UI without actual disabled/readonly/aria handling.
- Do not force every visual button to be a `button` tag. Use `button` for actions and `a` for navigation.
- Do not build button/link interactions with `div` or `span` when a native `button` or `a` can be used.
- Do not nest interactive elements such as `a > button`, `button > a`, or a clickable card that contains other links/buttons.
- Do not attach click behavior to badges.
- Do not use multiple primary filled actions in one action group.
- Do not use `!important`.
- In Tailwind projects, do not leave foundation/reset CSS unlayered. Put it in `@layer base`.
- Do not solve Tailwind cascade layer conflicts with `!important`; move CSS to the correct layer.
- Do not put global tokens or reset/base rules inside CSS Modules or scoped component styles.
- Do not rely on token names alone for accessibility; foreground/background color pairs must still have acceptable contrast.
- Do not hide the real checkbox, radio, or toggle input with `display: none` when it is the operable control.

## 9. Generation Checklist

- Does global CSS include all color, spacing, decorate, and typography tokens?
- Does global CSS include the reset block from this document?
- Is global CSS generated before component styles and loaded before components render?
- Do component styles consume the global foundation variables instead of redefining local token aliases?
- If using Tailwind, are foundation tokens and reset rules inside `@layer base`?
- If using Tailwind, are reusable component styles inside `@layer components` and utility overrides left to `@layer utilities`?
- If using Tailwind, is there no unlayered reset such as unlayered `a { color: inherit; }` competing with utilities?
- Are all colors chosen from the token set?
- In default reproduction mode, do component background/color/border/shadow tokens match the exact section 6.11 specs?
- Are component layout specs preserved?
- Do generated component CSS classes follow the documented `snake_case` naming policy?
- Do `button`, `a`, and router-link versions of the same visual button use the same `btn_...` class?
- Are component sizes, padding, font sizes, weights, line heights, radius, border widths, and icon sizes identical to this document?
- Where the source component uses token notation such as `var(--font-size-14)`, does generated CSS keep the same token notation instead of raw px?
- Are primary button `xlarge` variants generated with `min-height: 60px`, `padding-x: 24px`, `font-size: 16px`, and `line-height: 20px`?
- Are text button `xlarge` variants generated with `min-height: 60px`, `padding-x: 0`, `font-size: 15px`, and `line-height: 20px`?
- Is icon-only Button+icon support kept to the documented size range, without inventing outline `xlarge` variants?
- Are gray-line borders using neutral/line tokens?
- Are visual buttons rendered with the correct semantic element: `button` for actions and `a` for navigation?
- Do rendered `button` elements default to `type="button"` unless they intentionally submit a form?
- Do anchor buttons include `href`, unless intentionally disabled?
- Do disabled anchors use `aria-disabled` and guarded navigation instead of a fake `disabled` attribute?
- Are router links styled directly without invalid nested `a` or `button` elements?
- Do icon-only buttons and links have accessible names?
- Are decorative icons hidden from assistive technology?
- Does every interactive component have a visible `:focus-visible` state?
- Are portaled, shadow-root, or iframe-rendered nodes receiving the same tokens and reset/base behavior?
- Are form labels, disabled, readonly, and aria states wired correctly?
- Are checkbox, radio, and toggle inputs still accessible and label-associated?
- Are tab groups connected to panels and keyboard operable?
- Are data tables using real table semantics, header scopes, and accessible sorting where needed?
- Is there no 13px font token, 115px token, hardcoded hex, arbitrary px value, or `!important`?




