import clsx from "clsx";

type RewardBannerProps = {
  reward: string;
  winner: string;
  redirectUrl: string;
  className?: string;
  isLargeText?: boolean;
};

const RewardBanner = (props: RewardBannerProps) => {
  const {
    reward,
    winner,
    redirectUrl,
    className = "",
    isLargeText = false,
  } = props;
  return (
    <div className="mt-2 flex flex-col items-center">
      <div
        className={clsx(
          "flex items-center font-tthoves border border-black",
          className,
        )}
      >
        <div className="w-[340px] flex flex-col items-center px-[70px] py-[14px] border-r border-black">
          <span className="text-16/20 font-semibold uppercase">
            Total Reward
          </span>
          <span className="text-48/60 font-tthovesBold italic">{reward}</span>
        </div>
        <div className="w-[340px] flex flex-col items-center px-[70px] py-[14px]">
          <span className="text-16/20 font-semibold text-center uppercase">
            Total Winners
          </span>
          <span
            className={clsx(
              "font-tthovesBold italic",
              !isLargeText ? "text-32/60" : "text-48/60</div>",
            )}
          >
            {winner}
          </span>
        </div>
      </div>
      <a
        href={redirectUrl}
        target="_blank"
        rel="noreferrer"
        className="mt-3 btn-rounded btn-black w-[240px]"
      >
        More Details
      </a>
    </div>
  );
};

export default RewardBanner;
