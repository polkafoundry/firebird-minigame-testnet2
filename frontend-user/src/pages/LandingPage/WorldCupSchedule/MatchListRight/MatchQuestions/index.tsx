import { BET_TYPE, QUESTION_STATUS } from "../../../../../constants";
import { getOptionIndexByBetPlace } from "./components/utils";
import FirstQuestion from "./FirstQuestion";
import SecondQuestion from "./SecondQuestion";
import ThirdQuestion from "./ThirdQuestion";

export type QuestionProps = {
  dataQuestion: any;
  title: string;
};

const fakeQuestion3 = {
  isSubmitted: false,
  matchStatus: QUESTION_STATUS.WRONG_ANSWER,
  // errors: [],
  errors: [
    "Not enough BIRD to deposit.  Click here to faucet.",
    "Not enough PKF to pay for the gas fee.  Click here to faucet.",
    "The maximum total deposit amount for 1 question is 1,000 $BIRD.",
  ],
  options: [
    { label: "Lower", winRate: "1.90", description: "≤ 1 goals scored" },
    { label: "Total 1.5 goals", isDisableClick: true },
    { label: "Higher", winRate: "2.0", description: "> 2 goals scored" },
  ],
  results: {
    optionSelected: 0,
    optionEnded: 1,
    deposit: "100",
    earned: "872",
    claim: "972",
    isClaimed: false,
  },
};

type MatchQuestionProps = {
  dataQuestion: any;
};

const MatchQuestions = (props: MatchQuestionProps) => {
  const { dataQuestion } = props;
  const predictsData = dataQuestion?.predicts || [];
  const bettingsData = dataQuestion?.bettings || [];

  const question1 = predictsData[predictsData.length - 1];

  console.log("predicts", predictsData);
  let question2 = bettingsData.filter(
    (betting: any) => betting.bet_type === BET_TYPE.ODD_EVEN_HALF_TIME,
  );

  question2 = {
    ...question2,
    // errors: [
    //   "Not enough BIRD to deposit.  Click here to faucet.",
    //   "Not enough PKF to pay for the gas fee.  Click here to faucet.",
    //   "The maximum total deposit amount for 1 question is 1,000 $BIRD.",
    // ],
    options: [
      {
        label: dataQuestion?.home_name,
        icon:
          process.env.REACT_APP_ICON_NATIONAL +
          dataQuestion?.home_icon +
          ".png",
        winRate: dataQuestion?.odds_ht_home,
      },
      { label: "Draw", winRate: dataQuestion?.odds_ht_draw },
      {
        label: dataQuestion?.away_name,
        icon:
          process.env.REACT_APP_ICON_NATIONAL +
          dataQuestion?.away_icon +
          ".png",
        winRate: dataQuestion?.odds_ht_away,
      },
    ],
    results: {
      optionSelected: getOptionIndexByBetPlace(dataQuestion?.bet_place),
      optionEnded: 1,
      deposit: "100",
      earned: "0",
      claim: "0",
      isClaimed: false,
    },
  };

  let question3 = bettingsData.filter(
    (betting: any) => betting.bet_type === BET_TYPE.ODD_EVEN_FULL_TIME,
  );

  question3 = {
    ...question3,
    options: [
      {
        label: dataQuestion?.home_name,
        icon:
          process.env.REACT_APP_ICON_NATIONAL +
          dataQuestion?.home_icon +
          ".png",
        winRate: dataQuestion?.odds_ft_home,
      },
      { label: "Draw", winRate: dataQuestion?.odds_ft_draw },
      {
        label: dataQuestion?.away_name,
        icon:
          process.env.REACT_APP_ICON_NATIONAL +
          dataQuestion?.away_icon +
          ".png",
        winRate: dataQuestion?.odds_ft_away,
      },
    ],
    results: {
      optionSelected: getOptionIndexByBetPlace(dataQuestion?.bet_place),
      optionEnded: 1,
      deposit: "100",
      earned: "0",
      claim: "0",
      isClaimed: false,
    },
  };
  // const question4 = bettingsData.filter(
  //   (betting: any) => betting.bet_type === BET_TYPE.OVER_UNDER_HALF_TIME,
  // );
  // const question5 = bettingsData.filter(
  //   (betting: any) => betting.bet_type === BET_TYPE.OVER_UNDER_HALF_TIME,
  // );

  return (
    <div className="w-full p-5">
      <span className="">
        Select questions, predict the match & submit your answer.{" "}
      </span>

      <FirstQuestion
        dataQuestion={question1}
        title="1. What will the match score be?"
      />
      <SecondQuestion
        dataQuestion={question2}
        title="2. Who will win the 1st half?"
      />
      <SecondQuestion
        dataQuestion={question3}
        title="3. Who will win the full match?"
      />
      <ThirdQuestion
        dataQuestion={fakeQuestion3}
        title="4. Will the 1st half total goals be higher or lower than the total goals below?"
      />
      <ThirdQuestion
        dataQuestion={fakeQuestion3}
        title="5. Will the full match total goals be higher or lower than the total goals below?"
      />
      {/* <FourthQuestion /> */}
    </div>
  );
};

export default MatchQuestions;
