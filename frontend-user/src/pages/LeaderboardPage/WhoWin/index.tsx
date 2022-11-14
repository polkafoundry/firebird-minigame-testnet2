import clsx from "clsx";
import React, { useState } from "react";
import InputSearch from "../../../components/base/InputSearch";
import HeadingPrimary from "../../LandingPage/components/HeadingPrimary";
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
  const [filter, setSearch] = useState<any>();
  const handleSearch = (e: any) => {
    setSearch(e.target.value);
  };

  return (
    <div className="mt-20">
      <HeadingPrimary
        backroundTitle="Total Goals"
        title="Who win & Total Goals"
      />
      <RewardBanner reward="$3,600" winner="Top 30" redirectUrl="#" />
      <div className="mt-10">
        <span>
          Your current rank:{" "}
          <span className="font-semibold">#{currentRank}</span>
        </span>
        <InputSearch
          className="flex rounded-md bg-white w-[272px] px-3 py-1.5 ml-2"
          value={filter.search}
          onChange={handleSearch}
        />
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
