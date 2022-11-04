import clsx from "clsx";
import { MATCH_STATUS } from "../../../constants/match";

type MatchStatusProps = {
  status: typeof MATCH_STATUS[keyof typeof MATCH_STATUS];
  className?: string;
};

const MatchStatus = (props: MatchStatusProps) => {
  const { status, className = "" } = props;
  const getBackgroundColor = () => {
    switch (status) {
      case MATCH_STATUS.ON_GOING:
        return "bg-green-200";

      case MATCH_STATUS.NOT_YET:
        return "bg-pink-200";

      case MATCH_STATUS.ENDED:
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
      {status}
    </div>
  );
};

export default MatchStatus;
