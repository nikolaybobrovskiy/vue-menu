declare const _default: typeof __VLS_export;
export default _default;
declare const __VLS_export: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    paddingTop: {
        type: NumberConstructor;
        default: number;
    };
}>, {
    menuStyle: import("..").MenuStyle;
    active: import("vue").Ref<boolean, boolean>;
    deactivate: () => void;
    mousedown: (down: MouseEvent) => void;
    on: <T>(event: string, handler: (value: T) => void) => () => void;
    activateItem: (item: import("../menubaritem/script").MenubaritemType) => void;
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
