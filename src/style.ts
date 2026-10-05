import { defineComponent, h, provide, type CSSProperties } from 'vue'


export type Style = CSSProperties


export interface MenuStyle {
    menubar: Style
    menu: Style
    separator: Style
    active: Style
    disabled: Style
    animation: boolean
}


export const MENU_STYLE_KEY = '@hscmap/vue-menu/menuStyle'


export function StyleFactory(menuStyle: MenuStyle) {
    return defineComponent({
        name: 'HscMenuStyle',
        setup(_, { slots }) {
            // Preserve the legacy default for custom themes.
            if (menuStyle.animation === undefined) menuStyle.animation = true
            provide(MENU_STYLE_KEY, menuStyle)
            return () => h('div', slots.default?.())
        },
    })
}


export const StyleBlack = StyleFactory((() => {
    const base: Style = {
        backgroundColor: 'rgba(31, 31, 31, 0.9)',
        color: 'white',
        boxShadow: '0 0 4pt rgba(255, 255, 255, 0.25)',
    }
    return {
        menu: base,
        menubar: base,
        separator: { backgroundColor: 'rgba(127, 127, 127, 0.5)' },
        active: { backgroundColor: 'rgba(127, 127, 127, 0.75)' },
        disabled: { opacity: '0.5' },
        animation: true,
    }
})())


export const StyleWhite = StyleFactory((() => {
    const base: Style = {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        color: 'black',
        boxShadow: '0 2pt 6pt rgba(0, 0, 0, 0.5)',
    }
    return {
        menu: base,
        menubar: base,
        separator: { backgroundColor: 'rgba(127, 127, 127, 0.5)' },
        active: { backgroundColor: 'rgba(127, 127, 127, 0.75)', color: '#fff' },
        disabled: { opacity: '0.5' },
        animation: true,
    }
})())


export const StyleMetal = StyleFactory((() => {
    const menubar: Style = {
        background: 'linear-gradient(to bottom, rgb(215, 215, 215), rgb(191, 191, 191))',
        color: 'black',
        boxShadow: '0 2pt 6pt rgba(0, 0, 0, 0.5)',
    }
    const menu: Style = {
        backgroundColor: 'rgb(215, 215, 215)',
        color: 'black',
        boxShadow: '0 2pt 6pt rgba(0, 0, 0, 0.5)',
    }
    return {
        menu,
        menubar,
        separator: { backgroundColor: 'rgba(127, 127, 127, 0.5)' },
        active: { backgroundColor: 'rgba(127, 127, 127, 0.75)', color: '#fff' },
        disabled: { opacity: '0.5' },
        animation: true,
    }
})())