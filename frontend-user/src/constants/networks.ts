export const BIRD_CHAIN_ID = process.env.REACT_APP_BIRD_CHAIN_ID as string;
export const BIRD_CHAIN_NAME = process.env.REACT_APP_BIRD_CHAIN_NAME as string;
export const BIRD_CHAIN_TOKEN_SYMBOL = process.env
  .REACT_APP_BIRD_CHAIN_TOKEN_SYMBOL as string;
export const BIRD_CHAIN_RPC_URL = process.env
  .REACT_APP_BIRD_CHAIN_RPC_URL as string;
export const BIRD_SCAN_URL = process.env.REACT_APP_BIRDSCAN_BASE_URL as string;
export const METAMASK_DEEPLINK = process.env
  .REACT_APP_METAMASK_DEEPLINK as string;

export enum APP_NETWORKS_NAME {
  METAMASK = "METAMASK",
  BSC = "BSC",
  POLYGON = "POLYGON",
  AVALANCHE = "AVALANCHE",
}
