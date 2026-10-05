const { test } = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const { JSDOM } = require('jsdom')
const dom = new JSDOM('<!doctype html><html><head></head><body></body></html>', { pretendToBeVisual: true })
for (const key of ['window', 'document', 'Element', 'HTMLElement', 'SVGElement', 'Node', 'Event', 'MouseEvent', 'KeyboardEvent']) global[key] = dom.window[key]
global.requestAnimationFrame = dom.window.requestAnimationFrame.bind(dom.window)
global.cancelAnimationFrame = dom.window.cancelAnimationFrame.bind(dom.window)
const Vue = require('vue')
const Menu = require('../lib')
const { h, createApp, nextTick, ref } = Vue
const theme = { menu: { color: 'red' }, menubar: {}, active: { backgroundColor: 'blue' }, disabled: { opacity: '0.5' }, separator: { backgroundColor: 'black' }, animation: false }
const Style = Menu.StyleFactory(theme)
const tick = async () => { await Promise.resolve(); await nextTick(); await new Promise(resolve => setImmediate(resolve)); await nextTick() }
function mount(render, plugin = Menu) {
    const host = document.createElement('div')
    document.body.appendChild(host)
    const warnings = []
    const app = createApp({ render })
    app.config.warnHandler = message => warnings.push(message)
    app.use(plugin)
    app.mount(host)
    return { host, app, warnings, unmount() { app.unmount(); host.remove(); assert.deepEqual(warnings, [], 'no Vue warnings') } }
}
function mouse(element, type, options = {}) { element.dispatchEvent(new MouseEvent(type, { bubbles: true, cancelable: true, ...options })) }
function key(key, code, options = {}) { document.body.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key, code, keyCode: code, which: code, ...options })) }

test('native Vue 3 plugin installs independently on multiple apps with custom prefix', () => {
    assert.equal(typeof Vue.createApp, 'function')
    for (const prefix of ['hsc-menu', 'custom']) {
        const app = createApp({ render: () => null })
        app.use(Menu, { prefix })
        assert.equal(app.component(prefix + '-item'), Menu.Menuitem)
        assert.equal(app.component(prefix + '-style-metal'), Menu.StyleMetal)
    }
})

test('mounted item updates boolean model in both directions, emits click once and honors disabled', async () => {
    const model = ref(false), item = ref(), menu = ref()
    let clicks = 0
    const view = mount(() => h(Style, null, { default: () => h(Menu.Menu, { ref: menu }, { default: () => h(Menu.Menuitem, { ref: item, label: 'Toggle', sync: true, modelValue: model.value, 'onUpdate:modelValue': value => { model.value = value }, onClick: () => clicks++ }) }) }))
    menu.value.open(20.8, 30.9)
    await tick()
    assert.equal(view.host.querySelector('.menu').style.color, 'red')
    assert.equal(view.host.querySelector('.fixed > div').style.left, '20px')
    const row = view.host.querySelector('.menuitem')
    mouse(row, 'mouseenter'); await tick(); mouse(row, 'mouseup', { shiftKey: true }); await tick()
    assert.equal(model.value, true)
    assert.equal(clicks, 1)
    assert.equal(menu.value.isOpen, true)
    assert.equal(row.firstElementChild.style.visibility, 'visible')
    model.value = false; await tick()
    assert.equal(row.firstElementChild.style.visibility, 'hidden')
    view.unmount()
})

test('array and radio models preserve values without mutating the supplied array', async () => {
    const array = ['A'], model = ref(array), radio = ref('A'), first = ref(), second = ref()
    const view = mount(() => h(Style, null, { default: () => h(Menu.Menu, null, { default: () => [
        h(Menu.Menuitem, { ref: first, value: 'B', modelValue: model.value, 'onUpdate:modelValue': value => { model.value = value } }),
        h(Menu.Menuitem, { ref: second, type: 'radio', value: 'B', modelValue: radio.value, 'onUpdate:modelValue': value => { radio.value = value } }),
    ] }) }))
    first.value.fire(); second.value.fire(); await tick()
    assert.deepEqual(model.value, ['A', 'B']); assert.deepEqual(array, ['A']); assert.equal(radio.value, 'B')
    first.value.fire(); await tick(); assert.deepEqual(model.value, ['A'])
    view.unmount()
})

