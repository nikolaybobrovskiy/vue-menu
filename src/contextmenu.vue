<template>
    <div @contextmenu="openMenu" style="display: inline-block;">
        <slot/>
        <x-menu ref="menu" :style="menuStyle">
            <slot name="contextmenu" />
        </x-menu>
    </div>
</template>


<script lang="ts">
import { createRootlessMenu, type MenuPosition } from './rootlessmenu'
const defaultPosition: MenuPosition = e => {
    return { x: e.clientX, y: e.clientY, direction: 'right' }
}
export default createRootlessMenu('Hsccontextmenu', defaultPosition)
</script>