import LandingLayout from "../../components/layout/LandingLayout";
import WorldCupSchedule from "./WorldCupSchedule";

const LangdingPage = () => {
  return (
    <LandingLayout>
      {/* <HomeBanner /> */}

      <div className="flex flex-col w-full max-w-screen-main mx-auto">
        <WorldCupSchedule />
      </div>
    </LandingLayout>
  );
};

export default LangdingPage;
