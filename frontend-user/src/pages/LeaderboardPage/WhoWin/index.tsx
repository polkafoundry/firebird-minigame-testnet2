import clsx from "clsx";
import queryString from "query-string";
import { useEffect, useState } from "react";
import InputSearch from "../../../components/base/InputSearch";
import { BASE_HREF, URLS } from "../../../constants";
import useFetch from "../../../hooks/useFetch";
import { useMyWeb3 } from "../../../hooks/useMyWeb3";
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

const WhoWin = () => {
  const { account } = useMyWeb3();

  const [searchWallet, setSearchWallet] = useState<string>("");
  const handleSearch = (e: any) => {
    setSearchWallet(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchWallet("");
  };

  const { data: leaderboardData, loading } = useFetch<any>(
    "/leaderboard?" +
      queryString.stringify({
        wallet_address: account,
        startTime: "2022-11-01T00:00:00.000Z",
        endTime: "2022-12-31T23:59:00.000Z",
      }),
  );

  useEffect(() => {
    console.log("leaderboardData :>> ", leaderboardData);
    // setStatistics((prev: StatisticTypes) => ({
    //   ...prev,
    //   current_rank: leaderboardData?.data?.position,
    // }));
  }, [leaderboardData]);

  return (
    <div className="mt-20">
      <HeadingPrimary
        backroundTitle="Total Goals"
        title="Who win & Total Goals"
      />
      <RewardBanner
        reward="$3,600"
        winner="Top 30"
        redirectUrl={BASE_HREF + URLS.HOME + "# reward-distribution"}
      />
      <div className="mt-10 font-inter flex justify-between items-center">
        <div className="flex items-baseline">
          {account ? (
            <>
              <span className="uppercase text-14/20 font-bold opacity-70">
                Your current rank:
              </span>
              <span className="font-semibold text-18/24 ml-2">
                #{leaderboardData?.data?.position}
              </span>
            </>
          ) : (
            <div className="uppercase text-14/20 font-semibold">
              Please connect wallet to see your rank
            </div>
          )}
        </div>
        <InputSearch
          className="rounded-md bg-[#292929] text-white w-[30%] max-w-[320px] px-3 py-1.5 ml-2"
          value={searchWallet}
          placeholder="Search wallet"
          onChange={handleSearch}
          isDarkMode={true}
          onClear={handleClearSearch}
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

        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            {!rankData || !rankData.length ? (
              <div>No has data</div>
            ) : (
              <>
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
              </>
            )}
          </>
        )}
        <div></div>
      </div>
    </div>
  );
};

export default WhoWin;
