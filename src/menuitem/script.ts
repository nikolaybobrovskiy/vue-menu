import * as keybind from '@hscmap/keybind'
import { computed, defineComponent, inject, onBeforeUnmount, ref, shallowRef, type PropType } from 'vue'
import { MenuCloseEvent, MenuitemActivateEvent } from '../event'
import { sync } from '../global'
import { Keybinder } from '../keybinder'
import Menu from '../menu/index.vue'
import { type MenuType, PADDING, PARENT_MENU_KEY } from '../menu/script'
import { type MenubaritemType, MENUBARITEM_KEY } from '../menubaritem/script'
import { type MenuStyle, type Style, MENU_STYLE_KEY } from '../style'

export interface MenuitemType {
    readonly parentMenu: MenuType
    readonly $el: HTMLElement
    fire(): void
}

export const MenuitemType = defineComponent({
    name: 'HscMenuitem',
    components: { XMenu: Menu, XKeybinder: Keybinder },
    props: {
        label: { type: String, default: '' },
        checked: { type: Boolean, default: false },
        disabled: { type: Boolean, default: false },
        keybind: String,
        sync: { type: Boolean, default: false },
        type: { type: String as PropType<'radio' | 'checkbox'>, default: 'checkbox' },
        modelValue: { type: null as unknown as PropType<any>, default: undefined },
        value: { type: null as unknown as PropType<any>, default: undefined },
    },
    emits: ['click', 'update:modelValue'],
    setup(props, { emit, slots }) {
        const parentMenu = inject<MenuType>(PARENT_MENU_KEY)!
        const menuStyle = inject<MenuStyle>(MENU_STYLE_KEY)!
        const menubaritem = inject<MenubaritemType | undefined>(MENUBARITEM_KEY, undefined)
        const childMenu = ref<MenuType>()
        const element = shallowRef<HTMLElement>()
        const hover = ref(false)
        let disposed = false
        const timers = new Map<ReturnType<typeof setTimeout>, () => void>()
        if (props.modelValue !== undefined) {
            assert(['radio', 'checkbox'].includes(props.type), 'prop :type must be one of "radio" or "checkbox"')
            if (props.type === 'checkbox') assert(Array.isArray(props.modelValue) || typeof props.modelValue === 'boolean', 'v-model must be an array or boolean')
            else assert(props.value !== undefined, 'radio value must be set')
        }
        function fire() {
            if (disposed || props.disabled) return
            emit('click')
            if (props.type === 'radio') emit('update:modelValue', props.value)
            else if (props.modelValue !== undefined) {
                if (Array.isArray(props.modelValue)) {
                    const copy = props.modelValue.slice()
                    const index = copy.indexOf(props.value)
                    if (index >= 0) copy.splice(index, 1)
                    else copy.push(props.value)
                    emit('update:modelValue', copy)
                } else emit('update:modelValue', !props.modelValue)
            }
            menubaritem?.onMenuiatemFired()
        }
        const self: MenuitemType = { parentMenu, get $el() { return element.value! }, fire }
        const offActivate = parentMenu.on<MenuitemActivateEvent>(MenuitemActivateEvent.type, event => {
            if (event.menuitem !== self) childMenu.value?.close(false)
        })
        const offClose = parentMenu.on<MenuCloseEvent>(MenuCloseEvent.type, () => {
            hover.value = false
            childMenu.value?.close(true)
        })
        function activate() {
            parentMenu.activateItem(self)
            if (childMenu.value && element.value) {
                const rect = element.value.getBoundingClientRect()
                const direction = parentMenu.submenuDirection
                childMenu.value.open(rect[direction], rect.top - PADDING, direction)
            }
        }
        function sleep(duration: number) {
            return new Promise<void>(resolve => {
                const timer = setTimeout(() => { timers.delete(timer); resolve() }, duration)
                timers.set(timer, resolve)
            })
        }
        async function flash() {
            if (menuStyle.animation) {
                for (let i = 0; i < 3 && !disposed; ++i) {
                    hover.value = false
                    await sleep(50)
                    if (disposed) return
                    hover.value = true
                    await sleep(50)
                }
            }
            hover.value = false
        }
        function mouseenter() {
            if (!props.disabled) void sync.lock(async () => {
                if (!disposed && parentMenu.isOpen) { hover.value = true; activate() }
            })
        }
        function mouseleave() {
            void sync.lock(async () => { if (!disposed && parentMenu.isOpen) hover.value = false })
        }
        function mouseup(event: MouseEvent) {
            if (!slots.body && hover.value && !props.disabled) void sync.lock(async () => {
                if (!disposed && parentMenu.isOpen && !slots.default) {
                    if (!props.sync) await flash()
                    if (disposed) return
                    fire()
                    if (!event.shiftKey) parentMenu.close(true, true)
                }
            })
        }
        onBeforeUnmount(() => {
            disposed = true
            offActivate(); offClose()
            timers.forEach((resolve, timer) => { clearTimeout(timer); resolve() })
            timers.clear()
        })
        const active = computed(() => hover.value || !!childMenu.value?.isOpen)
        const showCheckmark = computed(() => {
            if (props.type === 'radio') return props.modelValue == props.value
            if (props.modelValue !== undefined) return Array.isArray(props.modelValue) ? props.modelValue.includes(props.value) : props.modelValue
            return props.checked
        })
        return { childMenu, element, self, parentMenu, active, showCheckmark, fire, mouseenter, mouseleave, mouseup,
            keybindHTML: computed(() => props.keybind ? keybind.html(props.keybind) : ''),
            style: computed<Style>(() => ({ ...(active.value ? menuStyle.active : {}), ...(props.disabled ? menuStyle.disabled : {}) })) }
    },
})

function assert(condition: boolean, message: string) {
    if (!condition) throw new Error(message)
}
