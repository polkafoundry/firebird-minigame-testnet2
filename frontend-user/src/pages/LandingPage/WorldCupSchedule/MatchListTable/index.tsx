import clsx from "clsx";
import { useState } from "react";
import MatchName from "../../../../components/base/Table/MatchName";
import MatchPredict from "../../../../components/base/Table/MatchPredict";
import MatchStatus from "../../../../components/base/Table/MatchStatus";
import styles from "./matchList.module.scss";

const MATCH_STATUS = {
  ON_GOING: "On going",
  NOT_YET: "Not yet",
  ENDED: "Ended",
};

const matchList = {
  headingTable: [
    { label: "Time", width: 69 },
    { label: "Match", width: 306 },
    { label: "Score", width: 60, className: "text-center" },
    { label: "Status", width: 80, className: "text-center" },
    { label: "Predicted", width: 70, className: "text-center" },
  ],
  data: [
    {
      groupStage: "Group stage - Round 1",
      groupTime: "Nov. 20 - 24",
      matchGroups: [
        {
          date: "Nov 21 - Monday",
          matchs: [
            {
              id: 1,
              time: "23:00",
              team1: { name: "Quatar", icon: "/images/icon-qatar.svg" },
              team2: { name: "Ecuador", icon: "/images/icon-ecuador.svg" },
              score: "0:0",
              status: MATCH_STATUS.ON_GOING,
              predicted: false,
            },
            {
              id: 2,
              time: "24:00",
              team1: { name: "Quatar", icon: "/images/icon-qatar.svg" },
              team2: { name: "Ecuador", icon: "/images/icon-ecuador.svg" },
              score: "0:0",
              status: MATCH_STATUS.ON_GOING,
              predicted: false,
            },
            {
              id: 3,
              time: "23:00",
              team1: { name: "Quatar", icon: "/images/icon-qatar.svg" },
              team2: { name: "Ecuador", icon: "/images/icon-ecuador.svg" },
              score: "0:0",
              status: MATCH_STATUS.ON_GOING,
              predicted: false,
            },
            {
              id: 4,
              time: "24:00",
              team1: { name: "Quatar", icon: "/images/icon-qatar.svg" },
              team2: { name: "Ecuador", icon: "/images/icon-ecuador.svg" },
              score: "0:0",
              status: MATCH_STATUS.ON_GOING,
              predicted: false,
            },
          ],
        },
        {
          date: "Nov 22 - Tuesday",
          matchs: [
            {
              id: 5,
              time: "23:00",
              team1: { name: "Quatar", icon: "/images/icon-qatar.svg" },
              team2: { name: "Ecuador", icon: "/images/icon-ecuador.svg" },
              score: "-:-",
              status: MATCH_STATUS.NOT_YET,
              predicted: false,
            },
            {
              id: 6,
              time: "24:00",
              team1: { name: "Quatar", icon: "/images/icon-qatar.svg" },
              team2: { name: "Ecuador", icon: "/images/icon-ecuador.svg" },
              score: "0:0",
              status: MATCH_STATUS.ENDED,
              predicted: true,
            },
            {
              id: 7,
              time: "23:00",
              team1: { name: "Quatar", icon: "/images/icon-qatar.svg" },
              team2: { name: "Ecuador", icon: "/images/icon-ecuador.svg" },
              score: "-:-",
              status: MATCH_STATUS.NOT_YET,
              predicted: false,
            },
            {
              id: 8,
              time: "24:00",
              team1: { name: "Quatar", icon: "/images/icon-qatar.svg" },
              team2: { name: "Ecuador", icon: "/images/icon-ecuador.svg" },
              score: "0:0",
              status: MATCH_STATUS.ENDED,
              predicted: true,
            },
          ],
        },
      ],
    },
    {
      groupStage: "Group stage - Round 2",
      groupTime: "Nov. 24 - 28",
      matchGroups: [
        {
          date: "Nov 24 - Monday",
          matchs: [
            {
              id: 15,
              time: "23:00",
              team1: { name: "Quatar", icon: "/images/icon-qatar.svg" },
              team2: { name: "Ecuador", icon: "/images/icon-ecuador.svg" },
              score: "0:0",
              status: MATCH_STATUS.ON_GOING,
              predicted: false,
            },
            {
              id: 16,
              time: "24:00",
              team1: { name: "Quatar", icon: "/images/icon-qatar.svg" },
              team2: { name: "Ecuador", icon: "/images/icon-ecuador.svg" },
              score: "0:0",
              status: MATCH_STATUS.NOT_YET,
              predicted: false,
            },
            {
              id: 25,
              time: "23:00",
              team1: { name: "Quatar", icon: "/images/icon-qatar.svg" },
              team2: { name: "Ecuador", icon: "/images/icon-ecuador.svg" },
              score: "0:0",
              status: MATCH_STATUS.ON_GOING,
              predicted: false,
            },
            {
              id: 26,
              time: "24:00",
              team1: { name: "Quatar", icon: "/images/icon-qatar.svg" },
              team2: { name: "Ecuador", icon: "/images/icon-ecuador.svg" },
              score: "0:0",
              status: MATCH_STATUS.NOT_YET,
              predicted: false,
            },
          ],
        },
        {
          date: "Nov 26 - Tuesday",
          matchs: [
            {
              id: 27,
              time: "24:00",
              team1: { name: "Quatar", icon: "/images/icon-qatar.svg" },
              team2: { name: "Ecuador", icon: "/images/icon-ecuador.svg" },
              score: "0:0",
              status: MATCH_STATUS.ENDED,
              predicted: true,
            },
            {
              id: 37,
              time: "24:00",
              team1: { name: "Quatar", icon: "/images/icon-qatar.svg" },
              team2: { name: "Ecuador", icon: "/images/icon-ecuador.svg" },
              score: "0:0",
              status: MATCH_STATUS.ENDED,
              predicted: true,
            },
            {
              id: 47,
              time: "24:00",
              team1: { name: "Quatar", icon: "/images/icon-qatar.svg" },
              team2: { name: "Ecuador", icon: "/images/icon-ecuador.svg" },
              score: "0:0",
              status: MATCH_STATUS.ENDED,
              predicted: true,
            },
          ],
        },
      ],
    },
  ],
};

const MatchListTable = () => {
  const [groupStageIndex, setGroupStageIndex] = useState<number>(0);

  const nextGroup = () => {
    if (groupStageIndex < matchList.data.length - 1)
      setGroupStageIndex(groupStageIndex + 1);
  };

  const previousGroup = () => {
    if (groupStageIndex >= 1) setGroupStageIndex(groupStageIndex - 1);
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
            {matchList.data[groupStageIndex].groupStage}
          </span>
          <span>{matchList.data[groupStageIndex].groupTime}</span>
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
          {matchList.headingTable.map((heading) => (
            <div key={heading.label} className={heading.className}>
              {heading.label}
            </div>
          ))}
        </div>
        {matchList.data[groupStageIndex].matchGroups.map((matchInfo) => (
          <div key={matchInfo.date} className="min-w-fit">
            <div className="bg-gray-300 px-5 py-1 font-semibold">
              {matchInfo.date}
            </div>
            {matchInfo.matchs.map((match) => (
              <div
                key={match.id}
                className={clsx(
                  "flex items-center px-5 py-2 border",
                  styles.tableRow,
                )}
              >
                <div>{match.time}</div>
                <MatchName team1={match.team1} team2={match.team2} />
                <div>{match.score}</div>
                <MatchStatus status={match.status} />
                <MatchPredict
                  isCorrect={match.predicted}
                  isDisplayText={false}
                />
              </div>
            ))}
            <div></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MatchListTable;
