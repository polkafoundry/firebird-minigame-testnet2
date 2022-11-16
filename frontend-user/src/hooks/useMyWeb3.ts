import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { formatEther } from "ethers/lib/utils";
import { useCallback, useEffect, useState } from "react";
import useSWR from "swr";
import { BIRD_CHAIN_ID } from "../constants/networks";
import useBirdToken from "./useBirdToken";

const fetcher =
  (library: any) =>
  (...args: [any, ...any[]]) => {
    const [method, ...params] = args;
    return library[method](...params);
  };

export const useMyWeb3 = () => {
  const { account, library, chainId } = useWeb3React<Web3Provider>();
  const [state, setState] = useState<{
    realTimeBalance: string;
    nativeCurrency: string;
    isWrongChain: boolean;
    account: string;
    birdBalance: string;
  }>({
    realTimeBalance: "0",
    nativeCurrency: "PKF",
    isWrongChain: false,
    account: "",
    birdBalance: "0",
  });

  const { getBirdBalance } = useBirdToken();

  const { data: balance, mutate } = useSWR(["getBalance", account, "latest"], {
    fetcher: fetcher(library),
  });
  const TIME_TO_REFETCH_BALANCE = 2000;

  // get Bird token
  useEffect(() => {
    const getBirdToken = async () => {
      const balance = account ? await getBirdBalance(account) : "0";
      setState((preState: any) => ({
        ...preState,
        account: account,
        birdBalance: balance,
      }));
    };

    getBirdToken();
  }, [account]);

  // auto refetch balance
  useEffect(() => {
    const timer = setInterval(() => {
      mutate(undefined, true);
    }, TIME_TO_REFETCH_BALANCE);
    return () => clearInterval(timer);
  }, []);

  // update realTimeBalance
  useEffect(() => {
    if (!balance) return;

    const newBalance = balance
      ? parseFloat(formatEther(balance)).toFixed(4)
      : "0";
    setState((preState: any) => ({ ...preState, realTimeBalance: newBalance }));
  }, [balance]);

  // check wrong chain Id
  useEffect(() => {
    const isWrong = !(chainId === +BIRD_CHAIN_ID);
    setState((preState: any) => ({ ...preState, isWrongChain: isWrong }));
  }, [chainId]);

  const updateBirdBalance = useCallback(async () => {
    const balance = account ? await getBirdBalance(account) : "0";
    setState((preState: any) => ({
      ...preState,
      birdBalance: balance,
    }));
  }, [account]);

  return { ...state, updateBirdBalance };
};
