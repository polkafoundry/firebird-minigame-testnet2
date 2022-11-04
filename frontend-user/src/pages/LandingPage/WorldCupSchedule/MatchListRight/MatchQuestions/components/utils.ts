export const getOptionColorFromIndex = (
  question: any,
  index: number,
  defaultClass?: string,
  optionWhoWin?: number,
) => {
  if (question.isSubmitted) {
    if (question.results.optionSelected === index) {
      if (question.results.optionSelected === question.results.optionEnded) {
        return "bg-green-400";
      } else {
        return "border border-red-400 text-red-400 font-semibold";
      }
    } else if (question.results.optionEnded === index) return "bg-green-400";
  } else {
    if (optionWhoWin === index) return "bg-yellow-400 border-yellow-400";
  }
  return defaultClass;
};
