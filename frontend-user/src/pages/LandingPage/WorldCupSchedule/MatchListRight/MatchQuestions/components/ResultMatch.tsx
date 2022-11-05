import { QUESTION_STATUS } from "../../../../../../constants";
import { convertHexToStringNumber } from "../../../../../../utils";

type ResultMatchProps = {
  questions: any;
  questionStatus?: any;
};
const ResultMatch = (props: ResultMatchProps) => {
  const { questions, questionStatus } = props;

  // TODO: has_claim, result, result_num

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
          <span className="font-semibold">
            {questions?.results?.earned
              ? questions?.results?.earned + " $BIRD"
              : "Updating..."}
          </span>
        </div>
        <div className="flex flex-col">
          <span>Amount to claim</span>
          <span className="font-semibold">
            {questions?.results?.claim
              ? questions?.results?.claim +
                " $BIRD" +
                (questions?.results?.isClaimed ? " (Claimed)" : "")
              : "Updating..."}
          </span>
        </div>
      </div>
      {questionStatus === QUESTION_STATUS.CORRECT_ANSWER ||
        (questionStatus === QUESTION_STATUS.WRONG_ANSWER && (
          <div className="mt-5 flex">
            {Number(questions?.results?.claim) > 0 &&
              !questions?.results?.isClaimed && (
                <button className="px-10 py-2 bg-black text-white rounded-xl mr-10">
                  Claim token
                </button>
              )}
            <button className="px-10 py-2 border-2 border-black rounded-xl flex items-center">
              My history
              <img src="/images/icon-next.svg" alt="" className="ml-2" />
            </button>
          </div>
        ))}
    </div>
  );
};

export default ResultMatch;
