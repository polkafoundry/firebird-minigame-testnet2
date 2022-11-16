import clsx from "clsx";
import {
  MATCH_STATUS,
  QUESTION_STATUS,
  SCORE_PATTER,
} from "../../../../../../constants";

type InputNumberProps = {
  input: string;
  handleChange: (data: any) => void;
  className?: string;
  questionStatus: QUESTION_STATUS;
  matchStatus: string;
};

type InputScoreProps = {
  inputTeam1: string;
  inputTeam2: string;
  handleChangeInputTeam1: (data: any) => void;
  handleChangeInputTeam2: (data: any) => void;
  questionStatus: QUESTION_STATUS;
  matchStatus: string;
};

const InputNumber = (props: InputNumberProps) => {
  const {
    input,
    handleChange,
    className = "",
    matchStatus,
    questionStatus,
  } = props;

  const onChange = (e: any) => {
    const valueInput = e.target.value;
    if (SCORE_PATTER.test(valueInput) || valueInput === "") {
      handleChange(valueInput);
    }
  };

  const getInputStyle = () => {
    switch (questionStatus) {
      case QUESTION_STATUS.NOT_PREDICTED:
      case QUESTION_STATUS.PREDICTED:
        return "bg-[#F2F2F2] rounded-lg";
      case QUESTION_STATUS.WINNER:
      case QUESTION_STATUS.CORRECT_ANSWER:
        return "text-[#14B64D] bg-[#e8f8ee]";
      case QUESTION_STATUS.WRONG_ANSWER:
        return "text-[#FF3E57] bg-[#ffecef]";
      default:
        return "bg-white";
    }
  };

  return (
    <input
      type="text"
      className={clsx(
        "w-12 h-12 p-2 text-18/24 font-semibold text-center outline-none rounded-lg",
        getInputStyle(),
        className,
      )}
      disabled={[MATCH_STATUS.FINISHED, MATCH_STATUS.LIVE].includes(
        matchStatus,
      )}
      value={input}
      placeholder="0"
      onChange={onChange}
    />
  );
};

const InputScore = (props: InputScoreProps) => {
  const {
    inputTeam1,
    inputTeam2,
    handleChangeInputTeam1,
    handleChangeInputTeam2,
    questionStatus,
    matchStatus,
  } = props;

  return (
    <div className="flex space-x-5 items-baseline">
      <InputNumber
        input={inputTeam1}
        handleChange={handleChangeInputTeam1}
        questionStatus={questionStatus}
        matchStatus={matchStatus}
      />
      <span
        className={clsx(
          "text-24/32 font-semibold block",
          [QUESTION_STATUS.CORRECT_ANSWER, QUESTION_STATUS.WINNER].includes(
            questionStatus,
          ) && "text-[#14B64D]",
          questionStatus === QUESTION_STATUS.WRONG_ANSWER && "text-[#FF3E57]",
        )}
      >
        :
      </span>
      <InputNumber
        input={inputTeam2}
        handleChange={handleChangeInputTeam2}
        questionStatus={questionStatus}
        matchStatus={matchStatus}
      />
    </div>
  );
};

export default InputScore;
