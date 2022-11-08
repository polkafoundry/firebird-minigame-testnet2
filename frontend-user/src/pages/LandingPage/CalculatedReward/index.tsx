import clsx from "clsx";
import ButtonStyled from "../../../components/base/Button/ButtonStyled";
import HeadingPrimary from "../components/HeadingPrimary";
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

const CalculatedReward = () => {
  const renderTableTotalRewards = () => {
    const lastIndex = totalRewardTable.data.length - 1;

    return (
      <div className="mt-5">
        <div className={clsx("flex font-semibold", styles.totalRewardRow)}>
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
    );
  };

  const renderTableFinalRewards = () => {
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

  return (
    <div className="mt-[147px] max-w-screen-main w-full mx-auto">
      <div className="w-full m-auto">
        <HeadingPrimary
          backroundTitle="Calculated"
          title="How the rewards are calculated?"
        />
        <p className="mt-2 text-center text-18/32">
          All rewards will be airdropped to the winners after Firebird Cup
          events ends.
        </p>
        <div
          className={clsx(
            "mt-9 px-[100px] w-full flex flex-col relative text-white",
          )}
        >
          <div className={styles.blurBg}></div>
          <div className="flex justify-center z-10">
            <div>
              <ButtonStyled
                title="Leaderboard"
                className="w-[200px] bg-[#EB522F] mr-3"
              />
              <ButtonStyled
                title="My history"
                className="w-[200px] bg-black text-white"
              />
            </div>
          </div>
          <div className="z-10 mt-10 px-[52px] pt-[57px] pb-[67px] rounded-[20px] bg-black">
            <div className="flex flex-col lg:flex-row lg:space-x-5 space-y-5 lg:space-y-0">
              <div className="flex-[3]">
                <p className="text-center text-26/32 font-semibold">
                  Rewards for match score winners
                </p>
                {renderTableTotalRewards()}
              </div>
              <div className="flex-[2]">
                <p className="text-center text-26/32 font-semibold">
                  Final Reward
                </p>
                {renderTableFinalRewards()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculatedReward;
