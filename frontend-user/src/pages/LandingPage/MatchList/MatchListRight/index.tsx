import clsx from "clsx";
import moment from "moment";
import { useEffect, useState } from "react";
import { MATCH_STATUS } from "../../../../constants";
import useFetch from "../../../../hooks/useFetch";
import usePredictConditions from "../../../../hooks/usePredictConditions";
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

  const [selectedNav, setSelectedNav] = useState<number>(1);
  const predictConditions = usePredictConditions();

  useEffect(() => {
    setSelectedNav(
      account &&
        !isWrongChain &&
        matchId &&
        predictConditions.gasFee &&
        predictConditions.birdToken
        ? 1
        : 2,
    );
  }, [account, matchId]);

  const fetchMatchDetailUrl = `/match/detail/${matchId}?wallet_address=${account}`;
  const { data } = useFetch<any>(fetchMatchDetailUrl, !!matchId, true);

  const matchData = data?.data;
  const startTime = new Date(matchData?.start_time * 1000);
  const matchTime = moment(startTime).format("Do MMM YY, HH:mm");

  const isEnded = moment(new Date()).diff(startTime, "minutes") >= 90;
  const isLiving = startTime.getTime() <= new Date().getTime() && !isEnded;

  const getMatchScore = (score: any) =>
    [MATCH_STATUS.LIVE, MATCH_STATUS.FINISHED].includes(matchData?.match_status)
      ? score || 0
      : "-";

  return (
    <div className="flex flex-col rounded-lg">
      <div
        className={clsx(
          "flex flex-col items-center justify-center text-center h-auto min-h-[260px] md:min-h-[280px] text-white rounded-t-[4px]",
          styles.backgroundStadium,
        )}
      >
        {matchData ? (
          <>
            <span className="text-14/20 md:text-20/32 uppercase font-bold">
              {matchTime}
            </span>
            <span className="text-14/24 md:text-16/24 mt-1">
              {matchData?.stadium}
            </span>
            <div className="flex justify-between items-center w-full max-w-[660px] mt-7 md:mt-5">
              <div className="flex flex-col items-center flex-1">
                <img
                  src={getImgSrc(matchData.home_icon)}
                  className="w-[40px] h-[40px] md:w-[60px] md:h-[60px] m-auto rounded-full"
                  alt=""
                />
                <span className="text-16/20 md:text-20/32 font-semibold capitalize mt-1 md:mt-2">
                  {matchData.home_name.toLowerCase()}
                </span>
              </div>
              <div>
                <div className="rounded-full bg-white text-black flex justify-center items-center w-[90px] h-[40px] md:w-[140px] md:h-[60px] mx-5">
                  <span className="text-18/24 md:text-24/32 font-semibold">
                    {getMatchScore(matchData?.ft_home_score)}
                  </span>
                  <span className="text-18/24 md:text-24/32 font-semibold mx-2">
                    :
                  </span>
                  <span className="text-18/24 md:text-24/32 font-semibold">
                    {getMatchScore(matchData?.ft_away_score)}
                  </span>
                </div>
                {[MATCH_STATUS.LIVE, MATCH_STATUS.FINISHED].includes(
                  matchData?.match_status,
                ) && matchData?.is_half_time ? (
                  <span className="mt-2.5 opacity-70 text-12/18 md:text-16/24">
                    (1st half {matchData?.ht_home_score}-
                    {matchData?.ht_away_score})
                  </span>
                ) : null}
              </div>
              <div className="flex flex-col flex-1">
                <img
                  src={getImgSrc(matchData.away_icon)}
                  className="w-[40px] h-[40px] md:w-[60px] md:h-[60px] m-auto rounded-full"
                  alt=""
                />
                <span className="text-16/20 md:text-20/32 font-semibold capitalize mt-1 md:mt-2">
                  {matchData.away_name.toLowerCase()}
                </span>
              </div>
            </div>

            <div
              className={clsx(
                "text-white text-14/20 mx-3 px-5 py-1.5 rounded-md mt-5 font-semibold bg-[#3A0013]",
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
            <img
              src="/images/select-match.png"
              alt=""
              className="w-[120px] h-[120px] md:w-[100px] md:h-[100px]"
            />
            <p className="mt-4 bold text-14/20">Please select a match.</p>
          </>
        )}
      </div>

      <div className="grid grid-cols-2 h-12 cursor-pointer">
        {nav.map((item: any) => (
          <div
            className={clsx(
              "flex justify-center items-center text-center text-12/18 tracking-[1px] font-bold md:text-14/20 md:tracking-[2px]",
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
