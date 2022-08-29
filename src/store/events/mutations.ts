import { MutationTree } from "vuex"
import { EventsState } from "./state"
import { EventInformation } from "../../domain/events/Events.Model"

export enum Mutation {
  SET_EVENTS = "SET_EVENTS",
}

export type Mutations<S = EventsState> = {
  [Mutation.SET_EVENTS](state: S, payload: EventInformation[]): void
}

const mutation: MutationTree<EventsState> = {
  [Mutation.SET_EVENTS](state: EventsState, payload: EventInformation[]) {
    state.events = payload
  },
}

export default mutation
