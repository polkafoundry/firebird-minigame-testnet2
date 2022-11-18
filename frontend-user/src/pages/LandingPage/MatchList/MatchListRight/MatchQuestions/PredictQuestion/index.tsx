import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { QuestionProps } from "..";
import { MATCH_STATUS, QUESTION_STATUS } from "../../../../../../constants";
import useBettingContract from "../../../../../../hooks/useBettingContract";
import useBirdToken from "../../../../../../hooks/useBirdToken";
import usePost from "../../../../../../hooks/usePost";
import usePredicting from "../../../../../../hooks/usePredicting";
import InputScore from "../components/InputScore";
import NotificationBox from "../components/NotificationBox";
import Question from "../components/Question";

const PredictQuestion = (props: QuestionProps) => {
  const {
    dataQuestion: questionProp = {},
    title,
    needApprove,
    account,
    error,
    predictPrize = "",
  } = props;

  const { approveBirdToken, loadingApprove } = useBirdToken();
  const { loadingPredicting, predicting } = usePredicting();
  const { getPredictingUpdate } = useBettingContract();

  const [predictInfo, setPredictInfo] = useState<any>();
  const [inputTeam1, setInputTeam1] = useState<string>("");
  const [inputTeam2, setInputTeam2] = useState<string>("");
  const [dataQuestion, setDataQuestion] = useState<any>();

  useEffect(() => {
    if (!questionProp) return;
    setDataQuestion(questionProp);
  }, [questionProp]);

  const isSubmitted =
    dataQuestion?.questionStatus !== QUESTION_STATUS.NOT_PREDICTED;
  const matchEnded = useMemo(
    () => dataQuestion?.match_status === MATCH_STATUS.FINISHED,
    [dataQuestion?.match_status],
  );

  const shouldLoadPredictInfo = useMemo(() => {
    return !!account && matchEnded && dataQuestion?.match_id;
  }, [account, matchEnded, dataQuestion]);

  // TODO: missing state QUESTION_STATUS.PREDICTED
  const questionStatus = useMemo(() => {
    if (!matchEnded) return dataQuestion?.questionStatus;

    if (predictInfo?.is_final_winner === account) return QUESTION_STATUS.WINNER;
    if (predictInfo?.predict_winner) return QUESTION_STATUS.CORRECT_ANSWER;
    else return QUESTION_STATUS.WRONG_ANSWER;
  }, [dataQuestion?.questionStatus, predictInfo, account]);

  const { response } = usePost<any>(
    "/predict/get-match-predict-info",
    {
      match_id: dataQuestion?.match_id,
      address: account,
    },
    shouldLoadPredictInfo,
  );

  useEffect(() => {
    if (!response) return;

    // console.log(response);
    if (response?.status !== 200) {
      console.log("ERR get predict info: ", response?.message);
      // toast.error(response?.message || "Fail to get predict info");
    } else {
      setPredictInfo(response.data);
    }
  }, [response]);

  // default score
  useEffect(() => {
    setInputTeam1(dataQuestion?.home_score || "");
    setInputTeam2(dataQuestion?.away_score || "");
  }, [dataQuestion]);

  const handleChangeInputTeam1 = (value: string) => {
    setInputTeam1(value);
  };
  const handleChangeInputTeam2 = (value: string) => {
    setInputTeam2(value);
  };

  const handleSubmit = async () => {
    const dataSubmit = {
      _matchID: dataQuestion?.match_id,
      _homeScore: inputTeam1,
      _awayScore: inputTeam2,
    };

    console.log("submit q1", dataSubmit);
    const { _matchID, _homeScore, _awayScore } = dataSubmit;
    if (_homeScore === "" || _awayScore === "") {
      toast.warning("Please select one answer");
      return;
    }

    const predictResult = await predicting(_matchID, _homeScore, _awayScore);
    if (!predictResult) return;

    // update result
    const res = await getPredictingUpdate(_matchID);
    if (!res) return;
    const newDataQuestion = {
      ...dataQuestion,
      questionStatus: QUESTION_STATUS.PREDICTED,
      home_score: _homeScore,
      away_score: _awayScore,
    };
    setDataQuestion(newDataQuestion);
  };

  const renderMatchNameDetail = (home_name: string, home_icon: string) => {
    return (
      <div className="flex flex-col items-center justify-center flex-1">
        {home_icon && <img src={home_icon} className="w-12 h-12" alt="" />}
        <span className="mt-2 text-16/20 font-tthoves font-semibold capitalize text-center">
          {home_name && home_name.toLowerCase()}
        </span>
      </div>
    );
  };

  return (
    <Question
      title={title}
      handleSubmit={handleSubmit}
      isSubmitted={isSubmitted}
      matchEnded={matchEnded}
      loading={loadingApprove || loadingPredicting}
      predictBoxComponent={
        isSubmitted ? (
          <NotificationBox
            type={questionStatus}
            homeScore={dataQuestion?.ft_home_score}
            awayScore={dataQuestion?.ft_away_score}
            homePredictedScore={dataQuestion?.home_score}
            awayPredictedScore={dataQuestion?.away_score}
            predictPrize={predictPrize}
          />
        ) : undefined
      }
      error={error}
      matchStatus={dataQuestion?.match_status}
      isPredictQuestion
    >
      <div>
        <div className="flex items-center justify-between max-w-[660px] w-full mx-auto">
          {renderMatchNameDetail(
            dataQuestion?.home_name,
            dataQuestion?.home_icon,
          )}
          <InputScore
            inputTeam1={inputTeam1}
            inputTeam2={inputTeam2}
            handleChangeInputTeam1={handleChangeInputTeam1}
            handleChangeInputTeam2={handleChangeInputTeam2}
            questionStatus={questionStatus}
            matchStatus={dataQuestion?.match_status}
          />
          {renderMatchNameDetail(
            dataQuestion?.away_name,
            dataQuestion?.away_icon,
          )}
        </div>
      </div>
    </Question>
  );
};

export default PredictQuestion;
