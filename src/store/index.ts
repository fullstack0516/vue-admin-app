import { createStore, createLogger } from "vuex"

import { Auth, AuthStore } from "./auth"
import { AuthState } from "./auth/state"
import { Chains, ChainsStore } from "./chains"
import { ChainsState } from "./chains/state"
import { Events, EventsStore } from "./events"
import { EventsState } from "./events/state"

export type State = {
  auth: AuthState
  events: EventsState
  chains: ChainsState
}

export type Store = AuthStore<Pick<State, "auth">>
    & EventsStore<Pick<State, "events">>
    & ChainsStore<Pick<State, "chains">>

export const store = createStore({
  plugins: process.env.NODE_ENV === "production" ? [] : [createLogger()],
  modules: {
    auth: Auth,
    chains: Chains,
    events: Events,
  },
})

export function useStore(): Store {
  return store as Store
}

export default store
