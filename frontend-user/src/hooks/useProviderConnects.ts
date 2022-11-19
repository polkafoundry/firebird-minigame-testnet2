import { AbstractConnector } from "@web3-react/abstract-connector";
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { BIRD_CHAIN_ID } from "../constants/networks";
import { requestSupportNetwork } from "./../utils/setupNetwork";

const useProviderConnects = () => {
  const [currentConnector, setCurrentConnector] = useState<
    undefined | AbstractConnector
  >(undefined);
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

  const tryActivate = useCallback(
    async (connector: AbstractConnector) => {
      try {
        if (connectLoading || !connector) return;

        await activate(new InjectedConnector(connector), undefined, true).catch(
          async (error: any) => {
            if (error instanceof UnsupportedChainIdError) {
              console.log("Error when activate: ", error.message);
              setCurrentConnector(undefined);
              localStorage.removeItem("walletconnect");

              toast.error(
                `App network doesn't match. Please change network in wallet or change app network.`,
              );
            } else {
              console.log("ERROR when try to activate: ", error.message);
              toast.error(error.message);
            }
          },
        );
      } catch (error: any) {
        setCurrentConnector(undefined);
      }
    },
    [connector],
  );

  const handleProviderChosen = async (
    name: string,
    connector: AbstractConnector,
    handleCloseModal: () => void,
  ) => {
    // Add Firebird chain to metamask or switch chain
    const provider = (window as any).ethereum;
    setConnectLoading(true);
    if (provider.networkVersion !== BIRD_CHAIN_ID) {
      try {
        await requestSupportNetwork();
        setConnectLoading(true);
        await tryActivate(connector);
        setConnectLoading(false);
      } catch (error: any) {
        console.log("ERR requestSupportNetwork", error?.message);
        setConnectLoading(false);
      }
      return;
    }
    await tryActivate(connector);
    setConnectLoading(false);
    handleCloseModal();
    setCurrentConnector(connector);
  };

  const handleConnectorDisconnect = useCallback(() => {
    localStorage.removeItem("walletconnect");
    deactivate();
    setCurrentConnector(undefined);
    setConnectLoading(false);
  }, []);

  return {
    tryActivate,
    connectedAccount,
    handleProviderChosen,
    connectWalletLoading: connectLoading,
    currentConnector,
    handleConnectorDisconnect,
  };
};

export default useProviderConnects;
