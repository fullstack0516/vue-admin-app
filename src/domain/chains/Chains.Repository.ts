import { Observable, map } from "rxjs"

import apiCall from "@/domain/Domain.Axios.Api"
import { ChainInformation } from "./Chains.Model"
import { chainMap } from "./Chains.Mapper"

export const getChains = (): Observable<ChainInformation[]> => {
  return apiCall
    .get<ChainInformation[]>("supported_chains")
    .pipe(map((chainsResponse) => chainMap(chainsResponse.result)))
}
