import { useEffect, useState } from "react";
import { API_BASE_URL } from "../constants";
import { fetcher } from "./useFetch";

type usePostReturnType<T> = {
  loading: boolean;
  error: string;
  response: T | undefined;
};

const usePost = <T,>(
  uriProps: string | undefined,
  payload: any,
  shouldFetch = true,
): usePostReturnType<T> => {
  const [response, setResponse] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!shouldFetch) {
      setResponse(null);
      return;
    }
    setLoading(true);
    fetcher(`${API_BASE_URL}${uriProps}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        setResponse(res);
      })
      .catch((err: any) => {
        console.log("ERR fetch predict info: ", err);
        setError(err?.message || "Something went wrong");
      });
    setLoading(false);
  }, [uriProps, shouldFetch]);

  return {
    loading,
    response,
    error,
  };
};

export default usePost;
