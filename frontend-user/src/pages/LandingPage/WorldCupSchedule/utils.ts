import { API_BASE_LOGO_TEAM } from "./../../../constants/index";

export const getImgSrc = (iconNumber: string) =>
  API_BASE_LOGO_TEAM + iconNumber + ".png";
