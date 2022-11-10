import clsx from "clsx";
import moment from "moment";
import { useEffect, useState } from "react";
import DropDown from "../../../components/base/DropDown";
import { API_BASE_LOGO_TEAM } from "../../../constants";
import useFetch from "../../../hooks/useFetch";
import { useMyWeb3 } from "../../../hooks/useMyWeb3";
import { groupArrayById } from "../../../utils";
import HeadingPrimary from "../components/HeadingPrimary";
import MatchListRight from "./MatchListRight";
import MatchListTable from "./MatchListTable";
import Schedule from "./Schedule";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const queryString = require("query-string");

type FilterTypes = {
  predicted: number;
  status: number;
  page: number;
  size: number;
  round_name: number;
  wallet_address: string;
};

const WorldCupSchedule = () => {
  const { account } = useMyWeb3();

  const [selectedMatchId, setSelectedMatchId] = useState<number | undefined>();
  const [dataTable, setDataTable] = useState<any[]>([]);
  const [filter, setFilter] = useState<FilterTypes>({
    predicted: 0,
    status: 0,
    page: 1,
    size: 20,
    wallet_address: "",
    round_name: 15,
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
        // TODO: pairing with api
        groupRound: "Round 1:",
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
              handleChangePredicted={handleChangePredicted}
              handleChangeStatus={handleChangeStatus}
            />
          </div>
          <div className="w-full md:w-[56%]">
            <MatchListRight account={account} matchId={selectedMatchId} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorldCupSchedule;
