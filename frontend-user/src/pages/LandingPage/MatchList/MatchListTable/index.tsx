import clsx from "clsx";
import { useEffect, useState } from "react";
import { FilterTypes } from "..";
import DefaultLoading from "../../../../components/base/DefaultLoading";
import DropDown from "../../../../components/base/DropDown";
import NotFound from "../../../../components/base/NotFound";
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

type MatchListTableProps = {
  handleSelectMatch: (id: number) => void;
  loading: boolean;
  dataTable: Array<any>;
  selectedMatchId: number | undefined;
  filter: any;
  setFilter: any;
  roundTitle: string;
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
    roundTitle,
    handleChangePredicted,
    handleChangeStatus,
  } = props;

  const [groupStageIndex, setGroupStageIndex] = useState<number>(1);

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

  const renderFilter = () => (
    <div className="flex flex-col lg:flex-row items-center justify-between">
      <div className="font-normal text-14/24">(Time Zone: GMT+7)</div>
      <div className="flex mt-2 lg:mt-0">
        <div>
          <span className="text-14/20 font-semibold">Predicted</span>
          <DropDown
            label="Predicted"
            items={predictedOptions}
            selectedValue={filter.is_completed_bet}
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
            selectedValue={filter.match_status}
            onChange={handleChangeStatus}
            className="w-[110px] ml-2 text-14/24"
            itemsClassName=""
            bgColor="white"
          />
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <div
        className={clsx(
          "title-group-stage pr-8 bg-[cover] w-[310px] mx-auto md:w-[330px] lg:mx-0",
        )}
      >
        {rounds[groupStageIndex].label}
      </div>
      <div className="md:px-5 pt-3 pb-5">
        {renderFilter()}

        <div className="flex justify-between items-center bg-[#3A0013] text-white mt-5 lg:mt-1">
          <div
            className="h-12 w-12 cursor-pointer flex justify-center items-center select-none"
            onClick={previousGroup}
          >
            <img src="/images/icon-previous.svg" alt="" />
          </div>
          <div className="text-18/24 md:text-20/28 font-bold md:uppercase">
            {roundTitle}
          </div>
          <div
            className="h-12 w-12 cursor-pointer flex justify-center items-center select-none"
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
          <div className="relative min-h-[300px]">
            {loading && <DefaultLoading />}

            {!loading && (!dataTable || !dataTable?.length) ? (
              <div className="flex flex-col justify-center items-center h-[300px]">
                <NotFound title="Upcoming matches will be updated soon." />
              </div>
            ) : (
              <>
                {dataTable?.map((matchInfo: any, index: number) => (
                  <div key={index} className="min-w-fit">
                    <div className="text-12/18 font-bold px-5 py-[11px] uppercase opacity-80">
                      {matchInfo?.date}
                    </div>
                    {matchInfo?.matches?.map((match: any) => (
                      <div
                        key={match?.id}
                        className={clsx(
                          "text-14/24 flex items-center cursor-pointer bg-white hover:bg-orange-300 transition-all duration-300 mb-0.5 last:mb-0",
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
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchListTable;
