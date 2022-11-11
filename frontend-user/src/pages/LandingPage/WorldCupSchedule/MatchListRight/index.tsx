import clsx from "clsx";
import moment from "moment";
import { useState } from "react";
import { MATCH_STATUS } from "../../../../constants";
import useFetch from "../../../../hooks/useFetch";
import { getImgSrc } from "../../../../utils";
import styles from "./matchListRight.module.scss";
import MatchQuestions from "./MatchQuestions";
import MatchGuide from "./MathGuide";

type MatchListRightProps = {
  matchId: number | undefined;
  account: string | undefined;
  isWrongChain: boolean;
};

const nav = [
  { value: 1, label: "QUESTIONS" },
  { value: 2, label: "GUIDE" },
];

const MatchListRight = (props: MatchListRightProps) => {
  const { matchId, account, isWrongChain } = props;
  const [selectedNav, setSelectedNav] = useState<number>(account ? 1 : 2);

  const fetchMatchDetailUrl = `/match/detail/${matchId}?wallet_address=${account}`;
  const { data } = useFetch<any>(fetchMatchDetailUrl, !!matchId);

  const matchData = data?.data;
  const startTime = new Date(matchData?.start_time * 1000);
  const matchTime = moment(startTime).format("Do MMM YY, HH:mm");

  const isEnded = moment(new Date()).diff(startTime, "minutes") >= 90;
  const isLiving = startTime.getTime() <= new Date().getTime() && !isEnded;

  return (
    <div className="flex flex-col rounded-lg md:ml-6 bg-[#F2F2F2]">
      <div
        className={clsx(
          "flex flex-col items-center justify-center text-center h-auto min-h-[280px] text-white",
          styles.backgroundStadium,
        )}
      >
        {matchData ? (
          <>
            <span className="text-20/32 uppercase font-bold">{matchTime}</span>
            <span className="text-16/24 mt-1">{matchData?.stadium}</span>
            <div className="flex justify-between items-center w-full max-w-[660px] mt-5">
              <div className="flex flex-col items-center gap-2 flex-1">
                <img
                  src={getImgSrc(matchData.home_icon)}
                  className="w-[60px] h-[60px] m-auto rounded-full"
                  alt=""
                />
                <span className="text-20/32 font-semibold capitalize">
                  {matchData.home_name.toLowerCase()}
                </span>
              </div>
              <div className="rounded-full bg-white text-black flex justify-center items-center w-[140px] h-[60px] mx-5">
                <span className="text-24/32 font-semibold">
                  {matchData?.match_status === MATCH_STATUS.UPCOMING
                    ? "-"
                    : matchData?.ft_home_score || 0}
                </span>
                <span className="text-24/32 font-semibold mx-2">:</span>
                <span className="text-24/32 font-semibold">
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
                <span className="text-20/32 font-semibold capitalize">
                  {matchData.away_name.toLowerCase()}
                </span>
              </div>
            </div>

            <div
              className={clsx(
                "text-white text-14/20 px-5 py-1.5 rounded-md mt-5 font-semibold bg-[#3A0013]",
                isEnded ? "bg-[#3A0013]" : "bg-[#257632]",
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
            <p className="mt-4 bold text-14/20">Please select a match.</p>
          </>
        )}
      </div>

      <div className="grid grid-cols-2 h-12 cursor-pointer">
        {nav.map((item: any) => (
          <div
            className={clsx(
              "flex justify-center items-center text-center text-14/20 font-bold",
              selectedNav === item.value
                ? "bg-[#3A0013] text-white"
                : "bg-white opacity-50 text-black",
            )}
            key={item.value}
            onClick={() => setSelectedNav(item.value)}
          >
            {item.label}
          </div>
        ))}
      </div>

      {selectedNav === 1 ? (
        <MatchQuestions
          account={account}
          dataQuestion={matchData}
          isWrongChain={isWrongChain}
        />
      ) : (
        <MatchGuide isDetailGuide />
      )}
    </div>
  );
};

export default MatchListRight;
