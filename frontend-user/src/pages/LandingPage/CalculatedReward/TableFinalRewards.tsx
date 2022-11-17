import clsx from "clsx";
import styles from "./calculatedReward.module.scss";

const finalRewardTable = {
  headings: ["Leaderboard", "Reward / Winner"],
  data: [
    { id: 1, top: "Top 1", prize: 700 },
    { id: 2, top: "Top 2", prize: 400 },
    { id: 3, top: "Top 3", prize: 250 },
    { id: 4, top: "Top 4 - 10", prize: 150 },
    { id: 5, top: "Top 11 - 20", prize: 70 },
    { id: 6, top: "Top 21 - 30", prize: 50 },
    { id: 7, top: "Total", prize: 3600 },
  ],
};
const TableFinalRewards = () => {
  const lastIndex = finalRewardTable.data.length - 1;

  return (
    <div className="mt-5">
      <div
        className={clsx(
          "flex justify-between font-semibold",
          styles.finalRewardRow,
        )}
      >
        {finalRewardTable.headings.map((heading) => (
          <div key={heading}>{heading}</div>
        ))}
      </div>

      {finalRewardTable.data.map((reward, index) => (
        <div
          key={reward.id}
          className={clsx(
            "flex justify-between items-center",
            styles.finalRewardRow,
          )}
        >
          <div
            className={clsx(
              [0, 1, 2].includes(index) && "font-semibold uppercase",
            )}
          >
            {reward.top}
          </div>
          <div className="flex justify-end items-center font-bold overflow-hidden">
            ${reward.prize}
            {index === lastIndex && (
              <img
                src="/images/landing-page/icon-reward.png"
                alt=""
                className="ml-3"
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TableFinalRewards;
