<template>
  <div>
    <app-navigation-view />

    <main class="relative">
      <router-view />
    </main>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue"
import { useStore } from "@/store"

import AppNavigationView from "./views/AppNavigationView.vue"

import { UserInformation } from "@/domain/users/Users.Model"
import { EventInformation } from "@/domain/events/Events.Model"

export default defineComponent({
  components: {
    AppNavigationView,
  },

  setup() {
    const store = useStore()
    const events = computed<EventInformation[]>(() => store.getters.currentEvents)
    const user = computed<UserInformation | null>(() => store.getters.currentUser)

    return {
      events,
      user,
    }
  },
})
</script>
