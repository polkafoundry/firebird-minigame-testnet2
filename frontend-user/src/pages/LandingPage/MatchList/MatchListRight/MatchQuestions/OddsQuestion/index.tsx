import clsx from "clsx";
import { BigNumber } from "ethers";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { QuestionProps } from "..";
import { MATCH_STATUS, QUESTION_STATUS } from "../../../../../../constants";
import useBetting from "../../../../../../hooks/useBetting";
import useBettingContract from "../../../../../../hooks/useBettingContract";
import useBirdToken from "../../../../../../hooks/useBirdToken";
import useClaimToken from "../../../../../../hooks/useClaimToken";
import BorderBox from "../components/BorderBox";
import DepositAmount from "../components/DepositAmount";
import Question from "../components/Question";
import ResultMatch from "../components/ResultMatch";
import {
  checkIsMatchCalculated,
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
    birdBalance = "0",
    updateBirdBalance,
    setRecheckApprove,
    isFullTimeQuestion = false,
  } = props;
  const [optionWhoWin, setOptionWhoWin] = useState<number>(0);
  const [depositAmount, setDepositAmount] = useState<string>("");
  const [dataQuestion, setDataQuestion] = useState<any>();

  const { approveBirdToken, loadingApprove } = useBirdToken();
  const { betting, loadingBetting } = useBetting();
  const { getBettingUpdate } = useBettingContract();
  const { isClaimed, loadingClaim, handleClaimToken } = useClaimToken(
    dataQuestion,
    dataQuestion?.questionStatus === QUESTION_STATUS.CORRECT_ANSWER,
  );

  useEffect(() => {
    if (!questionProp) return;
    setDepositAmount("0");
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
  const matchEnded = checkIsMatchCalculated(
    isFullTimeQuestion,
    dataQuestion?.is_full_time,
    dataQuestion?.is_half_time,
  );

  const finalResultIndex = getFinalResultIndex(dataQuestion);

  const isValidated = () => {
    if (!depositAmount || +depositAmount <= 0) {
      toast.warning("Deposit amount must be greater than 0");
      return;
    }
    if (isNaN(optionWhoWin)) {
      toast.warning("Please select one answer");
      return;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!isValidated()) return;

    const dataSubmit = {
      _matchID: dataQuestion?.match_id,
      _amount: BigNumber.from(depositAmount)
        .mul(BigNumber.from(10).pow(18))
        .toString(),
      _betType: betType,
      _betPlace: betPlaceString[optionWhoWin],
    };
    const { _amount, _betPlace, _betType, _matchID } = dataSubmit;
    // console.log("submit q2, q3", dataSubmit);

    if (needApprove) {
      await approveBirdToken();
      setRecheckApprove && setRecheckApprove((prev) => !prev);
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
  console.log("dataQuestion :>> ", dataQuestion);

  return (
    <Question
      title={title}
      handleSubmit={handleSubmit}
      isSubmitted={isSubmitted}
      matchEnded={matchEnded}
      loading={loadingApprove || loadingBetting || loadingClaim}
      error={error}
    >
      <div>
        <div
          className={clsx(
            "flex flex-col xs:flex-row items-center w-full space-y-1.5 xs:space-x-2 xs:space-y-0",
            "xs:justify-center",
            "md:px-4",
            "2md:min-w-[520px] 2md:px-16",
          )}
        >
          {dataQuestion?.options?.map((option: any, index: number) => (
            <div key={index} className="flex xs:flex-col w-full flex-1">
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
                  "mt-2 text-14/24 w-[50px] xs:w-auto xs:text-16/24 font-inter text-right xs:text-center",
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
            birdBalance={birdBalance}
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
            isClaimed={isClaimed}
            loadingClaim={loadingClaim}
            handleClaimToken={handleClaimToken}
            updateBirdBalance={updateBirdBalance}
          />
        )}
      </div>
    </Question>
  );
};

export default OddsQuestion;
