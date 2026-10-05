<template>
    <div style="display: inline-block;">
        <div @mousedown="openMenu">
            <slot/>
        </div>
        <x-menu ref="menu" :style="menuStyle">
            <slot name="contextmenu" />
        </x-menu>
    </div>
</template>


<script lang="ts">
import { createRootlessMenu, type MenuPosition } from './rootlessmenu'
const defaultPosition: MenuPosition = e => {
    const el = (e.currentTarget as HTMLElement).firstElementChild || e.currentTarget as HTMLElement
    const rect = el.getBoundingClientRect()
    return { x: rect.left, y: rect.bottom, direction: 'right' }
}
export default createRootlessMenu('Hscbuttonmenu', defaultPosition)
</script>