import React from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoutes from "./components/base/PrivateRoutes";
import LangdingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";

const routing = function createRouting() {
  return (
    <Routes>
      <Route path={"/login"} element={<LoginPage />} />
      <Route element={<PrivateRoutes />}>
        <Route path={"/dashboard"} element={<LangdingPage />} />
        <Route path="*" element={<LangdingPage />} />
      </Route>
    </Routes>
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
