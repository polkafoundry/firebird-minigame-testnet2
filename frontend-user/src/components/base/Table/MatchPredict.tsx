import clsx from "clsx";

type MatchPredictProps = {
  isCorrect: boolean;
  isDisplayText?: boolean;
};

const MatchPredict = (props: MatchPredictProps) => {
  const { isCorrect = true, isDisplayText = true } = props;
  const textColor = isCorrect ? "text-green-500" : "text-red-500";
  const iconSrc = isCorrect
    ? "/images/icon-correct-answer.svg"
    : "/images/icon-wrong-answer.svg";
  const iconSize = isDisplayText ? "w-[18px] h-[18px]" : "w-[27px] h-[27px]";

  return (
    <div>
      <img src={iconSrc} alt="" className={iconSize} />
      {isDisplayText && (
        <span className={clsx(textColor, "font-semibold ml-1")}>
          {isCorrect ? "Correct" : "Incorrect"}
        </span>
      )}
    </div>
  );
};

export default MatchPredict;
