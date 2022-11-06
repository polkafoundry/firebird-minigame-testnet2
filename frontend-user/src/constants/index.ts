export const API_BASE_LOGO_TEAM = process.env.REACT_APP_API_LOGO_TEAM;
export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL + "api/v1";

export const BETTING_CONTRACT = process.env.REACT_APP_BETTING_CONTRACT;
export const BIRD_TOKEN_CONTRACT = process.env.REACT_APP_BIRD_TOKEN_CONTRACT;

export const MAX_DEPOSIT_AMOUNT = 1000;

export const URLS = {
  HOME: "/",
  LEADERBOARD: "/leaderboard",
  HISTORY: "/history",
  FAUCET_TESTNET: "https://faucet.firefly.firebirdchain.com/",
};

// only accept number [0-9] and less than 2 digits
export const SCORE_PATTER = /^\d{1,2}$/;

export const NUMBER_PATTERN = /^\d{1,10}?\.?(\d{1,18})?$/;

export const quickGuide = [
  "Select a match",
  "Answer questions & submit your predictions",
  "The match results will be updated.",
  "Check the leadeborad menu to see your rank.",
];

export enum QUESTION_STATUS {
  NOT_PREDICTED,
  PREDICTED,
  CORRECT_ANSWER,
  WRONG_ANSWER,
  WINNER,
}

export const MATCH_RESULT = {
  WIN: "win",
  DRAW: "draw",
  LOSE: "lose",
};

export const MATCH_STATUS = {
  UPCOMING: "upcoming",
  LIVE: "live",
  FINISHED: "finished",
  POSTPONED: "postponed",
};

export const MATCH_STATUS_TEXT = {
  [MATCH_STATUS.UPCOMING]: "Not yet",
  [MATCH_STATUS.LIVE]: "On going",
  [MATCH_STATUS.FINISHED]: "Ended",
  [MATCH_STATUS.POSTPONED]: "Post poned",
};

export const BET_TYPE = {
  OVER_UNDER_HALF_TIME: "ou_ht",
  OVER_UNDER_FULL_TIME: "ou_ft",
  ODD_EVEN_HALF_TIME: "odds_ht",
  ODD_EVEN_FULL_TIME: "odds_ft",
};
