import React from "react";
import DefaultLayout from "../../components/layout/DefaultLayout";
import MatchScore from "./MatchScore";
import WhoWin from "./WhoWin";

const LeaderboardPage = () => {
  return (
    <DefaultLayout>
      <div className="flex flex-col mx-auto max-w-[1240px] mb-10 pt-32">
        <MatchScore />
        <WhoWin currentRank={10} />
      </div>
    </DefaultLayout>
  );
};

export default LeaderboardPage;
