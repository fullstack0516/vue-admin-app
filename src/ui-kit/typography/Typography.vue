<template>
  <div :class="classNames">
    <slot />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue"
import { TypographyVariant } from "./typography.types"

export default defineComponent({
  props: {
    variant: {
      type: String as () => TypographyVariant,
      default: "normal",
    },
  },

  setup(props) {
    const textSize = computed(() => {
      if (props.variant === TypographyVariant.header) return "text-2xl"
      if (props.variant === TypographyVariant.subtitle) return "text-lg"
      return "text-base"
    })

    const classNames = computed(
      () =>
        `${textSize.value} ${
          props.variant !== TypographyVariant.normal ? "font-bold" : "font-normal"
        }`,
    )

    return {
      props,
      classNames,
      TypographyVariant,
    }
  },
})
</script>
