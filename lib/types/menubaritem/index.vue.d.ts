declare const _default: typeof __VLS_export;
export default _default;
declare const __VLS_export: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    label: {
        type: StringConstructor;
        required: true;
    };
}>, {
    menu: import("vue").Ref<import("..").MenuType | undefined, import("..").MenuType | undefined>;
    element: import("vue").ShallowRef<HTMLElement | undefined, HTMLElement | undefined>;
    active: import("vue").ComputedRef<boolean>;
    onMenuiatemFired: () => void;
    style: import("vue").ComputedRef<import("vue").CSSProperties>;
    paddingTop: import("vue").ComputedRef<string>;
    mousedown(): void;
    mouseenter(): void;
    mouseleave(): void;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    label: {
        type: StringConstructor;
        required: true;
    };
}>> & Readonly<{}>, {}, {}, {
    XMenu: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
        parentMenuitem: import("vue").PropType<import("..").MenuitemType>;
    }>, {
        menu: import("vue").ShallowRef<HTMLDivElement | undefined, HTMLDivElement | undefined>;
        wrapper: import("vue").Ref<HTMLDivElement | undefined, HTMLDivElement | undefined>;
        isOpen: import("vue").Ref<boolean, boolean>;
        fade: import("vue").Ref<string, string>;
        submenuDirection: import("vue").Ref<import("../menu/script").Direction, import("../menu/script").Direction>;
        open: (x: number, y: number, direction?: import("../menu/script").Direction) => void;
        close: (animate: boolean, parent?: boolean) => void;
        setPosition: (x: number, y: number, direction: import("../menu/script").Direction) => void;
        on: <T>(event: string, handler: (value: T) => void) => () => void;
        activateItem: (item: import("..").MenuitemType) => void;
        menuElement: () => HTMLDivElement;
        wrapperElement: () => HTMLDivElement;
        style: import("vue").ComputedRef<import("vue").CSSProperties>;
    }, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "menuclose"[], "menuclose", import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
        parentMenuitem: import("vue").PropType<import("..").MenuitemType>;
    }>> & Readonly<{
        onMenuclose?: ((...args: any[]) => any) | undefined;
    }>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
