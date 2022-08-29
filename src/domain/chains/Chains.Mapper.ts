import { ChainInformation } from "./Chains.Model"

export const chainMap = (chainsResponse?: ChainInformation[]): ChainInformation[] => {
  if (chainsResponse) return chainsResponse
  else return []
}
