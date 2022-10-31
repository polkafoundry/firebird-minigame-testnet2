import { useWeb3React } from "@web3-react/core";
import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AppContext } from "./context/AppContext";
import useProviderConnects from "./hooks/useProviderConnects";
import LangdingPage from "./pages/LandingPage";
import NotFoundPage from "./pages/NotFoundPage";

const routing = function createRouting() {
  const { deactivate } = useWeb3React();

  const [openConnectWallet, setOpenConnectWallet] = useState<boolean>(false);
  const [currentConnectedWallet, setCurrentConnectedWallet] =
    useState<any>(undefined);

  const {
    handleProviderChosen,
    connectWalletLoading,
    currentConnector,
    walletName,
    setWalletName,
    loginError,
    appNetworkLoading,
    handleConnectorDisconnect,
  } = useProviderConnects(setOpenConnectWallet, openConnectWallet);

  const logout = () => {
    deactivate();
    setCurrentConnectedWallet(undefined);
    handleConnectorDisconnect();
  };

  return (
    <AppContext.Provider
      value={{
        openConnectWallet,
        currentConnectedWallet,
        handleProviderChosen,
        connectWalletLoading,
        currentConnector,
        walletName,
        setWalletName,
        loginError,
        logout,
        appNetworkLoading,
        handleConnectorDisconnect,
      }}
    >
      <Routes>
        <Route path="/" element={<LangdingPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <ToastContainer />
    </AppContext.Provider>
  );
};
/**
 * Wrap the app routes into router
 *
 * PROPS
 * =============================================================================
 * @returns {React.Node}
 */
export default routing;
