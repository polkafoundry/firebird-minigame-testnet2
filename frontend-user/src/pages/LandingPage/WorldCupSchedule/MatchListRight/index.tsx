import clsx from "clsx";
import moment from "moment";
import { useEffect, useState } from "react";
import useFetch from "../../../../hooks/useFetch";
import { getImgSrc } from "../utils";
import MatchQuestions from "./MatchQuestions";
import MatchGuide from "./MathGuide";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const queryString = require("query-string");

type MatchListRightProps = {
  matchId: number | undefined;
};

const fakeDetail = {
  dateTime: "20th Nov 22, 23:00",
  stadium: "Al Bayt",
  firstTeamName: "Quatar",
  firstTeamScore: "2",
  firstTeamLogo: "/images/fake-team-logo.png",
  secondTeamName: "Ecuador",
  secondTeamScore: "0",
  secondTeamLogo: "/images/fake-team-logo.png",
  endTime: "20th Nov 22, 23:00",
};

const nav = [
  { value: 1, label: "QUESTIONS" },
  { value: 2, label: "GUIDE" },
];

const MatchListRight = (props: MatchListRightProps) => {
  const { matchId } = props;

  const { data } = useFetch<any>(
    "/match/detail/" +
      matchId +
      "?" +
      queryString.stringify({
        wallet_address: "0xf6541439A90E7e340E913A2D70Dc1Ee283D1E90A",
      }),
  );

  const matchData = data?.data;

  const startTime = new Date(matchData?.start_time * 1000);
  const matchTime = moment(startTime).format("Do MMM YY, HH:MM");

  console.log("questionData :>> ", data);

  const [selectedNav, setSelectedNav] = useState<number>(1);

  useEffect(() => {
    if (!matchId) return;
    console.log(matchId);
  }, [matchId]);

  const isEnded = moment(startTime).diff(new Date(), "hours") < 1;

  return (
    <div className="flex flex-col rounded-lg ml-6 border-2 border-gray-600">
      <div className="flex flex-col items-center justify-center text-center h-auto min-h-[280px] bg-gray-700 text-white">
        {data && matchData ? (
          <>
            <span className="">{matchTime}</span>
            <span className="">{matchData?.stadium}</span>
            <div className="flex justify-between w-full max-w-[360px]">
              <div className="flex flex-col items-center gap-2 flex-1">
                <img
                  src={getImgSrc(matchData.home_icon)}
                  className="w-[65px] h-[65px] m-auto rounded-full"
                  alt=""
                />
                <span className="text-xl">{matchData.home_name}</span>
              </div>
              <div>
                <span className="leading-[65px] text-[52px] font-semibold">
                  {fakeDetail.firstTeamScore}
                </span>
                <span className="leading-[65px] text-[52px] font-semibold">
                  :
                </span>
                <span className="leading-[65px] text-[52px] font-semibold">
                  {fakeDetail.secondTeamScore}
                </span>
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <img
                  src={getImgSrc(matchData.away_icon)}
                  className="w-[65px] h-[65px] m-auto rounded-full"
                  alt=""
                />
                <span className="text-xl">{matchData.away_name}</span>
              </div>
            </div>

            <div
              className={clsx(
                "text-black text-sm px-2 rounded-md mt-5 font-semibold",
                isEnded ? "bg-main" : "bg-gray-500",
              )}
            >
              {isEnded
                ? "Prediction for this match has been closed."
                : `Predictions will be closed at ${moment(startTime)
                    .add(1, "hours")
                    .format("Do MMM YY, HH:MM")}`}
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
        <MatchQuestions dataQuestion={matchData} />
      ) : (
        <MatchGuide isDetailGuide />
      )}
    </div>
  );
};

export default MatchListRight;
