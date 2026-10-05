import { defineComponent, onBeforeUnmount, watch } from 'vue'
import * as keybind from '@hscmap/keybind'

export const Keybinder = defineComponent({
    name: 'HscKeybinder',
    props: {
        source: { required: true, type: String },
        enabled: { type: Boolean, default: true },
    },
    emits: ['keybindmatch'],
    setup(props, { emit }) {
        let off: (() => void) | undefined
        watch(() => props.source, source => {
            off?.()
            off = keybind.on(source, () => { if (props.enabled) emit('keybindmatch') })
        }, { immediate: true })
        onBeforeUnmount(() => off?.())
        return () => null
    },
})
