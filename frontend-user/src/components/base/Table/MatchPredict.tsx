import clsx from "clsx";
import { BETTING_RESULT } from "../../../constants";

type MatchPredictProps = {
  isCorrect?: boolean;
  isDisplayText?: boolean;
  result?: string;
};

const MatchPredict = (props: MatchPredictProps) => {
  const { isCorrect = true, isDisplayText = true, result } = props;
  const textColor = isCorrect ? "text-[#43c571]" : "text-[#ff6478]";
  const iconSrc = isCorrect
    ? "/images/icon-correct-answer.svg"
    : "/images/icon-wrong-answer.svg";
  const iconSize = isDisplayText ? "w-[18px] h-[18px]" : "w-[16px] h-[16px]";

  return (
    <div className="flex items-center">
      {!result && (
        <>
          <img src={iconSrc} alt="" className={iconSize} />
          {isDisplayText && (
            <span className={clsx(textColor, "font-semibold ml-1")}>
              {isCorrect ? "Correct" : "Incorrect"}
            </span>
          )}
        </>
      )}

      {result === BETTING_RESULT.WIN && <div>Win</div>}
      {result === BETTING_RESULT.DRAW && <div>Draw</div>}
      {result === BETTING_RESULT.LOSE && <div>Lose</div>}
    </div>
  );
};

export default MatchPredict;
