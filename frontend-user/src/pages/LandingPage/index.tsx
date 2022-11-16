import { useEffect, useRef } from "react";
// import { useLocation } from "react-router-dom";
import LandingLayout from "../../components/layout/LandingLayout";
// import { scrollToId } from "../../utils/domElement";
import Banner from "./Banner";
import CalculatedReward from "./CalculatedReward";
import FAQ from "./FAQ";
import PredictionRule from "./PredictionRule";
import WorldCupSchedule from "./WorldCupSchedule";

const LangdingPage = () => {
  // const location = useLocation();
  // useEffect(() => {
  //   if (location.hash) {
  //     scrollToId(location?.hash);
  //   }
  // }, [location.hash]);
  const ref = useRef<any>(null);
  useEffect(() => {
    if (window.location.hash.includes("prediction-rule")) {
      // const availabilitySectionNode =
      //   document.getElementById("prediction-rule");
      // availabilitySectionNode &&
      ref.current && ref.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

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
        <CalculatedReward ref={ref} />
        <PredictionRule />
        <FAQ />
        <Banner />
      </div>
    </LandingLayout>
  );
};

export default LangdingPage;
