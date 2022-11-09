import React from "react";

type WinnerRewardsProps = {
  reward: string;
  winnerAddress: string;
  dataTable: Array<any>;
  selectedMatchId: number | undefined;
};

const WinnerRewards = (props: WinnerRewardsProps) => {
  const { reward, winnerAddress, dataTable, selectedMatchId } = props;
  console.log("selectedMatchId", selectedMatchId);
  return (
    <div>
      <div className="rounded-[6px] py-4 flex flex-col items-center bg-gray-600 text-white">
        <div className="flex items-center">
          <div>imgCup</div>
          <div className="flex flex-col ml-5">
            <span className="text-14/24">${reward} rewards winner is</span>
            <span className="text-20/28 font-semibold">{winnerAddress}</span>
          </div>
        </div>
        <div className="flex justify-center">
          <div>icon</div>
          <div className="ml-5">
            Unfortunately, you did not win this match reward.
          </div>
        </div>
        <button className="border border-white px-5 py-2 mt-5 rounded-md">
          View transaction
        </button>
      </div>
      <div>
        <div className="flex bg-slate-300 py-3 px-5">
          <div className="w-[20%]">No</div>
          <div className="w-[40%]">Wallet address</div>
          <input className="w-[40%]" placeholder="Search wallet" />
        </div>

        <div className="px-5">
          {dataTable.map((item: any) => (
            <div key={item.id} className="flex py-3">
              <div className="w-[20%]">{item.no}</div>
              <div className="flex-1">{item.address}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WinnerRewards;
