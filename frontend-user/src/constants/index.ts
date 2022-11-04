export const API_BASE_LOGO_TEAM = process.env.REACT_APP_API_LOGO_TEAM;
export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL + "/api/v1";
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

export const MATCH_STATUS = {
  ON_GOING: "On going",
  NOT_YET: "Not yet",
  ENDED: "Ended",
};
