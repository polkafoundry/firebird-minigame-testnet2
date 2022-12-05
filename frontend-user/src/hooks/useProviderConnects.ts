import { AbstractConnector } from "@web3-react/abstract-connector";
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import { useCallback, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { BIRD_CHAIN_ID } from "../constants/networks";
import { WalletContext } from "../context/WalletContext";
import { requestSupportNetwork } from "./../utils/setupNetwork";

const useProviderConnects = () => {
  const [connectLoading, setConnectLoading] = useState(false);
  const { setShowModal } = useContext(WalletContext);

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
        console.log("ERROR when try to activate: ", error.message);
      }
    },
    [connector, setShowModal],
  );

  const handleProviderChosen = async (connector: AbstractConnector) => {
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
  };

  const handleConnectorDisconnect = useCallback(() => {
    localStorage.removeItem("walletconnect");
    deactivate();
    setConnectLoading(false);
  }, []);

  return {
    tryActivate,
    connectedAccount,
    handleProviderChosen,
    connectWalletLoading: connectLoading,
    handleConnectorDisconnect,
  };
};

export default useProviderConnects;
