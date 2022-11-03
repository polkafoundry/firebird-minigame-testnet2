import clsx from "clsx";
import { useEffect, useState } from "react";
import Button from "../../components/base/Button";
import DefaultLayout from "../../components/layout/DefaultLayout";
import { quickGuide } from "../../constants";
import HistoryTable from "./HistoryTable";
import HowToJoin from "./HowToJoin";

const valueNav = {
  GOALS: 1,
  MATCH_SCORE: 2,
};
type NavItemTypes = {
  label: string;
  value: typeof valueNav[keyof typeof valueNav];
};
const nav = [
  { label: "Who win & Total goals", value: valueNav.GOALS },
  { label: "Match score", value: valueNav.MATCH_SCORE },
];

const fakeStats = {
  prediction_times: "04",
  correct_answers: "02",
  win_rate: "50.00%",
  earned: "2,075",
  current_rank: "#10",
};

type FilterTypes = {
  result: string;
  claimed: string;
  search: string;
};

const MyHistoryPage = () => {
  const [navActived, setNavActived] = useState<
    typeof valueNav[keyof typeof valueNav]
  >(valueNav.GOALS);
  const [filter, setFilter] = useState<FilterTypes>({
    claimed: "",
    result: "",
    search: "",
  });

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

              <div className="grid grid-cols-5 gap-7 mt-10">
                {Object.entries(fakeStats).map(([key, value]: any) => (
                  <div
                    key={key}
                    className="flex flex-col bg-gray-100 rounded-md min-h-[80px] justify-center items-center"
                  >
                    <span className="">{key}</span>
                    <span className="text-xl font-semibold">{value}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center mt-10">
                <span className="text-lg font-semibold">Prediction List</span>

                <div className="flex ml-auto gap-5">
                  <div className="flex rounded-md bg-gray-500">
                    <input
                      type="text"
                      name="search"
                      placeholder="Search match"
                      value={filter.search}
                      onChange={handleFilter}
                    />
                  </div>
                </div>
              </div>

              <div className="flex">
                <HistoryTable data={[]} tableLoading={false} />
              </div>
            </div>
          </div>

          <HowToJoin />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default MyHistoryPage;
