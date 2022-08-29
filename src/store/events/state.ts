import { EventInformation } from "../../domain/events/Events.Model"

export interface EventsState {
  events: EventInformation[]
}

function state(): EventsState {
  return {
    events: [],
  }
}

export default state
