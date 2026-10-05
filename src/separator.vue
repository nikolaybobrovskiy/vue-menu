<template>
    <div class="separator" :style="menuStyle.separator">
    </div>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue'
import { MENU_STYLE_KEY, type MenuStyle } from './style'
export default defineComponent({
    setup() { return { menuStyle: inject<MenuStyle>(MENU_STYLE_KEY)! } }
})
</script>


<style lang="scss" scoped>
.separator {
  height: 1pt;
  margin: 4pt 0;
}
</style>
