import "./App.css";
import { Web3ReactProvider } from "@web3-react/core";
import createRoutes from "./routes";
import { Web3Provider } from "@ethersproject/providers";
import { ethers } from "ethers";
import WalletProvider from "./context/WalletProvider";
import AppProvider from "./context/AppProvider";
import AOS from "aos";
import { useEffect } from "react";
import "aos/dist/aos.css";

export const getLibrary = (provider: any): Web3Provider => {
  const library = new ethers.providers.Web3Provider(provider, "any");
  library.pollingInterval = 12000;
  return library;
};

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      disable: "mobile",
    });
    AOS.refresh();
  }, []);

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <WalletProvider>
        <AppProvider>{createRoutes()}</AppProvider>
      </WalletProvider>
    </Web3ReactProvider>
  );
}

export default App;
