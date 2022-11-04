import useSWR from "swr";
import { API_BASE_URL } from "../constants";

type useFetchReturnType<T> = {
  loading: boolean;
  error: string;
  data: T | undefined;
};
const fetcher = (url: string) => {
  if (url === API_BASE_URL)
    return { data: undefined, error: "Url is an empty or undefined string" };
  return fetch(url).then((res) => res.json());
};

const useFetch = <T,>(uriProps?: string | undefined): useFetchReturnType<T> => {
  const { data, error } = useSWR(API_BASE_URL + uriProps, fetcher);

  return {
    loading: !error && !data,
    data,
    error,
  };
};

export default useFetch;
