import { useEffect, useState } from "react";
import {
  BET_TYPE,
  MATCH_STATUS,
  QUESTION_STATUS,
} from "../../../../../constants";
import { getImgSrc } from "../../utils";
import { getOptionIndexByBetPlace } from "./components/utils";
import PredictQuestion from "./PredictQuestion";
import OddsQuestion from "./OddsQuestion";
import OverUnderQuestion from "./OverUnderQuestion";

export type QuestionProps = {
  dataQuestion: any;
  title: string;
  betType?: typeof BET_TYPE[keyof typeof BET_TYPE];
};

type MatchQuestionProps = {
  dataQuestion: any;
  account: string | undefined;
};

const MatchQuestions = (props: MatchQuestionProps) => {
  const { dataQuestion, account } = props;

  const [questions, setQuestions] = useState<any>([]);

  useEffect(() => {
    if (!dataQuestion) return;

    const bindData = () => {
      console.log("dataQuestion", dataQuestion);

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
      const matchResult = {
        optionSelected: getOptionIndexByBetPlace(dataQuestion?.bet_place),
        optionEnded: 1,
        deposit: "100",
        earned: "0",
        claim: "0",
        isClaimed: false,
      };
      // unknow, waiting for result, result_num from BE
      const defaultQuestionStatus = QUESTION_STATUS.PREDICTED;

      // QUESTION 1: Score Prediction
      const predictsData = dataQuestion?.predicts || [];
      const question1 = {
        ...predictsData[0],
        ...homeTeamInfo,
        ...awayTeamInfo,
        ...matchStatus,
        match_id: dataQuestion?.match_id,
        questionStatus:
          predictsData.length === 0
            ? QUESTION_STATUS.NOT_PREDICTED
            : defaultQuestionStatus,
      };

      const bettingsData = dataQuestion?.bettings || [];

      // QUESTION 2
      let question2 = bettingsData.find(
        (betting: any) => betting.bet_type === BET_TYPE.ODD_EVEN_HALF_TIME,
      );

      question2 = {
        ...question2,
        ...matchStatus,
        // ...matchResult,
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
        match_id: dataQuestion?.match_id,
        questionStatus: !question2
          ? QUESTION_STATUS.NOT_PREDICTED
          : defaultQuestionStatus,
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
        match_id: dataQuestion?.match_id,
        ...matchResult,
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
          },
          {
            label: `Total ${dataQuestion?.ou_ht_ratio || 0} goals`,
            isDisableClick: true,
          },
          {
            label: "Higher",
            winRate: dataQuestion?.ou_ht_over,
          },
        ],
        match_id: dataQuestion?.match_id,
        ...matchResult,
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
          },
          {
            label: `Total ${dataQuestion?.ou_ft_ratio || 0} goals`,
            isDisableClick: true,
          },
          {
            label: "Higher",
            winRate: dataQuestion?.ou_ft_over,
          },
        ],
        match_id: dataQuestion?.match_id,
        ...matchResult,
      };

      const newQuestions = [
        question1,
        question2,
        question3,
        question4,
        question5,
      ];
      console.log("newQuestions", newQuestions);
      setQuestions(newQuestions);
    };
    bindData();
  }, [dataQuestion]);

  const renderEmptyQuestion = () => {
    return (
      <div className="flex text-center text-xl font-semibold h-40 items-center justify-center">
        {!account ? "Please Connect Wallet First" : "Please Select Match First"}
      </div>
    );
  };

  if (!account || !dataQuestion || dataQuestion.length === 0)
    return renderEmptyQuestion();

  return (
    <div className="w-full p-5">
      <span className="">
        Select questions, predict the match & submit your answer.{" "}
      </span>

      <PredictQuestion
        dataQuestion={questions[0]}
        title="1. What will the match score be?"
      />
      <OddsQuestion
        dataQuestion={questions[1]}
        betType={BET_TYPE.ODD_EVEN_HALF_TIME}
        title="2. Who will win the 1st half?"
      />
      <OddsQuestion
        dataQuestion={questions[2]}
        betType={BET_TYPE.ODD_EVEN_FULL_TIME}
        title="3. Who will win the full match?"
      />
      <OverUnderQuestion
        dataQuestion={questions[3]}
        betType={BET_TYPE.OVER_UNDER_HALF_TIME}
        title="4. Will the 1st half total goals be higher or lower than the total goals below?"
      />
      <OverUnderQuestion
        dataQuestion={questions[4]}
        betType={BET_TYPE.OVER_UNDER_FULL_TIME}
        title="5. Will the full match total goals be higher or lower than the total goals below?"
      />
      {/* <FourthQuestion /> */}
    </div>
  );
};

export default MatchQuestions;
