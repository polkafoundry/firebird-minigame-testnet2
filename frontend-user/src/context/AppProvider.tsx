import { AppContext } from "./AppContext";

const AppProvider = (props: any) => {
  return <AppContext.Provider value={{}}>{props.children}</AppContext.Provider>;
};
export default AppProvider;
