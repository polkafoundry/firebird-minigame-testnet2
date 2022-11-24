import { useEffect, useState } from "react";
import useProviderConnects from "../hooks/useProviderConnects";
import { checkMetaMaskIsUnlocked } from "../utils";
import { WalletContext } from "./WalletContext";

const WalletProvider = (props: any) => {
  const {
    connectWalletLoading,
    handleConnectorDisconnect,
    connectedAccount,
    tryActivate,
  } = useProviderConnects();

  const [isAuth, setIsAuth] = useState<boolean>(false);

  // auto activate accoung from localStorage
  useEffect(() => {
    const activateStoredWallet = async () => {
      // check metamask is unlocked
      const unlocked = await checkMetaMaskIsUnlocked();
      const storedWallet = localStorage.getItem("walletconnect");
      if (storedWallet && unlocked) {
        tryActivate();
      }
    };

    activateStoredWallet();
  }, []);

  const logout = () => {
    handleConnectorDisconnect();
  };

  return (
    <WalletContext.Provider
      value={{
        connectWalletLoading,
        logout,
        tryActivate,
        connectedAccount,
        isAuth,
        setIsAuth,
      }}
    >
      {props.children}
    </WalletContext.Provider>
  );
};
export default WalletProvider;
