const { test } = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const { JSDOM, VirtualConsole } = require('jsdom')
const bundle = fs.readFileSync('example/dist/bundle.js', 'utf8')
const standalone = fs.readFileSync('standalone/dist/vue-menu-standalone.js', 'utf8')
const vueGlobal = fs.readFileSync(require.resolve('vue/dist/vue.global.js'), 'utf8')
async function page(search = '') {
    const errors = []
    const console = new VirtualConsole()
    console.on('jsdomError', error => errors.push(error.message))
    console.on('warn', (...args) => errors.push(args.join(' ')))
    console.on('error', (...args) => errors.push(args.join(' ')))
    const dom = new JSDOM('<!doctype html><html><head></head><body></body></html>', { url: 'https://example.test/' + search, runScripts: 'outside-only', pretendToBeVisual: true, virtualConsole: console })
    await new Promise(resolve => dom.window.addEventListener('load', resolve, { once: true }))
    const script = dom.window.document.createElement('script')
    script.src = 'https://example.test/bundle.js'
    Object.defineProperty(dom.window.document, 'currentScript', { value: script, configurable: true })
    return { dom, errors }
}
test('standalone browser global exposes a Vue 3 plugin and mounts on two apps', async () => {
    const { dom, errors } = await page()
    const { window } = dom
    window.eval(vueGlobal)
    window.eval(standalone)
    assert.equal(typeof window.VueMenu.install, 'function')
    for (let i = 0; i < 2; i++) {
        const host = window.document.createElement('div')
        window.document.body.appendChild(host)
        const app = window.Vue.createApp({ template: '<hsc-menu-style-white><hsc-menu-button-menu><button>Open</button><template #contextmenu><hsc-menu-item label="Standalone" /></template></hsc-menu-button-menu></hsc-menu-style-white>' })
        app.use(window.VueMenu).mount(host)
        host.querySelector('button').dispatchEvent(new window.MouseEvent('mousedown', { bubbles: true, cancelable: true }))
        await window.Vue.nextTick()
        assert.equal(host.querySelector('.menuitem').textContent.includes('Standalone'), true)
        assert.notEqual(host.querySelector('.menu').style.display, 'none')
        app.unmount(); host.remove()
    }
    assert.deepEqual(errors, [])
    dom.window.close()
})
for (let i = 1; i <= 8; i++) test('compiled example Sample' + i + ' mounts without Vue warnings', async () => {
    const { dom, errors } = await page('?Sample' + i)
    dom.window.eval(bundle)
    dom.window.dispatchEvent(new dom.window.Event('load'))
    await new Promise(resolve => setTimeout(resolve, 10))
    assert.ok(dom.window.document.querySelector('.menuitem'), 'real sample renders menu items')
    assert.deepEqual(errors, [])
    dom.window.close()
})
