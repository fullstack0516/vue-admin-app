export interface EventInformation {
  block: number
  chain_id: number
  chain_img: string
  explorer: string
  explorer_img: string
  gas: number
  hash: string
  index: number
  method: string
  tag: number
  token_address: string
  token_amount: number
  token_decimals: number
  token_id: string
  token_image: string
  token_name: string
  token_symbol: string
  token_out_address: string
  token_out_amount: number
  token_out_id: string
  token_out_image: string
  token_out_name: string
  token_out_symbol: string
  tx_from: string
  tx_from_ens: string
  tx_to: string
  tx_to_img: string
  tx_to_name: string
  tx_to_notoken: boolean
  worth_usd: string
}

export interface EventUpsert {
  watchlistId: number
  chainId: number
  contractId: string
}

export interface EventsResponse {
  events: EventInformation[]
}
