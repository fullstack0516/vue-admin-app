import { GetterTree } from "vuex"

import { State } from "../index"
import { ChainsState } from "./state"
import { ChainInformation } from "@/domain/chains/Chains.Model"

export type Getters = {
  currentChains(state: State): ChainInformation[]
}

const getters: GetterTree<ChainsState, State> = {
  currentChains(state) {
    return state.chains.length ? state.chains : []
  },
}

export default getters
