import clsx from "clsx";
import { BigNumber } from "ethers";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
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

const betPlaceString = ["under", "draw", "over"];

const OverUnderQuestion = (props: QuestionProps) => {
  const {
    dataQuestion: questionProp = {},
    title,
    betType,
    needApprove,
    error,
    birdBalance = "0",
    updateBirdBalance,
  } = props;

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
  const isEnableClick = (isDisableClick: any) =>
    !isSubmitted && !isDisableClick && !notHasBettingResult;

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

    if (!_betPlace) {
      toast.warning("Please select one answer");
      return;
    }

    if (needApprove) {
      await approveBirdToken();
    }

    const bettingResult = await betting(_matchID, _amount, _betType, _betPlace);
    if (!bettingResult) return;

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

    updateBirdBalance();
  };

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
            "flex flex-col xs:flex-row items-start w-full space-y-1.5 xs:space-x-2 xs:space-y-0",
            "xs:justify-center",
            "md:px-4",
            "2md:min-w-[520px] 2md:px-16",
          )}
        >
          {dataQuestion?.options?.map((option: any, index: number) => (
            <div key={option?.label} className="flex xs:flex-col w-full flex-1">
              <BorderBox
                label={option?.label}
                icon={option?.icon}
                className={clsx(
                  !isEnableClick(option?.isDisableClick)
                    ? "pointer-events-none"
                    : "cursor-pointer",
                  getOptionColorFromIndex(
                    dataQuestion,
                    index,
                    optionWhoWin,
                    isSubmitted,
                    finalResultIndex,
                  ),
                )}
                onClick={() =>
                  !option?.isDisableClick && handleChangeOptionWhoWin(index)
                }
                boxType={betPlaceString[index]}
              />
              <div className="flex flex-row-reverse xs:flex-col items-baseline xs:items-center">
                <span
                  className={clsx(
                    "mt-2 text-14/24 w-[30px] xs:w-auto xs:text-16/24 font-inter text-center",
                    getWinRateColor(index),
                  )}
                >
                  {option?.winRate}
                </span>
                <span className="w-[100px] xs:w-auto text-12/18 opacity-70 text-center">
                  {option?.description}
                </span>
              </div>
            </div>
          ))}
        </div>

        {!isSubmitted && !matchEnded && (
          <DepositAmount
            birdBalance={birdBalance}
            depositAmount={depositAmount}
            handleChangeDepositAmount={handleChangeDepositAmount}
            errors={dataQuestion?.errors}
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

export default OverUnderQuestion;
