import { ethers } from "ethers";

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

export const displayWalletAddress = (address: string, digits = 6) => {
  return `${address.substring(0, digits)}...${address.substring(
    address.length - 3,
    address.length,
  )}`;
};
