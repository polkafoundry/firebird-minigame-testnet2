import { BigNumber } from "ethers";
import { toast } from "react-toastify";
import { API_BASE_URL, QUESTION_STATUS } from "../../../../../../constants";
import useClaimToken from "../../../../../../hooks/useClaimToken";
import { fetcher } from "../../../../../../hooks/useFetch";
import usePost from "../../../../../../hooks/usePost";
import useWalletSignature from "../../../../../../hooks/useWalletSignature";
import { convertHexToStringNumber } from "../../../../../../utils";

type ResultMatchProps = {
  questions: any;
  questionStatus?: any;
};
const ResultMatch = (props: ResultMatchProps) => {
  const { questions, questionStatus } = props;

  const { claimToken } = useClaimToken();

  const displayEarnedAmount = () => {
    const amount = questions?.result_num;
    if (!amount) return "Updating...";

    if (amount < 0) return "0 $BIRD";

    return convertHexToStringNumber(amount) + " $BIRD";
  };

  const getAmountToClaim = () => {
    if (!questions?.result_num) return "Updating...";
    if (questionStatus === QUESTION_STATUS.WRONG_ANSWER) return "0 $BIRD";

    const amount = BigNumber.from(questions.bet_amount).add(
      BigNumber.from(questions.result_num),
    );

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
    console.log("claim", payload);

    fetcher(`${API_BASE_URL}/claim/get-sig`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then(async (res) => {
        // console.log("sig", res?.data);

        const { amount, bet_type, match_id } = payload;

        const rawSignature = res?.data;
        const signMessage = {
          deadline: rawSignature?.deadline,
          v: rawSignature?.v,
          r: rawSignature?.r?.data,
          s: rawSignature?.s?.data,
        };
        console.log("signMessage", signMessage);

        await claimToken(match_id, bet_type, amount, signMessage);
      })
      .catch((err: any) => {
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
          {/* {Number(questions?.results?.claim) > 0 &&
              !questions?.results?.isClaimed && ( */}
          <button
            className="px-10 py-2 bg-black text-white rounded-xl mr-10"
            onClick={handleClaimToken}
          >
            Claim token
          </button>
          {/* )} */}
          <button className="px-10 py-2 border-2 border-black rounded-xl flex items-center">
            My history
            <img src="/images/icon-next.svg" alt="" className="ml-2" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ResultMatch;
