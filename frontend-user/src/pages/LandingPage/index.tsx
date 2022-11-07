import LandingLayout from "../../components/layout/LandingLayout";
import CalculatedReward from "./CalculatedReward";
import PredictionRule from "./PredictionRule";
import WorldCupSchedule from "./WorldCupSchedule";

const LangdingPage = () => {
  return (
    <LandingLayout>
      {/* <HomeBanner /> */}

      <div className="flex flex-col w-full max-w-screen-main mx-auto bg-[#030102]">
        <WorldCupSchedule />
        <PredictionRule />
        <CalculatedReward />
      </div>
    </LandingLayout>
  );
};

export default LangdingPage;
