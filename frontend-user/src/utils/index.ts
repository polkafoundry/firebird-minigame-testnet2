export const displayWalletAddress = (address: string, digits = 6) => {
  return `${address.substring(0, digits)}...${address.substring(
    address.length - 3,
    address.length,
  )}`;
};
