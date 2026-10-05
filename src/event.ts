import type { MenuitemType } from "./menuitem/script"
import type { MenubaritemType } from "./menubaritem/script";


export class MenuitemActivateEvent {
    static readonly type = 'menuitemactivate'
    constructor(readonly menuitem: MenuitemType) { }
}


export class MenuCloseEvent {
    static readonly type = 'menuclose'
    constructor(readonly fromChild = false) { }
}


export class MenubaritemActivateEvent {
    static readonly type = 'menubaritemactivate'
    constructor(readonly menubaritem: MenubaritemType) { }
}


export class MenubarDactivateEvent {
    static readonly type = 'menubardeactivate'
    constructor() { }
}


export function once<T extends Event>(target: HTMLElement | Document, type: string, handler: (event: T) => void) {
    const h = ((e: T) => {
        handler(e)
        off()
    }) as EventListener
    const off = () => { target.removeEventListener(type, h) }
    target.addEventListener(type, h)
    return off
}
// Instance-local subscriptions replace the removed Vue 2 instance event emitter.
export class EventBus {
    private listeners = new Map<string, Set<(value: any) => void>>()
    on<T>(event: string, handler: (value: T) => void): () => void {
        let handlers = this.listeners.get(event)
        if (!handlers) this.listeners.set(event, handlers = new Set())
        handlers.add(handler)
        return () => { handlers!.delete(handler) }
    }
    emit(event: string, value: unknown) {
        this.listeners.get(event)?.forEach(handler => handler(value))
    }
    clear() { this.listeners.clear() }
}
