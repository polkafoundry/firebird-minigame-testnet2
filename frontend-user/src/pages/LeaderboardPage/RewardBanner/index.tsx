import clsx from "clsx";

type RewardBannerProps = {
  reward: string;
  winner: string;
  // redirectUrl: string;
  className?: string;
  isLargeText?: boolean;
};

const RewardBanner = (props: RewardBannerProps) => {
  const {
    reward,
    winner,
    // redirectUrl,
    className = "",
    isLargeText = false,
  } = props;
  return (
    <div className="mt-2 px-5 flex flex-col items-center">
      <div
        className={clsx(
          "w-full md:w-auto flex flex-col xs:flex-row items-center font-tthoves border border-black",
          className,
        )}
      >
        <div className="w-full md:w-[340px] flex flex-col items-center px-[70px] py-3 md:py-3.5 xs:border-r border-black">
          <span className="text-12/18 md:text-16/20 font-semibold uppercase">
            Total Reward
          </span>
          <span className="text-32/40 md:text-48/60 font-tthovesBold italic">
            {reward}
          </span>
        </div>
        <div className="w-full md:w-[340px] flex flex-col items-center px-[70px] py-3 md:py-3.5 border-t border-black xs:border-t-0">
          <span className="text-12/18 md:text-16/20 font-semibold text-center uppercase">
            Total Winners
          </span>
          <span
            className={clsx(
              "font-tthovesBold italic text-32/40",
              !isLargeText ? "md:text-32/60" : "md:text-48/60",
            )}
          >
            {winner}
          </span>
        </div>
      </div>
      {/* <a
        href={redirectUrl}
        target="_blank"
        rel="noreferrer"
        className="mt-3 btn-rounded btn-black w-[240px]"
      >
        More Detail
      </a> */}
    </div>
  );
};

export default RewardBanner;
