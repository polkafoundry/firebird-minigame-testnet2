import clsx from "clsx";
import React from "react";
import RewardBanner from "../RewardBanner";
import styles from "./whoWin.module.scss";

const headingTable = ["No", "Wallet address", "Prize", "Earned $BIRD"];
const rankData = [
  { no: 1, address: "0xc13***770c", prize: 700, earned: 18300 },
  { no: 2, address: "0xc13***770c", prize: 700, earned: 18300 },
  { no: 3, address: "0xc13***770c", prize: 700, earned: 18300 },
  { no: 4, address: "0xc13***770c", prize: 700, earned: 18300 },
];

const WhoWin = (props: any) => {
  const { currentRank } = props;
  return (
    <div className="mt-20">
      <div className="flex justify-between">
        <div className="flex flex-col text-4xl font-semibold">
          <span>Who win & Total Goals </span>
          <span> Leaderboard</span>
        </div>
        <RewardBanner
          reward={3600}
          winner="Top 30"
          redirectUrl="#"
          className="bg-green-200"
        />
      </div>
      <div className="mt-10">
        <span>
          Your current rank:{" "}
          <span className="font-semibold">#{currentRank}</span>
        </span>
        <input className="outline-none ml-10" placeholder="Search wallet" />
      </div>
      <div className="mt-3 border">
        <div
          className={clsx(
            "flex bg-gray-400 p-5 font-semibold",
            styles.tableRow,
          )}
        >
          {headingTable.map((heading) => (
            <div key={heading}>{heading}</div>
          ))}
        </div>

        {rankData.map((rank) => (
          <div
            key={rank.no}
            className={clsx(
              "flex px-5 py-2 border hover:bg-yellow-200",
              styles.tableRow,
            )}
          >
            <div>{rank.no}</div>
            <div>{rank.address}</div>
            <div>{rank.prize}</div>
            <div>{rank.earned}</div>
          </div>
        ))}
        <div></div>
      </div>
    </div>
  );
};

export default WhoWin;
