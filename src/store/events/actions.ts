import { EventInformation, EventUpsert } from "../../domain/events/Events.Model"
import { getEvents } from "../../domain/events/Events.Repository"
import { ActionContext, ActionTree } from "vuex"
import { State } from "../index"
import { Mutation, Mutations } from "./mutations"
import { EventsState } from "./state"

export enum EventsAction {
  getEvents = "getEvents",
}

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload?: Parameters<Mutations[K]>[1],
  ): ReturnType<Mutations[K]>
} & Omit<ActionContext<EventsState, State>, "commit">

export interface EventsActions {
  [EventsAction.getEvents](
    { state, getters, commit, dispatch }: AugmentedActionContext,
    { watchlistId, chainId, contractId }: EventUpsert,
  ): void
}

const actions: ActionTree<EventsState, State> & EventsActions = {
  [EventsAction.getEvents](
    context: AugmentedActionContext,
    { watchlistId, chainId, contractId }: EventUpsert,
  ) {
    getEvents(watchlistId, chainId, contractId).subscribe((response: EventInformation[]) => {
      context.commit(Mutation.SET_EVENTS, response)
    })
  },
}

export default actions
