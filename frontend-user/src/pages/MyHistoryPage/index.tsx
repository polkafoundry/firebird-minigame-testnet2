import clsx from "clsx";
import { useEffect, useState } from "react";
import DropDown from "../../components/base/DropDown";
import Pagination from "../../components/base/Pagination";
import DefaultLayout from "../../components/layout/DefaultLayout";
import { HISTORY_NAV_VALUES } from "../../constants";
import { useMyWeb3 } from "../../hooks/useMyWeb3";
import usePost from "../../hooks/usePost";
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

const fakeStatsWhoWin = {
  prediction_times: "04",
  correct_answers: "02",
  win_rate: "50.00%",
  earned: "2,075",
  current_rank: "#10",
};

const fakeStatsMatchScore = {
  prediction_times: "06",
  correct_answers: "04",
  win_rate: "66,67%",
  win_whitelist: "02",
  earned: "$40",
};

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
    "Date-time",
    "Result",
    "Deposited",
    "Earned",
    "Amount to claim",
    "Claim",
  ],
};

// const whoWin = {
//   headings: [
//     "Match",
//     "Question",
//     "Answer",
//     "Date-time",
//     "Result",
//     "Deposited",
//     "Earned",
//     "Amount to claim",
//     "Claim",
//   ],
//   data: [
//     {
//       id: 1,
//       team1: { name: "Quatar", icon: "/images/icon-qatar.svg" },
//       team2: { name: "Ecuador", icon: "/images/icon-ecuador.svg" },
//       question: "Who win 1st half",
//       answer: "Quatar",
//       datetime: "2022/11/20 15:23",
//       result: true,
//       deposited: "100",
//       earned: "872",
//       amount: "972",
//       isClaimed: false,
//     },
//     {
//       id: 2,
//       team1: { name: "Quatar", icon: "/images/icon-qatar.svg" },
//       team2: { name: "Ecuador", icon: "/images/icon-ecuador.svg" },
//       question: "Who win 1st half",
//       answer: "Quatar",
//       datetime: "2022/11/20 15:23",
//       result: false,
//       deposited: "200",
//       earned: "0",
//       amount: "0",
//       isClaimed: false,
//     },
//     {
//       id: 3,
//       team1: { name: "Quatar", icon: "/images/icon-qatar.svg" },
//       team2: { name: "Ecuador", icon: "/images/icon-ecuador.svg" },
//       question: "Who win 1st half",
//       answer: "Quatar",
//       datetime: "2022/11/20 15:23",
//       result: true,
//       deposited: "100",
//       earned: "872",
//       amount: "972",
//       isClaimed: true,
//     },
//     {
//       id: 4,
//       team1: { name: "Quatar", icon: "/images/icon-qatar.svg" },
//       team2: { name: "Ecuador", icon: "/images/icon-ecuador.svg" },
//       question: "Who win 1st half",
//       answer: "Quatar",
//       datetime: "2022/11/20 15:23",
//       result: false,
//       deposited: "500",
//       earned: "0",
//       amount: "0",
//       isClaimed: false,
//     },
//   ],
// };

type FilterTypes = {
  result: string;
  claimed: string;
  search: string;
};

const resultOptions = [
  { label: "Result: All", value: 0 },
  { label: "Result: 1", value: 1 },
  { label: "Result: 2", value: 2 },
];
const claimedOptions = [
  { label: "Claimed: All", value: 0 },
  { label: "Claimed: 1", value: 1 },
  { label: "Claimed: 2", value: 2 },
];

const MyHistoryPage = () => {
  const { account } = useMyWeb3();
  const [dataTable, setDataTable] = useState<any>([]);
  const [navActived, setNavActived] = useState<
    typeof HISTORY_NAV_VALUES[keyof typeof HISTORY_NAV_VALUES]
  >(HISTORY_NAV_VALUES.GOALS);

  const { response, loading } = usePost<any>(
    "/predict/get-predict-history",
    {
      address: account,
    },
    !!account,
  );

  useEffect(() => {
    if (!response) return;

    if (response?.status !== 200) {
      console.log("ERR get predict history: ", response?.message);
    } else {
      const newDataTable = response.data.map((item: any) => ({
        ...item,
        team1: { name: "Quatar", icon: "/images/icon-qatar.svg" },
        team2: { name: "Ecuador", icon: "/images/icon-ecuador.svg" },
        result: true,
        winWhitelist: false,
        earnedReward: "0",
      }));

      setDataTable(newDataTable);
    }
  }, [response]);

  const [filter, setFilter] = useState<FilterTypes>({
    claimed: "",
    result: "",
    search: "",
  });
  const [resultSelected, setResultSelected] = useState<number>();
  const [claimSelected, setClaimSelected] = useState<number>();
  const [currentPage, setCurrentPage] = useState<number>(1);

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
      <div className="flex flex-col items-center mb-10 pt-40">
        <div className="flex flex-col mx-auto max-w-[1240px] w-full">
          <div className="w-full p-9 border-[1px] rounded-lg border-gray-400">
            <span className="text-4xl font-semibold">Prediction History</span>

            <div className="flex flex-col p-5">
              <div className="flex mt-8 border-gray-100 border-b-[1px]">
                {nav.map((item: NavItemTypes) => (
                  <div
                    key={item.value}
                    className={clsx("cursor-pointer px-4 py-2 text-gray-400", {
                      "border-b-2 border-black text-black font-semibold":
                        navActived === item.value,
                    })}
                    onClick={() => setNavActived(item.value)}
                  >
                    {item.label}
                  </div>
                ))}
              </div>

              <Statistics
                data={
                  navActived === HISTORY_NAV_VALUES.GOALS
                    ? fakeStatsWhoWin
                    : fakeStatsMatchScore
                }
                navActived={navActived}
              />

              <div className="flex items-center mt-10">
                <div className="flex  w-full justify-between items-baseline">
                  <span className="text-lg font-semibold">Prediction List</span>
                  <div>
                    <DropDown
                      label="Result"
                      items={resultOptions}
                      selectedValue={resultSelected}
                      onChange={handleChangeResult}
                      className="w-[160px] rounded-xl border"
                      itemsClassName="rounded-xl"
                      bgColor="black"
                    />
                    <DropDown
                      label="Claimed"
                      items={claimedOptions}
                      selectedValue={claimSelected}
                      onChange={handleChangeClaim}
                      className="w-[160px] rounded-xl border ml-5"
                      itemsClassName="rounded-xl"
                      bgColor="black"
                    />
                  </div>
                </div>

                <div className="flex rounded-md bg-black w-[180px] px-4 py-2 ml-5">
                  <input
                    type="text"
                    name="search"
                    placeholder="Search match"
                    className="outline-none bg-transparent min-w-0 flex-1 text-white"
                    value={filter.search}
                    onChange={handleFilter}
                  />
                  <img src="/images/icon-search.svg" alt="" />
                </div>
              </div>

              <div className="flex">
                {loading && <div>loading</div>}
                {!loading && account && (
                  <HistoryTable
                    headings={
                      navActived === HISTORY_NAV_VALUES.GOALS
                        ? headings.matchScore
                        : headings.whoWin
                    }
                    dataTable={dataTable}
                    tableLoading={false}
                    isWhoWinTable={navActived !== HISTORY_NAV_VALUES.GOALS}
                  />
                )}
                {!loading && !account && (
                  <div>Please connect wallet to see prediction list</div>
                )}
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
