import { useState } from "react";
import RewardBanner from "../RewardBanner";
import MatchListTable from "./MatchListTable";
import WinnerRewards from "./WinnerRewards";

const reward = "20";
const winnerAddress = "0x493f...5e6c";
const winnerRewardsData = [
  { id: 1, no: 1, address: "0x493f...5e6c" },
  { id: 2, no: 2, address: "0x493f...5e6c" },
  { id: 3, no: 3, address: "0x493f...5e6c" },
  { id: 4, no: 4, address: "0x493f...5e6c" },
  { id: 5, no: 5, address: "0x493f...5e6c" },
];

const MatchScore = () => {
  const [selectedMatchId, setSelectedMatchId] = useState<number | undefined>();
  const handleSelectMatch = (id: number) => {
    setSelectedMatchId(id);
  };
  const dataTable = [
    {
      date: "Nov 20 - Nov 26",
      matches: [
        {
          id: 1,
          homeTeam: { icon: "", name: "Quatar" },
          awayTeam: {
            icon: "",
            name: "Ecudor",
          },
          whitelist: 23,
          reward: 20,
          winnerAddress: "0x493f...7e6c",
        },
        {
          id: 2,
          homeTeam: { icon: "", name: "Quatar" },
          awayTeam: {
            icon: "",
            name: "Ecudor",
          },
          whitelist: 23,
          reward: 20,
          winnerAddress: "0x493f...7e6c",
        },
      ],
      groupRound: "Round 1",
    },
  ];
  const loading = false;
  return (
    <div>
      <div className="flex justify-between">
        <div className="flex flex-col text-4xl font-semibold">
          <span>Match Score</span>
          <span>Prediction Winners</span>
        </div>
        <RewardBanner
          reward={1720}
          winner="64 winners"
          redirectUrl="#"
          className="bg-pink-200"
        />
      </div>
      <div className="mt-20 flex">
        <div className="w-[55%]">
          <MatchListTable
            selectedMatchId={selectedMatchId}
            handleSelectMatch={handleSelectMatch}
            dataTable={dataTable}
            loading={loading}
          />
        </div>
        <div className="flex-1 ml-10">
          <WinnerRewards
            reward={reward}
            winnerAddress={winnerAddress}
            dataTable={winnerRewardsData}
            selectedMatchId={selectedMatchId}
          />
        </div>
      </div>
    </div>
  );
};

export default MatchScore;
