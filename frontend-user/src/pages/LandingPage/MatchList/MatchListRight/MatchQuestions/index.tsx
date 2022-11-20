import { BigNumber } from "ethers";
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  BET_TYPE,
  MATCH_RESULT,
  MATCH_STATUS,
  QUESTION_STATUS,
  rounds,
} from "../../../../../constants";
import { WalletContext } from "../../../../../context/WalletContext";
import useBirdToken from "../../../../../hooks/useBirdToken";
import { useMyWeb3 } from "../../../../../hooks/useMyWeb3";
import usePredictConditions from "../../../../../hooks/usePredictConditions";
import { getImgSrc } from "../../../../../utils";
import { requestSupportNetwork } from "../../../../../utils/setupNetwork";
import { getOptionIndexByBetPlace } from "./components/utils";
import OddsQuestion from "./OddsQuestion";
import OverUnderQuestion from "./OverUnderQuestion";
import PredictQuestion from "./PredictQuestion";

export type QuestionProps = {
  account?: string | undefined;
  dataQuestion: any;
  title: string;
  needApprove: boolean;
  betType?: typeof BET_TYPE[keyof typeof BET_TYPE];
  error?: any;
  predictPrize?: string;
  birdBalance?: string;
  updateBirdBalance?: any;
  setRecheckApprove?: Dispatch<SetStateAction<boolean>>;
};

type MatchQuestionProps = {
  dataQuestion: any;
  account: string | undefined;
  isWrongChain: boolean;
};

