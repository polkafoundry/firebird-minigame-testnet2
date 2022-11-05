import clsx from "clsx";
import { BigNumber } from "ethers";
import { useState } from "react";
import { QuestionProps } from "..";
import { QUESTION_STATUS } from "../../../../../../constants";
import BorderBox from "../components/BorderBox";
import DepositAmount from "../components/DepositAmount";
import Question from "../components/Question";
import ResultMatch from "../components/ResultMatch";
import { getOptionColorFromIndex } from "../components/utils";

const betPlaceString = ["home", "draw", "away"];

const OddsQuestion = (props: QuestionProps) => {
  const { dataQuestion = {}, title, betType } = props;
  const isSubmitted =
    dataQuestion?.questionStatus === QUESTION_STATUS.PREDICTED;
  const questionStatus = dataQuestion?.questionStatus;
  const errors: string[] = [];
  const [optionWhoWin, setOptionWhoWin] = useState<number>(0);
  const [depositAmount, setDepositAmount] = useState<string>("");

  const handleSubmit = () => {
    const dataSubmit = {
      _matchID: dataQuestion?.match_id,
      _amount: BigNumber.from(depositAmount)
        .mul(BigNumber.from(10).pow(18))
        .toString(),
      _betType: betType,
      _betPlace: betPlaceString[optionWhoWin],
    };

    console.log("submit q2, q3", dataSubmit);
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
          <ResultMatch questions={dataQuestion} matchStatus={questionStatus} />
        )}
      </div>
    </Question>
  );
};

export default OddsQuestion;
