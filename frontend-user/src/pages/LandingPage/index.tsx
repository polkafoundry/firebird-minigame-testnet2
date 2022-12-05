import { useEffect } from "react";
import LandingLayout from "../../components/layout/LandingLayout";
import { scrollToId } from "../../utils/domElement";
import BannerSocials from "./BannerSocials";
import CalculatedReward from "./CalculatedReward";
import HomeBanner from "./HomeBanner";
import MatchList from "./MatchList";
import Schedule from "./MatchList/Schedule";
import PredictionRule from "./PredictionRule";

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
      <HomeBanner />
      <div className="mt-[-170px] xs:mt-[-180px] md:mt-[-200px] lg:mt-[-240px] pt-20">
        <Schedule />
      </div>

      <div className=" flex flex-col w-full">
        <MatchList />
        <CalculatedReward />
        <PredictionRule />
        <BannerSocials />
      </div>
    </LandingLayout>
  );
};

export default LangdingPage;
