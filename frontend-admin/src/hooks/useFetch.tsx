import useSWR, { KeyedMutator } from "swr";
import { API_BASE_URL } from "../constants";

type useFetchReturnType<T> = {
  loading: boolean;
  error: string;
  mutate: KeyedMutator<any>;
  data: T | undefined;
};
export const fetcherWithAuth = (url: string, address: string) =>
  fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: address,
    },
  }).then((res) => res.json());
export const fetcher = (url: string) => fetch(url).then((res) => res.json());

const useFetch = <T,>(
  uriProps?: string | undefined,
  shouldFetch = true,
  disableAutoRefetch = false,
  address?: string,
): useFetchReturnType<T> => {
  const { data, error, mutate } = useSWR(
    address
      ? [shouldFetch ? `${API_BASE_URL}${uriProps}` : null, address]
      : `${API_BASE_URL}${uriProps}`,
    address ? fetcherWithAuth : fetcher,
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
    mutate,
    error,
  };
};

export default useFetch;
