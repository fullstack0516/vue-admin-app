import { ChainInformation, ChainsSelect } from "../../domain/chains/Chains.Model"
import { getChains } from "../../domain/chains/Chains.Repository"
import { ActionContext, ActionTree } from "vuex"
import { State } from "../index"
import { Mutation, Mutations } from "./mutations"
import { ChainsState } from "./state"

export enum ChainsAction {
  getChains = "getChains",
}

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload?: Parameters<Mutations[K]>[1],
  ): ReturnType<Mutations[K]>
} & Omit<ActionContext<ChainsState, State>, "commit">

export interface ChainsActions {
  [ChainsAction.getChains](
    { state, getters, commit, dispatch }: AugmentedActionContext,
    { watchlistId, chainId, contractId }: ChainsSelect,
  ): void
}

const actions: ActionTree<ChainsState, State> & ChainsActions = {
  [ChainsAction.getChains](context: AugmentedActionContext) {
    getChains().subscribe((response: ChainInformation[]) => {
      context.commit(Mutation.SET_CHAINS, response)
    })
  },
}

export default actions
