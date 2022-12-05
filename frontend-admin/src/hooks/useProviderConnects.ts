import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { SUPPORTED_WALLETS } from "../constants/connectors";
import { ROUTES_URL } from "./../constants/index";

const useProviderConnects = () => {
  const navigate = useNavigate();
  const [connectLoading, setConnectLoading] = useState(false);

  const {
    activate,
    account: connectedAccount,
    deactivate,
    connector,
  } = useWeb3React();

  // store connectedAccount
  useEffect(() => {
    if (!connectedAccount) return;

    localStorage.setItem("walletconnect", connectedAccount);
  }, [connectedAccount]);

  const tryActivate = useCallback(async () => {
    const metamaskConnector = SUPPORTED_WALLETS.METAMASK.connector;
    try {
      if (connectLoading || !metamaskConnector) return;
      await activate(
        new InjectedConnector(metamaskConnector),
        undefined,
        true,
      ).catch(async (error: any) => {
        if (error instanceof UnsupportedChainIdError) {
          console.log("Error when activate: ", error.message);
          localStorage.removeItem("walletconnect");
        } else {
          console.log("ERROR when try to activate: ", error.message);
        }
      });
    } catch (error: any) {
      console.log("tryActivate ERR:", error?.message);
    }
  }, [connector]);

  const handleConnectorDisconnect = useCallback(() => {
    localStorage.removeItem("walletconnect");
    deactivate();
    setConnectLoading(false);
    navigate(ROUTES_URL.LOGIN);
  }, []);

  return {
    tryActivate,
    connectedAccount,
    connectWalletLoading: connectLoading,
    handleConnectorDisconnect,
  };
};

export default useProviderConnects;
