import { useState } from "react";
import { QuestionProps } from "..";
import { QUESTION_STATUS } from "../../../../../../constants";
import BorderBox from "../components/BorderBox";
import InputNumber from "../components/InputNumber";
import NotificationBox from "../components/NotificationBox";
import Question from "../components/Question";

const PredictQuestion = (props: QuestionProps) => {
  const { dataQuestion = {}, title } = props;
  const isSubmitted =
    dataQuestion?.questionStatus === QUESTION_STATUS.PREDICTED;
  const questionStatus = dataQuestion?.questionStatus;
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
    const dataSubmit = {
      _matchID: dataQuestion?.match_id,
      _homeScore: inputTeam1,
      _awayScore: inputTeam2,
    };

    console.log("submit q1", dataSubmit);
  };

  return (
    <Question
      title={title}
      handleSubmit={handleSubmit}
      isSubmitted={isSubmitted}
    >
      <div>
        <div className="flex items-center justify-between">
          <BorderBox
            label={dataQuestion?.home_name}
            icon={dataQuestion?.home_icon}
          />
          <div className="flex space-x-5 items-baseline">
            <InputNumber
              input={dataQuestion?.home_score || inputTeam1}
              handleChange={handleChangeInputTeam1}
              type={questionStatus}
            />
            <span className="text-4xl font-semibold block">:</span>
            <InputNumber
              input={dataQuestion?.away_score || inputTeam2}
              handleChange={handleChangeInputTeam2}
              type={questionStatus}
            />
          </div>
          <BorderBox
            label={dataQuestion.away_name}
            icon={dataQuestion.away_icon}
          />
        </div>
        {error && <p className="text-red-600 font-semibold mt-2">{error}</p>}
        <div>{isSubmitted && <NotificationBox type={questionStatus} />}</div>
      </div>
    </Question>
  );
};

export default PredictQuestion;
