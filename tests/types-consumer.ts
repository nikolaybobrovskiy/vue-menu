import { createApp, h, type Component } from 'vue'
import { install, Menu, Menuitem, Buttonmenu, Menubar, StyleWhite, StyleFactory, type MenuStyle, type MenuType, type MenuitemType, type MenubarType } from '../lib/types'
const components: Component[] = [Menu, Menuitem, Buttonmenu, Menubar, StyleWhite]
const theme: MenuStyle = { menu: {}, menubar: {}, separator: {}, active: {}, disabled: {}, animation: false }
createApp({ render: () => h(StyleFactory(theme)) }).use({ install }, { prefix: 'custom' })
function menuPublicAPI(menu: MenuType, item: MenuitemType, bar: MenubarType) {
    menu.open(10, 20, 'left')
    menu.close(true, true)
    item.fire()
    bar.deactivate()
    const open: boolean = menu.isOpen
    return open
}
void components
void menuPublicAPI
