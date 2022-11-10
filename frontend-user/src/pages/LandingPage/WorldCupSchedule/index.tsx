import clsx from "clsx";
import moment from "moment";
import { useEffect, useState } from "react";
import { API_BASE_LOGO_TEAM, rounds } from "../../../constants";
import useFetch from "../../../hooks/useFetch";
import { useMyWeb3 } from "../../../hooks/useMyWeb3";
import { groupArrayById } from "../../../utils";
import HeadingPrimary from "../components/HeadingPrimary";
import MatchListRight from "./MatchListRight";
import MatchListTable from "./MatchListTable";
import Schedule from "./Schedule";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const queryString = require("query-string");

export type FilterTypes = {
  predicted: number;
  status: string;
  page: number;
  size: number;
  round_name: typeof rounds[keyof typeof rounds];
  wallet_address: string;
};

const WorldCupSchedule = () => {
  const { account, isWrongChain } = useMyWeb3();

  const [selectedMatchId, setSelectedMatchId] = useState<number | undefined>(1);
  const [dataTable, setDataTable] = useState<any[]>([]);
  const [filter, setFilter] = useState<FilterTypes>({
    predicted: 0,
    status: "",
    page: 1,
    size: 20,
    wallet_address: "",
    round_name: rounds[0].value,
  });

  const { data, loading } = useFetch<any>(
    "/match/get-list-match?" + queryString.stringify({ ...filter }),
  );

  useEffect(() => {
    const rawData = data?.data?.data.map((item: any) => {
      return {
        ...item,
        dateString: moment(new Date(item?.start_time * 1000)).format(
          "MMM DD - dddd",
        ),
        homeTeam: {
          name: item?.home_name,
          icon: API_BASE_LOGO_TEAM + item?.home_icon + ".png",
        },
        awayTeam: {
          name: item?.away_name,
          icon: API_BASE_LOGO_TEAM + item?.away_icon + ".png",
        },
      };
    });
    const groupData = groupArrayById(rawData, "dateString");

    const newTableData = [];
    for (const [key, value] of Object.entries(groupData)) {
      newTableData.push({
        date: key,
        matches: value,
      });
    }
    setDataTable(newTableData);
  }, [data]);

  useEffect(() => {
    if (!account) return;

    setFilter((prevFilter: FilterTypes) => ({
      ...prevFilter,
      wallet_address: account,
    }));
  }, [account]);

  const handleChangePredicted = (value: any) => {
    setFilter((prevFilter: FilterTypes) => ({
      ...prevFilter,
      predicted: value,
    }));
  };

  const handleChangeStatus = (value: any) => {
    setFilter((prevFilter: FilterTypes) => ({
      ...prevFilter,
      status: value,
    }));
  };

  const handleSelectMatch = (id: number) => {
    setSelectedMatchId(id);
  };

  return (
    <div className="flex flex-col py-20 mt-10">
      <Schedule />
      <HeadingPrimary title="Match List" />
      <div className="max-w-screen-main mx-auto w-full">
        <div className={clsx("flex flex-col mt-5 relative", "md:flex-row")}>
          <div
            className={clsx("w-full h-fit", "md:w-[44%] md:sticky md:top-10")}
          >
            <MatchListTable
              selectedMatchId={selectedMatchId}
              handleSelectMatch={handleSelectMatch}
              dataTable={dataTable}
              loading={loading}
              filter={filter}
              setFilter={setFilter}
              handleChangePredicted={handleChangePredicted}
              handleChangeStatus={handleChangeStatus}
            />
          </div>
          <div className="w-full md:w-[56%]">
            <MatchListRight
              account={account}
              isWrongChain={isWrongChain}
              matchId={selectedMatchId}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorldCupSchedule;
