import { API_BASE_URL } from "../constants";
import { fetcher } from "../hooks/useFetch";

export const getMyHistory = async (uri: string, queryParams: any) => {
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
    console.log("ERR getMyHistory: ", err);
    return;
  }
};
