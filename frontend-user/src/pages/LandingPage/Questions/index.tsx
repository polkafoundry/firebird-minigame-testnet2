import { Disclosure } from "@headlessui/react";
import clsx from "clsx";
import { useState } from "react";
import { NUMBER_PATTERN, SCORE_PATTER } from "../../../constants";

type QuestionProps = {
  title: string;
  children: JSX.Element;
  handleSubmit: () => void;
  isSubmitted: boolean;
  matchStatus?: MATCH_STATUS;
};

type BorderBoxProps = {
  label: string;
  icon?: string;
  className?: string;
  onClick?: any;
};

enum MATCH_STATUS {
  NOT_PREDICTED,
  PREDICTED,
  CORRECT_ANSWER,
  WRONG_ANSWER,
  WINNER,
}

type InputNumberProps = {
  input: string;
  handleChange: (data: any) => void;
  className?: string;
  type: MATCH_STATUS;
};

const Question = (props: QuestionProps) => {
  const { title, children, handleSubmit, isSubmitted, matchStatus } = props;

  return (
    <Disclosure>
      {({ open }) => (
        <div className="mt-4 border rounded-lg">
          <Disclosure.Button className="block w-full select-none cursor-pointer p-6">
            <div className="text-sm leading-6 text-slate-900 font-semibold flex justify-between">
              <span>{title}</span>
              <img
                src="./images/icon-arrow-down.svg"
                alt=""
                className={open ? "rotate-180" : ""}
              />
            </div>
          </Disclosure.Button>
          <Disclosure.Panel className="px-6 pb-6">
            {children}
            {!isSubmitted && (
              <button
                className="mt-5 px-10 py-3 rounded-xl bg-black text-white"
                onClick={handleSubmit}
              >
                Submit answer
              </button>
            )}
          </Disclosure.Panel>
        </div>
      )}
    </Disclosure>
  );
};

const BorderBox = (props: BorderBoxProps) => {
  const { label, icon, className = "", onClick } = props;
  return (
    <div
      className={clsx(
        "flex space-x-2 justify-center items-center px-6 py-2 border rounded-xl",
        onClick && "cursor-pointer",
        className,
      )}
      onClick={onClick}
    >
      {icon && <img src={icon} className="w-4 h-4" alt="" />}
      <span>{label}</span>
    </div>
  );
};

const InputNumber = (props: InputNumberProps) => {
  const { input, handleChange, className = "", type } = props;

  const onChange = (e: any) => {
    const valueInput = e.target.value;
    if (SCORE_PATTER.test(valueInput) || valueInput === "") {
      handleChange(valueInput);
    }
  };

  return (
    <input
      type="text"
      className={clsx(
        "w-14 h-10 p-2 text-3xl font-semibold text-center bg-white",
        type === MATCH_STATUS.NOT_PREDICTED && "border",
        type === MATCH_STATUS.CORRECT_ANSWER && "text-green-600",
        type === MATCH_STATUS.WRONG_ANSWER && "text-red-600",

        className,
      )}
      disabled={type !== MATCH_STATUS.NOT_PREDICTED}
      value={input}
      onChange={onChange}
    />
  );
};

const NotiBox = (props: any) => {
  const { type } = props;
  const renderLinkUpdateScore = () => (
    <span>
      <a href="#" className="font-medium">
        here
      </a>
      .
    </span>
  );

  const renderNotiBoxPredicted = () => (
    <>
      <div className="flex space-x-5">
        <img src="/images/icon-predict.svg" alt="" />
        <span>Predicted</span>
      </div>
      <p className="text-center mt-5">
        If your answer is correct, you will be added to the whitelist and have a
        chance to win $20. The result will be updated {renderLinkUpdateScore()}
      </p>
    </>
  );

  const renderNotiBoxCorrectAnswer = () => (
    <>
      <div className="flex space-x-5">
        <img src="/images/icon-correct-answer.svg" alt="" />
        <span className="text-green-600">Correct answer</span>
      </div>
      <p className="text-center mt-5">
        Your prediction is correct and have been added to the whitelist. The
        result will be updated {renderLinkUpdateScore()}
      </p>
    </>
  );

  const renderNotiBoxWrongAnswer = () => (
    <>
      <div className="flex space-x-5">
        <img src="/images/icon-wrong-answer.svg" alt="" />
        <span className="text-red-600">Wrong answer</span>
      </div>
      <p className="text-center mt-5">
        Your prediction is incorrect. The correct score is{" "}
        <span className="font-medium">2:1</span>.
      </p>
    </>
  );

  const renderNotiBoxWinWhitelist = () => (
    <>
      <div className="flex space-x-5">
        <img src="/images/icon-winner-whitelist.svg" alt="" />
        <span className="text-yellow-600">$20 Winner</span>
      </div>
      <p className="text-center mt-5">
        Congratulations! You have won $20. Check the result{" "}
        {renderLinkUpdateScore()}
      </p>
    </>
  );

  return (
    <div className="flex flex-col items-center mt-5 p-5 bg-orange-100 ">
      {type === MATCH_STATUS.PREDICTED && renderNotiBoxPredicted()}
      {type === MATCH_STATUS.CORRECT_ANSWER && renderNotiBoxCorrectAnswer()}
      {type === MATCH_STATUS.WRONG_ANSWER && renderNotiBoxWrongAnswer()}
      {type === MATCH_STATUS.WINNER && renderNotiBoxWinWhitelist()}
    </div>
  );
};

