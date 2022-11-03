import { AbstractConnector } from "@web3-react/abstract-connector";
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { BIRD_CHAIN_ID } from "../constants/networks";
import { requestSupportNetwork } from "./../utils/setupNetwork";

const useProviderConnects = () => {
  const [walletName, setWalletName] = useState<(undefined | string)[]>([]);
  const [currentConnector, setCurrentConnector] = useState<
    undefined | AbstractConnector
  >(undefined);
  const [connectLoading, setConnectLoading] = useState(false);

  const { activate, account: connectedAccount, deactivate } = useWeb3React();

  // store connectedAccount
  useEffect(() => {
    if (!connectedAccount) return;

    localStorage.setItem("walletconnect", connectedAccount);
  }, [connectedAccount]);

  const tryActivate = async (connector: AbstractConnector) => {
    try {
      if (connectLoading || !connector || !walletName) return;

      await activate(new InjectedConnector(connector), undefined, true).catch(
        async (error: any) => {
          if (error instanceof UnsupportedChainIdError) {
            console.log("Error when activate: ", error.message);
            setCurrentConnector(undefined);
            setWalletName([]);
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
  };

  const handleProviderChosen = async (
    name: string,
    connector: AbstractConnector,
  ) => {
    // Add Firebird chain to metamask or switch chain
    const provider = (window as any).ethereum;
    setConnectLoading(true);
    if (provider.networkVersion !== BIRD_CHAIN_ID) {
      await requestSupportNetwork();
    }
    await tryActivate(connector);
    setConnectLoading(false);
    setCurrentConnector(connector);
    walletName.indexOf(name) < 0 && setWalletName([...walletName, name]);
  };

  const handleConnectorDisconnect = useCallback(() => {
    localStorage.removeItem("walletconnect");
    deactivate();
    setWalletName([]);
    setCurrentConnector(undefined);
    setConnectLoading(false);
  }, []);

  return {
    tryActivate,
    connectedAccount,
    handleProviderChosen,
    setWalletName,
    walletName,
    connectWalletLoading: connectLoading,
    currentConnector,
    handleConnectorDisconnect,
  };
};

export default useProviderConnects;
