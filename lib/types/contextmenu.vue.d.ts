import { type MenuPosition } from './rootlessmenu';
declare const _default: typeof __VLS_export;
export default _default;
declare const __VLS_export: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    position: {
        type: import("vue").PropType<MenuPosition>;
        default: MenuPosition;
    };
    menuZIndex: NumberConstructor;
}>, {
    menu: import("vue").Ref<import(".").MenuType | undefined, import(".").MenuType | undefined>;
    openMenu: (down: MouseEvent) => void;
    close: () => void;
    menuStyle: import("vue").ComputedRef<{
        zIndex?: undefined;
    } | {
        zIndex: string;
    }>;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("open" | "close")[], "open" | "close", import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    position: {
        type: import("vue").PropType<MenuPosition>;
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
        parentMenuitem: import("vue").PropType<import(".").MenuitemType>;
    }>, {
        menu: import("vue").ShallowRef<HTMLDivElement | undefined, HTMLDivElement | undefined>;
        wrapper: import("vue").Ref<HTMLDivElement | undefined, HTMLDivElement | undefined>;
        isOpen: import("vue").Ref<boolean, boolean>;
        fade: import("vue").Ref<string, string>;
        submenuDirection: import("vue").Ref<import("./menu/script").Direction, import("./menu/script").Direction>;
        open: (x: number, y: number, direction?: import("./menu/script").Direction) => void;
        close: (animate: boolean, parent?: boolean) => void;
        setPosition: (x: number, y: number, direction: import("./menu/script").Direction) => void;
        on: <T>(event: string, handler: (value: T) => void) => () => void;
        activateItem: (item: import(".").MenuitemType) => void;
        menuElement: () => HTMLDivElement;
        wrapperElement: () => HTMLDivElement;
        style: import("vue").ComputedRef<import("vue").CSSProperties>;
    }, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "menuclose"[], "menuclose", import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
        parentMenuitem: import("vue").PropType<import(".").MenuitemType>;
    }>> & Readonly<{
        onMenuclose?: ((...args: any[]) => any) | undefined;
    }>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
