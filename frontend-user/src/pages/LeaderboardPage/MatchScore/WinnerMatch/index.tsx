import clsx from "clsx";
import DefaultLoading from "../../../../components/base/DefaultLoading";
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

  const { data, loading } = useFetch<any>(
    `/predict/predict-winner-in-match?match_id=${matchId}`,
    !!matchId,
  );
  const matchData = data?.data;
  const listWinner = matchData?.listWinner;

  const isWinner = matchData?.finalWinner && account === matchData?.finalWinner;

  return (
    <div className="flex flex-col rounded-lg bg-[#F2F2F2] h-full">
      <div
        className={clsx(
          "flex flex-col items-center justify-center text-center h-auto min-h-[280px] text-white",
          styles.backgroundStadium,
        )}
      >
        {matchData ? (
          <>
            <div className="flex flex-col xs:flex-row text-center md:text-left items-center">
              <img
                src="./images/landing-page/predicted-winner.png"
                alt=""
                className="w-[100px] h-[100px]"
              />
              <div className="ml-3 flex flex-col">
                <span className="text-14/20 tracking-[2px] uppercase font-bold font-inter opacity-70">
                  {reward} rewards winner is
                </span>
                <span className="text-24/32 md:mt-1 font-tthoves font-semibold">
                  {matchData?.finalWinner
                    ? displayWalletAddress(matchData?.finalWinner)
                    : "No winner"}
                </span>
              </div>
            </div>

            <div
              className={clsx(
                "text-white text-14/20 px-5 py-1.5 rounded-md mt-3 md:mt-5 font-semibold bg-[#3A0013]",
                !isWinner ? "bg-[#3A0013]" : "bg-[#257632]",
              )}
            >
              {!isWinner
                ? "Unfortunately, you did not win this match reward."
                : "Congratulations! You have won " + reward + "."}
            </div>
            {matchData?.finalWinner && (
              <a
                href={"https://firefly.birdscan.io/tx/" + matchData?.tx}
                target="_blank"
                rel="noreferrer"
                className="bg-black px-8 py-2 mt-3 rounded-lg font-semibold font-tthoves text-14/20"
              >
                View transaction
              </a>
            )}
          </>
        ) : (
          <>
            <img src="./images/select-match.png" alt="" />
            <p className="mt-4 bold text-14/20">Please select a match.</p>
          </>
        )}
      </div>

      <div className={clsx("md:p-5 max-h-full", styles.scrollLayout)}>
        {!matchId ? (
          <div className="p-5 md:p-0 text-16/24 font-semibold text-center">
            Please Select Match First
          </div>
        ) : (
          <div className={clsx("relative", loading && "min-h-[400px]")}>
            {loading && <DefaultLoading />}

            <div className="flex bg-[#3A0013] text-white text-12/18 font-inter font-bold uppercase px-5 py-3">
              <div className="opacity-80 w-[20%]">No</div>
              <div className="opacity-80 flex-1 text-right xs:text-left">
                Wallet address
              </div>
            </div>
            {!loading && (!listWinner || !listWinner.length) ? (
              <div>Not found</div>
            ) : (
              <div className="">
                {listWinner?.map((item: any, index: number) => (
                  <div
                    key={item.id}
                    className="flex items-center text-14/24 font-inter px-5 py-2 bg-white border-b-2 border-[#F2F2F2]"
                  >
                    <div className="w-[20%]">{index + 1}</div>
                    <div className="flex-1 text-right xs:text-left">
                      {item?.user_address &&
                        displayWalletAddress(item?.user_address)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default WinnerMatch;
