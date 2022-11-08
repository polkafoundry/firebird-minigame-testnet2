import clsx from "clsx";
import { BigNumber } from "ethers";
import { useEffect, useState } from "react";
import { QuestionProps } from "..";
import { MATCH_STATUS, QUESTION_STATUS } from "../../../../../../constants";
import useBetting from "../../../../../../hooks/useBetting";
import useBirdToken from "../../../../../../hooks/useBirdToken";
import BorderBox from "../components/BorderBox";
import DepositAmount from "../components/DepositAmount";
import Question from "../components/Question";
import ResultMatch from "../components/ResultMatch";
import { getOptionColorFromIndex } from "../components/utils";

const betPlaceString = ["under", "", "over"];

const OverUnderQuestion = (props: QuestionProps) => {
  const { dataQuestion = {}, title, betType, needApprove } = props;
  const [optionWhoWin, setOptionWhoWin] = useState<number>(0);
  const [depositAmount, setDepositAmount] = useState<string>("");

  const { approveBirdToken, loadingApprove } = useBirdToken();
  const { betting, loadingBetting } = useBetting();

  const questionStatus = dataQuestion?.questionStatus;
  const isSubmitted = questionStatus !== QUESTION_STATUS.NOT_PREDICTED;
  const matchEnded = dataQuestion?.match_status === MATCH_STATUS.FINISHED;

  useEffect(() => {
    if (!dataQuestion) return;
    setOptionWhoWin(dataQuestion?.optionSelected);
  }, [dataQuestion]);

  const handleChangeOptionWhoWin = (option: number) => {
    setOptionWhoWin(option);
  };
  const handleChangeDepositAmount = (value: string) => {
    setDepositAmount(value);
  };

  const handleSubmit = async () => {
    const dataSubmit = {
      _matchID: dataQuestion?.match_id,
      _amount: BigNumber.from(depositAmount)
        .mul(BigNumber.from(10).pow(18))
        .toString(),
      _betType: betType,
      _betPlace: betPlaceString[optionWhoWin],
    };

    console.log("submit q4 q5", dataSubmit);

    const { _amount, _betPlace, _betType, _matchID } = dataSubmit;

    if (needApprove) {
      await approveBirdToken();
    }

    await betting(_matchID, _amount, _betType, _betPlace);
  };

  return (
    <Question
      title={title}
      handleSubmit={handleSubmit}
      isSubmitted={isSubmitted}
      matchEnded={matchEnded}
      loading={loadingApprove || loadingBetting}
    >
      <div>
        <div className="flex items-start justify-between">
          {dataQuestion?.options?.map((option: any, index: number) => (
            <div
              key={option?.label}
              className="flex flex-col items-center w-full max-w-[120px]"
            >
              <BorderBox
                label={option?.label}
                icon={option?.icon}
                className={clsx(
                  isSubmitted ? "pointer-events-none" : "cursor-pointer",
                  !option?.isDisableClick &&
                    getOptionColorFromIndex(
                      dataQuestion,
                      index,
                      "",
                      optionWhoWin,
                    ),
                )}
                onClick={() =>
                  !option?.isDisableClick && handleChangeOptionWhoWin(index)
                }
              />
              <span className="text-sm text-yellow-400 mt-1 h-5">
                {optionWhoWin === index && option?.description}
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
                {option?.winRate}
              </span>
            </div>
          ))}
        </div>

        {!isSubmitted && !matchEnded && (
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
        {isSubmitted && (
          <ResultMatch
            questions={dataQuestion}
            questionStatus={questionStatus}
          />
        )}
      </div>
    </Question>
  );
};

export default OverUnderQuestion;
