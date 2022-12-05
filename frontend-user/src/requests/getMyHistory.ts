import { API_BASE_URL } from "../constants";
import { fetcher } from "../hooks/useFetch";
import { LoggingDataProps } from "../utils/encryptData";

export const sendPostRequest = async (uri: string, queryParams: any) => {
  try {
    const res = fetcher(`${API_BASE_URL}${uri}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(queryParams),
    });
    return res;
  } catch (err: any) {
    console.log("ERR sendPostRequest: ", err);
    return;
  }
};

export const sendDataLogging = (dataLogging: LoggingDataProps) => {
  sendPostRequest("/user/log-error", {
    log_hash: dataLogging,
  });
};
