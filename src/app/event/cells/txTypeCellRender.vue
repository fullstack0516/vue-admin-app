<template>
  <div class="flex">
    <span
      v-if="
        paramData.token_out_address == contractId &&
        paramData.token_out_address !== paramData.token_address
      "
      class="bg-red-200 text-red-900 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded"
      >Sell</span
    >
    <span
      v-else-if="
        paramData.token_address == contractId &&
        paramData.token_out_address !== paramData.token_address
      "
      class="bg-green-200 text-green-900 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded"
      >Buy</span
    >
    <p v-else></p>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue"
import { ICellRendererParams } from "ag-grid-community"

export interface TxTypeCellRenderParams extends ICellRendererParams {
  contractId: string
}

export default defineComponent({
  name: "TxTypeCellRender",
  components: {},
  props: {
    params: {
      type: Object as PropType<TxTypeCellRenderParams>,
      required: true,
    },
  },
  setup(props) {
    const paramData = computed(() => {
      return props.params.data
    })
    const contractId = computed(() => {
      return props.params.contractId
    })

    return { paramData, contractId }
  },
})
</script>
