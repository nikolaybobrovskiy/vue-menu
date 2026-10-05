import { type MenuStyle } from '../style';
import type { MenubaritemType } from '../menubaritem/script';
export declare const MENUBAR_KEY = "@hscmap/vue-menu/menubar";
export interface MenubarType {
    readonly active: boolean;
    readonly paddingTop: number;
    deactivate(): void;
    activateItem(item: MenubaritemType): void;
    on<T>(event: string, handler: (value: T) => void): () => void;
}
export declare const MenubarType: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    paddingTop: {
        type: NumberConstructor;
        default: number;
    };
}>, {
    menuStyle: MenuStyle;
    active: import("vue").Ref<boolean, boolean>;
    deactivate: () => void;
    mousedown: (down: MouseEvent) => void;
    on: <T>(event: string, handler: (value: T) => void) => () => void;
    activateItem: (item: MenubaritemType) => void;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "menubardeactivate"[], "menubardeactivate", import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    paddingTop: {
        type: NumberConstructor;
        default: number;
    };
}>> & Readonly<{
    onMenubardeactivate?: ((...args: any[]) => any) | undefined;
}>, {
    paddingTop: number;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
