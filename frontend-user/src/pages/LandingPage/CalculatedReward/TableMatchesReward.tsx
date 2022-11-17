import clsx from "clsx";
import styles from "./calculatedReward.module.scss";

const totalRewardTable = {
  headings: ["Round", "Matches", "Reward / Winner / Match"],
  data: [
    { id: 1, round: "Group stage", matches: "48", prize: 20 },
    { id: 2, round: "Round of 16", matches: "08", prize: 30 },
    { id: 3, round: "Quarterfinals", matches: "04", prize: 50 },
    { id: 4, round: "Semi-finals", matches: "02", prize: 70 },
    { id: 5, round: "Third-place match", matches: "01", prize: 80 },
    { id: 6, round: "Final", matches: "01", prize: 100 },
    { id: 7, round: "Total", matches: "", prize: 1720 },
  ],
};
const TableMatchesReward = () => {
  const lastIndex = totalRewardTable.data.length - 1;

  return (
    <div className="mt-5 overflow-x-auto sm:overflow-x-visible">
      <div>
        <div
          className={clsx("flex font-semibold w-full", styles.totalRewardRow)}
        >
          {totalRewardTable.headings.map((heading) => (
            <div key={heading} className="text-14/24">
              {heading}
            </div>
          ))}
        </div>
        {totalRewardTable.data.map((reward, index) => (
          <div
            key={reward.id}
            className={clsx("flex items-center", styles.totalRewardRow)}
          >
            <div>{reward.round}</div>
            <div>{reward.matches}</div>
            <div className="flex justify-end items-center font-bold">
              ${reward.prize}
              {index === lastIndex && (
                <img
                  src="/images/landing-page/icon-cup.png"
                  alt=""
                  className="ml-3"
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableMatchesReward;
