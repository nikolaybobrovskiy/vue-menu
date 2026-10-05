export declare const Keybinder: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    source: {
        required: true;
        type: StringConstructor;
    };
    enabled: {
        type: BooleanConstructor;
        default: boolean;
    };
}>, () => null, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "keybindmatch"[], "keybindmatch", import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    source: {
        required: true;
        type: StringConstructor;
    };
    enabled: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & Readonly<{
    onKeybindmatch?: ((...args: any[]) => any) | undefined;
}>, {
    enabled: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
