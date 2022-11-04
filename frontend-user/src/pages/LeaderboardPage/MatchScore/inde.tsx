import React from "react";
import RewardBanner from "../RewardBanner";

const MatchScore = () => {
  return (
    <div>
      <div className="flex justify-between">
        <div className="flex flex-col text-4xl font-semibold">
          <span>Match Score</span>
          <span> Prediction Winners</span>
        </div>
        <RewardBanner
          reward={1720}
          winner="64 winners"
          redirectUrl="#"
          className="bg-pink-200"
        />
      </div>
    </div>
  );
};

export default MatchScore;
