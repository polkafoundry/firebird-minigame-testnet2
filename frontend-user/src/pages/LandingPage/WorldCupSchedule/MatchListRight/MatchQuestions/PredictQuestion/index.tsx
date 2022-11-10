import { useEffect, useMemo, useState } from "react";
import { QuestionProps } from "..";
import { MATCH_STATUS, QUESTION_STATUS } from "../../../../../../constants";
import useBirdToken from "../../../../../../hooks/useBirdToken";
import usePost from "../../../../../../hooks/usePost";
import usePredicting from "../../../../../../hooks/usePredicting";
import BorderBox from "../components/BorderBox";
import InputNumber from "../components/InputNumber";
import NotificationBox from "../components/NotificationBox";
import Question from "../components/Question";

const PredictQuestion = (props: QuestionProps) => {
  const { dataQuestion = {}, title, needApprove, account } = props;

  const { approveBirdToken, loadingApprove } = useBirdToken();
  const { loadingPredicting, predicting } = usePredicting();

  const [predictInfo, setPredictInfo] = useState<any>();
  const [inputTeam1, setInputTeam1] = useState<string>("");
  const [inputTeam2, setInputTeam2] = useState<string>("");

  const isSubmitted =
    dataQuestion?.questionStatus !== QUESTION_STATUS.NOT_PREDICTED;
  const matchEnded = dataQuestion?.match_status === MATCH_STATUS.FINISHED;

  const shouldLoadPredictInfo = useMemo(() => {
    return !!account && matchEnded && dataQuestion?.match_id;
  }, [account, matchEnded, dataQuestion]);

  const questionStatus = useMemo(() => {
    if (!matchEnded) return dataQuestion?.questionStatus;
    if (predictInfo?.is_final_winner) return QUESTION_STATUS.WINNER;
    if (predictInfo?.predict_winner) return QUESTION_STATUS.CORRECT_ANSWER;
    else return QUESTION_STATUS.WRONG_ANSWER;
  }, [dataQuestion?.questionStatus, predictInfo]);

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

    if (needApprove) {
      await approveBirdToken();
    }

    await predicting(_matchID, _homeScore, _awayScore);
  };

  return (
    <Question
      title={title}
      handleSubmit={handleSubmit}
      isSubmitted={isSubmitted}
      matchEnded={matchEnded}
      loading={loadingApprove || loadingPredicting}
    >
      <div>
        <div className="flex items-center justify-between">
          <BorderBox
            label={dataQuestion?.home_name}
            icon={dataQuestion?.home_icon}
          />
          <div className="flex space-x-5 items-baseline">
            <InputNumber
              input={inputTeam1}
              handleChange={handleChangeInputTeam1}
              type={questionStatus}
              disabled={matchEnded}
            />
            <span className="text-4xl font-semibold block">:</span>
            <InputNumber
              input={inputTeam2}
              handleChange={handleChangeInputTeam2}
              type={questionStatus}
              disabled={matchEnded}
            />
          </div>
          <BorderBox
            label={dataQuestion?.away_name}
            icon={dataQuestion?.away_icon}
          />
        </div>
        {/* {error && <p className="text-red-600 font-semibold mt-2">{error}</p>} */}
        <div>
          {isSubmitted && (
            <NotificationBox
              type={questionStatus}
              homeScore={dataQuestion?.ft_home_score}
              awayScore={dataQuestion?.ft_away_score}
            />
          )}
        </div>
      </div>
    </Question>
  );
};

export default PredictQuestion;
