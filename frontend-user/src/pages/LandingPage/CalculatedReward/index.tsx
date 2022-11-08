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
  ],
};

const finalRewardTable = {
  headings: ["Leaderboard", "Reward / Winner"],
  data: [
    { id: 1, address: "Top 1", prize: 700 },
    { id: 2, address: "Top 2", prize: 400 },
    { id: 3, address: "Top 3", prize: 250 },
    { id: 4, address: "Top 4 - 10", prize: 150 },
    { id: 5, address: "Top 11 - 20", prize: 70 },
    { id: 6, address: "Top 21 - 30", prize: 50 },
  ],
};

const CalculatedReward = () => {
  const renderTableTotalRewards = () => {
    return (
      <div className="mt-5">
        <div
          className={clsx(
            "flex bg-[#1e2024] p-5 font-semibold border-b-2 border-black",
            styles.tableRow,
          )}
        >
          {totalRewardTable.headings.map((heading) => (
            <div key={heading}>{heading}</div>
          ))}
        </div>

        {totalRewardTable.data.map((reward) => (
          <div
            key={reward.id}
            className={clsx(
              "flex px-5 py-2 bg-[#1e2024] border-b-2 border-black",
              styles.tableRow,
            )}
          >
            <div>{reward.round}</div>
            <div>{reward.matches}</div>
            <div>${reward.prize}</div>
          </div>
        ))}
        <div className="flex justify-between px-5 py-2 bg-[#1e2024]">
          <div>Total</div>
          <div>$1,720</div>
        </div>
      </div>
    );
  };

  const renderTableFinalRewards = () => {
    return (
      <div className="mt-5">
        <div
          className={clsx(
            "flex justify-between bg-[#1e2024] p-5 font-semibold border-b-2 border-black",
          )}
        >
          {finalRewardTable.headings.map((heading) => (
            <div key={heading}>{heading}</div>
          ))}
        </div>

        {finalRewardTable.data.map((reward) => (
          <div
            key={reward.id}
            className={clsx(
              "flex justify-between px-5 py-2 bg-[#1e2024] border-b-2 border-black",
            )}
          >
            <div>{reward.address}</div>
            <div>${reward.prize}</div>
          </div>
        ))}
        <div className="flex justify-between px-5 py-2 bg-[#1e2024]">
          <div>Total</div>
          <div>$3,600</div>
        </div>
      </div>
    );
  };

  return (
    <div className="mt-[147px]">
      <HeadingPrimary
        backroundTitle="Calculated"
        title="How the rewards are calculated?"
      />
      <p className="mt-2 text-center">
        All rewards will be airdropped to the winners after Firebird Cup events
        ends.
      </p>
      <div className={clsx("mt-9 mx-[100px] flex flex-col relative")}>
        <div className={styles.blurBg}></div>
        <div className="flex justify-center w-full z-10">
          <div>
            <ButtonStyled
              title="Leaderboard"
              className="w-[200px] bg-[#EB522F] mr-3"
            />
            <ButtonStyled
              title="My history"
              className="w-[200px] bg-white text-black"
            />
          </div>
        </div>
        <div className="z-10 mt-10 px-[52px] pt-[57px] pb-[67px] rounded-[20px] bg-black">
          <div className="flex space-x-5">
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
  );
};

export default CalculatedReward;
