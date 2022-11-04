import { useEffect, useState } from "react";
import { BET_TYPE, MATCH_STATUS } from "../../../../../constants";
import { getImgSrc } from "../../utils";
import { getOptionIndexByBetPlace } from "./components/utils";
import FirstQuestion from "./FirstQuestion";
import SecondQuestion from "./SecondQuestion";
import ThirdQuestion from "./ThirdQuestion";

export type QuestionProps = {
  dataQuestion: any;
  title: string;
};

type MatchQuestionProps = {
  dataQuestion: any;
};

const MatchQuestions = (props: MatchQuestionProps) => {
  const { dataQuestion } = props;

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

      // QUESTION 1: Score Prediction
      const predictsData = dataQuestion?.predicts || [];
      const question1 = {
        ...predictsData[0],
        ...homeTeamInfo,
        ...awayTeamInfo,
        ...matchStatus,
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
        ...matchResult,
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

  // console.log("predicts", predictsData);

  const renderEmptyQuestion = () => {
    return (
      <div className="flex text-center text-xl font-semibold h-40 items-center justify-center">
        Please Select Match First
      </div>
    );
  };

  if (!dataQuestion || dataQuestion.length === 0) return renderEmptyQuestion();

  return (
    <div className="w-full p-5">
      <span className="">
        Select questions, predict the match & submit your answer.{" "}
      </span>

      <FirstQuestion
        dataQuestion={questions[0]}
        title="1. What will the match score be?"
      />
      <SecondQuestion
        dataQuestion={questions[1]}
        title="2. Who will win the 1st half?"
      />
      <SecondQuestion
        dataQuestion={questions[2]}
        title="3. Who will win the full match?"
      />
      <ThirdQuestion
        dataQuestion={questions[3]}
        title="4. Will the 1st half total goals be higher or lower than the total goals below?"
      />
      <ThirdQuestion
        dataQuestion={questions[4]}
        title="5. Will the full match total goals be higher or lower than the total goals below?"
      />
      {/* <FourthQuestion /> */}
    </div>
  );
};

export default MatchQuestions;
