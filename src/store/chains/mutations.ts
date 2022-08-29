import { MutationTree } from "vuex"
import { ChainsState } from "./state"
import { ChainInformation } from "../../domain/chains/Chains.Model"

export enum Mutation {
  SET_CHAINS = "SET_CHAINS",
}

export type Mutations<S = ChainsState> = {
  [Mutation.SET_CHAINS](state: S, payload: ChainInformation[]): void
}

const mutation: MutationTree<ChainsState> = {
  [Mutation.SET_CHAINS](state: ChainsState, payload: ChainInformation[]) {
    state.chains = payload
  },
}

export default mutation
