<template>
  <div class="flex">
    <span
      v-if="
        paramData.token_out_address == contractId &&
        paramData.token_out_address !== paramData.token_address
      "
      class="text-red-400 text-xs font-semibold mr-2 px-2.5 py-0.5"
      >$ {{ calculatePrice(paramData.worth_usd, paramData.token_out_amount) }}
    </span>
    <span
      v-else-if="
        paramData.token_address == contractId &&
        paramData.token_out_address !== paramData.token_address
      "
      class="text-green-400 text-xs font-semibold mr-2 px-2.5 py-0.5"
      >$ {{ calculatePrice(paramData.worth_usd, paramData.token_amount) }}</span
    >
    <p v-else class="text-xs font-semibold mr-2 px-2.5 py-0.5">
      $ {{ calculatePrice(paramData.worth_usd, paramData.token_amount) }}
    </p>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue"
import { ICellRendererParams } from "ag-grid-community"

export interface TxPriceCellRenderParams extends ICellRendererParams {
  contractId: string
}

export default defineComponent({
  name: "TxPriceCellRender",
  components: {},
  props: {
    params: {
      type: Object as PropType<TxPriceCellRenderParams>,
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

    const calculatePrice = (usdWorth, tokenAmount) => {
      return (usdWorth / tokenAmount).toLocaleString()
    }

    return { paramData, contractId, calculatePrice }
  },
})
</script>
