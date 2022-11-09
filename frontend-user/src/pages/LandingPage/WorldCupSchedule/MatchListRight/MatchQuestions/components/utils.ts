import { BET_PLACE } from "../../../../../../constants";

export const getOptionColorFromIndex = (
  question: any,
  index: number,
  defaultClass?: string,
  optionWhoWin?: number,
) => {
  if (!question) return defaultClass;
  if (question.isSubmitted) {
    if (question.results?.optionSelected === index) {
      if (question.results?.optionSelected === question.results?.optionEnded) {
        return "bg-green-400";
      } else {
        return "border border-red-400 text-red-400 font-semibold";
      }
    } else if (question.results?.optionEnded === index) return "bg-green-400";
  } else {
    if (optionWhoWin === index) return "bg-yellow-400 border-yellow-400";
  }
  return defaultClass;
};

export const getOptionIndexByBetPlace = (bet_place: string) => {
  switch (bet_place) {
    case BET_PLACE.HOME:
      return 0;
    case BET_PLACE.DRAW:
      return 1;
    case BET_PLACE.AWAY:
      return 2;
    case BET_PLACE.UNDER:
      return 0;
    case BET_PLACE.OVER:
      return 2;
  }
};
