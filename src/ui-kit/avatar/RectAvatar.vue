<template>
  <div
    class="bg-orange h-10 w-10 rounded-md text-white flex justify-center items-center font-bold text-2xl"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  setup() {
    return {}
  },
})
</script>
