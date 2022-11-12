import LandingLayout from "../../components/layout/LandingLayout";
import Banner from "./Banner";
import CalculatedReward from "./CalculatedReward";
import PredictionRule from "./PredictionRule";
import WorldCupSchedule from "./WorldCupSchedule";

const LangdingPage = () => {
  return (
    <LandingLayout>
      {/* <HomeBanner /> */}

      <div className="flex flex-col w-full">
        <WorldCupSchedule />
        <CalculatedReward />
        <PredictionRule />
        <Banner />
      </div>
    </LandingLayout>
  );
};

export default LangdingPage;
