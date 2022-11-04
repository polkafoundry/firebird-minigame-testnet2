import { useState } from "react";
import { QuestionProps } from "..";
import BorderBox from "../components/BorderBox";
import InputNumber from "../components/InputNumber";
import NotificationBox from "../components/NotificationBox";
import Question from "../components/Question";

const FirstQuestion = (props: QuestionProps) => {
  const { dataQuestion = {} } = props;

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
      title="1. What will the match score be?"
      handleSubmit={handleSubmit}
      isSubmitted={dataQuestion?.isSubmitted}
    >
      <div>
        <div className="flex items-center">
          <BorderBox label="Qatar" icon="/images/icon-qatar.svg" />
          <div className="flex space-x-5 items-baseline mx-10">
            <InputNumber
              input={inputTeam1}
              handleChange={handleChangeInputTeam1}
              type={dataQuestion?.matchStatus}
            />
            <span className="text-4xl font-semibold block">:</span>
            <InputNumber
              input={inputTeam2}
              handleChange={handleChangeInputTeam2}
              type={dataQuestion?.matchStatus}
            />
          </div>
          <BorderBox label="Ecuador" icon="/images/icon-ecuador.svg" />
        </div>
        {dataQuestion?.error && (
          <p className="text-red-600 font-semibold mt-2">
            {dataQuestion?.error}
          </p>
        )}
        <div>
          {dataQuestion?.isSubmitted && (
            <NotificationBox type={dataQuestion?.matchStatus} />
          )}
        </div>
      </div>
    </Question>
  );
};

export default FirstQuestion;
