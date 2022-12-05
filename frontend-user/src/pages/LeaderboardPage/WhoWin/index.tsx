import clsx from "clsx";
import queryString from "query-string";
import { useState } from "react";
import DefaultLoading from "../../../components/base/DefaultLoading";
import NotFound from "../../../components/base/NotFound";
import Pagination from "../../../components/base/Pagination";
// import InputSearch from "../../../components/base/InputSearch";
import useFetch from "../../../hooks/useFetch";
import { useMyWeb3 } from "../../../hooks/useMyWeb3";
import { displayWalletAddress, formatCurrency } from "../../../utils";
import HeadingPrimary from "../../LandingPage/components/HeadingPrimary";
import RewardBanner from "../RewardBanner";
import styles from "./whoWin.module.scss";

const headingTable = ["No", "Wallet address", "Reward", "Earned $BIRD"];

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

  // useEffect(() => {
  //   console.log("filter :>> ", filter);
  // }, [filter]);

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
    <div className="">
      <HeadingPrimary
        backroundTitle="Leaderboard"
        title="Who win & Total Goals"
      />
      <p className="text-16/28 md:text-18/32 font-inter text-center mt-[-19px] md:mt-[-29px] mb-3">
        Check out your place on LEADERBOARD
      </p>
      <RewardBanner
        reward="$3,600"
        winner="Top 30"
        // redirectUrl={BASE_HREF + URLS.HOME + "#reward-distribution"}
        isLargeText={true}
      />
      <div
        className={clsx(
          "mx-5 py-5 mt-8 md:mt-10 font-inter bg-black text-white min-h-[350px]",
          "xs:p-10 xs:mx-10 md:px-20 main:px-[180px] main:mx-[120px]",
        )}
      >
        <div className="relative ">
          {!loading &&
          (!leaderboardData?.data || !leaderboardData?.data?.length) ? (
            <div className="flex flex-col justify-center items-center h-[300px]">
              <NotFound
                title="Upcoming matches will be updated soon."
                darkMode
              />
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center">
                <div className="flex items-baseline w-full justify-center md:justify-start">
                  {account ? (
                    <>
                      <span className="uppercase text-12/18 font-inter font-bold opacity-70">
                        Your current rank:
                      </span>
                      <span className="font-semibold font-tthoves text-14/20 ml-2">
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
                    "flex items-center bg-[#1C1D21] px-3 py-3 text-10/14 font-bold uppercase rounded-t-[4px]",
                    "md:px-[30px] md:text-12/18",
                    styles.tableRow,
                  )}
                >
                  {headingTable.map((heading) => (
                    <div key={heading} className="opacity-70">
                      {heading}
                    </div>
                  ))}
                </div>

                <div className="relative min-h-[300px]">
                  {loading && <DefaultLoading />}

                  {!loading && (
                    <>
                      {leaderboardData?.data.map((item: any) => (
                        <div
                          key={item?.position}
                          className={clsx(
                            "flex border-t-2 px-3 py-2.5 border-black bg-[#33363D] text-14/20 font-inter md:px-[30px]",
                            styles.tableRow,
                            [1, 2, 3].includes(item?.position) &&
                              styles.backgroundImage,
                          )}
                        >
                          <div
                            className={clsx(
                              [1, 2, 3].includes(item?.position) &&
                                "uppercase font-bold",
                            )}
                          >
                            {[1, 2, 3].includes(item?.position) && "Top "}
                            {item?.position}
                          </div>
                          <div>{displayWalletAddress(item?.userId)}</div>
                          <div>${item?.prize}</div>
                          <div>${formatCurrency(item?.sum_earned)}</div>
                        </div>
                      ))}
                    </>
                  )}
                </div>
                {!loading && (
                  <Pagination
                    className="justify-center mt-[22px] md:mt-3"
                    currentPage={filter?.page}
                    totalCount={10 * PAGE_LIMIT}
                    pageSize={PAGE_LIMIT}
                    onPageChange={handleChangePage}
                    isDarkMode
                  />
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default WhoWin;
