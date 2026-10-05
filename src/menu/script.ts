import { computed, defineComponent, inject, onBeforeUnmount, provide, ref, shallowRef, type PropType } from 'vue'
import type { MenuitemType } from '../menuitem/script'
import { EventBus, MenuCloseEvent, MenuitemActivateEvent } from '../event'
import { MENU_STYLE_KEY, type MenuStyle, type Style } from '../style'

export const PARENT_MENU_KEY = '@hscmap/vue-menu/parentMenu'
export const PADDING = 4
export type Direction = 'left' | 'right'

export interface MenuType {
    readonly isOpen: boolean
    readonly submenuDirection: Direction
    open(x: number, y: number, direction?: Direction): void
    close(fade: boolean, parent?: boolean): void
    on<T>(event: string, handler: (value: T) => void): () => void
    activateItem(item: MenuitemType): void
}

export const MenuType = defineComponent({
    name: 'HscMenu',
    props: { parentMenuitem: Object as PropType<MenuitemType> },
    emits: ['menuclose'],
    setup(props, { emit }) {
        const menuStyle = inject<MenuStyle>(MENU_STYLE_KEY)!
        const menu = shallowRef<HTMLDivElement>()
        const wrapper = ref<HTMLDivElement>()
        const isOpen = ref(false)
        const fade = ref('none')
        const submenuDirection = ref<Direction>('right')
        const events = new EventBus()
        function setPosition(x: number, y: number, direction: Direction) {
            if (!menu.value || !wrapper.value) return
            x = Math.floor(x)
            y = Math.floor(y)
            show([menu.value, wrapper.value], ([element, holder]) => {
                let rect = element.getBoundingClientRect()
                element.style.maxHeight = `${window.innerHeight - 2 * PADDING}px`
                holder.style.left = `${direction === 'right' ? x : x - rect.width + 1}px`
                holder.style.top = `${y}px`
                rect = element.getBoundingClientRect()
                if (rect.bottom > window.innerHeight) holder.style.top = `${window.innerHeight - rect.height}px`
                submenuDirection.value = direction
                if (rect.right > window.innerWidth) {
                    submenuDirection.value = 'left'
                    holder.style.left = `${x - rect.width - (props.parentMenuitem?.$el.clientWidth || 0)}px`
                }
                if (rect.left < 0) {
                    submenuDirection.value = 'right'
                    holder.style.left = `${x + (props.parentMenuitem?.$el.clientWidth || 0)}px`
                }
            })
        }
        function open(x: number, y: number, direction: Direction = 'right') {
            setPosition(x, y, direction)
            isOpen.value = true
        }
        function close(animate: boolean, parent = false) {
            if (isOpen.value) {
                fade.value = animate && menuStyle.animation ? 'fade' : 'none'
                isOpen.value = false
                if (!animate && menu.value) menu.value.style.display = 'none'
                const event = new MenuCloseEvent(parent)
                events.emit(MenuCloseEvent.type, event)
                emit('menuclose', event)
            }
            if (parent) props.parentMenuitem?.parentMenu.close(animate, true)
        }
        const api: MenuType = {
            get isOpen() { return isOpen.value },
            get submenuDirection() { return submenuDirection.value },
            open, close, on: events.on.bind(events),
            activateItem(item) { events.emit(MenuitemActivateEvent.type, new MenuitemActivateEvent(item)) },
        }
        provide(PARENT_MENU_KEY, api)
        onBeforeUnmount(() => events.clear())
        return { menu, wrapper, isOpen, fade, submenuDirection, open, close, setPosition,
            on: api.on, activateItem: api.activateItem,
            menuElement: () => menu.value!, wrapperElement: () => wrapper.value!,
            style: computed<Style>(() => ({ ...menuStyle.menu, padding: `${PADDING}px 0` })) }
    },
})

function show(targets: HTMLElement[], cb: (elements: HTMLElement[]) => void) {
    const originals = targets.map(target => {
        const { display, visibility } = target.style
        target.style.display = 'block'
        target.style.visibility = 'visible'
        return { display, visibility }
    })
    try { cb(targets) } finally {
        targets.forEach((target, i) => Object.assign(target.style, originals[i]))
    }
}
