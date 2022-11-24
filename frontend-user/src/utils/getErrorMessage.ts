const DEFAULT_ERROR_MESSAGE = "Something went wrong";

function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// const isMetamaskUnLoaded = (errorCode: any) => errorCode === -32603;
const isUserRejectTransaction = (errorMessage: any) =>
  errorMessage.includes("user rejected transaction");

export const getErrorMessage = (
  err: any,
  defaultMessage = DEFAULT_ERROR_MESSAGE,
) => {
  if (isUserRejectTransaction(err.message)) {
    return "MetaMask Tx Signature: User denied transaction signature";
  }

  // Init regex inside a function to reset regex (reset lastIndex)
  const REGEX_EXECUTION_REVERT = /execution reverted:([^"]*)/gm;
  if (err.message?.includes("execution reverted:")) {
    const match = REGEX_EXECUTION_REVERT.exec(err.message);
    return match ? match[1] : defaultMessage;
  }

  const REGEX_GET_MESSAGE = /message":"(.+)"/gm;
  if (err.message?.includes("message")) {
    const match = REGEX_GET_MESSAGE.exec(err.message);
    return match ? capitalizeFirstLetter(match[1]) : defaultMessage;
  }

  return defaultMessage;
};
