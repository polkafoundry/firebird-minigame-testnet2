import { QUESTION_STATUS } from "../../../../../constants";
import FirstQuestion from "./FirstQuestion";
import SecondQuestion from "./SecondQuestion";
import ThirdQuestion from "./ThirdQuestion";

export type QuestionProps = {
  dataQuestion: any;
};

const fakeQuestion1 = {
  isSubmitted: false,
  error: "",
  // error: "Not enough PKF to pay for the gas fee. Click here to faucet.",
  matchStatus: QUESTION_STATUS.NOT_PREDICTED,
};

const fakeQuestion2 = {
  isSubmitted: false,
  matchStatus: QUESTION_STATUS.WRONG_ANSWER,
  errors: [],
  // errors: [
  //   "Not enough BIRD to deposit.  Click here to faucet.",
  //   "Not enough PKF to pay for the gas fee.  Click here to faucet.",
  //   "The maximum total deposit amount for 1 question is 1,000 $BIRD.",
  // ],
  options: [
    { label: "Qatar", icon: "/images/icon-qatar.svg", winRate: "9.72" },
    { label: "Draw", winRate: "6.13" },
    { label: "Ecuador", icon: "/images/icon-ecuador.svg", winRate: "1.27" },
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
    { label: "Total 1.5 goals" },
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

const MatchQuestions = () => {
  return (
    <div className="w-full p-5">
      <span className="">
        Select questions, predict the match & submit your answer.{" "}
      </span>

      <FirstQuestion dataQuestion={fakeQuestion1} />
      <SecondQuestion dataQuestion={fakeQuestion2} />
      <ThirdQuestion dataQuestion={fakeQuestion3} />
      <ThirdQuestion dataQuestion={fakeQuestion3} />
      {/* <FourthQuestion /> */}
    </div>
  );
};

export default MatchQuestions;
