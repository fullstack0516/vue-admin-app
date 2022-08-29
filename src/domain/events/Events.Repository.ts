import { Observable, map } from "rxjs"

import apiCall from "@/domain/Domain.Axios.Api"
import { EventInformation, EventsResponse } from ".//Events.Model"
import { eventsMap } from ".//Events.Mapper"

export const getEvents = (
  watchlistId: number,
  chainId: number,
  contractId: string,
): Observable<EventInformation[]> => {
  return apiCall
    .get<EventsResponse>("events", { watchlistId, chainId, contractId })
    .pipe(map((eventsResponse) => eventsMap(eventsResponse.result)))
}
