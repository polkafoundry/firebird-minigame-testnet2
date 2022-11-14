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
    <div
      id="reward-distribution"
      className="mt-[120px] px-5 main:px-20 max-w-screen-main w-full mx-auto"
    >
      <div className="w-full mx-auto">
        <div
          className={clsx(
            "flex flex-col justify-between items-center",
            "2md:flex-row 2md:items-end",
          )}
        >
          <div className="flex-1 flex flex-col ml-5 lg:ml-[130px] mr-10">
            <HeadingPrimary
              backroundTitle="Calculated"
              title="How the rewards are calculated?"
              textAlign="text-left"
            />
            <p className="text-18/32">
              In addition to the Phoenix Cup, you can join the side events
              conducted by Firebird & our partners to earn extra prizes.
            </p>
          </div>
          <div className="flex justify-center px-6 py-2.5 bg-black text-white w-full 2md:w-fit">
            <img src="/images/landing-page/predicted-winner.png" alt="" />
            <div className="flex flex-col ml-8 font-tthoves">
              <span className="text-16/20 font-semibold uppercase">
                Total Rewards
              </span>
              <span className="text-48/60 font-bold italic">$1,720</span>
            </div>
          </div>
        </div>

        <div
          className={clsx(
            "mt-9 p-5 sm:p-10 lg:p-[60px] flex flex-col text-white bg-[#3A0013]",
          )}
        >
          {/* <div className="flex justify-center z-10">
            <ButtonStyled
              title="Leaderboard"
              className="w-[200px] bg-main mr-3"
            />
            <ButtonStyled
              title="My history"
              className="w-[200px] bg-black text-white"
            />
          </div> */}

          <div className="flex flex-col 2md:flex-row justify-center items-center ">
            <div className="flex flex-col justify-between items-start font-inter w-full 2md:w-fit 2md:max-w-[460px] ">
              <div>
                <span className="text-36/48 font-semibold font-tthoves">
                  Phoenix Cup
                </span>
                <p className="mt-2 text-18/32">
                  All rewards will be airdropped to the winners after Firebird
                  Cup events ends.
                </p>
              </div>

              <div className="flex flex-col xs:flex-row bg-[#4d192a] mt-5 lg:mt-[40px] w-full">
                <div className="flex flex-col items-center justify-center py-6 px-8 border-b xs:border-b-0 xs:border-r border-[#714755]">
                  <span className="text-12/18 font-bold font-tthoves opacity-80">
                    TOTAL REWARDS
                  </span>
                  <span className="text-36/48 font-bold font-tthoves italic">
                    $5,230
                  </span>
                </div>
                <div className="w-full">
                  <div className="flex items-center justify-between py-6 px-8 border-b border-[#714755]">
                    <div className="text-10/14 opacity-80">
                      For match score prediction winners
                    </div>
                    <div className="text-24/32 font-bold font-tthoves italic">
                      $1,720
                    </div>
                  </div>
                  <div className="flex items-center justify-between py-6 px-8">
                    <div className="text-10/14 opacity-80">
                      For who win & total goal prediction leaderboard
                    </div>
                    <div className="text-24/32 font-bold font-tthoves italic">
                      $3,600
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1 mt-5 ml-0 w-full 2md:ml-5 lg:ml-10  2md:mt-0 ">
              <img
                src="./images/landing-page/monsterra-sponser.png"
                alt=""
                className="w-full"
              />
            </div>
          </div>

          <div
            className={clsx(
              "mt-5 px-5 sm:px-[45px] pt-[49px] pb-[30px] bg-black",
            )}
          >
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5 font-inter">
          <div className="flex bg-black text-white">
            <div className="w-[70%] lg:w-[55%] pt-[64px] pl-[30px] pb-[30px] pr-[60px]">
              <div className="text-32/40 font-semibold font-tthoves">
                Exclusive incentives for GameFi.org’s members.
              </div>
              <p className="mt-3 text-18/32 text">
                Join the Phoenix Cup on Firebird, climb the leaderboard & have a
                chain to gain additional bonuses.
              </p>
              <a href="https://gamefi.org/" target="_blank" rel="noreferrer">
                <ButtonStyled
                  className="mt-7 w-[200px] bg-main text-white font-semibold font-tthoves"
                  title="Join now"
                />
              </a>
            </div>
            <div className="w-[30%] lg:w-[45%]">
              <img
                src="./images/landing-page/gamefi.png"
                alt=""
                className="w-full"
              />
            </div>
          </div>
          <div className="flex bg-black text-white">
            <div className="w-[70%] lg:w-[55%] pt-[64px] pl-[30px] pb-[30px] pr-[60px]">
              <div className="text-32/40 font-semibold font-tthoves">
                Blockchain Football
              </div>
              <p className="mt-3 text-18/32 text">
                Blockchain Football accompanies Firebird in this Phoenix Cup
                event and provides another opportunity for users to hunt for
                attractive rewards.
              </p>
              <div className="mt-14 text-24/32 italic font-tthoves font-bold">
                COMING SOON
              </div>
            </div>
            <div className="w-[30%] lg:w-[45%]">
              <img
                src="./images/landing-page/block-chain-football.png"
                alt=""
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculatedReward;
