import { useContext, useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { WalletContext } from "../../../contexts/WalletContext";

const whitelistAddresses = [
  "0xAF95f13E364e460a55f2E52A84Ad51E11cD9aC8b",
  "0xAF95f13E364e460a55f2E52A84Ad51E11cD9aC8b",
  "0xAF95f13E364e460a55f2E52A84Ad51E11cD9aC8b",
];

const PrivateRoutes = () => {
  const { connectedAccount } = useContext(WalletContext);

  const [isAuth, setIsAuth] = useState<boolean>(false);
  useEffect(() => {
    setIsAuth(whitelistAddresses.includes(connectedAccount));
  }, [connectedAccount]);

  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
