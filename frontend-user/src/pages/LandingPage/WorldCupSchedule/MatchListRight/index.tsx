import clsx from "clsx";
import moment from "moment";
import { useState } from "react";
import { MATCH_STATUS } from "../../../../constants";
import useFetch from "../../../../hooks/useFetch";
import { getImgSrc } from "../utils";
import MatchQuestions from "./MatchQuestions";
import MatchGuide from "./MathGuide";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const queryString = require("query-string");

type MatchListRightProps = {
  matchId: number | undefined;
  account: string | undefined;
};

const nav = [
  { value: 1, label: "QUESTIONS" },
  { value: 2, label: "GUIDE" },
];

const MatchListRight = (props: MatchListRightProps) => {
  const { matchId, account } = props;
  const [selectedNav, setSelectedNav] = useState<number>(1);

  const fetchMatchDetailUrl = matchId
    ? `/match/detail/${matchId}?${queryString.stringify({
        wallet_address: account,
      })}`
    : "";
  const { data } = useFetch<any>(fetchMatchDetailUrl);

  const matchData = data?.data;
  const startTime = new Date(matchData?.start_time * 1000);
  const matchTime = moment(startTime).format("Do MMM YY, HH:mm");

  const isEnded = moment(new Date()).diff(startTime, "minutes") >= 90;
  const isLiving = startTime.getTime() <= new Date().getTime() && !isEnded;

  return (
    <div className="flex flex-col rounded-lg md:ml-6 border-2 border-gray-600">
      <div className="flex flex-col items-center justify-center text-center h-auto min-h-[280px] bg-gray-700 text-white">
        {matchData ? (
          <>
            <span className="">{matchTime}</span>
            <span className="">{matchData?.stadium}</span>
            <div className="flex justify-between w-full max-w-[440px]">
              <div className="flex flex-col items-center gap-2 flex-1">
                <img
                  src={getImgSrc(matchData.home_icon)}
                  className="w-[65px] h-[65px] m-auto rounded-full"
                  alt=""
                />
                <span className="text-base">{matchData.home_name}</span>
              </div>
              <div>
                <span className="leading-[65px] text-[52px] font-semibold">
                  {matchData?.match_status === MATCH_STATUS.UPCOMING
                    ? "-"
                    : matchData?.ft_home_score || 0}
                </span>
                <span className="leading-[65px] text-[52px] font-semibold mx-5">
                  :
                </span>
                <span className="leading-[65px] text-[52px] font-semibold">
                  {matchData?.match_status === MATCH_STATUS.UPCOMING
                    ? "-"
                    : matchData?.ft_away_score || 0}
                </span>
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <img
                  src={getImgSrc(matchData.away_icon)}
                  className="w-[65px] h-[65px] m-auto rounded-full"
                  alt=""
                />
                <span className="text-base">{matchData.away_name}</span>
              </div>
            </div>

            <div
              className={clsx(
                "text-black text-sm px-2 rounded-md mt-5 font-semibold",
                isLiving ? "bg-green-500" : isEnded ? "bg-main" : "bg-gray-500",
              )}
            >
              {isLiving
                ? "Live-streaming"
                : isEnded
                ? "Prediction for this match has been closed."
                : `Predictions will be closed at ${moment(startTime).format(
                    "Do MMM YY, HH:mm",
                  )}`}
            </div>
          </>
        ) : (
          <>
            <img src="/images/select-match.png" alt="" />
            <p className="m-0 bold text-lg">Please select a match.</p>
          </>
        )}
      </div>

      <div className="grid grid-cols-2 h-12 cursor-pointer">
        {nav.map((item: any) => (
          <div
            className={clsx(
              "flex justify-center items-center text-center",
              selectedNav === item.value
                ? "bg-gray-500 text-black"
                : "bg-gray-200 text-gray-400",
            )}
            key={item.value}
            onClick={() => setSelectedNav(item.value)}
          >
            {item.label}
          </div>
        ))}
      </div>

      {selectedNav === 1 ? (
        <MatchQuestions account={account} dataQuestion={matchData} />
      ) : (
        <MatchGuide isDetailGuide />
      )}
    </div>
  );
};

export default MatchListRight;
