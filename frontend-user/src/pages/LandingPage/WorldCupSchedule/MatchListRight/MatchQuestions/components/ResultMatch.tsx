// import { BigNumber } from "ethers";
import { useWeb3React } from "@web3-react/core";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { API_BASE_URL, QUESTION_STATUS } from "../../../../../../constants";
import { BIRD_CHAIN_ID } from "../../../../../../constants/networks";
import useBettingContract from "../../../../../../hooks/useBettingContract";
import useClaimToken from "../../../../../../hooks/useClaimToken";
import { fetcher } from "../../../../../../hooks/useFetch";
import { convertHexToStringNumber } from "../../../../../../utils";

type ResultMatchProps = {
  questions: any;
  questionStatus?: any;
};
const ResultMatch = (props: ResultMatchProps) => {
  const { questions, questionStatus } = props;

  const [loadingClaim, setLoadingClaim] = useState<boolean>(false);
  const [isClaimed, setIsClaimed] = useState<boolean>(false);
  const [recheckClaim, setRecheckClaim] = useState<boolean>(false); // using after user claim successful

  const { claimToken } = useClaimToken();
  const { checkClaimed } = useBettingContract();
  const { chainId } = useWeb3React();
  const isWrongChain = useMemo(() => !(chainId === +BIRD_CHAIN_ID), [chainId]);

  useEffect(() => {
    if (!questions || questionStatus !== QUESTION_STATUS.CORRECT_ANSWER) return;
    if (isWrongChain) return;

    const checkUserClaimed = async () => {
      const claimed = await checkClaimed(
        questions.match_id,
        questions.bet_type,
      );
      setIsClaimed(claimed);
    };

    checkUserClaimed();
  }, [questions, recheckClaim]);

  const displayEarnedAmount = () => {
    const amount = questions?.result_num;
    if (!amount) return "Updating...";

    if (amount < 0) return "0 $BIRD";

    return convertHexToStringNumber(amount) + " $BIRD";
  };

  const handleClaimToken = async () => {
    if (!questions) {
      toast.error("Question not found!");
      return;
    }

    const payload = {
      match_id: questions?.match_id,
      bet_type: questions?.bet_type,
      wallet: questions?.user_address,
      amount: questions?.total_claim,
    };
    // console.log("claim", payload);
    setLoadingClaim(true);

    fetcher(`${API_BASE_URL}/claim/get-sig`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then(async (res) => {
        const { amount, bet_type, match_id } = payload;

        const rawSignature = res?.data;
        const signMessage = {
          deadline: rawSignature?.deadline,
          v: rawSignature?.v,
          r: rawSignature?.r?.data,
          s: rawSignature?.s?.data,
        };

        await claimToken(match_id, bet_type, amount, signMessage);
        setRecheckClaim((prevState) => !prevState);

        setLoadingClaim(false);
      })
      .catch((err: any) => {
        setLoadingClaim(false);
        console.log("ERR get signature: ", err);
      });
  };

  return (
    <div className="mt-10">
      <div className="bg-orange-100 p-5 grid grid-cols-2 gap-y-5">
        <div className="flex flex-col">
          <span>Deposit Amount:</span>
          <span className="font-semibold">
            {questions?.bet_amount
              ? convertHexToStringNumber(questions?.bet_amount)
              : "0"}{" "}
            $BIRD
          </span>
        </div>
        <div className="flex flex-col">
          <span>Match Result</span>
          {questionStatus !== QUESTION_STATUS.CORRECT_ANSWER &&
            questionStatus !== QUESTION_STATUS.WRONG_ANSWER && (
              <span className="font-semibold">Updating...</span>
            )}
          {questionStatus === QUESTION_STATUS.CORRECT_ANSWER && (
            <div className="flex">
              <img
                src="images/icon-correct-answer.svg"
                alt=""
                className="mr-2"
              />
              <span className="font-semibold text-green-600">
                Correct answer
              </span>
            </div>
          )}
          {questionStatus === QUESTION_STATUS.WRONG_ANSWER && (
            <div className="flex">
              <img src="images/icon-wrong-answer.svg" alt="" className="mr-2" />
              <span className="font-semibold text-red-600">Wrong answer</span>
            </div>
          )}
        </div>
        <div className="flex flex-col">
          <span>Earned amount</span>
          <span className="font-semibold">{displayEarnedAmount()}</span>
        </div>
        <div className="flex flex-col">
          <span>Amount to claim</span>
          <span className="font-semibold">
            {convertHexToStringNumber(questions?.total_claim) + " $BIRD"}
          </span>
        </div>
      </div>

      {questionStatus === QUESTION_STATUS.CORRECT_ANSWER && (
        <div className="mt-5 flex">
          {!isClaimed && (
            <button
              className="px-10 py-2 bg-black text-white rounded-xl mr-10"
              onClick={handleClaimToken}
              disabled={loadingClaim}
            >
              {loadingClaim ? "Loading" : "Claim token"}
            </button>
          )}
          <a
            href="/history"
            className="px-10 py-2 border-2 border-black rounded-xl flex items-center"
          >
            My history
            <img src="/images/icon-next.svg" alt="" className="ml-2" />
          </a>
        </div>
      )}
    </div>
  );
};

export default ResultMatch;
