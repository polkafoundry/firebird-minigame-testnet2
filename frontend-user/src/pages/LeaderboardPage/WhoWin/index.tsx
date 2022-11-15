import clsx from "clsx";
import queryString from "query-string";
import { useEffect, useState } from "react";
import Pagination from "../../../components/base/Pagination";
// import InputSearch from "../../../components/base/InputSearch";
import { BASE_HREF, URLS } from "../../../constants";
import useFetch from "../../../hooks/useFetch";
import { useMyWeb3 } from "../../../hooks/useMyWeb3";
import { displayWalletAddress } from "../../../utils";
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

const PAGE_LIMIT = 10;
const WhoWin = () => {
  const { account } = useMyWeb3();

  const [filter, setFilter] = useState<any>({
    page: 1,
    limit: 10,
    offset: 1,
  });
  // const [searchWallet, setSearchWallet] = useState<string>("");
  // const handleSearch = (e: any) => {
  //   setSearchWallet(e.target.value);
  // };

  // const handleClearSearch = () => {
  //   setSearchWallet("");
  // };
  const handleChangePage = (value: number) => {
    setFilter((prev: any) => ({
      ...prev,
      page: value,
      offset: (value - 1) * PAGE_LIMIT + 1,
      limit: value * PAGE_LIMIT,
    }));
  };

  useEffect(() => {
    console.log("filter :>> ", filter);
  }, [filter]);

  const { data, loading } = useFetch<any>(
    "/leaderboard?" +
      queryString.stringify({
        wallet_address: account,
        startTime: "2022-11-01T00:00:00.000Z",
        endTime: "2022-12-31T23:59:00.000Z",
        limit: filter?.limit,
        offset: filter?.offset,
      }),
  );

  const leaderboardData = data?.data;

  return (
    <div className="mt-20">
      <HeadingPrimary
        backroundTitle="Leaderboard"
        title="Who win & Total Goals"
      />
      <p className="text-18/32 font-inter text-center mb-3">
        Check out your place on LEADERBOARD
      </p>
      <RewardBanner
        reward="$3,600"
        winner="Top 30"
        redirectUrl={BASE_HREF + URLS.HOME + "# reward-distribution"}
        isLargeText={true}
      />
      <div className="mx-5 xs:mx-10 main:mx-[120px] px-5 xs:px-10 md:px-20 main:px-[180px] py-10 mt-10 font-inter bg-black text-white">
        <div className="flex justify-between items-center">
          <div className="flex items-baseline">
            {account ? (
              <>
                <span className="uppercase text-12/18 font-inter font-bold opacity-70">
                  Your current rank:
                </span>
                <span className="font-semibold font-tthoves text-4/20 ml-2">
                  #{data?.data?.position}
                </span>
              </>
            ) : (
              <div className="uppercase text-14/20 font-semibold">
                Please connect wallet to see your rank
              </div>
            )}
          </div>
          {/* <InputSearch
            className="rounded-md bg-[#292929] text-white w-[35%] max-w-[320px] px-3 py-1.5 ml-2"
            value={searchWallet}
            placeholder="Search wallet"
            onChange={handleSearch}
            isDarkMode={true}
            onClear={handleClearSearch}
          /> */}
        </div>
        <div className="mt-3">
          <div
            className={clsx(
              "flex items-center bg-[#1C1D21] px-[30px] py-3 text-12/18 font-bold uppercase rounded-t-[4px]",
              styles.tableRow,
            )}
          >
            {headingTable.map((heading) => (
              <div key={heading} className="opacity-70">
                {heading}
              </div>
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
                  {leaderboardData?.data.map((item: any) => (
                    <div
                      key={item?.position}
                      className={clsx(
                        "flex px-[30px] py-[10px] border-t-2 border-black bg-[#33363D] text-14/24 font-inter",
                        styles.tableRow,
                        [1, 2, 3].includes(item?.position) &&
                          styles.backgroundImage,
                      )}
                    >
                      <div
                        className={clsx(
                          [1, 2, 3].includes(item?.position) &&
                            "uppercase font-semibold",
                        )}
                      >
                        {[0, 1, 2, 3].includes(item?.position) && "Top "}
                        {item?.position}
                      </div>
                      <div>{displayWalletAddress(item?.userId)}</div>
                      <div>${item?.prize}</div>
                      <div>
                        {Math.floor(item?.sum_earned) === item?.sum_earned
                          ? item?.sum_earned
                          : Number(item?.sum_earned).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </>
              )}
              <Pagination
                className="justify-center mt-3"
                currentPage={filter?.page}
                totalCount={leaderboardData?.total_item}
                pageSize={PAGE_LIMIT}
                onPageChange={handleChangePage}
                isDarkMode
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default WhoWin;
