import { computed } from "vue"
import { useStore } from "@/store"
import { useRoute } from "vue-router"

export default function useEventPageMange() {
  const store = useStore()
  const route = useRoute()

  const chainId = computed(() => {
    return route.params.chainId
  })

  const contractId = computed(() => {
    return route.params.tokenAddress
  })

  const events = computed(() => store.state.events)

  const handleRefetchEventsData = () => {
    store.dispatch("events/getEvents", {
      watchlistId: 0,
      chainId: chainId.value,
      contractId: contractId.value,
    })
  }

  return {
    events,
    chainId,
    contractId,
    handleRefetchEventsData,
  }
}
