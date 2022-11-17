import { useEffect } from "react";
import LandingLayout from "../../components/layout/LandingLayout";
import { scrollToId } from "../../utils/domElement";
import BannerSocials from "./BannerSocials";
import CalculatedReward from "./CalculatedReward";
import FAQ from "./FAQ";
import PredictionRule from "./PredictionRule";
import MatchList from "./MatchList";
import Schedule from "./MatchList/Schedule";
import HomeBanner from "./HomeBanner";

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
      <div className="mt-[-150px] xs:mt-[-180px] md:mt-[-200px] lg:mt-[-240px] pt-20">
        <Schedule />
      </div>

      <div className=" flex flex-col w-full">
        <MatchList />
        <CalculatedReward />
        <PredictionRule />
        <FAQ />
        {/* <BannerSocials />  */}
      </div>
    </LandingLayout>
  );
};

export default LangdingPage;
