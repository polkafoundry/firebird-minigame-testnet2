import clsx from "clsx";
import PredictRules from "./PredictRules";
import Sponsor from "./Sponsor";
import styles from "./rewards.module.scss";

const Rewards = () => {
  return (
    <div>
      <div className="mt-[60px] md:mt-[100px]">
        <h4 className="text-32/40 max-w-[900px] mx-auto font-tthoves font-semibold text-center md:text-54/54">
          Participate in fun games & events to win great prizes
        </h4>
        <div
          className={clsx(
            "flex flex-col max-w-[740px] mx-auto items-center mt-8 pt-5 pb-[170px] px-[50px] relative md:mt-[60px] md:pb-5 md:px-10 md:flex-row md:items-end",
            styles.gradientBorder,
          )}
        >
          <div className="absolute top-[-40px] left-[-40px] w-[80px] h-[80px] flex justify-center items-center bg-[#f7f7f8]">
            <img
              src="./images/introduction/star.svg"
              alt=""
              className="w-11 h-11"
            />
          </div>
          <div className="absolute md:w-[355px] w-[312px] bottom-[-50px] md:bottom-[-46px] right-[50%] translate-x-1/2 md:right-[80px] flex justify-center items-center">
            <img
              src="./images/introduction/rewards.png"
              alt=""
              className="w-full"
            />
          </div>
          <div>
            <div className="text-12/18 text-center font-inter font-semibold uppercase md:text-16/28 md:text-left md:font-extrabold">
              public testnet total rewards
            </div>
            <div className="mt-2 text-main text-56/60 text-center font-tthoves font-semibold md:mt-0 md:text-80/80 md:text-left">
              $6,820
            </div>
          </div>
          <a
            href="https://medium.com/firebirdchain/firebird-public-testnet-phoenix-cup-guideline-fba75cdcaa89"
            target={"_blank"}
            className="btn-rounded bg-black text-white px-8 mt-5 md:mt-0 md:ml-[54px]"
          >
            View Details
          </a>
        </div>
      </div>
      <PredictRules />
      <Sponsor />
    </div>
  );
};

export default Rewards;
