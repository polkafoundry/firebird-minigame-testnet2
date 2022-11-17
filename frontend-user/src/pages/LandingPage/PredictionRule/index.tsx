import clsx from "clsx";
import HeadingPrimary from "../components/HeadingPrimary";
import styles from "./predictionRule.module.scss";

const predictionRules = [
  [
    {
      title: "Match Score",
      description:
        "Predict final score of a match. You will be added to the match's whitelist if your prediction is correct. 1 winner for each game will be selected randomly by Chainlink.",
    },

    { image: "./images/landing-page/prediction-rule/image-1.png" },
  ],
  [
    { image: "./images/landing-page/prediction-rule/image-2.png" },
    {
      title: "Who wins?",
      description:
        "Predict which team will be the winner.  You will need to deposit $BIRD to join. If your team wins, you will receive bonus $BIRD based on the rate given.",
    },
  ],
  [
    {
      title: "Total goals",
      description:
        "You will be able to predict the total goals in both 1st half & full match. Your prediction can be  lower or higher than a given total number. You will need to deposit $BIRD to join.",
    },
    { image: "./images/landing-page/prediction-rule/image-3.png" },
  ],
];

const PredictionRule = () => {
  return (
    <div id="prediction-rule" className="mt-[60px] md:mt-[120px]">
      <HeadingPrimary title="Prediction Rule" />
      <div
        className={clsx(
          "bg-white text-white -mt-2 md:mt-5 grid grid-rows-3 md:grid-cols-3 md:grid-rows-1",
          styles.predictRuleBg,
        )}
      >
        {predictionRules.map((ruleRow, indexRuleRow) => (
          <div
            key={indexRuleRow}
            className={clsx(
              "flex flex-col md:grid md:grid-rows-2 py-10 md:hover:-translate-y-8 transition",
            )}
          >
            {ruleRow.map((rule, indexRule) => {
              return (
                <div key={indexRule} className="">
                  {!rule.image ? (
                    <div
                      className={clsx(
                        "px-8 lg:px-[60px] flex flex-col justify-center",
                        indexRuleRow !== 1 ? "pt-5 lg:pt-10" : "mt-5 md:mt-0",
                      )}
                    >
                      <span
                        className="text-24/32 2md:text-32/40 font-semibold"
                        data-aos="fade-up"
                      >
                        {rule.title}
                      </span>
                      <p
                        className="mt-2 pb-5 md:mt-3 text-14/24 2md:text-18/32 font-normal"
                        data-aos="fade-up"
                        data-aos-delay="200"
                      >
                        {rule.description}
                      </p>
                    </div>
                  ) : (
                    <div
                      className={clsx(
                        "px-8 md:mt-0",
                        indexRuleRow === 1 && "md:pb-8",
                      )}
                    >
                      <img src={rule.image} alt="" className="w-full" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PredictionRule;
