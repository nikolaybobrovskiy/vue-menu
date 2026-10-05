# vue-menu

Native Vue 3 menu components (Vue 3.5+). No compatibility runtime is required.

## Introduction

Recent web technologies focus on mobile environments. UIs premised on mouse operation such as window, context-menu, nested-menu and so on are no longer mainstream. However hierarchical structure -- context-menu and nested-menu -- is still effective. This package is an implementation of {nested,context}-menu for PC environments as a Vue Component.

### [Working Demo](https://michitaro.github.io/vue-menu)
### Features
* Menu components for Vue 3
* Deeply nested menu supported
* Props "checked" & "disabled"
* Keybinds
* Y-scrollable if necessary
* Contextmenu
* Builtin 3 themes (white, metal & black)
* Customizable color
* Menuitem can contain any HTML not only text
* Intended for desktop browsers supported by Vue 3 (not IE11)
* ~~Does not work on mobile devices 😞~~

![Screenshot](./docs/screenshot.png)

# Usage
## Install
```sh
npm install --save @hscmap/vue-menu
```

## Setup

### ES6 / TypeScript
```typescript
import { createApp } from 'vue'
import App from './App.vue'
import * as VueMenu from '@hscmap/vue-menu'

createApp(App).use(VueMenu).mount('#app')
```

### CommonJS
```javascript
const { createApp } = require('vue')
const app = createApp(App)
app.use(require('@hscmap/vue-menu'))
app.mount('#app')
```

## Migrating from Vue 2

- Install with `createApp(App).use(VueMenu)`, not `Vue.use`. Installation is per application. Component names and the optional `{ prefix: 'hsc-menu' }` are unchanged.
- Menu items use native default `v-model`: `modelValue` + `update:modelValue` replace `vModel` + `input`. Existing template `v-model="checked"` remains valid. Boolean checkboxes, array checkboxes (with `value`), and radio items (with `type="radio"` and `value`) are supported. Explicit listeners must use `@update:model-value`.
- Replace `<template slot="contextmenu">` with `<template #contextmenu>`, and wrap body content in `<template #body>`. Slots passed through render functions must be functions, e.g. `h(Buttonmenu, {}, { default: () => h('button', 'Open'), contextmenu: () => h(Menuitem, { label: 'Item' }) })`.
- Remove `.native` listeners. Undeclared DOM listeners fall through to component roots (e.g. `@contextmenu.stop`).
- `MenubarType`, `MenuType` and `MenuitemType` are now native component definitions with same-name public instance interfaces, not Vue 2 constructors to subclass. Use component refs. Menu refs retain `open(x, y, direction?)`, `close(fade, parent?)`, `isOpen` and `submenuDirection`. Internal instance `$on/$off` subscriptions are replaced by instance-local, teardown-safe subscriptions; do not depend on Vue 2 instance event APIs.
- Theme styles use Vue's `CSSProperties` type. The three built-in themes and `StyleFactory` remain available. Wrap menus in a built-in/custom theme as before.
- The standalone build exposes `window.VueMenu`; it does **not** auto-install globally. Load Vue's Vue 3 global build, then `const app = Vue.createApp(...); app.use(VueMenu); app.mount('#root')`. See `standalone/src/example.html`.
- Vue is external in the CommonJS library and standalone builds; applications must provide Vue 3. The example build includes its own Vue 3 runtime. Package name/version are retained for this local migration; this is a breaking consumption change and no package was published.

## Development verification

`npm install` runs the library/declaration and standalone prepare builds. Additional checks:

`npm test` — builds the library, then mounts real components in jsdom and tests menus, nested menus, models, keyboard bindings, themes and teardown.

`npm run typecheck` — checks library, examples, standalone entry and a consumer of the generated declarations (run after `npm run build`).

`npm run test:bundles` — builds example/standalone, executes all eight compiled examples, and mounts the standalone plugin on two Vue applications in a browser-like DOM. These are DOM/runtime smoke checks, not visual layout tests in a real browser.

# Example
```html
<template>
    <hsc-menu-style-white>
        <hsc-menu-bar style="border-radius: 0 0 4pt 0;">
            <hsc-menu-bar-item label="File">
                <hsc-menu-item label="New" @click="window.alert('New')" />
                <hsc-menu-item label="Open" @click="window.alert('Open')" />
                <hsc-menu-separator/>
                <hsc-menu-item label="Save" @click="window.alert('Save')" :disabled="true" />
                <hsc-menu-item label="Export to">
                    <hsc-menu-item label="PDF" />
                    <hsc-menu-item label="HTML" />
                </hsc-menu-item>
            </hsc-menu-bar-item>
            <hsc-menu-bar-item label="Edit">
                <hsc-menu-item label="Undo" keybind="meta+z" @click="window.alert('Undo')" />
                <hsc-menu-separator/>
                <hsc-menu-item label="Cut" keybind="meta+x" @click="window.alert('Cut')" />
                <hsc-menu-item label="Copy" keybind="meta+c" @click="window.alert('Copy')" />
                <hsc-menu-item label="Paste" keybind="meta+v" @click="window.alert('Paste')" :disabled="true" />
            </hsc-menu-bar-item>
        </hsc-menu-bar>
    </hsc-menu-style-white>
</template>
```
Other examples are available [here](http://michitaro.github.io/vue-menu/).

See also [vue-window](https://github.com/michitaro/vue-window). This is a window UI component with the same color themes.

# Caveats
* ~~This component doesn't work on [electron-vue](https://github.com/SimulatedGREG/electron-vue).~~
  * See [here](https://github.com/michitaro/vue-menu/issues/5#issuecomment-450770617) to use with [electron-vue](https://github.com/SimulatedGREG/electron-vue).

# Contributing
Any comments, suggestions or PRs are welcome 😀

# React Port
React port is available [here](https://github.com/michitaro/react-menu).
