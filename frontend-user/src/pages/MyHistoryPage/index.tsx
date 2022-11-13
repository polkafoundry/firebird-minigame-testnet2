import clsx from "clsx";
import { useEffect, useMemo, useState } from "react";
import DropDown from "../../components/base/DropDown";
import Pagination from "../../components/base/Pagination";
import DefaultLayout from "../../components/layout/DefaultLayout";
import { BETTING_RESULT, HISTORY_NAV_VALUES } from "../../constants";
import { useMyWeb3 } from "../../hooks/useMyWeb3";
import usePost from "../../hooks/usePost";
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
    // "Date-time",
    "Result",
    "Deposited ($BIRD)",
    "Earned ($BIRD)",
    "Amount to claim ($BIRD)",
    "Claim",
  ],
};

type FilterTypes = {
  result: string;
  claimed: string;
  search: string;
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

const MyHistoryPage = () => {
  const { account } = useMyWeb3();
  const [dataTable, setDataTable] = useState<any>([]);
  const [statistics, setStatistics] = useState<any>({});
  const [filter, setFilter] = useState<FilterTypes>({
    claimed: "",
    result: "",
    search: "",
  });
  const [resultSelected, setResultSelected] = useState<any>(
    resultOptions[0].value,
  );
  const [claimSelected, setClaimSelected] = useState<any>(
    claimedOptions[0].value,
  );
  const [currentPage, setCurrentPage] = useState<number>(1);

  const [navActived, setNavActived] = useState<
    typeof HISTORY_NAV_VALUES[keyof typeof HISTORY_NAV_VALUES]
  >(HISTORY_NAV_VALUES.GOALS);

  const shouldLoadPredictInfo = useMemo(() => {
    return !!account && resultSelected && claimSelected;
  }, [account, resultSelected, claimSelected]);

  const { response, loading } = usePost<any>(
    navActived === HISTORY_NAV_VALUES.GOALS
      ? "/betting/history"
      : "/predict/history",
    {
      page: currentPage,
      limit: 10,
      address: account,
      result: resultSelected,
      is_claim: claimSelected,
    },
    shouldLoadPredictInfo,
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
        win_rate: ((resData.wins / resData.total) * 100).toFixed(2) + "%",
        earned: resData.earnedToken
          ? convertHexToStringNumber(resData.earnedToken)
          : "Updating...",
        current_rank: "Updating...",
        win_whitelist: resData.finalWinner,
      };

      setDataTable(resData?.bettings?.data || resData?.predicts?.data);
      setStatistics(newStatistics);
    }
  }, [response]);

  const handleChangeResult = (value: any) => {
    setResultSelected(value);
  };
  const handleChangeClaim = (value: any) => {
    setClaimSelected(value);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("fetch new history", filter);
    }, 500);
    return () => clearTimeout(timer);
  }, [filter]);

  const handleFilter = (e: any) => {
    setFilter((prevFilter: FilterTypes) => ({
      ...prevFilter,
      [e.target.name]: e.target.value,
    }));
  };

  const handleChangePage = (value: number) => {
    setCurrentPage(value);
  };

  return (
    <DefaultLayout>
      <div className="flex flex-col items-center pt-20 px-5 xs:px-10 md:px-20 relative">
        <div className="absolute top-20 right-0">
          <img src="./images/history/top.svg" alt="" />
        </div>
        <div className="z-10 flex flex-col mx-auto w-full max-w-screen-main pt-[60px] md:pt-20">
          <div className="w-full">
            <HeadingPrimary
              backroundTitle="History"
              title="prediction history"
              textAlign="text-left"
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
                  <div className="flex w-full justify-between items-start">
                    <div className="title-background">Prediction List</div>
                    <div className="flex flex-col items-end lg:flex-row mt-4 pr-5">
                      <div className="flex ">
                        <div>
                          <span className="text-14/20 font-semibold">
                            Predicted
                          </span>
                          <DropDown
                            label="Predicted"
                            items={resultOptions}
                            selectedValue={resultSelected}
                            onChange={handleChangeResult}
                            className="w-[110px] ml-2 text-14/24"
                            itemsClassName=""
                            bgColor="white"
                          />
                        </div>
                        <div className="ml-4">
                          <span className="text-14/20 font-semibold">
                            Status
                          </span>
                          <DropDown
                            label="Status"
                            items={claimedOptions}
                            selectedValue={claimSelected}
                            onChange={handleChangeClaim}
                            className="w-[110px] ml-2 text-14/24"
                            itemsClassName=""
                            bgColor="white"
                          />
                        </div>
                      </div>
                      <div className="ml-4 flex items-center mt-2 lg:mt-0">
                        <span className="text-14/20 font-semibold">Search</span>
                        <div className="flex rounded-md bg-white w-[272px] px-3 py-1.5 ml-2">
                          <input
                            type="text"
                            name="search"
                            placeholder="Search match"
                            className="outline-none bg-transparent min-w-0 flex-1 text-black"
                            value={filter.search}
                            onChange={handleFilter}
                          />
                          <img src="/images/icon-search.svg" alt="" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex bg-[#F2F2F2] px-5 pt-2 pb-10">
                  {loading && <div>loading</div>}
                  {!loading && account && (
                    <HistoryTable
                      headings={
                        navActived === HISTORY_NAV_VALUES.GOALS
                          ? headings.whoWin
                          : headings.matchScore
                      }
                      dataTable={dataTable}
                      tableLoading={false}
                      isWhoWinTable={navActived === HISTORY_NAV_VALUES.GOALS}
                      account={account}
                    />
                  )}
                  {!loading && !account && (
                    <div>Please connect wallet to see prediction list</div>
                  )}
                </div>
              </div>

              <Pagination
                className="justify-center mt-10"
                currentPage={currentPage}
                totalCount={100}
                pageSize={5}
                onPageChange={handleChangePage}
              />
            </div>
          </div>

          <HowToJoin />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default MyHistoryPage;
