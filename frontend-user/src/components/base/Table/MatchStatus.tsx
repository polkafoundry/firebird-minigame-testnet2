import clsx from "clsx";
import { MATCH_STATUS, MATCH_STATUS_TEXT } from "../../../constants";

type MatchStatusProps = {
  status: typeof MATCH_STATUS[keyof typeof MATCH_STATUS];
  className?: string;
};

const MatchStatus = (props: MatchStatusProps) => {
  const { status, className = "" } = props;
  const getBackgroundColor = () => {
    switch (status) {
      case MATCH_STATUS.LIVE:
        return "bg-[#d0f0db] text-[#3ac26a]";

      case MATCH_STATUS.UPCOMING:
        return "bg-[#ffd8dd] text-[#ff5c71]";

      case MATCH_STATUS.FINISHED:
        return "bg-[#f3f3f3] text-[#cdcdcd]";
      default:
        return "bg-[#f3f3f3] text-[#cdcdcd]";
    }
  };

  const backgroundColor = getBackgroundColor();

  return (
    <div className={clsx(className, "flex justify-center items-center")}>
      <div
        className={clsx(
          backgroundColor,
          "rounded-xl font-semibold text-12/18 tracking-[1px] max-w-[90px] w-full",
        )}
      >
        {MATCH_STATUS_TEXT[status]}
      </div>
    </div>
  );
};

export default MatchStatus;