const MatchQuestions = (props: MatchQuestionProps) => {
  const { dataQuestion, account, isWrongChain } = props;
  // TODO: pairing with api
  const predictPrize =
    rounds.find((round) => round.value === Number(dataQuestion?.round_name))
      ?.prize || "N/A";

  const [needApprove, setNeedApprove] = useState<boolean>(false);
  const [recheckApprove, setRecheckApprove] = useState<boolean>(false);

  const { updateBirdBalance, birdBalance } = useMyWeb3();
  const { getBirdAllowance } = useBirdToken();
  const predictConditions = usePredictConditions();
  const { setShowModal } = useContext(WalletContext);

  useEffect(() => {
    if (!account) return;
    if (isWrongChain) return;

    const getBalanceAllow = async () => {
      const bal = await getBirdAllowance(account);
      const need = BigNumber.from(bal).lte(0);
      setNeedApprove(need);
    };
    getBalanceAllow();
  }, [account, recheckApprove]);

  const [questions, setQuestions] = useState<any>([]);

  useEffect(() => {
    if (!dataQuestion) return;

    const lowerScore = (ratio: any) =>
      Math.floor(ratio) === ratio ? ratio - 1 : Math.floor(ratio);
    const upperScore = (ratio: any) =>
      Math.floor(ratio) === ratio ? ratio + 1 : Math.round(ratio);

    const bindData = () => {
      // console.log("dataQuestion", dataQuestion);

      // get Name, Icon both of teams
      const homeTeamInfo = {
        home_name: dataQuestion?.home_name,
        home_icon: getImgSrc(dataQuestion?.home_icon),
      };
      const awayTeamInfo = {
        away_name: dataQuestion?.away_name,
        away_icon: getImgSrc(dataQuestion?.away_icon),
      };
      const matchStatus = {
        match_status: dataQuestion?.match_status || MATCH_STATUS.UPCOMING,
      };

      // QUESTION 1: Score Prediction
      const predictsData = dataQuestion?.predicts || [];
      const question1 = {
        ...predictsData[0],
        ...homeTeamInfo,
        ...awayTeamInfo,
        ...matchStatus,
        match_id: dataQuestion?.match_id,
        ft_home_score: dataQuestion?.ft_home_score,
        ft_away_score: dataQuestion?.ft_away_score,
        questionStatus:
          predictsData.length === 0 ||
          dataQuestion?.start_time * 1000 > new Date().getTime()
            ? predictsData[0]?.home_score && predictsData[0]?.away_score
              ? QUESTION_STATUS.PREDICTED
              : QUESTION_STATUS.NOT_PREDICTED
            : getQuestionStatus(predictsData[0]),
      };

      const bettingsData = dataQuestion?.bettings || [];

      // QUESTION 2
      let question2 = bettingsData.find(
        (betting: any) => betting.bet_type === BET_TYPE.ODD_EVEN_HALF_TIME,
      );

      question2 = {
        ...question2,
        ...matchStatus,
        options: [
          {
            label: homeTeamInfo.home_name,
            icon: homeTeamInfo.home_icon,
            winRate: dataQuestion?.odds_ht_home,
          },
          { label: "Draw", winRate: dataQuestion?.odds_ht_draw },
          {
            label: awayTeamInfo.away_name,
            icon: awayTeamInfo.away_icon,
            winRate: dataQuestion?.odds_ht_away,
          },
        ],
        optionSelected: getOptionIndexByBetPlace(question2?.bet_place),
        match_id: dataQuestion?.match_id,
        questionStatus: getQuestionStatus(question2),
      };

      // QUESTION 3
      let question3 = bettingsData.find(
        (betting: any) => betting.bet_type === BET_TYPE.ODD_EVEN_FULL_TIME,
      );

      question3 = {
        ...question3,
        ...matchStatus,
        options: [
          {
            label: homeTeamInfo.home_name,
            icon: homeTeamInfo.home_icon,
            winRate: dataQuestion?.odds_ft_home,
          },
          { label: "Draw", winRate: dataQuestion?.odds_ft_draw },
          {
            label: awayTeamInfo.away_name,
            icon: awayTeamInfo.away_icon,
            winRate: dataQuestion?.odds_ft_away,
          },
        ],
        optionSelected: getOptionIndexByBetPlace(question3?.bet_place),
        match_id: dataQuestion?.match_id,
        questionStatus: getQuestionStatus(question3),
      };

      let question4 = bettingsData.find(
        (betting: any) => betting.bet_type === BET_TYPE.OVER_UNDER_HALF_TIME,
      );
      question4 = {
        ...question4,
        ...matchStatus,
        options: [
          {
            label: "Lower",
            winRate: dataQuestion?.ou_ht_under,
            description:
              "≤ " + lowerScore(dataQuestion?.ou_ht_ratio) + " goals scored",
          },
          {
            label: `${dataQuestion?.ou_ht_ratio || 0} goals`,
            isDisableClick: true,
          },
          {
            label: "Higher",
            winRate: dataQuestion?.ou_ht_over,
            description:
              "> " + upperScore(dataQuestion?.ou_ht_ratio) + " goals scored",
          },
        ],
        optionSelected: getOptionIndexByBetPlace(question4?.bet_place),
        match_id: dataQuestion?.match_id,
        questionStatus: getQuestionStatus(question4),
      };

      let question5 = bettingsData.find(
        (betting: any) => betting.bet_type === BET_TYPE.OVER_UNDER_FULL_TIME,
      );
      question5 = {
        ...question5,
        ...matchStatus,
        options: [
          {
            label: "Lower",
            winRate: dataQuestion?.ou_ft_under,
            description:
              "≤ " + lowerScore(dataQuestion?.ou_ft_ratio) + " goals scored",
          },
          {
            label: `${dataQuestion?.ou_ft_ratio || 0} goals`,
            isDisableClick: true,
          },
          {
            label: "Higher",
            winRate: dataQuestion?.ou_ft_over,
            description:
              "> " + upperScore(dataQuestion?.ou_ft_ratio) + " goals scored",
          },
        ],
        optionSelected: getOptionIndexByBetPlace(question5?.bet_place),
        match_id: dataQuestion?.match_id,
        questionStatus: getQuestionStatus(question5),
      };

      const newQuestions = [
        question1,
        question2,
        question3,
        question4,
        question5,
      ];
      // console.log("newQuestions", newQuestions);
      setQuestions(newQuestions);
    };
    bindData();
  }, [dataQuestion]);

  const getQuestionStatus = (question: any) => {
    if (!question) return QUESTION_STATUS.NOT_PREDICTED;

    switch (question.result) {
      case MATCH_RESULT.LOSE:
      case MATCH_RESULT.DRAW:
        return QUESTION_STATUS.WRONG_ANSWER;
      case MATCH_RESULT.WIN:
        return QUESTION_STATUS.CORRECT_ANSWER;

      default:
        return QUESTION_STATUS.PREDICTED;
    }
  };

  //render Empty Question
  if (!account || !dataQuestion || dataQuestion.length === 0 || isWrongChain)
    return (
      <div className="flex text-center text-xl font-semibold h-40 items-center justify-center bg-white m-8">
        {!account ? (
          <button
            className="py-2 px-9 rounded-lg bg-main text-white justify-center font-semibold font-tthoves text-14/20"
            onClick={() => setShowModal && setShowModal(true)}
          >
            Connect Wallet
          </button>
        ) : (
          <>
            {isWrongChain ? (
              <button
                className="py-2 px-9 rounded-lg bg-main text-white justify-center font-semibold font-tthoves text-14/20"
                onClick={requestSupportNetwork}
              >
                Switch chain
              </button>
            ) : (
              <>
                {!dataQuestion || dataQuestion.length === 0
                  ? "Please Select Match First"
                  : ""}
              </>
            )}
          </>
        )}
      </div>
    );

  return (
    <div className="w-full p-3 md:p-5">
      <span className="text-14/24 md:text-16/24 font-inter">
        Select questions, predict the match & submit your answer.
      </span>

      <PredictQuestion
        account={account}
        dataQuestion={questions[0]}
        needApprove={needApprove}
        title="1. What will the match score be?"
        error={predictConditions}
        predictPrize={predictPrize}
      />
      <OddsQuestion
        dataQuestion={questions[1]}
        needApprove={needApprove}
        setRecheckApprove={setRecheckApprove}
        betType={BET_TYPE.ODD_EVEN_HALF_TIME}
        title="2. Who will win the 1st half?"
        error={predictConditions}
        birdBalance={birdBalance}
        updateBirdBalance={updateBirdBalance}
      />
      <OddsQuestion
        dataQuestion={questions[2]}
        needApprove={needApprove}
        setRecheckApprove={setRecheckApprove}
        betType={BET_TYPE.ODD_EVEN_FULL_TIME}
        title="3. Who will win the full match?"
        error={predictConditions}
        birdBalance={birdBalance}
        updateBirdBalance={updateBirdBalance}
      />
      <OverUnderQuestion
        dataQuestion={questions[3]}
        needApprove={needApprove}
        setRecheckApprove={setRecheckApprove}
        betType={BET_TYPE.OVER_UNDER_HALF_TIME}
        title="4. Will the 1st half total goals be higher or lower than the total goals below?"
        error={predictConditions}
        birdBalance={birdBalance}
        updateBirdBalance={updateBirdBalance}
      />
      <OverUnderQuestion
        dataQuestion={questions[4]}
        needApprove={needApprove}
        setRecheckApprove={setRecheckApprove}
        betType={BET_TYPE.OVER_UNDER_FULL_TIME}
        title="5. Will the full match total goals be higher or lower than the total goals below?"
        error={predictConditions}
        birdBalance={birdBalance}
        updateBirdBalance={updateBirdBalance}
      />
    </div>
  );
};

export default MatchQuestions;
