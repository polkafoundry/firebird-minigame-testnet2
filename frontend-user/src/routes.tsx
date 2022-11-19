import React from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { URLS } from "./constants";
import FaqPage from "./pages/FaqPage";
import IntroductionPage from "./pages/IntroductionPage";
import LangdingPage from "./pages/LandingPage";
import LeaderboardPage from "./pages/LeaderboardPage";
import MyHistoryPage from "./pages/MyHistoryPage";
import NotFoundPage from "./pages/NotFoundPage";

const routing = function createRouting() {
  return (
    <>
      <Routes>
        <Route path={URLS.INTRODUCTION} element={<IntroductionPage />} />
        <Route path={URLS.HOME} element={<LangdingPage />} />
        <Route path={URLS.HISTORY} element={<MyHistoryPage />} />
        <Route path={URLS.LEADERBOARD} element={<LeaderboardPage />} />
        <Route path={URLS.FAQ} element={<FaqPage />} />
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
