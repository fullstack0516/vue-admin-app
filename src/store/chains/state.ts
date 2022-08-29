import { ChainInformation } from "../../domain/chains/Chains.Model"

export interface ChainsState {
  chains: ChainInformation[]
}

function state(): ChainsState {
  return {
    chains: [],
  }
}

export default state
