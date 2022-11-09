import clsx from "clsx";
import { useState } from "react";
import MatchName from "../../../../components/base/Table/MatchName";
import styles from "./matchListTable.module.scss";

const headingTable = [
  { label: "Match" },
  { label: "Whitelist", className: "text-center" },
  { label: "Rewards", className: "text-center" },
  { label: "Winner", className: "text-center" },
];

type MatchListTableProps = {
  handleSelectMatch: (id: number) => void;
  loading: boolean;
  dataTable: Array<any>;
  selectedMatchId: number | undefined;
};

const MatchListTable = (props: MatchListTableProps) => {
  const { handleSelectMatch, loading, dataTable = [], selectedMatchId } = props;

  const [groupStageIndex, setGroupStageIndex] = useState<number>(0);

  const nextGroup = () => {
    if (groupStageIndex < dataTable.length - 1)
      setGroupStageIndex((prevState: any) => prevState + 1);
  };

  const previousGroup = () => {
    if (groupStageIndex >= 1)
      setGroupStageIndex((prevState: any) => prevState - 1);
  };

  return (
    <div className="">
      <div className="flex justify-between items-start p-5 bg-gray-500 text-white">
        <img
          src="/images/icon-previous.svg"
          alt=""
          className="cursor-pointer"
          onClick={previousGroup}
        />
        <div className="flex flex-col items-center">
          <span className="text-xl font-semibold">
            {dataTable ? dataTable[groupStageIndex]?.groupRound : "N/A"}
          </span>
          <span>{dataTable ? dataTable[groupStageIndex]?.date : "N/A"}</span>
        </div>
        <img
          src="/images/icon-previous.svg"
          alt=""
          className="rotate-180 cursor-pointer"
          onClick={nextGroup}
        />
      </div>
      <div className="border overflow-x-auto">
        <div
          className={clsx(
            "flex bg-gray-400 p-5 font-semibold min-w-fit",
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
              <div className="bg-gray-300 px-5 py-1 font-semibold">
                {matchInfo?.date}
              </div>
              {matchInfo?.matches?.map((match: any) => (
                <div
                  key={match?.id}
                  className={clsx(
                    "flex px-5 py-2 border cursor-pointer hover:bg-orange-300 transition-all duration-300",
                    styles.tableRow,
                    selectedMatchId === match?.id ? "bg-amber-200" : "",
                  )}
                  onClick={() => handleSelectMatch(match?.id)}
                >
                  <MatchName team1={match?.homeTeam} team2={match?.awayTeam} />
                  <div>{match?.whitelist}</div>
                  <div>{match?.reward}</div>
                  <div>{match?.winnerAddress}</div>
                </div>
              ))}
              <div></div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MatchListTable;