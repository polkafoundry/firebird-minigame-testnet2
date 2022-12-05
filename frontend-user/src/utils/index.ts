import { BigNumber, ethers } from "ethers";
import moment from "moment";
import { API_BASE_LOGO_TEAM, rounds } from "../constants";

export const displayWalletAddress = (address: string, digits = 6) => {
  return `${address.substring(0, digits)}...${address.substring(
    address.length - 3,
    address.length,
  )}`;
};

export const formatCurrency = (n: any, maxLengthOfDecimal = 2) => {
  if (n === null || n === undefined) return "0";

  const newNumber = Number(n);
  const lengthOfDecimal =
    Math.floor(newNumber) !== newNumber ? maxLengthOfDecimal : 0;

  const re = "\\d(?=(\\d{3})+" + (lengthOfDecimal ? "\\." : "$") + ")";
  return newNumber
    .toFixed(Math.max(0, ~~lengthOfDecimal))
    .replace(new RegExp(re, "g"), "$&,");
};

export async function checkMetaMaskIsUnlocked() {
  let unlocked;
  const provider = new ethers.providers.Web3Provider((window as any).ethereum);

  try {
    const accounts = await provider.listAccounts();
    unlocked = accounts.length > 0;
  } catch (e) {
    unlocked = false;
  }

  return unlocked;
}

export function groupArrayById(arr = [], key: string) {
  return key
    ? arr.reduce(
        (currentItem: any, result: any) => (
          !currentItem[result[key]] && (currentItem[result[key]] = []),
          currentItem[result[key]].push(result),
          currentItem
        ),
        {},
      )
    : {};
}

export const getMatchTime = (time: any) => {
  if (!time) return "N/A";

  return moment(time).format("HH:mm");
};

export const getDateTime = (time: any) => {
  if (!time) return "N/A";

  return moment(time).format("YYYY/MM/DD HH:mm");
};

export const getImgSrc = (iconNumber: string) =>
  API_BASE_LOGO_TEAM + iconNumber + ".png";

export const convertHexToStringNumber = (hex: any, decimals = 18) => {
  if (hex === null || hex === undefined) return "0";
  return BigNumber.from(hex).div(BigNumber.from(10).pow(decimals)).toString();
};

export const convertHexToNumberFormat = (hex: any, decimals = 18) => {
  if (hex === null || hex === undefined) return "0";
  return formatCurrency(
    BigNumber.from(hex).div(BigNumber.from(10).pow(decimals)).toString(),
  );
};

export const getCurrentRound = () => {
  const currentUTCTime = moment().utc();

  const currentRound = [...rounds].reverse().find((round) => {
    if (round.startTime && round.endTime) {
      return (
        (moment(currentUTCTime).isAfter(round.startTime) &&
          moment(currentUTCTime).isBefore(round.endTime)) ||
        moment(currentUTCTime).isSame(round.startTime)
      );
    } else if (!round.endTime) {
      return (
        moment(currentUTCTime).isAfter(round.startTime) ||
        moment(currentUTCTime).isSame(round.startTime)
      );
    } else if (!round.startTime) {
      return moment(currentUTCTime).isBefore(round.endTime);
    }
  });
  return currentRound || rounds[0];
};
