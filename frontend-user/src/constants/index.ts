export const LANDING_PAGE_URL = process.env.REACT_APP_BASE_URL;
export const FAUCET_URL = process.env.REACT_APP_FAUCET_BASE_URL;
export const API_BASE_LOGO_TEAM = process.env.REACT_APP_API_LOGO_TEAM;
export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL + "api/v1";

export const BETTING_CONTRACT = process.env.REACT_APP_BETTING_CONTRACT;
export const BIRD_TOKEN_CONTRACT = process.env.REACT_APP_BIRD_TOKEN_CONTRACT;

export const MAX_DEPOSIT_AMOUNT = 1000;

export const BASE_HREF =
  typeof window !== "undefined" && window.location.origin
    ? window.location.origin
    : "";

export const URLS = {
  HOME: "/",
  LEADERBOARD: "/leaderboard",
  HISTORY: "/history",
  PHOENIX_CUP: "/phoenixcup",
  FAQ: "/faq",
  GAMEFI_POOL: "https://gamefi.org/party/63679886-1868-41fe-bfc7-a9bc8f40bd46",
  MONSTERRA: "https://monsterra.io/",
};

// only accept number [0-9] and less than 2 digits
export const SCORE_PATTER = /^\d{1,2}$/;

export const NUMBER_PATTERN = /^\d{1,10}?\.?(\d{1,18})?$/;

export const quickGuide = [
  "Select a match",
  "Answer questions & submit your predictions",
  "The match results will be updated",
  "Check the Leaderboard menu to see your rank",
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

export const BET_PLACE = {
  HOME: "home",
  DRAW: "draw",
  AWAY: "away",
  UNDER: "under",
  OVER: "over",
};

export const BETTING_RESULT = {
  WIN: "win",
  DRAW: "draw",
  LOSE: "lose",
};

export const HISTORY_NAV_VALUES = {
  GOALS: 1,
  MATCH_SCORE: 2,
};

export type RoundTypes = {
  value: number;
  label: string;
  prize: string;
};

export const rounds: Array<RoundTypes> = [
  {
    label: "GROUP STAGE - ROUND 1",
    prize: "$20",
    value: 1,
  },
  {
    label: "GROUP STAGE - ROUND 2",
    prize: "$20",
    value: 15,
    // value: 2,
  },
  {
    label: "GROUP STAGE - ROUND 3",
    prize: "$20",
    value: 3,
  },
  {
    label: "PLAYOFFS ROUND OF 16",
    prize: "$30",
    value: 116,
  },
  {
    label: "QUARTERFINAL",
    prize: "$50",
    value: 18,
  },
  {
    label: "SEMIFINAL",
    prize: "$70",
    value: 14,
  },
  {
    label: "PLAYOFFS 3RD PLACE FINAL",
    prize: "$80",
    value: 34,
  },
  {
    label: "FINAL",
    prize: "$100",
    value: 12,
  },
];

export type SocialItemTypes = {
  img: string;
  imgHover: string;
  label: string;
  username?: string;
  url: string;
};
export const socialsData: Array<SocialItemTypes> = [
  {
    img: "/images/socials/twitter.svg",
    imgHover: "/images/socials/twitter.svg",
    label: "Official Twitter",
    url: "https://twitter.com/Firebirdchain",
    username: "@Firebirdchain",
  },
  {
    img: "/images/socials/github.svg",
    imgHover: "/images/socials/github.svg",
    label: "Github",
    url: "https://github.com/firebird",
    // username: "@Firebird"
  },
  {
    img: "/images/socials/medium.svg",
    imgHover: "/images/socials/medium.svg",
    label: "Medium",
    url: "https://medium.com/firebirdchain",
    username: "@Firebirdchain",
  },
  {
    img: "/images/socials/reddit.svg",
    imgHover: "/images/socials/reddit.svg",
    label: "Reddit",
    url: "https://www.reddit.com/r/firebirdchain/",
    username: "r/firebirdchain",
  },
  {
    img: "/images/socials/announcement.svg",
    imgHover: "/images/socials/announcement.svg",
    label: "Announcement Channel",
    url: "https://t.me/FirebirdANN",
    username: "@FirebirdANN",
  },
  {
    img: "/images/socials/telegram.svg",
    imgHover: "/images/socials/telegram.svg",
    label: "Telegram Group",
    url: "https://t.me/Firebird_en",
    username: "@Firebird_en",
  },
];
