import { type PropType } from 'vue';
import { type MenuType } from '../menu/script';
export interface MenuitemType {
    readonly parentMenu: MenuType;
    readonly $el: HTMLElement;
    fire(): void;
}
export declare const MenuitemType: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    label: {
        type: StringConstructor;
        default: string;
    };
    checked: {
        type: BooleanConstructor;
        default: boolean;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    keybind: StringConstructor;
    sync: {
        type: BooleanConstructor;
        default: boolean;
    };
    type: {
        type: PropType<"radio" | "checkbox">;
        default: string;
    };
    modelValue: {
        type: PropType<any>;
        default: undefined;
    };
    value: {
        type: PropType<any>;
        default: undefined;
    };
}>, {
    childMenu: import("vue").Ref<MenuType | undefined, MenuType | undefined>;
    element: import("vue").ShallowRef<HTMLElement | undefined, HTMLElement | undefined>;
    self: MenuitemType;
    parentMenu: MenuType;
    active: import("vue").ComputedRef<boolean>;
    showCheckmark: import("vue").ComputedRef<any>;
    fire: () => void;
    mouseenter: () => void;
    mouseleave: () => void;
    mouseup: (event: MouseEvent) => void;
    keybindHTML: import("vue").ComputedRef<string>;
    style: import("vue").ComputedRef<import("vue").CSSProperties>;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("click" | "update:modelValue")[], "click" | "update:modelValue", import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    label: {
        type: StringConstructor;
        default: string;
    };
    checked: {
        type: BooleanConstructor;
        default: boolean;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    keybind: StringConstructor;
    sync: {
        type: BooleanConstructor;
        default: boolean;
    };
    type: {
        type: PropType<"radio" | "checkbox">;
        default: string;
    };
    modelValue: {
        type: PropType<any>;
        default: undefined;
    };
    value: {
        type: PropType<any>;
        default: undefined;
    };
}>> & Readonly<{
    onClick?: ((...args: any[]) => any) | undefined;
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
}>, {
    type: "checkbox" | "radio";
    label: string;
    disabled: boolean;
    checked: boolean;
    sync: boolean;
    modelValue: any;
    value: any;
}, {}, {
    XMenu: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
        parentMenuitem: PropType<MenuitemType>;
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
        activateItem: (item: MenuitemType) => void;
        menuElement: () => HTMLDivElement;
        wrapperElement: () => HTMLDivElement;
        style: import("vue").ComputedRef<import("vue").CSSProperties>;
    }, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "menuclose"[], "menuclose", import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
        parentMenuitem: PropType<MenuitemType>;
    }>> & Readonly<{
        onMenuclose?: ((...args: any[]) => any) | undefined;
    }>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
    XKeybinder: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
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
}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
