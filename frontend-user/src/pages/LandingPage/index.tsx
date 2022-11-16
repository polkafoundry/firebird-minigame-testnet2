import { useEffect } from "react";
import LandingLayout from "../../components/layout/LandingLayout";
import { scrollToId } from "../../utils/domElement";
import Banner from "./Banner";
import CalculatedReward from "./CalculatedReward";
import FAQ from "./FAQ";
import PredictionRule from "./PredictionRule";
import WorldCupSchedule from "./WorldCupSchedule";

const LangdingPage = () => {
  useEffect(() => {
    window.addEventListener("load", () => {
      if (location?.hash) {
        scrollToId(location?.hash);
      }
    });
  }, [location]);

  return (
    <LandingLayout>
      <div className="w-full pt-20">
        <img
          src="./images/landing-page/banner.png"
          alt=""
          className="w-full select-none"
        />
      </div>

      <div className="mt-[-150px] xs:mt-[-180px] md:mt-[-200px] lg:mt-[-220px] flex flex-col w-full">
        <WorldCupSchedule />
        <CalculatedReward />
        <PredictionRule />
        <FAQ />
        <Banner />
      </div>
    </LandingLayout>
  );
};

export default LangdingPage;
