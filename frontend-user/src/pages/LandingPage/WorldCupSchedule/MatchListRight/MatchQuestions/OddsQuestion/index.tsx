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

const betPlaceString = ["home", "draw", "away"];

const OddsQuestion = (props: QuestionProps) => {
  const { dataQuestion = {}, title, betType, needApprove } = props;
  const errors: string[] = [];
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

  const handleSubmit = async () => {
    const dataSubmit = {
      _matchID: dataQuestion?.match_id,
      _amount: BigNumber.from(depositAmount)
        .mul(BigNumber.from(10).pow(18))
        .toString(),
      _betType: betType,
      _betPlace: betPlaceString[optionWhoWin],
    };
    const { _amount, _betPlace, _betType, _matchID } = dataSubmit;
    console.log("submit q2, q3", dataSubmit);

    if (needApprove) {
      await approveBirdToken();
    }

    await betting(_matchID, _amount, _betType, _betPlace);
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
      matchEnded={matchEnded}
      loading={loadingApprove || loadingBetting}
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
                label={option?.label}
                icon={option?.icon}
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
                {option?.winRate}
              </span>
            </div>
          ))}
        </div>

        {!isSubmitted && !matchEnded && (
          <DepositAmount
            depositAmount={depositAmount}
            handleChangeDepositAmount={handleChangeDepositAmount}
            errors={errors}
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

export default OddsQuestion;
