import DefaultLayout from "../../components/layout/DefaultLayout";
import MatchScore from "./MatchScore";
import WhoWin from "./WhoWin";

const LeaderboardPage = () => {
  return (
    <DefaultLayout>
      <div className="flex flex-col mx-auto max-w-screen-main mb-10 pt-[140px]">
        <MatchScore />
        <WhoWin />
      </div>
    </DefaultLayout>
  );
};

export default LeaderboardPage;
