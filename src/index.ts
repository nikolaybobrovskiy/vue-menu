import type { App } from 'vue'

import Menubar from "./menubar/index.vue"
import Menubaritem from "./menubaritem/index.vue"
import Contextmenu from "./contextmenu.vue"
import Buttonmenu from './buttonmenu.vue'
import Menu from "./menu/index.vue"
import Menuitem from "./menuitem/index.vue"
import Separator from "./separator.vue"
import { MenubarType } from "./menubar/script"
import { MenuType } from "./menu/script"
import { MenuitemType } from "./menuitem/script"
import { StyleFactory, StyleWhite, StyleBlack, StyleMetal } from "./style"

export type { MenuStyle, Style } from "./style"

export {
    Menubar,
    Menu,
    Menubaritem,
    Contextmenu,
    Buttonmenu,
    Menuitem,
    Separator,
    MenubarType,
    MenuType,
    MenuitemType,
    StyleFactory,
    StyleBlack,
    StyleWhite,
    StyleMetal,
}

export function install(app: App, options: { prefix?: string } = {}) {
    const { prefix = 'hsc-menu' } = options
    app.component(`${prefix}-bar`, Menubar)
    app.component(`${prefix}-bar-item`, Menubaritem)
    app.component(`${prefix}-context-menu`, Contextmenu)
    app.component(`${prefix}-button-menu`, Buttonmenu)
    app.component(`${prefix}-item`, Menuitem)
    app.component(`${prefix}-separator`, Separator)
    app.component(`${prefix}-style-black`, StyleBlack)
    app.component(`${prefix}-style-white`, StyleWhite)
    app.component(`${prefix}-style-metal`, StyleMetal)
}