import clsx from "clsx";
import { BigNumber } from "ethers";
import { useState } from "react";
import { QuestionProps } from "..";
import BorderBox from "../components/BorderBox";
import DepositAmount from "../components/DepositAmount";
import Question from "../components/Question";
import ResultMatch from "../components/ResultMatch";
import { getOptionColorFromIndex } from "../components/utils";

const betPlaceString = ["over", "", "under"];

const OverUnderQuestion = (props: QuestionProps) => {
  const { dataQuestion = {}, title, betType } = props;
  const [optionWhoWin, setOptionWhoWin] = useState<number>(0);
  const [depositAmount, setDepositAmount] = useState<string>("");

  const handleChangeOptionWhoWin = (option: number) => {
    setOptionWhoWin(option);
  };
  const handleChangeDepositAmount = (value: string) => {
    setDepositAmount(value);
  };

  const handleSubmit = () => {
    const dataSubmit = {
      _matchID: dataQuestion?.match_id,
      _amount: BigNumber.from(depositAmount)
        .mul(BigNumber.from(10).pow(18))
        .toString(),
      _betType: betType,
      _betPlace: betPlaceString[optionWhoWin],
    };

    console.log("submit q4 q5", dataSubmit);
  };

  return (
    <Question
      title={title}
      handleSubmit={handleSubmit}
      isSubmitted={dataQuestion?.isSubmitted}
    >
      <div>
        <div className="flex items-start justify-between">
          {dataQuestion?.options?.map((option: any, index: number) => (
            <div
              key={option.label}
              className="flex flex-col items-center w-full max-w-[120px]"
            >
              <BorderBox
                label={option.label}
                icon={option.icon}
                className={clsx(
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
            winRate={
              dataQuestion?.options
                ? dataQuestion?.options[optionWhoWin]?.winRate
                : 0
            }
          />
        )}
        {dataQuestion?.isSubmitted && <ResultMatch questions={dataQuestion} />}
      </div>
    </Question>
  );
};

export default OverUnderQuestion;
