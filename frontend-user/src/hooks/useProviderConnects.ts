import { requestSupportNetwork } from "./../utils/setupNetwork";
import { AbstractConnector } from "@web3-react/abstract-connector";
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import { useCallback, useEffect, useState } from "react";
import {
  BIRD_CHAIN_ID,
  BIRD_CHAIN_NAME,
  BIRD_CHAIN_RPC_URL,
  BIRD_SCAN_URL,
} from "../constants/networks";
import usePrevious from "./usePrevious";
import { toast } from "react-toastify";

const useProviderConnects = (
  setOpenConnectDialog?: any,
  openConnectDialog?: boolean,
) => {
  const [account, setAccount] = useState<string | undefined>(undefined);
  const [appNetworkLoading, setAppNetworkLoading] = useState(false);
  const [walletNameSuccess, setWalletNameSuccess] = useState<
    string | undefined
  >(undefined);
  const [walletName, setWalletName] = useState<(undefined | string)[]>([]);
  const [currentConnector, setCurrentConnector] = useState<
    undefined | AbstractConnector
  >(undefined);
  const [connectWalletLoading, setConnectWalletLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  const {
    activate,
    active,
    connector,
    chainId,
    error,
    account: connectedAccount,
    deactivate,
  } = useWeb3React();

  const previousAccount = usePrevious(account);
  const activePrevious = usePrevious(active);
  const previousConnector = usePrevious(connector);

  useEffect(() => {
    if (
      connectWalletLoading &&
      ((active && !activePrevious) ||
        (connector && connector !== previousConnector && !error))
    ) {
      setConnectWalletLoading(false);
      setOpenConnectDialog && setOpenConnectDialog(false);
    }
  }, [
    active,
    connector,
    error,
    previousAccount,
    previousConnector,
    activePrevious,
    connectWalletLoading,
    setOpenConnectDialog,
    setConnectWalletLoading,
  ]);

  const tryActivate = async (connector: AbstractConnector) => {
    try {
      if (connectWalletLoading || !connector || !walletName) return;
      setConnectWalletLoading(true);

      console.log("tryactive", connector, walletName);
      await activate(connector, undefined, true)
        .then(() => {
          console.log("activated");
        })
        .catch(async (error) => {
          if (error instanceof UnsupportedChainIdError) {
            console.log("Error when activate: ", error.message);
            // disconnectWallet()
            setCurrentConnector(undefined);
            setConnectWalletLoading(false);
            setWalletName([]);
            localStorage.removeItem("walletconnect");

            const currentChainId = await connector?.getChainId();

            toast.error(
              `App network doesn't match. Please change network in wallet or change app network.`,
            );
            return;
          } else {
            // disconnectWallet()
            setConnectWalletLoading(false);
            // setWalletName(walletName.filter((name) => wallet !== name));
            console.log("Error when try to activate: ", error.message);
            return;
          }
        });
      setConnectWalletLoading(true);
    } catch (error: any) {
      setLoginError(error.message);
      setCurrentConnector(undefined);
    }
  };

  const handleProviderChosen = async (
    name: string,
    connector: AbstractConnector,
  ) => {
    // Add Firebird chain to metamask or switch chain
    const provider = (window as any).ethereum;
    if (provider.networkVersion !== BIRD_CHAIN_ID) {
      await requestSupportNetwork();
    }
    await tryActivate(connector);
    setCurrentConnector(connector);
    walletName.indexOf(name) < 0 && setWalletName([...walletName, name]);
  };

  const handleConnectorDisconnect = useCallback(() => {
    deactivate();
    setAccount(undefined);
    setWalletName([]);
    setWalletNameSuccess(undefined);
    setCurrentConnector(undefined);
    setConnectWalletLoading(false);
    setLoginError("");
  }, []);

  return {
    handleProviderChosen,
    setWalletName,
    walletName,
    connectWalletLoading,
    walletNameSuccess,
    loginError,
    currentConnector,
    appNetworkLoading,
    handleConnectorDisconnect,
  };
};

export default useProviderConnects;
