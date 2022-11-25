import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { WalletContext } from "../../../contexts/WalletContext";

const PrivateRoutes = () => {
  const { isAuth } = useContext(WalletContext);

  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
