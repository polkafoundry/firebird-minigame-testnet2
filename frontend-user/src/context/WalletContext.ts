import { AbstractConnector } from "@web3-react/abstract-connector";
import { createContext, Dispatch, SetStateAction } from "react";

export type WalletContextType = {
  handleProviderChosen?: (name: string, connector: AbstractConnector) => void;
  connectWalletLoading?: boolean;
  currentConnector?: AbstractConnector | undefined;
  walletName?: (string | undefined)[];
  setWalletName?: Dispatch<SetStateAction<(string | undefined)[]>>;
  handleConnectorDisconnect?: () => void;
  logout?: () => void;
  showModal?: boolean;
  setShowModal?: Dispatch<SetStateAction<boolean>>;
  connectedAccount?: any;
};

export const WalletContext = createContext<WalletContextType>({});
