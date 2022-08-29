export interface ChainInformation {
  id: number;
  img: string;
  name: string;
}

export interface ChainsResponse {
  chains: ChainInformation[];
}

export interface ChainsSelect {
  watchlistId: number;
  chainId: number;
  contractId: string;
}
