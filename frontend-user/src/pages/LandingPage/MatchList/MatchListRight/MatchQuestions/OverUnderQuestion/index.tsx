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
    setRecheckApprove,
  } = props;
  const matchId = questionProp?.match_id;

  const [optionWhoWin, setOptionWhoWin] = useState<number>(0);
  const [depositAmount, setDepositAmount] = useState<string>("");
  const [dataQuestion, setDataQuestion] = useState<any>();
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const { approveBirdToken, loadingApprove } = useBirdToken();
  const { betting, loadingBetting } = useBetting();
  const { loadingBetting: loadingBettingContract, getUserBetting } =
    useBettingContract();
  const { isClaimSuccess, loadingClaim, handleClaimToken } = useClaimToken(
    dataQuestion,
    dataQuestion?.questionStatus === QUESTION_STATUS.CORRECT_ANSWER,
  );

  // update Claim Token button
  useEffect(() => {
    setDataQuestion((prev: any) => ({
      ...prev,
      isClaimed: isClaimSuccess,
    }));
  }, [isClaimSuccess]);

  useEffect(() => {
    async function getUserBettingInMatch() {
      const res = await getUserBetting(matchId, betType);

      setDataQuestion((prev: any) => ({
        ...prev,
        optionSelected: getOptionIndexByBetPlace(res?.place || ""),
        bet_amount: res?.amount,
        isClaimed: res?.isClaimed,
      }));
      setIsSubmitted(!!res?.place);
    }

    getUserBettingInMatch();
  }, [matchId, betType]);

  useEffect(() => {
    if (!questionProp) return;
    setDepositAmount("");
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
  const matchLiveOrEnded = useMemo(
    () =>
      [MATCH_STATUS.FINISHED, MATCH_STATUS.LIVE].includes(
        dataQuestion?.match_status,
      ),
    [dataQuestion?.match_status],
  );

  const finalResultIndex = getFinalResultIndex(dataQuestion);

  const handleChangeOptionWhoWin = (option: number) => {
    setOptionWhoWin(option);
  };
  const handleChangeDepositAmount = (value: string) => {
    setDepositAmount(value);
  };

  const notHasBettingResult =
    dataQuestion?.match_status === "finished" && !dataQuestion?.result;

  const getWinRateColor = (index?: number) => {
    if (
      (isSubmitted && finalResultIndex !== index) ||
      notHasBettingResult ||
      matchLiveOrEnded
    )
      return "opacity-50";
  };

  const isEnableClick = (isDisableClick: any) =>
    !matchLiveOrEnded &&
    !isSubmitted &&
    !isDisableClick &&
    !notHasBettingResult;

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
      _matchID: matchId,
      _amount: BigNumber.from(depositAmount)
        .mul(BigNumber.from(10).pow(18))
        .toString(),
      _betType: betType,
      _betPlace: betPlaceString[optionWhoWin],
    };

    const { _amount, _betPlace, _betType, _matchID } = dataSubmit;

    if (needApprove) {
      await approveBirdToken();
      setRecheckApprove && setRecheckApprove((prev) => !prev);
    }

    const bettingResult = await betting(_matchID, _amount, _betType, _betPlace);
    if (!bettingResult) return;

    // update result
    const res = await getUserBetting(_matchID, _betType);
    if (!res) return;
    const newDataQuestion = {
      ...dataQuestion,
      questionStatus: QUESTION_STATUS.PREDICTED,
      optionSelected: getOptionIndexByBetPlace(res.place),
      bet_amount: BigNumber.from(res.amount).toString(),
    };
    setDataQuestion(newDataQuestion);
    setIsSubmitted(true);

    updateBirdBalance();
  };

  return (
    <Question
      title={title}
      handleSubmit={handleSubmit}
      isSubmitted={isSubmitted}
      matchLiveOrEnded={matchLiveOrEnded}
      loading={
        loadingBettingContract ||
        loadingApprove ||
        loadingBetting ||
        loadingClaim
      }
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

        {!isSubmitted && !matchLiveOrEnded && (
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
            loadingClaim={loadingClaim}
            handleClaimToken={handleClaimToken}
            updateBirdBalance={updateBirdBalance}
          />
        )}
      </div>
    </Question>
  );
};

export default OverUnderQuestion;
