import type { MenuitemType } from "./menuitem/script";
import type { MenubaritemType } from "./menubaritem/script";
export declare class MenuitemActivateEvent {
    readonly menuitem: MenuitemType;
    static readonly type = "menuitemactivate";
    constructor(menuitem: MenuitemType);
}
export declare class MenuCloseEvent {
    readonly fromChild: boolean;
    static readonly type = "menuclose";
    constructor(fromChild?: boolean);
}
export declare class MenubaritemActivateEvent {
    readonly menubaritem: MenubaritemType;
    static readonly type = "menubaritemactivate";
    constructor(menubaritem: MenubaritemType);
}
export declare class MenubarDactivateEvent {
    static readonly type = "menubardeactivate";
    constructor();
}
export declare function once<T extends Event>(target: HTMLElement | Document, type: string, handler: (event: T) => void): () => void;
export declare class EventBus {
    private listeners;
    on<T>(event: string, handler: (value: T) => void): () => void;
    emit(event: string, value: unknown): void;
    clear(): void;
}
