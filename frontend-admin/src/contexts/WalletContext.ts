import { createContext } from "react";

export type WalletContextType = {
  connectWalletLoading?: boolean;
  tryActivate?: () => void;
  logout?: () => void;
  connectedAccount?: any;
};

export const WalletContext = createContext<WalletContextType>({});
