import clsx from "clsx";
import { useEffect, useState } from "react";
import DropDown from "../../components/base/DropDown";
import Pagination from "../../components/base/Pagination";
import DefaultLayout from "../../components/layout/DefaultLayout";
import {
  BASE_HREF,
  BETTING_RESULT,
  HISTORY_NAV_VALUES,
  URLS,
} from "../../constants";
import useFetch from "../../hooks/useFetch";
import { useMyWeb3 } from "../../hooks/useMyWeb3";
import usePost from "../../hooks/usePost";
import { convertHexToStringNumber } from "../../utils";
import HeadingPrimary from "../LandingPage/components/HeadingPrimary";
import HistoryTable from "./HistoryTable";
import HowToJoin from "./HowToJoin";
import Statistics from "./Statistic";
import queryString from "query-string";
import InputSearch from "../../components/base/InputSearch";

type NavItemTypes = {
  label: string;
  value: typeof HISTORY_NAV_VALUES[keyof typeof HISTORY_NAV_VALUES];
};
const nav = [
  { label: "Who win & Total goals", value: HISTORY_NAV_VALUES.GOALS },
  { label: "Match score", value: HISTORY_NAV_VALUES.MATCH_SCORE },
];

const headings = {
  matchScore: [
    "Match",
    "Answer",
    "Date-time",
    "Result",
    "Win whitelist",
    "Earned rewards",
  ],
  whoWin: [
    "Match",
    "Question",
    "Answer",
    "Result",
    "Deposited ($BIRD)",
    "Earned ($BIRD)",
    "Amount to claim ($BIRD)",
    "Claim",
  ],
};

type FilterTypes = {
  result: string | undefined;
  claimed: boolean | undefined;
  search: string;
  page: number;
};

type StatisticTypes = {
  prediction_times: any;
  correct_answers: any;
  win_rate: any;
  earned: any;
  current_rank?: any;
  win_whitelist: any;
  total?: any;
};

const resultOptions = [
  { label: "All", value: undefined },
  { label: "Win", value: BETTING_RESULT.WIN },
  { label: "Draw", value: BETTING_RESULT.DRAW },
  { label: "Lose", value: BETTING_RESULT.LOSE },
];
const claimedOptions = [
  { label: "All", value: undefined },
  { label: "Yes", value: true },
  { label: "No", value: false },
];

