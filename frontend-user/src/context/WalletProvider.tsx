import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import ConnectWalletDialog from "../components/base/ConnectWalletDialog";
import { SUPPORTED_WALLETS } from "../constants/connectors";
import useProviderConnects from "../hooks/useProviderConnects";
import { checkMetaMaskIsUnlocked } from "../utils";
import { WalletContext } from "./WalletContext";

const WalletProvider = (props: any) => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const { deactivate } = useWeb3React();

  const {
    handleProviderChosen,
    connectWalletLoading,
    currentConnector,
    walletName,
    setWalletName,
    handleConnectorDisconnect,
    connectedAccount,
    tryActivate,
  } = useProviderConnects();

  // auto activate accoung from localStorage
  useEffect(() => {
    const activateStoredWallet = async () => {
      // check metamask is unlocked
      const unlocked = await checkMetaMaskIsUnlocked();
      const storedWallet = localStorage.getItem("walletconnect");
      if (storedWallet && unlocked) {
        const defaultWallet = SUPPORTED_WALLETS.METAMASK;
        tryActivate(defaultWallet.connector);
      }
    };

    activateStoredWallet();
  }, []);

  const logout = () => {
    deactivate();
    handleConnectorDisconnect();
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <WalletContext.Provider
      value={{
        showModal,
        setShowModal,
        handleProviderChosen,
        connectWalletLoading,
        currentConnector,
        walletName,
        setWalletName,
        logout,
        connectedAccount,
      }}
    >
      {props.children}

      <ConnectWalletDialog
        open={showModal}
        closeDialog={closeModal}
        walletName={walletName}
        handleProviderChosen={handleProviderChosen}
        connectWalletLoading={connectWalletLoading}
        connectedAccount={connectedAccount}
        disconnectWallet={logout}
      />
    </WalletContext.Provider>
  );
};
export default WalletProvider;
