import { AbstractConnector } from "@web3-react/abstract-connector";
import { createContext, Dispatch, SetStateAction } from "react";

export type WalletContextType = {
  handleProviderChosen?: (connector: AbstractConnector) => void;
  connectWalletLoading?: boolean;
  walletName?: (string | undefined)[];
  handleConnectorDisconnect?: () => void;
  logout?: () => void;
  showModal?: boolean;
  setShowModal?: Dispatch<SetStateAction<boolean>>;
  connectedAccount?: any;
};

export const WalletContext = createContext<WalletContextType>({});
