import clsx from "clsx";
import { useEffect, useState } from "react";
import useFetch from "../../../../hooks/useFetch";
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

  const { data: questions } = useFetch<any>(
    "/match/detail/" +
      matchId +
      "?" +
      queryString.stringify({
        wallet_address: "0xf6541439A90E7e340E913A2D70Dc1Ee283D1E90A",
      }),
  );

  console.log("questionData :>> ", questions);

  const [selectedNav, setSelectedNav] = useState<number>(1);
  // const [matchDetail, setMatchDetail] = useState<any>({});

  useEffect(() => {
    if (!matchId) return;
    console.log(matchId);
  }, [matchId]);

  const isEnded = true;

  return (
    <div className="flex flex-col rounded-lg ml-6 border-2 border-gray-600">
      <div className="flex flex-col items-center justify-center text-center h-auto min-h-[280px] bg-gray-700 text-white">
        {questions && questions?.data ? (
          <>
            <span className="">{fakeDetail?.dateTime}</span>
            <span className="">{fakeDetail?.stadium}</span>
            <div className="flex justify-between w-full max-w-[360px]">
              <div className="flex flex-col gap-2">
                <img
                  src={fakeDetail.firstTeamLogo}
                  className="w-[65px] h-65px] rounded-full"
                  alt=""
                />
                <span className="text-xl">{fakeDetail.firstTeamName}</span>
              </div>
              <span className="leading-[65px] text-[52px] font-semibold">
                {fakeDetail.firstTeamScore}
              </span>
              <span className="leading-[65px] text-[52px] font-semibold">
                :
              </span>
              <span className="leading-[65px] text-[52px] font-semibold">
                {fakeDetail.secondTeamScore}
              </span>
              <div className="flex flex-col gap-2">
                <img
                  src={fakeDetail.secondTeamLogo}
                  className="w-[65px] h-65px] rounded-full"
                  alt=""
                />
                <span className="text-xl">{fakeDetail.secondTeamName}</span>
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
                : `Predictions will be closed at ${fakeDetail.endTime}`}
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
        <MatchQuestions dataQuestion={questions?.data} />
      ) : (
        <MatchGuide isDetailGuide />
      )}
    </div>
  );
};

export default MatchListRight;
