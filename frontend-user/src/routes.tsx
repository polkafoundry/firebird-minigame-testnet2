import React from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import LangdingPage from "./pages/LandingPage";
import NotFoundPage from "./pages/NotFoundPage";

const routing = function createRouting() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LangdingPage />} />
        <Route path="*" element={<NotFoundPage />} />
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
