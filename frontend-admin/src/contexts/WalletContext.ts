import { createContext } from "react";

export type WalletContextType = {
  connectWalletLoading?: boolean;
  tryActivate?: () => void;
  logout?: () => void;
  isAuth?: boolean;
  setIsAuth?: React.Dispatch<React.SetStateAction<boolean>>;
  connectedAccount?: any;
};

export const WalletContext = createContext<WalletContextType>({});
