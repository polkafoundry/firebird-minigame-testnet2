import HeadingPrimary from "../components/HeadingPrimary";

const predictionRules = [
  [
    {
      image: "./images/landing-page/prediction-rule/bg-match-score.png",
      title: "Match Score",
      description:
        "Predict final score of a match. You will be added to the match's whitelist if your prediction is correct. 1 winner for each game will be selected randomly by Chainlink.",
    },
    { image: "./images/landing-page/prediction-rule/image-1.png" },
  ],
  [
    { image: "./images/landing-page/prediction-rule/image-2.png" },
    {
      image: "./images/landing-page/prediction-rule/bg-who-win.png",
      title: "Who wins?",
      description:
        "Predict which team will be the winner.  You will need to deposit $BIRD to join. If your team wins, you will receive bonus $BIRD based on the rate given.",
    },
  ],
  [
    {
      image: "./images/landing-page/prediction-rule/bg-total-goal.png",
      title: "Total goals",
      description:
        "You will be able to predict the total goals in both 1st half & full match. Your prediction can be  lower or higher than a given total number. You will need to deposit $BIRD to join.",
    },
    { image: "./images/landing-page/prediction-rule/image-3.png" },
  ],
];

const PredictionRule = () => {
  return (
    <div>
      <HeadingPrimary title="Prediction Rule" />
      <div className="bg-white text-white mt-20">
        {predictionRules.map((ruleRow, indexRuleRow) => (
          <div key={indexRuleRow} className="flex">
            {ruleRow.map((rule, indexRule) => {
              if (rule.title) {
                return (
                  <div key={indexRule} className="flex-1 relative">
                    <img src={rule.image} />
                    <div className="absolute top-0 w-full h-full flex flex-col justify-center pb-10 px-10 xs:px-20 lg:px-[120px]">
                      <span className="text-40/52 font-semibold">
                        {rule.title}
                      </span>
                      <p className="mt-5 text-18/32 font-normal">
                        {rule.description}
                      </p>
                    </div>
                  </div>
                );
              } else
                return (
                  <div className="flex-1">
                    <img src={rule.image} />
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
