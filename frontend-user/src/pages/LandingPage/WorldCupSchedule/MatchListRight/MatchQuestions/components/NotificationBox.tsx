import { useEffect, useState } from "react";
import { QUESTION_STATUS } from "../../../../../../constants";

type NotificationBoxTypes = {
  type: typeof QUESTION_STATUS[keyof typeof QUESTION_STATUS];
  homeScore: string | undefined;
  awayScore: string | undefined;
};

const NotificationBox = (props: NotificationBoxTypes) => {
  const { type, awayScore = 0, homeScore = 0 } = props;

  //#region RENER REGION

  const renderLinkUpdateScore = () => (
    <span>
      <a href="#" className="font-medium underline">
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
        <span className="font-medium">{`${homeScore} : ${awayScore}`}</span>.
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

  //#endregion END REDNER REGION

  return (
    <div className="flex flex-col items-center mt-5 p-5 bg-orange-100 ">
      {type === QUESTION_STATUS.PREDICTED && renderNotiBoxPredicted()}
      {type === QUESTION_STATUS.CORRECT_ANSWER && renderNotiBoxCorrectAnswer()}
      {type === QUESTION_STATUS.WRONG_ANSWER && renderNotiBoxWrongAnswer()}
      {type === QUESTION_STATUS.WINNER && renderNotiBoxWinWhitelist()}
    </div>
  );
};
export default NotificationBox;
