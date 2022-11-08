import { useState, useCallback } from "react";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";

const rawMessage = "Firebird Chain Signature";

const useWalletSignature = () => {
  const { library, account: connectedAccount, connector } = useWeb3React();
  const [error, setError] = useState("");
  const [signature, setSignature] = useState("");

  const signMessage = useCallback(async () => {
    try {
      if (connectedAccount && library && connector) {
        const provider = new ethers.providers.Web3Provider(
          (window as any).ethereum,
        );
        const signer = provider.getSigner();
        const signature = await signer.signMessage(rawMessage);
        console.log("sign", signature);
      }
    } catch (err: any) {
      console.log("useWalletSignature", err);
      setError(err.message);
    }
  }, [library, connector, connectedAccount]);

  return {
    signMessage,
    signature,
    setSignature,
    error,
  };
};

export default useWalletSignature;
