import clsx from "clsx";
import { useState } from "react";
import HeadingPrimary from "../components/HeadingPrimary";
import GameFiReward from "./GameFiReward";
import TableFinalRewards from "./TableFinalRewards";
import TableMatchesReward from "./TableMatchesReward";

const CalculatedReward = () => {
  const [isShowDetail, setIsShowDetail] = useState<boolean>(false);

  const handleToggleDetail = () => {
    setIsShowDetail(!isShowDetail);
  };

  const renderHeader = () => {
    return (
      <div
        className={clsx(
          "flex flex-col justify-between items-center",
          "2md:flex-row 2md:items-end",
        )}
      >
        <div className="flex-1 flex flex-col ml-5 lg:ml-[50px] mr-5 main:mr-10">
          <HeadingPrimary
            backroundTitle="Calculated"
            title="Valuable Rewards From Companions"
            textAlign="text-left"
          />
          <p className="text-18/32">
            In addition to the Phoenix Cup, you can join the side events
            conducted by Firebird & our partners to earn extra prizes.
          </p>
        </div>
        <div className="flex justify-center items-center px-4 py-2.5 bg-black text-white w-full 2md:w-fit">
          <img src="/images/landing-page/predicted-winner.png" alt="" />
          <div className="flex flex-col ml-2 font-tthoves">
            <span className="text-16/20 font-semibold uppercase">
              public testnet total rewards
            </span>
            <span className="text-48/60 font-tthovesBold italic">$6,820</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      id="reward-distribution"
      className="mt-[120px] px-5 main:px-20 max-w-screen-main w-full mx-auto"
    >
      <div className="w-full mx-auto">
        {renderHeader()}

        <div
          className={clsx(
            "mt-9 p-5 sm:p-10 lg:p-[60px] flex flex-col text-white bg-[#3A0013] rounded-[4px]",
          )}
        >
          <div className="flex flex-col 2md:flex-row justify-center items-center">
            <div className="flex flex-col justify-between items-start font-inter w-full 2md:w-fit 2md:max-w-[460px]">
              <div>
                <span
                  className="text-36/48 font-semibold font-tthoves"
                  data-aos="fade-up"
                >
                  Phoenix Cup
                </span>
                <p
                  className="mt-2 text-18/32"
                  data-aos="fade-up"
                  data-aos-delay="200"
                >
                  All rewards will be airdropped to the winners after Phoenix
                  Cup events ends.
                </p>
              </div>

              <div className="flex flex-col xs:flex-row bg-[#4d192a] mt-5 lg:mt-[40px] w-full">
                <div className="flex flex-col items-center justify-center py-6 px-8 border-b xs:border-b-0 xs:border-r border-[#714755]">
                  <span className="text-12/18 font-bold font-tthoves opacity-80">
                    TOTAL REWARDS
                  </span>
                  <span
                    className="text-36/48 font-tthovesBold italic"
                    data-aos="flip-left"
                  >
                    $5,320
                  </span>
                </div>
                <div className="w-full">
                  <div className="flex items-center justify-between py-6 px-8 border-b border-[#714755]">
                    <div className="text-10/14 opacity-80">
                      For match score prediction winners
                    </div>
                    <div
                      className="text-24/32 font-tthovesBold italic"
                      data-aos="flip-left"
                    >
                      $1,720
                    </div>
                  </div>
                  <div className="flex items-center justify-between py-6 px-8">
                    <div className="text-10/14 opacity-80">
                      For who win & total goal prediction leaderboard
                    </div>
                    <div
                      className="text-24/32 font-tthovesBold italic"
                      data-aos="flip-left"
                    >
                      $3,600
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex w-full mt-5 text-white text-14/20 font-tthoves">
                <button
                  className="bg-main p-2 flex-1 rounded-lg flex justify-center items-center"
                  onClick={handleToggleDetail}
                >
                  {!isShowDetail ? "Show details" : "Hide details"}
                  <img
                    src="./images/icon-arrow-down-white.svg"
                    alt=""
                    className={clsx("w-2.5 ml-1", isShowDetail && "rotate-180")}
                  />
                </button>
                <button className="bg-black p-2 flex-1 rounded-lg ml-2">
                  Learn more
                </button>
              </div>
            </div>

            <div className="flex-1 mt-5 ml-0 w-full 2md:ml-5 lg:ml-10 2md:mt-0 ">
              <img
                src="./images/landing-page/monsterra-sponser.png"
                alt=""
                className="w-full"
                data-aos="zoom-in"
              />
            </div>
          </div>

          <div
            className={clsx(
              "mt-5 px-5 sm:px-[45px] pt-[49px] pb-[30px] bg-black",
              !isShowDetail && "hidden",
            )}
          >
            <div className="flex flex-col lg:flex-row lg:space-x-5 space-y-5 lg:space-y-0">
              <div className="flex-[3]">
                <p className="text-center text-26/32 font-semibold uppercase">
                  Rewards for match score winners
                </p>
                <TableMatchesReward />
              </div>

              <div className="flex-[2]">
                <p className="text-center text-26/32 font-semibold uppercase">
                  Final Rewards
                </p>
                <TableFinalRewards />
              </div>
            </div>
          </div>
        </div>

        <GameFiReward />
      </div>
    </div>
  );
};

export default CalculatedReward;
