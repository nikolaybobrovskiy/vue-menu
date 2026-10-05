import { computed, defineComponent, inject, onBeforeUnmount, onMounted, provide, ref, shallowRef } from 'vue'
import { type MenubarType, MENUBAR_KEY } from '../menubar/script'
import type { MenuType } from '../menu/script'
import Menu from '../menu/index.vue'
import { sync } from '../global'
import { MenubaritemActivateEvent, MenuCloseEvent, MenubarDactivateEvent } from '../event'
import { type MenuStyle, type Style, MENU_STYLE_KEY } from '../style'

export const MENUBARITEM_KEY = '@hscmap/vue-menu/menubaritem'
export interface MenubaritemType { onMenuiatemFired(): void }
export const MenubaritemType = defineComponent({
    name: 'HscMenubaritem',
    components: { XMenu: Menu },
    props: { label: { type: String, required: true } },
    setup() {
        const menubar = inject<MenubarType>(MENUBAR_KEY)!
        const menuStyle = inject<MenuStyle>(MENU_STYLE_KEY)!
        const menu = ref<MenuType>()
        const element = shallowRef<HTMLElement>()
        const hover = ref(false)
        const isOpen = ref(false)
        let disposed = false
        let timer: ReturnType<typeof setTimeout> | undefined
        const off: (() => void)[] = []
        const api: MenubaritemType = { onMenuiatemFired() {
            if (timer !== undefined) clearTimeout(timer)
            timer = setTimeout(() => { hover.value = false; timer = undefined }, 200)
        } }
        provide(MENUBARITEM_KEY, api)
        onMounted(() => {
            off.push(menu.value!.on<MenuCloseEvent>(MenuCloseEvent.type, event => {
                isOpen.value = false
                if (event.fromChild) menubar.deactivate()
            }))
        })
        off.push(menubar.on<MenubaritemActivateEvent>(MenubaritemActivateEvent.type, event => {
            if (event.menubaritem !== api) menu.value?.close(false)
        }))
        off.push(menubar.on(MenubarDactivateEvent.type, () => menu.value?.close(true)))
        onBeforeUnmount(() => { disposed = true; off.forEach(cancel => cancel()); if (timer !== undefined) clearTimeout(timer) })
        function activate() {
            if (disposed || !element.value || !menu.value) return
            const rect = element.value.getBoundingClientRect()
            menu.value.open(rect.left, rect.bottom)
            menubar.activateItem(api)
            isOpen.value = true
        }
        const active = computed(() => hover.value || isOpen.value)
        return { menu, element, active, onMenuiatemFired: api.onMenuiatemFired,
            style: computed<Style>(() => active.value ? menuStyle.active : {}),
            paddingTop: computed(() => `${menubar.paddingTop}px`),
            mousedown() { void sync.lock(async () => activate()) },
            mouseenter() { void sync.lock(async () => { if (!disposed) { hover.value = true; if (menubar.active) activate() } }) },
            mouseleave() { void sync.lock(async () => { if (!disposed) hover.value = false }) },
        }
    },
})
