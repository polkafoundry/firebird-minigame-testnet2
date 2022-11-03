import { createContext } from "react";

export type AppContextType = {
  now?: string;
};

export const AppContext = createContext<AppContextType>({});
