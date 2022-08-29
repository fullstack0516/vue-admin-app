import { GetterTree } from "vuex"

import { State } from "../index"
import { EventsState } from "./state"
import { EventInformation } from "@/domain/events/Events.Model"

export type Getters = {
  currentEvents(state: State): EventInformation[]
}

const getters: GetterTree<EventsState, State> = {
  currentEvents(state) {
    return state.events.length ? state.events : []
  },
}

export default getters
