import clsx from "clsx";
import React from "react";

type RewardBannerProps = {
  reward: number;
  winner: string;
  redirectUrl: string;
  className?: string;
};

const RewardBanner = (props: RewardBannerProps) => {
  const { reward, winner, redirectUrl, className = "" } = props;
  return (
    <div
      className={clsx(
        "flex items-center space-x-5 px-10 py-4 rounded-lg",
        className,
      )}
    >
      <div className="flex flex-col">
        <span className="text-xl">Total Reward:</span>
        <span className="text-2xl font-bold">${reward}</span>
      </div>
      <div className="flex flex-col">
        <span className="text-xl">Total Winners:</span>
        <span className="text-2xl font-bold">{winner}</span>
      </div>
      <a href={redirectUrl}>
        <button className="bg-black px-10 py-2 text-white rounded-xl">
          More details
        </button>
      </a>
    </div>
  );
};

export default RewardBanner;
