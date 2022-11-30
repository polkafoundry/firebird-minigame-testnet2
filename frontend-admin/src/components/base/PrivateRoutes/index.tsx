import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { ROUTES_URL } from "../../../constants";
import { WalletContext } from "../../../contexts/WalletContext";

const PrivateRoutes = () => {
  const { isAuth } = useContext(WalletContext);

  return isAuth ? <Outlet /> : <Navigate to={ROUTES_URL.LOGIN} />;
};

export default PrivateRoutes;
