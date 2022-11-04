import { useState } from "react";
import { QuestionProps } from "..";
import { QUESTION_STATUS } from "../../../../../../constants";
import BorderBox from "../components/BorderBox";
import InputNumber from "../components/InputNumber";
import NotificationBox from "../components/NotificationBox";
import Question from "../components/Question";

const FirstQuestion = (props: QuestionProps) => {
  const { dataQuestion = {}, title } = props;
  const isSubmitted = dataQuestion && true;
  const matchStatus = !dataQuestion
    ? QUESTION_STATUS.NOT_PREDICTED
    : QUESTION_STATUS.PREDICTED;
  const error = "";

  const [inputTeam1, setInputTeam1] = useState<string>("");
  const [inputTeam2, setInputTeam2] = useState<string>("");

  const handleChangeInputTeam1 = (value: string) => {
    setInputTeam1(value);
  };
  const handleChangeInputTeam2 = (value: string) => {
    setInputTeam2(value);
  };

  const handleSubmit = () => {
    console.log("click submit");
  };

  return (
    <Question
      title={title}
      handleSubmit={handleSubmit}
      isSubmitted={isSubmitted}
    >
      <div>
        <div className="flex items-center">
          <BorderBox label="Qatar" icon="/images/icon-qatar.svg" />
          <div className="flex space-x-5 items-baseline mx-10">
            <InputNumber
              input={dataQuestion.home_score || inputTeam1}
              handleChange={handleChangeInputTeam1}
              type={matchStatus}
            />
            <span className="text-4xl font-semibold block">:</span>
            <InputNumber
              input={dataQuestion.away_score || inputTeam2}
              handleChange={handleChangeInputTeam2}
              type={matchStatus}
            />
          </div>
          <BorderBox label="Ecuador" icon="/images/icon-ecuador.svg" />
        </div>
        {error && <p className="text-red-600 font-semibold mt-2">{error}</p>}
        <div>{isSubmitted && <NotificationBox type={matchStatus} />}</div>
      </div>
    </Question>
  );
};

export default FirstQuestion;
