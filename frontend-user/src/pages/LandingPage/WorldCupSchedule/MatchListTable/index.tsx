import clsx from "clsx";
import { useEffect, useMemo, useState } from "react";
import { FilterTypes } from "..";
import DropDown from "../../../../components/base/DropDown";
import MatchName from "../../../../components/base/Table/MatchName";
import MatchPredict from "../../../../components/base/Table/MatchPredict";
import MatchStatus from "../../../../components/base/Table/MatchStatus";
import { MATCH_STATUS, rounds } from "../../../../constants";
import { getMatchTime } from "../../../../utils";
import styles from "./matchList.module.scss";

const headingTable = [
  { label: "Time" },
  { label: "Match" },
  { label: "Score", className: "text-center" },
  { label: "Status", className: "text-center" },
  { label: "Predicted", className: "text-center" },
];

const predictedOptions = [
  { label: "All", value: "" },
  { label: "Yes", value: "true" },
  { label: "No", value: "false" },
];

const statusOptions = [
  { label: "All", value: "" },
  { label: "Ended", value: MATCH_STATUS.FINISHED },
  { label: "On going", value: MATCH_STATUS.LIVE },
  { label: "Not yet", value: MATCH_STATUS.UPCOMING },
];

const REGEX_DATE = /(\w.*) -/g;

type MatchListTableProps = {
  handleSelectMatch: (id: number) => void;
  loading: boolean;
  dataTable: Array<any>;
  selectedMatchId: number | undefined;
  filter: any;
  setFilter: any;
  handleChangePredicted: (value: any) => void;
  handleChangeStatus: (value: any) => void;
};

const MatchListTable = (props: MatchListTableProps) => {
  const {
    handleSelectMatch,
    loading,
    dataTable = [],
    selectedMatchId,
    filter,
    setFilter,
    handleChangePredicted,
    handleChangeStatus,
  } = props;

  const [groupStageIndex, setGroupStageIndex] = useState<number>(0);

  useEffect(() => {
    setFilter((prevState: FilterTypes) => ({
      ...prevState,
      round_name: rounds[groupStageIndex].value,
    }));
  }, [groupStageIndex]);

  const nextGroup = () => {
    if (groupStageIndex >= rounds.length - 1) return;
    setGroupStageIndex((prevState: any) => prevState + 1);
  };

  const previousGroup = () => {
    if (groupStageIndex < 1) return;
    setGroupStageIndex((prevState: any) => prevState - 1);
  };

  const getDate = (date: string) => {
    if (!date) return "";
    const str = date.match(REGEX_DATE);
    return str ? str[0].slice(0, str.length - 2) : "";
  };

  const priodDate = useMemo(() => {
    if (!dataTable) return "N/A";

    const lastIndex = dataTable.length - 1;
    const startDate = getDate(dataTable[0]?.date);
    const endDate = getDate(dataTable[lastIndex]?.date);

    return `${startDate} - ${endDate}`;
  }, [dataTable]);

  return (
    <div className="bg-[#F2F2F2]">
      <div
        className={clsx(
          "uppercase text-20/28 font-bold text-white px-[30px] py-1.5 w-fit",
          styles.backgroundGroupStage,
        )}
      >
        {rounds[groupStageIndex].label}
      </div>
      <div className="px-5 pt-3 pb-5">
        <div className="flex items-center justify-between ">
          <div className="font-normal text-14/24">(Time Zone: GMT+7)</div>
          <div className="flex">
            <div>
              <span className="text-14/20 font-semibold">Predicted</span>
              <DropDown
                label="Predicted"
                items={predictedOptions}
                selectedValue={filter?.is_completed_bet}
                onChange={handleChangePredicted}
                className="w-[110px] ml-2 text-14/24"
                itemsClassName=""
                bgColor="white"
              />
            </div>
            <div className="ml-3">
              <span className="text-14/20 font-semibold">Status</span>
              <DropDown
                label="Status"
                items={statusOptions}
                selectedValue={filter?.match_status}
                onChange={handleChangeStatus}
                className="w-[110px] ml-2 text-14/24"
                itemsClassName=""
                bgColor="white"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center bg-[#3A0013] text-white mt-1">
          <div
            className="h-12 w-12 cursor-pointer flex justify-center items-center"
            onClick={previousGroup}
          >
            <img src="/images/icon-previous.svg" alt="" />
          </div>
          <div className="text-20/28 font-bold uppercase">{priodDate}</div>
          <div
            className="h-12 w-12 cursor-pointer flex justify-center items-center"
            onClick={nextGroup}
          >
            <img
              src="/images/icon-previous.svg"
              alt=""
              className="rotate-180"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <div
            className={clsx(
              "flex bg-[#3A0013] min-w-fit text-white",
              styles.tableRow,
            )}
          >
            {headingTable.map((heading) => (
              <div key={heading.label} className={heading.className}>
                {heading.label}
              </div>
            ))}
          </div>
          {loading ? (
            <div>Loading ...</div>
          ) : (
            dataTable?.map((matchInfo: any, index: number) => (
              <div key={index} className="min-w-fit">
                <div className="text-12/18 font-bold px-5 py-[11px] uppercase opacity-80">
                  {matchInfo?.date}
                </div>
                {matchInfo?.matches?.map((match: any) => (
                  <div
                    key={match?.id}
                    className={clsx(
                      "flex items-center cursor-pointer bg-white hover:bg-orange-300 transition-all duration-300 mb-0.5 last:mb-0",
                      styles.tableRow,
                      selectedMatchId === match?.id ? "bg-amber-200" : "",
                    )}
                    onClick={() => handleSelectMatch(match?.id)}
                  >
                    <div className="flex items-center text-14/24">
                      {getMatchTime(match?.start_time * 1000)}
                    </div>
                    <MatchName
                      team1={match?.homeTeam}
                      team2={match?.awayTeam}
                    />
                    <div className="text-14/24">
                      {match?.match_status === MATCH_STATUS.UPCOMING
                        ? "-:-"
                        : `${match?.ft_home_score}:${match?.ft_away_score}`}
                    </div>
                    <MatchStatus status={match?.match_status} />
                    <MatchPredict
                      isCorrect={match?.is_completed_bet}
                      isDisplayText={false}
                    />
                  </div>
                ))}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MatchListTable;
