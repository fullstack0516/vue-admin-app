import { EventInformation } from ".//Events.Model"

export const eventsMap = (eventResponse?: Array<EventInformation>): EventInformation[] => {
  if (eventResponse) return eventResponse
  else return []
}
