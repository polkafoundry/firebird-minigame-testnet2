import clsx from "clsx";
import moment from "moment";
import queryString from "query-string";
import { useEffect, useState } from "react";
import { rounds } from "../../../constants";
import useFetch from "../../../hooks/useFetch";
import { useMyWeb3 } from "../../../hooks/useMyWeb3";
import { getImgSrc, groupArrayById } from "../../../utils";
import HeadingPrimary from "../components/HeadingPrimary";
import MatchListRight from "./MatchListRight";
import MatchListTable from "./MatchListTable";
import styles from "./schedule.module.scss";

export type FilterTypes = {
  is_completed_bet: string;
  match_status: string;
  page: number;
  size: number;
  round_name: typeof rounds[keyof typeof rounds];
  wallet_address: string;
};

const MatchList = () => {
  const { account, isWrongChain } = useMyWeb3();

  const [selectedMatchId, setSelectedMatchId] = useState<number | undefined>();
  const [dataTable, setDataTable] = useState<any[]>([]);
  const [filter, setFilter] = useState<FilterTypes>({
    is_completed_bet: "",
    match_status: "",
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
          icon: getImgSrc(item?.home_icon),
        },
        awayTeam: {
          name: item?.away_name,
          icon: getImgSrc(item?.away_icon),
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
      is_completed_bet: value,
    }));
  };

  const handleChangeStatus = (value: any) => {
    setFilter((prevFilter: FilterTypes) => ({
      ...prevFilter,
      match_status: value,
    }));
  };

  const handleSelectMatch = (id: number) => {
    setSelectedMatchId(id);
  };

  return (
    <div className="flex flex-col pt-20">
      <HeadingPrimary title="Match List" />
      <div
        id="match-list"
        className="max-w-screen-main px-5 main:px-20 mx-auto w-full"
      >
        <div
          className={clsx(
            "flex flex-col mt-5 relative bg-[#F2F2F2]",
            "md:flex-row",
          )}
        >
          <div
            className={clsx(
              styles.scrollLayout,
              "w-full h-fit",
              "md:w-[44%] md:sticky md:top-10",
            )}
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
          <div className={"w-full md:w-[56%]"}>
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

export default MatchList;