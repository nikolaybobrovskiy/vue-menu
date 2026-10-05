import { type PropType } from 'vue';
import type { MenuitemType } from '../menuitem/script';
export declare const PARENT_MENU_KEY = "@hscmap/vue-menu/parentMenu";
export declare const PADDING = 4;
export type Direction = 'left' | 'right';
export interface MenuType {
    readonly isOpen: boolean;
    readonly submenuDirection: Direction;
    open(x: number, y: number, direction?: Direction): void;
    close(fade: boolean, parent?: boolean): void;
    on<T>(event: string, handler: (value: T) => void): () => void;
    activateItem(item: MenuitemType): void;
}
export declare const MenuType: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    parentMenuitem: PropType<MenuitemType>;
}>, {
    menu: import("vue").ShallowRef<HTMLDivElement | undefined, HTMLDivElement | undefined>;
    wrapper: import("vue").Ref<HTMLDivElement | undefined, HTMLDivElement | undefined>;
    isOpen: import("vue").Ref<boolean, boolean>;
    fade: import("vue").Ref<string, string>;
    submenuDirection: import("vue").Ref<Direction, Direction>;
    open: (x: number, y: number, direction?: Direction) => void;
    close: (animate: boolean, parent?: boolean) => void;
    setPosition: (x: number, y: number, direction: Direction) => void;
    on: <T>(event: string, handler: (value: T) => void) => () => void;
    activateItem: (item: MenuitemType) => void;
    menuElement: () => HTMLDivElement;
    wrapperElement: () => HTMLDivElement;
    style: import("vue").ComputedRef<import("vue").CSSProperties>;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "menuclose"[], "menuclose", import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    parentMenuitem: PropType<MenuitemType>;
}>> & Readonly<{
    onMenuclose?: ((...args: any[]) => any) | undefined;
}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
