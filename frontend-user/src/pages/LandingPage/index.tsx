import LandingLayout from "../../components/layout/LandingLayout";
import Banner from "./Banner";
import CalculatedReward from "./CalculatedReward";
import PredictionRule from "./PredictionRule";
import WorldCupSchedule from "./WorldCupSchedule";

const LangdingPage = () => {
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
        <Banner />
      </div>
    </LandingLayout>
  );
};

export default LangdingPage;
