import useSWR from "swr";
import { API_BASE_URL } from "../constants";

type useFetchReturnType<T> = {
  loading: boolean;
  error: string;
  data: T | undefined;
  mutate: (arg0: any) => void;
};
const fetcher = (url: string) => fetch(url).then((res) => res.json());

const useFetch = <T,>(uriProps: string | undefined): useFetchReturnType<T> => {
  const { data, error, mutate } = useSWR(API_BASE_URL + uriProps, fetcher);

  return {
    loading: !error && !data,
    data,
    error,
    mutate,
  };
};

export default useFetch;
