import { Web3Provider } from "@ethersproject/providers";
import { Web3ReactProvider } from "@web3-react/core";
import { ethers } from "ethers";
import "./App.css";
import AppProvider from "./context/AppProvider";
import WalletProvider from "./context/WalletProvider";
import createRoutes from "./routes";

export const getLibrary = (provider: any): Web3Provider => {
  const library = new ethers.providers.Web3Provider(provider, "any");
  library.pollingInterval = 12000;
  return library;
};

function App() {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <WalletProvider>
        <AppProvider>{createRoutes()}</AppProvider>
      </WalletProvider>
    </Web3ReactProvider>
  );
}

export default App;
