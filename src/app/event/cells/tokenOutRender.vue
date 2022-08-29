<template>
  <a :href="redirectURL" class="flex items-center">
    <img
      class="round inline mr-1"
      width="14"
      height="14"
      alt="--"
      :src="imgURL"
      @error="replaceByDefault"
    />
    <p>{{ coinNameAbbr }}</p>
  </a>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue"
import { ICellRendererParams } from "ag-grid-community"

export default defineComponent({
  name: "TokenOutRender",
  components: {},
  props: {
    params: {
      type: Object as PropType<ICellRendererParams>,
      required: true,
    },
  },
  setup(props) {
    const imgURL = computed(() => {
      const data = props.params.data

      return data.explorer + data.token_out_image
    })

    const redirectURL = computed(() => {
      const data = props.params.data

      return "/events/" + data.chain_id + "/" + data.token_out_address
    })

    const coinNameAbbr = computed(() => {
      const data = props.params.data

      return data.token_out_symbol
    })

    const generateRandomColor = () => {
      return "#" + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6)
    }

    const replaceByDefault = (e) => {
      e.target.style.display = "none"
      e.target.src = ""
    }

    return {
      imgURL,
      redirectURL,
      coinNameAbbr,
      generateRandomColor,
      replaceByDefault,
    }
  },
})
</script>