const PAGE_LIMIT = 10;
const MyHistoryPage = () => {
  const { account } = useMyWeb3();
  const [dataTable, setDataTable] = useState<any>([]);
  const [statistics, setStatistics] = useState<StatisticTypes>({
    prediction_times: 0,
    correct_answers: 0,
    win_rate: 0,
    earned: 0,
    win_whitelist: 0,
  });
  const [filter, setFilter] = useState<FilterTypes>({
    claimed: claimedOptions[0].value,
    result: resultOptions[0].value,
    search: "",
    page: 1,
  });

  const [navActived, setNavActived] = useState<
    typeof HISTORY_NAV_VALUES[keyof typeof HISTORY_NAV_VALUES]
  >(HISTORY_NAV_VALUES.GOALS);

  const { data: leaderboardData } = useFetch<any>(
    "/leaderboard?" +
      queryString.stringify({
        wallet_address: account,
        startTime: "2022-11-01T00:00:00.000Z",
        endTime: "2022-12-31T23:59:00.000Z",
      }),
  );

  useEffect(() => {
    setStatistics((prev: StatisticTypes) => ({
      ...prev,
      current_rank: leaderboardData?.data?.position,
    }));
  }, [leaderboardData]);

  // const shouldLoadPredictInfo = useMemo(() => {
  //   return !!account && filter.result && filter.claimed;
  // }, [account, filter.result, filter.claimed]);

  const { response, loading } = usePost<any>(
    navActived === HISTORY_NAV_VALUES.GOALS
      ? "/betting/history"
      : "/predict/history",
    {
      page: filter.page,
      limit: PAGE_LIMIT,
      address: account,
      result: filter.result,
      is_claim: filter.claimed,
    },
    !!account,
  );

  useEffect(() => {
    if (!response) return;

    if (response?.status !== 200) {
      console.log("ERR get predict history: ", response?.message);
    } else {
      const resData = response.data;

      const newStatistics = {
        prediction_times: resData.total,
        correct_answers: resData.wins,
        win_rate: resData.wins
          ? ((resData.wins / resData.total) * 100).toFixed(2) + "%"
          : "0%",
        earned: resData.earnedToken
          ? convertHexToStringNumber(resData.earnedToken)
          : "0",
        win_whitelist: resData.finalWinner,
      };

      setDataTable(resData?.bettings?.data || resData?.predicts?.data);
      setStatistics(newStatistics);
    }
  }, [response]);

  const handleChangeResult = (value: any) => {
    setFilter((prev: FilterTypes) => ({
      ...prev,
      result: value,
    }));
  };
  const handleChangeClaim = (value: any) => {
    setFilter((prev: FilterTypes) => ({
      ...prev,
      claimed: value,
    }));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("fetch new history", filter);
    }, 500);
    return () => clearTimeout(timer);
  }, [filter]);

  const handleSearch = (e: any) => {
    setFilter((prevFilter: FilterTypes) => ({
      ...prevFilter,
      [e.target.name]: e.target.value,
    }));
    console.log("filter", filter);
  };

  const handleChangePage = (value: number) => {
    setFilter((prevFilter: FilterTypes) => ({
      ...prevFilter,
      page: value,
    }));
  };

  return (
    <DefaultLayout>
      <div className="flex flex-col items-center pt-20 pb-40 px-5 xs:px-10 md:px-20 relative">
        <div className="absolute top-20 right-0">
          <img src="./images/history/top.svg" alt="" />
        </div>
        <div className="z-10 flex flex-col mx-auto w-full max-w-screen-main pt-[60px] md:pt-20">
          <div className="w-full">
            <HeadingPrimary
              backroundTitle="History"
              title="prediction history"
            />

            <div className="flex flex-col mt-6">
              <div className="flex border-[#F2F2F2] border-b-[1px] space-x-14 font-tthoves">
                {nav.map((item: NavItemTypes) => (
                  <div
                    key={item.value}
                    className={clsx(
                      "cursor-pointer py-2 font-semibold",
                      navActived === item.value
                        ? "border-b-2 border-main text-main opacity-100"
                        : "opacity-50",
                    )}
                    onClick={() => setNavActived(item.value)}
                  >
                    {item.label}
                  </div>
                ))}
              </div>

              <Statistics data={statistics} navActived={navActived} />

              <div className="overflow-x-auto">
                <div className="flex items-center mt-10 bg-[#F2F2F2]">
                  <div className="flex flex-col sm:flex-row w-full justify-between items-start">
                    <div className="title-background">Prediction List</div>
                    <div className="flex flex-col items-start ml-5 sm:items-end lg:flex-row mt-4 pr-5">
                      <div className="flex">
                        <div>
                          <span className="text-14/20 font-semibold">
                            Predicted
                          </span>
                          <DropDown
                            label="Predicted"
                            items={resultOptions}
                            selectedValue={filter.result}
                            onChange={handleChangeResult}
                            className="w-[110px] ml-2 text-14/24"
                            itemsClassName=""
                            bgColor="white"
                          />
                        </div>
                        {navActived === HISTORY_NAV_VALUES.GOALS && (
                          <div className="ml-4">
                            <span className="text-14/20 font-semibold">
                              Claimed
                            </span>
                            <DropDown
                              label="Claimed"
                              items={claimedOptions}
                              selectedValue={filter.claimed}
                              onChange={handleChangeClaim}
                              className="w-[110px] ml-2 text-14/24"
                              itemsClassName=""
                              bgColor="white"
                            />
                          </div>
                        )}
                      </div>
                      <div className="sm:ml-4 flex items-center mt-2 lg:mt-0">
                        <span className="text-14/20 font-semibold">Search</span>
                        <InputSearch
                          className="rounded-md bg-white w-[272px] px-3 py-1.5 ml-2"
                          value={filter.search}
                          onChange={handleSearch}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-[#F2F2F2] px-5 pt-2 pb-10">
                  {loading && <div>Loading...</div>}
                  {!loading && (
                    <>
                      {!dataTable || !dataTable.length ? (
                        <div className="flex flex-col items-center w-full pt-14 pb-4 px-10">
                          <img
                            src="./images/icon-not-found.svg"
                            alt=""
                            className="w-[125px] h-[125px]"
                          />
                          <p>You haven’t predicted any matches</p>
                          <a
                            href={BASE_HREF + URLS.HOME + "#prediction-rule"}
                            className="min-w-[255px] w-[30%] mt-10 btn-rounded btn-primary"
                          >
                            Prediction Now
                          </a>
                        </div>
                      ) : (
                        <>
                          {!account && (
                            <div>
                              Please connect wallet to see prediction list
                            </div>
                          )}
                          {account && (
                            <HistoryTable
                              headings={
                                navActived === HISTORY_NAV_VALUES.GOALS
                                  ? headings.whoWin
                                  : headings.matchScore
                              }
                              dataTable={dataTable}
                              tableLoading={false}
                              isWhoWinTable={
                                navActived === HISTORY_NAV_VALUES.GOALS
                              }
                              account={account}
                            />
                          )}

                          {account && (
                            <Pagination
                              className="justify-center mt-10"
                              currentPage={filter.page}
                              totalCount={500}
                              pageSize={PAGE_LIMIT}
                              onPageChange={handleChangePage}
                            />
                          )}
                        </>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          <HowToJoin />
        </div>
        <div className="absolute bottom-0 left-0">
          <img src="./images/history/footer.svg" alt="" />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default MyHistoryPage;
