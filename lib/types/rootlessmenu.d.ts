import { type PropType } from 'vue';
import { type MenuType, type Direction } from './menu/script';
export interface RootlessMenu {
    close(): void;
}
export declare const openedRootlessMenus: RootlessMenu[];
export type MenuPosition = (event: MouseEvent) => {
    x: number;
    y: number;
    direction: Direction;
};
export declare function createRootlessMenu(name: string, defaultPosition: MenuPosition): import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    position: {
        type: PropType<MenuPosition>;
        default: MenuPosition;
    };
    menuZIndex: NumberConstructor;
}>, {
    menu: import("vue").Ref<MenuType | undefined, MenuType | undefined>;
    openMenu: (down: MouseEvent) => void;
    close: () => void;
    menuStyle: import("vue").ComputedRef<{
        zIndex?: undefined;
    } | {
        zIndex: string;
    }>;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("open" | "close")[], "open" | "close", import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    position: {
        type: PropType<MenuPosition>;
        default: MenuPosition;
    };
    menuZIndex: NumberConstructor;
}>> & Readonly<{
    onOpen?: ((...args: any[]) => any) | undefined;
    onClose?: ((...args: any[]) => any) | undefined;
}>, {
    position: MenuPosition;
}, {}, {
    XMenu: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
        parentMenuitem: PropType<import("./index.js").MenuitemType>;
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
        activateItem: (item: import("./index.js").MenuitemType) => void;
        menuElement: () => HTMLDivElement;
        wrapperElement: () => HTMLDivElement;
        style: import("vue").ComputedRef<import("vue").CSSProperties>;
    }, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "menuclose"[], "menuclose", import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
        parentMenuitem: PropType<import("./index.js").MenuitemType>;
    }>> & Readonly<{
        onMenuclose?: ((...args: any[]) => any) | undefined;
    }>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
