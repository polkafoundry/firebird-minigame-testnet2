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
        return "bg-green-200";

      case MATCH_STATUS.UPCOMING:
        return "bg-pink-200";

      case MATCH_STATUS.FINISHED:
        return "bg-gray-200";
      default:
        return "bg-gray-200";
    }
  };

  const backgroundColor = getBackgroundColor();

  return (
    <div
      className={clsx(
        backgroundColor,
        "rounded-xl font-semibold p-1",
        className,
      )}
    >
      {MATCH_STATUS_TEXT[status]}
    </div>
  );
};

export default MatchStatus;
