import { computed, defineComponent, onBeforeUnmount, provide, ref, watch, type PropType } from 'vue'
import Menu from './menu/index.vue'
import { type MenuType, type Direction } from './menu/script'
import { once } from './event'
import { MENUBARITEM_KEY } from './menubaritem/script'

export interface RootlessMenu { close(): void }
export const openedRootlessMenus: RootlessMenu[] = []
export type MenuPosition = (event: MouseEvent) => { x: number, y: number, direction: Direction }

export function createRootlessMenu(name: string, defaultPosition: MenuPosition) {
    return defineComponent({
        name,
        components: { XMenu: Menu },
        props: {
            position: { type: Function as PropType<MenuPosition>, default: defaultPosition },
            menuZIndex: Number,
        },
        emits: ['open', 'close'],
        setup(props, { emit }) {
            provide(MENUBARITEM_KEY, undefined)
            const menu = ref<MenuType>()
            let cancelMouseup: (() => void) | undefined
            let cancelMousedown: (() => void) | undefined
            function clearCancellers() {
                cancelMouseup?.(); cancelMousedown?.()
                cancelMouseup = cancelMousedown = undefined
            }
            const api: RootlessMenu = { close }
            function removeOpened() {
                const index = openedRootlessMenus.indexOf(api)
                if (index >= 0) openedRootlessMenus.splice(index, 1)
            }
            function close() { clearCancellers(); removeOpened(); menu.value?.close(true) }
            function openMenu(down: MouseEvent) {
                down.preventDefault()
                const wasOpen = !!menu.value?.isOpen
                while (openedRootlessMenus.length) openedRootlessMenus.pop()!.close()
                clearCancellers()
                if (wasOpen) return close()
                openedRootlessMenus.push(api)
                cancelMouseup = once<MouseEvent>(document, 'mouseup', up => {
                    cancelMouseup = undefined
                    if (up.timeStamp - down.timeStamp >= 500) close()
                    else cancelMousedown = once<MouseEvent>(document, 'mousedown', event => {
                        cancelMousedown = undefined
                        if (!(event.button === 2 || event.ctrlKey)) close()
                    })
                })
                const position = props.position(down)
                menu.value?.open(position.x, position.y, position.direction)
            }
            watch(() => menu.value?.isOpen, (isOpen, previous) => {
                if (isOpen === undefined || previous === undefined && !isOpen) return
                if (!isOpen) { clearCancellers(); removeOpened() }
                emit(isOpen ? 'open' : 'close')
            })
            onBeforeUnmount(close)
            return { menu, openMenu, close,
                menuStyle: computed(() => props.menuZIndex === undefined ? {} : { zIndex: String(props.menuZIndex) }) }
        },
    })
}