test('context and button slots open, emit, mutually exclude and close on outside mouse down', async () => {
    const context = ref(), button = ref()
    let opens = 0, closes = 0
    const view = mount(() => h(Style, null, { default: () => [
        h(Menu.Contextmenu, { ref: context, menuZIndex: 7, onOpen: () => opens++, onClose: () => closes++ }, { default: () => h('div', { class: 'target' }, 'target'), contextmenu: () => h(Menu.Menuitem, { label: 'Context' }) }),
        h(Menu.Buttonmenu, { ref: button }, { default: () => h('button', 'button'), contextmenu: () => h(Menu.Menuitem, { label: 'Button' }) }),
    ] }))
    mouse(view.host.querySelector('.target'), 'contextmenu', { clientX: 40, clientY: 60, button: 2 }); await tick()
    assert.equal(context.value.$refs.menu.isOpen, true); assert.equal(opens, 1)
    assert.equal(view.host.querySelector('.fixed').style.zIndex, '7')
    assert.equal(view.host.querySelectorAll('.menuitem').length, 2)
    mouse(view.host.querySelector('button'), 'mousedown'); await tick()
    assert.equal(context.value.$refs.menu.isOpen, false); assert.equal(closes, 1)
    assert.equal(button.value.$refs.menu.isOpen, true)
    mouse(document, 'mouseup'); mouse(document, 'mousedown'); await tick()
    assert.equal(button.value.$refs.menu.isOpen, false)
    mouse(view.host.querySelector('button'), 'mousedown'); await tick()
    mouse(view.host.querySelector('button'), 'mousedown'); await tick()
    assert.equal(button.value.$refs.menu.isOpen, false, 'second trigger press toggles closed')
    view.unmount()
})

test('menubar hover switches menus, nested item activates and leaf closes its ancestors', async () => {
    const bar = ref(), a = ref(), b = ref()
    let clicks = 0
    const view = mount(() => h(Style, null, { default: () => h(Menu.Menubar, { ref: bar, paddingTop: 3 }, { default: () => [
        h(Menu.Menubaritem, { ref: a, label: 'A' }, { default: () => h(Menu.Menuitem, { label: 'Leaf' }) }),
        h(Menu.Menubaritem, { ref: b, label: 'B' }, { default: () => h(Menu.Menuitem, { label: 'Nested' }, { default: () => h(Menu.Menuitem, { label: 'Deep', sync: true, onClick: () => clicks++ }) }) }),
    ] }) }))
    const bars = view.host.querySelectorAll('.menubaritem')
    mouse(bars[0], 'mousedown'); await tick()
    assert.equal(bar.value.active, true); assert.equal(a.value.$refs.menu.isOpen, true)
    mouse(bars[1], 'mouseenter'); await tick()
    assert.equal(a.value.$refs.menu.isOpen, false); assert.equal(b.value.$refs.menu.isOpen, true)
    const rows = bars[1].querySelectorAll('.menuitem')
    mouse(rows[0], 'mouseenter'); await tick()
    assert.notEqual(bars[1].querySelectorAll('.menu')[1].style.display, 'none')
    mouse(rows[1], 'mouseenter'); await tick(); mouse(rows[1], 'mouseup'); await tick()
    assert.equal(clicks, 1); assert.equal(bar.value.active, false); assert.equal(b.value.$refs.menu.isOpen, false)
    view.unmount()
})

