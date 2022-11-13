import clsx from "clsx";
import { BigNumber } from "ethers";
import { useEffect, useMemo, useState } from "react";
import { QuestionProps } from "..";
import { MATCH_STATUS, QUESTION_STATUS } from "../../../../../../constants";
import useBetting from "../../../../../../hooks/useBetting";
import useBettingContract from "../../../../../../hooks/useBettingContract";
import useBirdToken from "../../../../../../hooks/useBirdToken";
import BorderBox from "../components/BorderBox";
import DepositAmount from "../components/DepositAmount";
import Question from "../components/Question";
import ResultMatch from "../components/ResultMatch";
import {
  getFinalResultIndex,
  getOptionColorFromIndex,
  getOptionIndexByBetPlace,
} from "../components/utils";

const betPlaceString = ["home", "draw", "away"];

const OddsQuestion = (props: QuestionProps) => {
  const {
    dataQuestion: questionProp = {},
    title,
    betType,
    needApprove,
    error,
  } = props;
  // const errors: string[] = [];
  const [optionWhoWin, setOptionWhoWin] = useState<number>(0);
  const [depositAmount, setDepositAmount] = useState<string>("");
  const [dataQuestion, setDataQuestion] = useState<any>();

  const { approveBirdToken, loadingApprove } = useBirdToken();
  const { betting, loadingBetting } = useBetting();
  const { getBettingUpdate } = useBettingContract();

  useEffect(() => {
    if (!questionProp) return;
    setDataQuestion(questionProp);
  }, [questionProp]);

  useEffect(() => {
    if (!dataQuestion) return;
    setOptionWhoWin(dataQuestion?.optionSelected);
  }, [dataQuestion]);

  const questionStatus = useMemo(
    () => dataQuestion?.questionStatus,
    [dataQuestion?.questionStatus],
  );
  const isSubmitted = questionStatus !== QUESTION_STATUS.NOT_PREDICTED;
  const matchEnded = useMemo(
    () => dataQuestion?.match_status === MATCH_STATUS.FINISHED,
    [dataQuestion?.match_status],
  );
  const finalResultIndex = getFinalResultIndex(
    dataQuestion?.result,
    dataQuestion?.bet_place,
  );

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

    // update result
    const res = await getBettingUpdate(_matchID, _betType);
    if (!res) return;
    const newDataQuestion = {
      ...dataQuestion,
      questionStatus: QUESTION_STATUS.PREDICTED,
      optionSelected: getOptionIndexByBetPlace(res.place),
      bet_amount: BigNumber.from(res.amount).toString(),
    };
    setDataQuestion(newDataQuestion);
  };
  const handleChangeOptionWhoWin = (option: number) => {
    setOptionWhoWin(option);
  };
  const handleChangeDepositAmount = (value: string) => {
    setDepositAmount(value);
  };

  const notHasBettingResult =
    dataQuestion?.match_status === "finished" && !dataQuestion?.result;

  const getWinRateColor = (index?: number) => {
    if ((isSubmitted && finalResultIndex !== index) || notHasBettingResult)
      return "opacity-50";
  };
  const isEnableBetting = !isSubmitted && !notHasBettingResult;

  return (
    <Question
      title={title}
      handleSubmit={handleSubmit}
      isSubmitted={isSubmitted}
      matchEnded={matchEnded}
      loading={loadingApprove || loadingBetting}
      error={error}
    >
      <div>
        <div
          className={clsx(
            "flex items-center w-full space-x-2 overflow-x-auto",
            "xs:justify-center",
            "md:px-4",
            "2md:min-w-[520px] 2md:px-16",
          )}
        >
          {dataQuestion?.options?.map((option: any, index: number) => (
            <div key={index} className="flex flex-col w-full">
              <BorderBox
                label={option?.label}
                icon={option?.icon}
                className={clsx(
                  !isEnableBetting ? "pointer-events-none" : "cursor-pointer",
                  getOptionColorFromIndex(
                    dataQuestion,
                    index,
                    optionWhoWin,
                    isSubmitted,
                    finalResultIndex,
                  ),
                )}
                onClick={() => handleChangeOptionWhoWin(index)}
              />
              <div
                className={clsx(
                  "mt-2 text-16/24 font-inter text-center",
                  getWinRateColor(index),
                )}
              >
                {option?.winRate}
              </div>
            </div>
          ))}
        </div>

        {!isSubmitted && !matchEnded && (
          <DepositAmount
            depositAmount={depositAmount}
            handleChangeDepositAmount={handleChangeDepositAmount}
            // errors={errors}
            winRate={
              dataQuestion?.options
                ? dataQuestion?.options[optionWhoWin]?.winRate
                : 0
            }
            optionWhoWin={optionWhoWin}
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
