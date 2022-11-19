import clsx from "clsx";
import { BASE_HREF, quickGuide, URLS } from "../../../constants";
import styles from "./rewards.module.scss";

const PredictRules = () => {
  return (
    <div className="flex flex-col mt-[60px] px-5 py-10 bg-black text-white rounded-[20px] relative overflow-hidden md:mt-[85px] md:p-[60px] md:rounded-[32px]">
      <div className="absolute top-0 left-0 w-[783px] h-[635px] z-[9]">
        <img src="./images/introduction/reward-blur-left.svg" alt="" />
      </div>
      <div className="z-[9] absolute bottom-[-150px] right-0 w-[783px] h-[635px]">
        <img src="./images/introduction/reward-blur-right.svg" alt="" />
      </div>
      <div className="z-20 text-center">
        <div className="text-32/40 font-tthoves font-semibold md:text-40/52">
          Phoenix Cup - Hype Bird on Fire
        </div>
        <p className="mt-2 text-14/24 font-inter md:mt-4 md:text-18/32">
          Answer the questions & predict the score, winning team and total goal
          of Qatar World Cup 2022 to earn attractive rewards
        </p>
        <div className="flex flex-col justify-center items-center  mt-5 md:flex-row md:mt-8">
          <a
            href={BASE_HREF + URLS.HOME + "#match-list"}
            className="btn-rounded w-[255px] bg-main"
          >
            Play Now
          </a>
          <a
            href={BASE_HREF + URLS.HOME + "#prediction-rule"}
            className="mt-2 btn-rounded w-[255px] border border-main md:mt-0 md:ml-4"
          >
            Prediction Rule
          </a>
        </div>
      </div>
      <div className="z-20 mt-10 flex flex-col font-inter md:mt-[60px] md:flex-row md:justify-between">
        <div className="md:max-w-[403x]">
          <div className="text-20/28 font-tthoves md:text-28/36">
            Easy to join with 3 steps
          </div>
          <ul className="mt-4">
            {quickGuide.map((item, index) => (
              <li key={index} className="mt-3.5 first:mt-0  flex">
                <span className="w-6 h-6 rounded-full text-14/24 font-bold bg-white/30 text-center">
                  {index + 1}
                </span>
                <p className="flex-1 ml-2 text-16/24 text-[#B4B4B4]">{item}</p>
              </li>
            ))}
          </ul>
        </div>
        <div
          className={clsx(
            "flex-1 max-w-[660px] h-fit rounded-[32px] font-inter mt-5 ml-3 md:mt-0",
            styles.bgRewardChampion,
          )}
        >
          <div className="flex flex-col md:flex-row">
            <div className="flex flex-col items-center justify-center text-center py-8 px-5 md:py-[50px] md:px-10">
              <span className="text-12/18 font-bold tracking-[1px] uppercase">
                rewards for the champions
              </span>
              <span className="mt-2 text-56/60 font-tthovesBold md:text-64/48">
                $6,820
              </span>
            </div>
            <div className="flex-1 flex flex-col border-t border-white/20 md:border-t-0 md:border-l">
              <div className="flex justify-between items-center py-8 px-5 md:py-6">
                <span className="text-white/80 text-16/24">
                  Questions to answer & predict
                </span>
                <span className="text-40/32 font-tthovesBold ml-6">320</span>
              </div>
              <div className="flex justify-between items-center py-8 px-5 border-t border-white/20 md:py-6">
                <span className="text-white/80 text-16/24">
                  Matches will be played
                </span>
                <span className="text-40/32 font-tthovesBold ml-6">64</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictRules;
