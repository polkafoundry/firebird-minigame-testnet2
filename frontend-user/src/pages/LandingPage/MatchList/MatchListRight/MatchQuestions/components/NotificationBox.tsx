import clsx from "clsx";
import { BASE_HREF, QUESTION_STATUS, URLS } from "../../../../../../constants";

type NotificationBoxTypes = {
  type: typeof QUESTION_STATUS[keyof typeof QUESTION_STATUS];
  homeScore: string | undefined;
  awayScore: string | undefined;
  homePredictedScore?: string;
  awayPredictedScore?: string;
  predictPrize: string;
};

const NotificationBox = (props: NotificationBoxTypes) => {
  const {
    type,
    awayScore = 0,
    homeScore = 0,
    homePredictedScore,
    awayPredictedScore,
    predictPrize,
  } = props;

  //#region RENER REGION

  const renderLinkUpdateScore = () => (
    <span>
      <a
        href={BASE_HREF + URLS.LEADERBOARD}
        target={"_blank"}
        rel="norefferer"
        className="underline text-[#2F91EB]"
      >
        here
      </a>
      .
    </span>
  );

  const renderNotiBoxPredicted = () => (
    <>
      <div className="flex flex-col xs:flex-row w-full items-center">
        <img
          src="/images/landing-page/predicted.png"
          alt=""
          className="w-[88px] h-[88px] mx-auto xs:mx-0"
        />
        <div className="ml-3 mt-3 xs:mt-0">
          <div className="text-14/20 xs:text-16/20 font-tthoves font-semibold">
            {`Predicted (${homePredictedScore} : ${awayPredictedScore})`}
          </div>
          <p className="text-12/18 xs:text-14/24 mt-1 font-inter">
            If your answer is correct, you will be added to the whitelist and
            have a chance to win{" "}
            <span className="font-bold">{predictPrize}</span>. The result will
            be updated {renderLinkUpdateScore()}
          </p>
        </div>
      </div>
    </>
  );

  const renderNotiBoxCorrectAnswer = () => (
    <>
      <div className="flex flex-col xs:flex-row w-full items-center">
        <img
          src="/images/landing-page/predicted-correct.png"
          alt=""
          className="w-[88px] h-[88px] mx-auto xs:mx-0"
        />
        <div className="ml-3 mt-3 xs:mt-0">
          <div className="text-14/20 xs:text-16/20 font-tthoves font-semibold text-[#14B64D]">
            Correct answer
          </div>
          <div className="text-12/18 xs:text-14/24 mt-1 font-inter flex flex-col">
            <p>
              Your prediction is correct and have been added to the whitelist.
            </p>
            <p>The result will be updated {renderLinkUpdateScore()}</p>
          </div>
        </div>
      </div>
    </>
  );

  const renderNotiBoxWrongAnswer = () => (
    <>
      <div className="flex flex-col xs:flex-row w-full items-center">
        <img
          src="/images/landing-page/predicted-wrong.png"
          alt=""
          className="w-[88px] h-[88px] mx-auto xs:mx-0"
        />
        <div className="ml-3 mt-3 xs:mt-0">
          <div className="text-14/20 xs:text-16/20 font-tthoves font-semibold text-[#FF3E57]">
            Wrong answer
          </div>
          <div className="text-12/18 xs:text-14/24 mt-1 font-inter flex flex-col">
            <p>
              Your prediction is incorrect. Better luck next time! Don't give
              up.
            </p>
            <p>
              The correct score is{" "}
              <span className="font-bold">{`${homeScore}:${awayScore}`}</span>.
            </p>
          </div>
        </div>
      </div>
    </>
  );

  const renderNotiBoxWinWhitelist = () => (
    <>
      <div className="flex flex-col xs:flex-row w-full items-center">
        <img
          src="/images/landing-page/predicted-winner.png"
          alt=""
          className="w-[88px] h-[88px] mx-auto xs:mx-0"
        />
        <div className="ml-3 mt-3 xs:mt-0">
          <div className="text-14/20 xs:text-16/20 font-tthoves font-semibold text-[#DA8300]">
            {predictPrize} Winner
          </div>
          <div className="text-12/18 xs:text-14/24 mt-1 font-inter flex flex-col">
            <p>Congratulations! You have won {predictPrize}.</p>
            <p>Check the result {renderLinkUpdateScore()}</p>
          </div>
        </div>
      </div>
    </>
  );

  //#endregion END REDNER REGION

  const getBackgroundColor = () => {
    switch (type) {
      case QUESTION_STATUS.PREDICTED:
        return "bg-[#F2F2F2]";
      case QUESTION_STATUS.CORRECT_ANSWER:
        return "bg-[#e8f8ee]";
      case QUESTION_STATUS.WRONG_ANSWER:
        return "bg-[#ffecef]";
      case QUESTION_STATUS.WINNER:
        return "bg-[#fffced]";
      default:
        return "bg-[#F2F2F2]";
    }
  };

  return (
    <div
      className={clsx(
        "flex flex-col items-center mt-3 p-3",
        getBackgroundColor(),
      )}
    >
      {type === QUESTION_STATUS.PREDICTED && renderNotiBoxPredicted()}
      {type === QUESTION_STATUS.CORRECT_ANSWER && renderNotiBoxCorrectAnswer()}
      {type === QUESTION_STATUS.WRONG_ANSWER && renderNotiBoxWrongAnswer()}
      {type === QUESTION_STATUS.WINNER && renderNotiBoxWinWhitelist()}
    </div>
  );
};
export default NotificationBox;
