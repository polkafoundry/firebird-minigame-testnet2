import clsx from "clsx";
import { useState } from "react";
import { QuestionProps } from "..";
import BorderBox from "../components/BorderBox";
import DepositAmount from "../components/DepositAmount";
import Question from "../components/Question";
import ResultMatch from "../components/ResultMatch";
import { getOptionColorFromIndex } from "../components/utils";

const ThirdQuestion = (props: QuestionProps) => {
  const { dataQuestion = {}, title } = props;
  const [optionWhoWin, setOptionWhoWin] = useState<number>(0);
  const [depositAmount, setDepositAmount] = useState<string>("0");

  const handleChangeOptionWhoWin = (option: number) => {
    setOptionWhoWin(option);
  };
  const handleChangeDepositAmount = (value: string) => {
    setDepositAmount(value);
  };

  const handleSubmit = () => {
    console.log("click submit");
  };

  return (
    <Question
      title={title}
      handleSubmit={handleSubmit}
      isSubmitted={dataQuestion?.isSubmitted}
    >
      <div>
        <div className="flex items-start">
          {dataQuestion?.options.map((option: any, index: number) => (
            <div
              key={option.label}
              className="flex flex-col items-center mr-10 last:mr-0"
            >
              <BorderBox
                label={option.label}
                icon={option.icon}
                className={clsx(
                  "w-[160px]",
                  dataQuestion?.isSubmitted
                    ? "pointer-events-none"
                    : "cursor-pointer",
                  !option.isDisableClick &&
                    getOptionColorFromIndex(
                      dataQuestion,
                      index,
                      "",
                      optionWhoWin,
                    ),
                )}
                onClick={() =>
                  !option.isDisableClick && handleChangeOptionWhoWin(index)
                }
              />
              <span className="text-sm text-yellow-400 mt-1 h-5">
                {optionWhoWin === index && option.description}
              </span>
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

        {!dataQuestion?.isSubmitted && (
          <DepositAmount
            depositAmount={depositAmount}
            handleChangeDepositAmount={handleChangeDepositAmount}
            errors={dataQuestion?.errors}
            winRate={dataQuestion?.options[optionWhoWin].winRate}
          />
        )}
        {dataQuestion?.isSubmitted && <ResultMatch questions={dataQuestion} />}
      </div>
    </Question>
  );
};

export default ThirdQuestion;
