import useSWR from "swr";
import { API_BASE_URL } from "../constants";

type useFetchReturnType<T> = {
  loading: boolean;
  error: string;
  data: T | undefined;
};
export const fetcher = (url: string, ...args: any) =>
  fetch(url, ...args).then((res) => res.json());

const useFetch = <T,>(
  uriProps?: string | undefined,
  shouldFetch = true,
  disableAutoRefetch = false,
): useFetchReturnType<T> => {
  const { data, error } = useSWR(
    shouldFetch ? `${API_BASE_URL}${uriProps}` : null,
    fetcher,
    disableAutoRefetch
      ? {
          revalidateIfStale: false,
          revalidateOnFocus: false,
          revalidateOnReconnect: false,
        }
      : {},
  );

  return {
    loading: !error && !data,
    data,
    error,
  };
};

export default useFetch;
