import clsx from "clsx";
import { useState } from "react";
import { QuestionProps } from "..";
import { QUESTION_STATUS } from "../../../../../../constants";
import BorderBox from "../components/BorderBox";
import DepositAmount from "../components/DepositAmount";
import Question from "../components/Question";
import ResultMatch from "../components/ResultMatch";
import { getOptionColorFromIndex } from "../components/utils";

const SecondQuestion = (props: QuestionProps) => {
  const { dataQuestion = {}, title } = props;
  const isSubmitted = dataQuestion && true;
  const matchStatus = !dataQuestion
    ? QUESTION_STATUS.NOT_PREDICTED
    : QUESTION_STATUS.PREDICTED;
  const errors: string[] = [];
  const [optionWhoWin, setOptionWhoWin] = useState<number>(0);
  const [depositAmount, setDepositAmount] = useState<string>("0");

  const handleSubmit = () => {
    console.log("click submit");
  };
  const handleChangeOptionWhoWin = (option: number) => {
    setOptionWhoWin(option);
  };
  const handleChangeDepositAmount = (value: string) => {
    setDepositAmount(value);
  };

  return (
    <Question
      title={title}
      handleSubmit={handleSubmit}
      isSubmitted={isSubmitted}
    >
      <div>
        <div className="flex items-start justify-between">
          {dataQuestion?.options?.map((option: any, index: number) => (
            <div
              key={index}
              className={clsx(
                "flex flex-col items-center w-full",
                option?.label === "Draw" ? "max-w-[100px]" : "max-w-[180px]",
              )}
            >
              <BorderBox
                label={option.label}
                icon={option.icon}
                className={clsx(
                  isSubmitted ? "pointer-events-none" : "cursor-pointer",
                  getOptionColorFromIndex(
                    dataQuestion,
                    index,
                    "",
                    optionWhoWin,
                  ),
                )}
                onClick={() => handleChangeOptionWhoWin(index)}
              />
              <span
                className={clsx(
                  "rounded-md px-5 mt-2",
                  getOptionColorFromIndex(
                    dataQuestion,
                    index,
                    "bg-gray-200",
                    optionWhoWin,
                  ),
                )}
              >
                {option.winRate}
              </span>
            </div>
          ))}
        </div>

        {!isSubmitted && (
          <DepositAmount
            depositAmount={depositAmount}
            handleChangeDepositAmount={handleChangeDepositAmount}
            errors={errors}
            winRate={
              dataQuestion?.options
                ? dataQuestion?.options[optionWhoWin].winRate
                : 0
            }
          />
        )}
        {isSubmitted && (
          <ResultMatch questions={dataQuestion} matchStatus={matchStatus} />
        )}
      </div>
    </Question>
  );
};

export default SecondQuestion;
