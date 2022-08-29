<template>
  <button
    class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
  >
    <span v-if="icon" class="absolute left-0 inset-y-0 flex items-center pl-3">
      <slot name="icon" />
    </span>
    {{ label }}
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  props: {
    label: {
      type: String,
      required: true,
    },
    icon: {
      type: Boolean,
      default: false,
    },
  },

  setup() {
    return {}
  },
})
</script>
