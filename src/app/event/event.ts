import { computed } from "vue"
import { useStore } from "@/store"

export default function useEventPageMange() {
  const store = useStore()

  const events = computed(() => store.state.events)
  const chains = computed(() => store.state.chains)

  const handleRefetchEventsData = () => {
    store.dispatch("events/getEvents", {
      watchlistId: "",
      chainId: "",
      contractId: "",
    })
  }

  const handleRefetchSupportedChains = () => {
    store.dispatch("chains/getChains", {
      watchlistId: "",
      chainId: "",
      contractId: "",
    })
  }

  return {
    events,
    chains,
    handleRefetchEventsData,
    handleRefetchSupportedChains,
  }
}