const DepositAmount = (props: any) => {
  const { depositAmount, handleChangeDepositAmount } = props;
  const amount = "4,000";

  const onChange = (e: any) => {
    const valueInput = e.target.value;
    if (NUMBER_PATTERN.test(valueInput) || valueInput === "") {
      handleChangeDepositAmount(valueInput);
    }
  };

  return (
    <div className="mt-10">
      <div className="flex justify-between">
        <span className="font-semibold text-xl">Deposit Amount:</span>
        <span>Balance; {amount} $BIRD</span>
      </div>
      <p>
        Maximum is 1,000 BIRD/question. Don’t have BIRD token? Click{" "}
        <span>
          <a href="" className="underline font-semibold">
            here
          </a>
        </span>{" "}
        to faucet.
      </p>
      <div className="flex items-center border mt-5 py-2 px-5">
        <input
          type="text"
          className="flex-1"
          value={depositAmount}
          onChange={onChange}
        />
        <span className="mr-5 font-semibold">$BIRD</span>
        <button className="px-10 py-1 bg-yellow-400">Max</button>
      </div>
    </div>
  );
};

const Questions = () => {
  const [inputTeam1, setInputTeam1] = useState<string>("0");
  const [inputTeam2, setInputTeam2] = useState<string>("0");
  const [optionWhoWin, setOptionWhoWin] = useState<number>(0);
  const [depositAmount, setDepositAmount] = useState<string>("0");

  const handleChangeInputTeam1 = (value: string) => {
    setInputTeam1(value);
  };
  const handleChangeInputTeam2 = (value: string) => {
    setInputTeam2(value);
  };
  const handleChangeOptionWhoWin = (option: number) => {
    setOptionWhoWin(option);
  };
  const handleChangeDepositAmount = (value: string) => {
    setDepositAmount(value);
  };

  const handleSubmit = () => {
    console.log("click submit");
  };

  const question1 = {
    isSubmitted: true,
    error: "",
    // error: "Not enough PKF to pay for the gas fee. Click here to faucet.",
    matchStatus: MATCH_STATUS.PREDICTED,
  };
  const renderQuestion1 = () => (
    <Question
      title="1. What will the match score be?"
      handleSubmit={handleSubmit}
      isSubmitted={question1.isSubmitted}
      matchStatus={question1.matchStatus}
    >
      <div>
        <div className="flex items-center">
          <BorderBox label="Qatar" icon="/images/icon-qatar.svg" />
          <div className="flex space-x-5 items-baseline mx-10">
            <InputNumber
              input={inputTeam1}
              handleChange={handleChangeInputTeam1}
              type={question1.matchStatus}
            />
            <span className="text-4xl font-semibold block">:</span>
            <InputNumber
              input={inputTeam2}
              handleChange={handleChangeInputTeam2}
              type={question1.matchStatus}
            />
          </div>
          <BorderBox label="Ecuador" icon="/images/icon-ecuador.svg" />
        </div>
        {question1.error && (
          <p className="text-red-600 font-semibold mt-2">{question1.error}</p>
        )}
        <div>
          {question1.isSubmitted && <NotiBox type={question1.matchStatus} />}
        </div>
      </div>
    </Question>
  );

  const question2 = {
    isSubmitted: true,
    matchStatus: MATCH_STATUS.WRONG_ANSWER,
    errors: [],
    // errors: [
    //   "Not enough BIRD to deposit.  Click here to faucet.",
    //   "Not enough PKF to pay for the gas fee.  Click here to faucet.",
    //   "The maximum total deposit amount for 1 question is 1,000 $BIRD.",
    // ],
    options: [
      { label: "Qatar", icon: "/images/icon-qatar.svg", winRate: 9.72 },
      { label: "Draw", winRate: 6.13 },
      { label: "Ecuador", icon: "/images/icon-ecuador.svg", winRate: 1.27 },
    ],
    results: {
      optionSelected: 0,
      optionEnded: 1,
      deposit: "100",
      earned: "872",
      claim: "972",
    },
  };

  const renderQuestion2 = () => {
    const renderDepositAmountInput = () => {
      return (
        <>
          <DepositAmount
            depositAmount={depositAmount}
            handleChangeDepositAmount={handleChangeDepositAmount}
          />

          {depositAmount && (
            <ul className="mt-10 p-3 bg-yellow-200 pl-10 list-disc">
              <li>
                Correct Prediction: You will claim 972 $BIRD (including your
                deposit amount).
              </li>
              <li>Wrong Prediction: You will lose your deposit amount.</li>
            </ul>
          )}
          {question2.errors.length ? (
            <ul className="mt-10">
              {question2.errors.map((error) => (
                <li key={error} className="text-red-600 font-semibold mt-2">
                  {error}
                </li>
              ))}
            </ul>
          ) : null}
        </>
      );
    };

    const renderResultMatch = () => {
      return (
        <div className="mt-10">
          <div className="bg-orange-100 p-5 grid grid-cols-2 gap-y-5">
            <div className="flex flex-col">
              <span>Deposit Amount:</span>
              <span className="font-semibold">
                {question2.results.deposit} $BIRD
              </span>
            </div>
            <div className="flex flex-col">
              <span>Match Result</span>
              {question2.matchStatus !== MATCH_STATUS.CORRECT_ANSWER &&
                question2.matchStatus !== MATCH_STATUS.WRONG_ANSWER && (
                  <span className="font-semibold">Updating...</span>
                )}
              {question2.matchStatus === MATCH_STATUS.CORRECT_ANSWER && (
                <div className="flex">
                  <img
                    src="images/icon-correct-answer.svg"
                    alt=""
                    className="mr-2"
                  />
                  <span className="font-semibold text-green-600">
                    Correct answer
                  </span>
                </div>
              )}
              {question2.matchStatus === MATCH_STATUS.WRONG_ANSWER && (
                <div className="flex">
                  <img
                    src="images/icon-wrong-answer.svg"
                    alt=""
                    className="mr-2"
                  />
                  <span className="font-semibold text-red-600">
                    Wrong answer
                  </span>
                </div>
              )}
            </div>
            <div className="flex flex-col">
              <span>Earned amount</span>
              <span className="font-semibold">
                {question2.results.earned
                  ? question2.results.earned + " $BIRD"
                  : "Updating..."}
              </span>
            </div>
            <div className="flex flex-col">
              <span>Amount to claim</span>
              <span className="font-semibold">
                {question2.results.claim
                  ? question2.results.claim + " $BIRD"
                  : "Updating..."}
              </span>
            </div>
          </div>
          <div className="mt-5 flex">
            {Number(question2.results.claim) > 0 && (
              <button className="px-10 py-2 bg-black text-white rounded-xl mr-10">
                Claim token
              </button>
            )}
            <button className="px-10 py-2 border-2 border-black rounded-xl flex items-center">
              My history
              <img src="/images/icon-next.svg" alt="" className="ml-2" />
            </button>
          </div>
        </div>
      );
    };

    return (
      <Question
        title="2. Who will in? "
        handleSubmit={handleSubmit}
        isSubmitted={question2.isSubmitted}
        matchStatus={question2.matchStatus}
      >
        <div>
          <div className="flex items-center">
            {question2.options.map((option: any, index: number) => (
              <div
                key={option.label}
                className="flex flex-col items-center mr-10 last:mr-0"
              >
                <BorderBox
                  label={option.label}
                  icon={option.icon}
                  className={
                    optionWhoWin === index ? "bg-yellow-400 border-0" : ""
                  }
                  onClick={() => handleChangeOptionWhoWin(index)}
                />
                <span
                  className={clsx(
                    "rounded-md px-5 mt-2",
                    optionWhoWin === index ? "bg-yellow-400" : "bg-gray-200",
                  )}
                >
                  {option.winRate}
                </span>
              </div>
            ))}
          </div>

          {!question2.isSubmitted && renderDepositAmountInput()}
          {question2.isSubmitted && renderResultMatch()}
        </div>
      </Question>
    );
  };

  return (
    <div className="w-full p-5">
      {renderQuestion1()}
      {renderQuestion2()}
    </div>
  );
};

export default Questions;
