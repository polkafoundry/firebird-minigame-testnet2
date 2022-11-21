import clsx from "clsx";
import queryString from "query-string";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import DropDown from "../../components/base/DropDown";
import NotFound from "../../components/base/NotFound";
// import InputSearch from "../../components/base/InputSearch";
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
import { getMyHistory } from "../../requests/getMyHistory";
import { convertHexToStringNumber } from "../../utils";
import HeadingPrimary from "../LandingPage/components/HeadingPrimary";
import HistoryTable from "./HistoryTable";
import HowToJoin from "./HowToJoin";
import Statistics from "./Statistic";

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
const InitState = {
  statistics: {
    prediction_times: 0,
    correct_answers: 0,
    win_rate: 0,
    earned: 0,
    win_whitelist: 0,
  },
  filter: {
    claimed: claimedOptions[0].value,
    result: resultOptions[0].value,
    search: "",
    page: 1,
  },
};

const PAGE_LIMIT = 10;
const MyHistoryPage = () => {
  const { account } = useMyWeb3();
  const [dataTable, setDataTable] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [statistics, setStatistics] = useState<StatisticTypes>(
    InitState.statistics,
  );
  const [currentRank, setCurrentRank] = useState<number>(0);
  const [filter, setFilter] = useState<FilterTypes>(InitState.filter);

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
    setCurrentRank(
      account &&
        leaderboardData?.data?.data &&
        leaderboardData?.data?.data?.length
        ? leaderboardData?.data?.position
        : 0,
    );
  }, [leaderboardData]);

  const handleChangeResult = (value: any) => {
    setFilter((prev: FilterTypes) => ({
      ...prev,
      result: value,
      page: 1,
    }));
  };
  const handleChangeClaim = (value: any) => {
    setFilter((prev: FilterTypes) => ({
      ...prev,
      claimed: value,
      page: 1,
    }));
  };

  const handleChangeTab = (value: any) => {
    setNavActived(value);
    setStatistics(InitState.statistics);
    setFilter(InitState.filter);
  };

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(async () => {
      if (!account) return;
      const uri =
        navActived === HISTORY_NAV_VALUES.GOALS
          ? "/betting/history"
          : "/predict/history";
      const params = {
        page: filter?.page,
        limit: PAGE_LIMIT,
        address: account,
        result: filter?.result,
        is_claim: filter?.claimed,
      };

      try {
        const res = await getMyHistory(uri, params);
        setLoading(false);
        // console.log("getMyHistory: ", res);
        if (res?.status !== 200) {
          toast.error(res?.message || "Fail to load history");
          return;
        }

        const resData = res?.data || {};

        const newStatistics = {
          prediction_times: resData?.total,
          correct_answers: resData?.wins,
          win_rate: resData?.wins
            ? ((resData?.wins / resData?.total) * 100).toFixed(2) + "%"
            : "0%",
          earned: resData?.earnedToken
            ? convertHexToStringNumber(resData?.earnedToken)
            : "0",
          win_whitelist: resData?.finalWinner,
        };

        setStatistics(newStatistics);
        setTotalCount(resData?.bettings?.meta?.total);
        setDataTable(resData?.bettings?.data || resData?.predicts?.data);
      } catch (error: any) {
        toast.error(error?.message || "Fail to load history");
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [filter, account, navActived]);

  // const handleSearch = (e: any) => {
  //   setFilter((prevFilter: FilterTypes) => ({
  //     ...prevFilter,
  //     [e.target.name]: e.target.value,
  //   }));
  // };

  const handleChangePage = (value: number) => {
    setFilter((prevFilter: FilterTypes) => ({
      ...prevFilter,
      page: value,
    }));
  };

  const renderFilter = () => {
    return (
      <div className="flex items-center mt-5 bg-[#F2F2F2]">
        <div className="flex flex-col sm:flex-row w-full justify-between items-start">
          <div className="title-background">Prediction List</div>
          <div className="flex flex-col items-start ml-5 sm:items-end lg:flex-row mt-2 sm:mt-4 pr-5">
            <div className="flex">
              <div>
                <span className="text-14/20 font-semibold">Predicted</span>
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
                  <span className="text-14/20 font-semibold">Claimed</span>
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
            {/* <div className="sm:ml-4 flex items-center mt-2 lg:mt-0">
              <span className="text-14/20 font-semibold">Search</span>
              <InputSearch
                className="rounded-md bg-white w-[272px] px-3 py-1.5 ml-2"
                value={filter.search}
                onChange={handleSearch}
                placeholder="Search match"
              />
            </div> */}
          </div>
        </div>
      </div>
    );
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

            <div className="flex flex-col mt-[-14px] md:mt-[-4px]">
              <div className="flex border-[#F2F2F2] border-b-[1px] space-x-14 font-tthoves">
                {nav.map((item: NavItemTypes) => (
                  <div
                    key={item.value}
                    className={clsx(
                      "cursor-pointer py-2 font-semibold text-16/20",
                      navActived === item.value
                        ? "border-b-2 border-main text-main opacity-100 pointer-events-none"
                        : "opacity-50",
                    )}
                    onClick={() => handleChangeTab(item.value)}
                  >
                    {item.label}
                  </div>
                ))}
              </div>

              <Statistics
                data={statistics}
                currentRank={currentRank}
                navActived={navActived}
              />

              <div className="overflow-x-auto">
                {renderFilter()}

                <div className="bg-[#F2F2F2] px-5 pt-2 pb-10">
                  {dataTable?.length === 0 && !loading ? (
                    <div className="flex flex-col items-center w-full pt-14 pb-4 px-10">
                      <NotFound title="You haven’t predicted any matches" />

                      <a
                        href={BASE_HREF + URLS.HOME + "#match-list"}
                        className="min-w-[255px] w-[30%] mt-10 btn-rounded btn-primary"
                      >
                        Predict Now
                      </a>
                    </div>
                  ) : !account ? (
                    <div>Please connect wallet to see prediction list</div>
                  ) : (
                    <>
                      <HistoryTable
                        headings={
                          navActived === HISTORY_NAV_VALUES.GOALS
                            ? headings.whoWin
                            : headings.matchScore
                        }
                        dataTable={dataTable}
                        tableLoading={loading}
                        isWhoWinTable={navActived === HISTORY_NAV_VALUES.GOALS}
                        account={account}
                      />
                      <Pagination
                        className="justify-center mt-10"
                        currentPage={filter.page}
                        totalCount={totalCount}
                        pageSize={PAGE_LIMIT}
                        onPageChange={handleChangePage}
                      />
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
