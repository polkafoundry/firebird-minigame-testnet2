import React from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import PrivateRoutes from "./components/base/PrivateRoutes";
import { ROUTES_URL } from "./constants";
import GiftCodePage from "./pages/GiftCodePage";
import LangdingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";

const routing = function createRouting() {
  return (
    <>
      <Routes>
        <Route path={ROUTES_URL.LOGIN} element={<LoginPage />} />
        <Route element={<PrivateRoutes />}>
          <Route path={ROUTES_URL.DASHBOARD} element={<LangdingPage />} />
          <Route path={ROUTES_URL.GIFT_CODE} element={<GiftCodePage />} />
          <Route path="*" element={<LangdingPage />} />
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
};
/**
 * Wrap the app routes into router
 *
 * PROPS
 * =============================================================================
 * @returns {React.Node}
 */
export default routing;
