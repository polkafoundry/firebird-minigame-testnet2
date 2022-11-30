export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL + "api/v1";

export const ROUTES_URL = {
  DASHBOARD: "/dashboard",
  GIFT_CODE: "/code",
  LOGIN: "/login",
};

export const PLATFORM = {
  WEBSITE: "FIRE_BIRD",
  TELEGRAM: "TELE",
  TWITTER: "TWITTER",
  MONSTERRA: "MONSTERRA",
  EPIC_WAR: "EPIC_WAR",
  GAMEFI: "GAMEFI",
  REDKITE: "REDKITE",
};

export const platforms = [
  { label: "All", value: "" },
  { label: "For webiste ", value: PLATFORM.WEBSITE },
  { label: "For tele group", value: PLATFORM.TELEGRAM },
  { label: "For Twitter", value: PLATFORM.TWITTER },
  { label: "For Monsterra", value: PLATFORM.MONSTERRA },
  { label: "For Epic War", value: PLATFORM.EPIC_WAR },
  { label: "For Gamefi.org", value: PLATFORM.GAMEFI },
  { label: "For Red Kite", value: PLATFORM.REDKITE },
];
