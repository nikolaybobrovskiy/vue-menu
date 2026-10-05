import type { App } from 'vue';
import Menubar from "./menubar/index.vue";
import Menubaritem from "./menubaritem/index.vue";
import Contextmenu from "./contextmenu.vue";
import Buttonmenu from './buttonmenu.vue';
import Menu from "./menu/index.vue";
import Menuitem from "./menuitem/index.vue";
import Separator from "./separator.vue";
import { MenubarType } from "./menubar/script";
import { MenuType } from "./menu/script";
import { MenuitemType } from "./menuitem/script";
import { StyleFactory, StyleWhite, StyleBlack, StyleMetal } from "./style";
export type { MenuStyle, Style } from "./style";
export { Menubar, Menu, Menubaritem, Contextmenu, Buttonmenu, Menuitem, Separator, MenubarType, MenuType, MenuitemType, StyleFactory, StyleBlack, StyleWhite, StyleMetal, };
export declare function install(app: App, options?: {
    prefix?: string;
}): void;
