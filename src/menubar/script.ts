import { defineComponent, inject, onBeforeUnmount, provide, ref } from 'vue'
import { EventBus, MenubarDactivateEvent, MenubaritemActivateEvent, once } from '../event'
import { MENU_STYLE_KEY, type MenuStyle } from '../style'
import type { MenubaritemType } from '../menubaritem/script'

export const MENUBAR_KEY = '@hscmap/vue-menu/menubar'
export interface MenubarType {
    readonly active: boolean
    readonly paddingTop: number
    deactivate(): void
    activateItem(item: MenubaritemType): void
    on<T>(event: string, handler: (value: T) => void): () => void
}
export const MenubarType = defineComponent({
    name: 'HscMenubar',
    props: { paddingTop: { type: Number, default: 0 } },
    emits: ['menubardeactivate'],
    setup(props, { emit }) {
        const menuStyle = inject<MenuStyle>(MENU_STYLE_KEY)!
        const active = ref(false)
        const events = new EventBus()
        let cancelMouseup: (() => void) | undefined
        let cancelMousedown: (() => void) | undefined
        function clearCancellers() {
            cancelMouseup?.(); cancelMousedown?.()
            cancelMouseup = cancelMousedown = undefined
        }
        function deactivate() {
            active.value = false
            const event = new MenubarDactivateEvent()
            events.emit(MenubarDactivateEvent.type, event)
            emit('menubardeactivate', event)
            clearCancellers()
        }
        function mousedown(down: MouseEvent) {
            if (active.value) return deactivate()
            active.value = true
            clearCancellers()
            cancelMouseup = once<MouseEvent>(document, 'mouseup', up => {
                cancelMouseup = undefined
                if (up.timeStamp - down.timeStamp >= 500) deactivate()
                else cancelMousedown = once(document, 'mousedown', () => { cancelMousedown = undefined; deactivate() })
            })
        }
        const api: MenubarType = {
            get active() { return active.value }, get paddingTop() { return props.paddingTop },
            deactivate, on: events.on.bind(events),
            activateItem(item) { events.emit(MenubaritemActivateEvent.type, new MenubaritemActivateEvent(item)) },
        }
        provide(MENUBAR_KEY, api)
        onBeforeUnmount(() => { clearCancellers(); events.clear() })
        return { menuStyle, active, deactivate, mousedown, on: api.on, activateItem: api.activateItem }
    },
})
