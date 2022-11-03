import {
  BIRD_CHAIN_ID,
  BIRD_CHAIN_NAME,
  BIRD_CHAIN_RPC_URL,
  BIRD_SCAN_URL,
} from "../constants/networks";

export const requestSupportNetwork = async () => {
  const provider = (window as any).ethereum;
  if (provider) {
    try {
      await provider.request({
        method: "wallet_switchEthereumChain",
        params: [
          {
            chainId: `0x${(+BIRD_CHAIN_ID).toString(16)}`,
          },
        ],
      });
    } catch (err: any) {
      // This error code indicates that the chain has not been added to MetaMask
      if (err.code === 4902) {
        await provider.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainName: BIRD_CHAIN_NAME,
              chainId: `0x${(+BIRD_CHAIN_ID).toString(16)}`,
              nativeCurrency: {
                name: "PKF",
                decimals: 18,
                symbol: "PKF",
              },
              blockExplorerUrls: [BIRD_SCAN_URL],
              rpcUrls: [BIRD_CHAIN_RPC_URL],
            },
          ],
        });
      }
    }
  } else {
    console.error(
      "Can't setup the Firebird network on metamask because window.ethereum is undefined",
    );
  }
};
