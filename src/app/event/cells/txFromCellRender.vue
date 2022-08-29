<template>
  <div class="flex">
    <VueBlockies
      class="inline-block h-8 w-8 rounded-full ring-3 mr-2 mt-1"
      :seed="address"
      :color="generateRandomColor()"
      :bgcolor="generateRandomColor()"
      :size="16"
      :scale="2"
      :spot-color="generateRandomColor()"
    />
    <p>{{ address }}</p>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue"
import VueBlockies from "vue-blockies"
import { ICellRendererParams } from "ag-grid-community"

export default defineComponent({
  name: "TxFromCellRender",
  components: {
    VueBlockies,
  },
  props: {
    params: {
      type: Object as PropType<ICellRendererParams>,
      required: true,
    },
  },
  setup(props) {
    const address = computed(() => {
      const data = props.params.data
      if (data.tx_from_ens == "" || data.tx_from_ens === null) {
        return data.tx_from
      }

      return data.tx_from_ens
    })

    const generateRandomColor = () => {
      return "#" + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6)
    }

    return { address, generateRandomColor }
  },
})
</script>
