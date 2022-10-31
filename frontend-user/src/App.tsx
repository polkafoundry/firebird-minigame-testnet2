import "./App.css";
import { Web3ReactProvider } from "@web3-react/core";
import createRoutes from "./routes";
import { Web3Provider } from "@ethersproject/providers";
import { ethers } from "ethers";

export const getLibrary = (provider: any): Web3Provider => {
  const library = new ethers.providers.Web3Provider(provider, "any");
  library.pollingInterval = 10000;
  return library;
};

function App() {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      {createRoutes()}
    </Web3ReactProvider>
  );
}

export default App;
