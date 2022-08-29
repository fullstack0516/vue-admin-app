<template>
  <a :href="link" class="font-bold text-secondary text-base">{{ label }}</a>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  props: {
    label: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
  },
  setup() {
    return {}
  },
})
</script>
