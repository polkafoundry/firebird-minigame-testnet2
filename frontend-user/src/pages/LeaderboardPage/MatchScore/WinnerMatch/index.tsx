import clsx from "clsx";
import useFetch from "../../../../hooks/useFetch";
import { displayWalletAddress } from "../../../../utils";
import styles from "./winnerMatch.module.scss";

type MatchListRightProps = {
  matchId: number | undefined;
  reward: string;
  account: string;
};

const WinnerMatch = (props: MatchListRightProps) => {
  const { matchId, reward, account } = props;

  const { data } = useFetch<any>(
    `/predict/predict-winner-in-match?match_id=${matchId}`,
    !!matchId,
  );

  const matchData = data?.data;
  console.log("matchData :>> ", matchData);

  const isWinner = account === matchData?.finalWinner;

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
            <div className="flex text-left items-center">
              <img
                src="./images/landing-page/predicted-winner.png"
                alt=""
                className="w-[100px] h-[100px]"
              />
              <div className="ml-3 flex flex-col">
                <span className="text-14/20 uppercase font-bold font-inter opacity-70">
                  {reward} rewards winner is
                </span>
                <span className="text-24/32 mt-1 font-tthoves font-semibold">
                  {matchData?.finalWinner
                    ? displayWalletAddress(matchData?.finalWinner)
                    : "No winner"}
                </span>
              </div>
            </div>

            <div
              className={clsx(
                "text-white text-14/20 px-5 py-1.5 rounded-md mt-5 font-semibold bg-[#3A0013]",
                !isWinner ? "bg-[#3A0013]" : "bg-[#257632]",
              )}
            >
              {!isWinner
                ? "Unfortunately, you did not win this match reward."
                : "Congratulations! You have won " + reward + "."}
            </div>
            <a
              href=""
              target="_blank"
              rel="noreferrer"
              className="bg-black px-8 py-2 mt-3 rounded-lg"
            >
              View transaction
            </a>
          </>
        ) : (
          <>
            <img src="./images/select-match.png" alt="" />
            <p className="mt-4 bold text-14/20">Please select a match.</p>
          </>
        )}
      </div>

      <div className="grid grid-cols-2 h-12 cursor-pointer"></div>
    </div>
  );
};

export default WinnerMatch;
