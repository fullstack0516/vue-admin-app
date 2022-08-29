<template>
  <AppContainer>
    <router-view />
  </AppContainer>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue"

import { useStore } from "./store"
import AppContainer from "./app/app-container/AppContainer.vue"
import useWebsocket from "./middleware/useWebsocket"

export default defineComponent({
  components: {
    AppContainer,
  },

  setup() {
    const store = useStore()
    const { initWebsocket } = useWebsocket()

    initWebsocket()

    onMounted(async () => {
      await store.dispatch("auth/getUsers", {})
    })
  },
})
</script>
