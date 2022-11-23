const DEFAULT_ERROR_MESSAGE = "Something went wrong";

export const getErrorMessage = (
  err: any,
  defaultMessage = DEFAULT_ERROR_MESSAGE,
) => {
  // Init regex inside a function to reset regex (reset lastIndex)
  const REGEX_GET_MESSAGE = /execution reverted:([^"]*)/gm;
  if (err.message?.includes("execution reverted:")) {
    const match = REGEX_GET_MESSAGE.exec(err.message);
    return match ? match[1] : defaultMessage;
  }
  if (err.message?.includes("User denied")) {
    return err.message;
  }
  return defaultMessage;
};
