import LandingLayout from "../../components/layout/LandingLayout";
import Banner from "./Banner";
import CalculatedReward from "./CalculatedReward";
import PredictionRule from "./PredictionRule";
import WorldCupSchedule from "./WorldCupSchedule";

const LangdingPage = () => {
  return (
    <LandingLayout>
      <div className="w-full">
        <img src="./images/landing-page/banner.png" alt="" className="w-full" />
      </div>

      <div className="mt-[-240px] lg:mt-[-280px] flex flex-col w-full">
        <WorldCupSchedule />
        <CalculatedReward />
        <PredictionRule />
        <Banner />
      </div>
    </LandingLayout>
  );
};

export default LangdingPage;
