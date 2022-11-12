import { BET_PLACE } from "../../../../../../constants";

export const getOptionColorFromIndex = (
  question: any,
  index: number,
  optionWhoWin?: number,
  isSubmitted?: boolean,
  finalResultIndex?: number,
) => {
  const defaultStyles = "bg-[#EDEDED]";
  if (!question) return defaultStyles;

  const correctStyles = "bg-[#14B64D33] border-[#14B64D]";
  const wrongStyles = "bg-[#FF3E5733] border-[#3a0013] border-2 opacity-50";
  const selectedStyles = "bg-[#3A001333] border-[#3a0013] border-2";
  const notIsAnswerStyles = "opacity-50 bg-[#EDEDED]";

  if (question?.match_status === "finished" && !question?.result)
    return notIsAnswerStyles;

  if (isSubmitted) {
    if (question.optionSelected === index) {
      if (question?.result === "win") {
        return correctStyles;
      } else {
        return wrongStyles;
      }
    } else if (finalResultIndex === index) return correctStyles;

    return notIsAnswerStyles;
  } else if (optionWhoWin === index) return selectedStyles;

  return defaultStyles;
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

export const getFinalResultIndex = (result: string, bet_place: string) => {
  switch (result) {
    case "win":
      return getOptionIndexByBetPlace(bet_place);
    case "draw":
      return 1;
    case "lose":
      return getOptionIndexByBetPlace(bet_place) === 0 ? 2 : 0;
  }
};
