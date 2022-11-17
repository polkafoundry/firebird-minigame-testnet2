import LandingLayout from "../../components/layout/LandingLayout";
import ComingNext from "./ComingNext";
import Community from "./Community";
import ExploreFirebird from "./ExploreFirebird";
import HomeBanner from "./IntroBanner";

const IntroductionPage = () => {
  return (
    <LandingLayout>
      <HomeBanner />
      <div className="flex bg-[#F7F7F8]">
        <div className="flex flex-col w-full max-w-screen-main mx-auto px-20">
          <ExploreFirebird />

          <ComingNext />

          <Community />
        </div>
      </div>
    </LandingLayout>
  );
};

export default IntroductionPage;
