import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import ConnectWalletDialog from "../components/base/ConnectWalletDialog";
import { SUPPORTED_WALLETS } from "../constants/connectors";
import useProviderConnects from "../hooks/useProviderConnects";
import { checkMetaMaskIsUnlocked } from "../utils";
import { WalletContext } from "./WalletContext";

const WalletProvider = (props: any) => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const { deactivate, account } = useWeb3React();

  const {
    handleProviderChosen,
    connectWalletLoading,
    handleConnectorDisconnect,
    connectedAccount,
    tryActivate,
  } = useProviderConnects();

  useEffect(() => {
    const autoCloseDialog = async () => {
      const unlocked = await checkMetaMaskIsUnlocked();
      unlocked && setShowModal(false);
    };

    autoCloseDialog();
  }, [account]);

  // auto activate account from localStorage
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
        logout,
        connectedAccount,
      }}
    >
      {props.children}

      <ConnectWalletDialog
        open={showModal}
        closeDialog={closeModal}
        handleProviderChosen={handleProviderChosen}
        connectWalletLoading={connectWalletLoading}
        connectedAccount={connectedAccount}
        disconnectWallet={logout}
      />
    </WalletContext.Provider>
  );
};
export default WalletProvider;
