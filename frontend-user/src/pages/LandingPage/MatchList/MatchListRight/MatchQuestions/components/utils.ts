import { BET_PLACE, BET_TYPE, MATCH_STATUS } from "../../../../../../constants";

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

  if (
    [MATCH_STATUS.FINISHED, MATCH_STATUS.LIVE].includes(
      question?.match_status,
    ) &&
    question?.optionSelected === undefined
  ) {
    return notIsAnswerStyles;
  }

  if (MATCH_STATUS.FINISHED === question?.match_status && !question?.result)
    return notIsAnswerStyles;

  if (isSubmitted) {
    if (question?.optionSelected === index) {
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

const getIndexOfTeamWinner = (home_score: number, away_score: number) =>
  home_score > away_score ? 0 : home_score === away_score ? 1 : 2;

export const getFinalResultIndex = (dataQuestion: any) => {
  if (dataQuestion?.is_half_time) {
    switch (dataQuestion?.bet_type) {
      case BET_TYPE.ODD_EVEN_HALF_TIME:
        return getIndexOfTeamWinner(
          dataQuestion?.ht_home_score,
          dataQuestion?.ht_away_score,
        );

      case BET_TYPE.OVER_UNDER_HALF_TIME:
        return dataQuestion?.ht_home_score + dataQuestion?.ht_away_score <
          +dataQuestion?.ou_statistics
          ? 0
          : 2;
    }
  }

  if (dataQuestion?.is_full_time) {
    switch (dataQuestion?.bet_type) {
      case BET_TYPE.ODD_EVEN_FULL_TIME:
        return getIndexOfTeamWinner(
          dataQuestion?.ft_home_score,
          dataQuestion?.ft_away_score,
        );

      case BET_TYPE.OVER_UNDER_FULL_TIME:
        return dataQuestion?.ft_home_score + dataQuestion?.ft_away_score <
          +dataQuestion?.ou_statistics
          ? 0
          : 2;
    }
  }
  return -1;
};
