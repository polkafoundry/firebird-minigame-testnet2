import clsx from "clsx";
import { QUESTION_STATUS } from "../../../../../../constants";
import { convertHexToStringNumber } from "../../../../../../utils";

type ResultMatchProps = {
  questions: any;
  questionStatus?: any;
  isClaimed?: boolean;
  loadingClaim?: boolean;
  handleClaimToken?: any;
  updateBirdBalance?: any;
};
const ResultMatch = (props: ResultMatchProps) => {
  const {
    questions,
    questionStatus,
    isClaimed,
    loadingClaim,
    handleClaimToken,
    updateBirdBalance,
  } = props;

  const displayEarnedAmount = () => {
    const amount = questions?.result_num;
    if (!amount) return "Updating...";

    if (amount < 0) return "0 $BIRD";

    return convertHexToStringNumber(amount) + " $BIRD";
  };
  const displayTotalClaim = () => {
    const total_claim = questions?.total_claim;
    if (!total_claim) return "Updating...";

    if (questionStatus !== QUESTION_STATUS.CORRECT_ANSWER) return "0 $BIRD";

    return convertHexToStringNumber(total_claim) + " $BIRD";
  };

  const onClaim = () => {
    handleClaimToken();
    updateBirdBalance();
  };

  return (
    <div className="mt-3 px-3 xs:px-16">
      <div className="bg-[#F2F2F2] p-5 grid grid-cols-1 xs:grid-cols-2 gap-y-5">
        <div className="flex flex-col">
          <span className="font-inter text-12/18 font-bold opacity-50 uppercase">
            Deposit Amount:
          </span>
          <span className="font-semibold text-16/20 font-tthoves mt-1">
            {questions?.bet_amount
              ? convertHexToStringNumber(questions?.bet_amount)
              : "0"}{" "}
            $BIRD
          </span>
        </div>
        <div className="flex flex-col">
          <span className="font-inter text-12/18 font-bold opacity-50 uppercase">
            Match Result
          </span>
          <div className="text-16/20 font-tthoves mt-1">
            {questionStatus !== QUESTION_STATUS.CORRECT_ANSWER &&
              questionStatus !== QUESTION_STATUS.WRONG_ANSWER && (
                <span className="font-semibold">Updating...</span>
              )}
            {questionStatus === QUESTION_STATUS.CORRECT_ANSWER && (
              <div className="flex">
                <img
                  src="images/icon-correct-answer.svg"
                  alt=""
                  className="mr-1"
                />
                <span className="font-semibold text-[#14B64D]">
                  Correct answer
                </span>
              </div>
            )}
            {questionStatus === QUESTION_STATUS.WRONG_ANSWER && (
              <div className="flex">
                <img
                  src="images/icon-wrong-answer.svg"
                  alt=""
                  className="mr-1"
                />
                <span className="font-semibold text-[#FF3E57]">
                  Wrong answer
                </span>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col">
          <span className="font-inter text-12/18 font-bold opacity-50 uppercase">
            Earned amount
          </span>
          <span className="font-semibold text-16/20 font-tthoves mt-1">
            {displayEarnedAmount()}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="font-inter text-12/18 font-bold opacity-50 uppercase">
            Amount to claim
          </span>
          <span className="font-semibold text-16/20 font-tthoves mt-1">
            {displayTotalClaim()}
            {questionStatus === QUESTION_STATUS.CORRECT_ANSWER && isClaimed && (
              <span className="text-12/20 font-normal"> (Claimed)</span>
            )}
          </span>
        </div>
      </div>

      <div className="mt-3 flex flex-col xs:flex-row justify-center text-14/20 font-tthoves font-semibold text-white">
        {questionStatus === QUESTION_STATUS.CORRECT_ANSWER && (
          <button
            className={clsx(
              "w-full xs:w-auto text-center px-10 py-2 bg-main rounded-lg mr-2",
              isClaimed && "pointer-events-none opacity-50",
            )}
            onClick={onClaim}
            disabled={loadingClaim}
          >
            Claim token
          </button>
        )}
        <a
          href="/history"
          target={"_blank"}
          rel="norefferer"
          className="w-full xs:w-auto text-center px-10 py-2 bg-black rounded-lg"
        >
          My history
        </a>
      </div>
    </div>
  );
};

export default ResultMatch;