test('body slots keep input content interactive and disabled items never fire', async () => {
    const menu = ref(), disabled = ref()
    let clicks = 0
    const view = mount(() => h(Style, null, { default: () => h(Menu.Menu, { ref: menu }, { default: () => [
        h(Menu.Menuitem, { onClick: () => clicks++ }, { body: () => h('input', { value: 'interactive' }) }),
        h(Menu.Menuitem, { ref: disabled, label: 'Disabled', disabled: true, onClick: () => clicks++ }), h(Menu.Separator),
    ] }) }))
    menu.value.open(0, 0); await tick()
    const row = view.host.querySelector('.menuitem')
    mouse(row, 'mouseenter'); await tick(); mouse(row, 'mouseup'); await tick()
    disabled.value.fire()
    assert.equal(clicks, 0); assert.equal(menu.value.isOpen, true)
    assert.equal(view.host.querySelector('input').value, 'interactive')
    assert.equal(view.host.querySelector('.separator').style.backgroundColor, 'black')
    view.unmount()
})

test('keyboard bindings respect disabled state, rebind dynamically and unregister on unmount', async () => {
    let clicks = 0
    const disabled = ref(false), binding = ref('ctrl+x')
    const view = mount(() => h(Style, null, { default: () => h(Menu.Menu, null, { default: () => h(Menu.Menuitem, { keybind: binding.value, disabled: disabled.value, onClick: () => clicks++ }) }) }))
    key('x', 88, { ctrlKey: true }); assert.equal(clicks, 1)
    disabled.value = true; await tick(); key('x', 88, { ctrlKey: true }); assert.equal(clicks, 1)
    disabled.value = false; binding.value = 'ctrl+y'; await tick()
    key('x', 88, { ctrlKey: true }); assert.equal(clicks, 1)
    key('y', 89, { ctrlKey: true }); assert.equal(clicks, 2)
    view.unmount(); key('y', 89, { ctrlKey: true }); assert.equal(clicks, 2)
})

test('unmount clears open rootless menus and cancels pending animated activation', async () => {
    const animated = Menu.StyleFactory({ ...theme, animation: true })
    let clicks = 0
    const view = mount(() => h(animated, null, { default: () => h(Menu.Buttonmenu, null, { default: () => h('button'), contextmenu: () => h(Menu.Menuitem, { label: 'Wait', onClick: () => clicks++ }) }) }))
    mouse(view.host.querySelector('button'), 'mousedown'); await tick()
    const row = view.host.querySelector('.menuitem')
    mouse(row, 'mouseenter'); await tick(); mouse(row, 'mouseup')
    view.unmount()
    mouse(document, 'mouseup'); mouse(document, 'mousedown')
    await new Promise(resolve => setTimeout(resolve, 350)); await tick()
    assert.equal(clicks, 0)
    const fresh = mount(() => h(Style, null, { default: () => h(Menu.Buttonmenu, null, { default: () => h('button'), contextmenu: () => h(Menu.Menuitem, { label: 'Fresh' }) }) }))
    mouse(fresh.host.querySelector('button'), 'mousedown'); await tick(); fresh.unmount()
})

test('compiled native v-model template updates parent state and rerenders the checkmark', async () => {
    const parent = ref()
    const Consumer = Vue.defineComponent({
        data: () => ({ checked: false }),
        template: '<hsc-menu-style-white><hsc-menu-bar><hsc-menu-bar-item label="Model"><hsc-menu-item label="Toggle" :sync="true" v-model="checked" /></hsc-menu-bar-item></hsc-menu-bar></hsc-menu-style-white>',
    })
    const view = mount(() => h(Consumer, { ref: parent }))
    mouse(view.host.querySelector('.menubaritem'), 'mousedown'); await tick()
    const row = view.host.querySelector('.menuitem')
    mouse(row, 'mouseenter'); await tick(); mouse(row, 'mouseup', { shiftKey: true }); await tick()
    assert.equal(parent.value.checked, true)
    assert.equal(row.firstElementChild.style.visibility, 'visible')
    parent.value.checked = false; await tick()
    assert.equal(row.firstElementChild.style.visibility, 'hidden')
    view.unmount()
})

test('CSS is injected and library externalizes Vue rather than embedding a second runtime', () => {
    assert.match(document.head.textContent, /\.menuitem\[/)
    assert.match(document.head.textContent, /fade-leave-active/)
    const bundle = fs.readFileSync(require.resolve('../lib'), 'utf8')
    assert.match(bundle, /require\(["']vue["']\)/)
    assert.doesNotMatch(bundle, /function createAppAPI/)
})
