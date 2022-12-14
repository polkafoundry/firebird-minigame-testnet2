import { useWeb3React } from "@web3-react/core";
import { useCallback, useMemo, useState } from "react";
import { toast } from "react-toastify";
import BIRD_ABI from "../abi/SBirdToken.json";
import { BETTING_CONTRACT, BIRD_TOKEN_CONTRACT } from "../constants";
import { BIRD_CHAIN_ID } from "../constants/networks";
import { convertHexToStringNumber } from "../utils";
import { getContract } from "../utils/contract";

export const MAX_INT =
  "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff";

const useBirdToken = () => {
  const { library, account, chainId } = useWeb3React();

  const [loadingApprove, setLoadingApprove] = useState<boolean>(false);
  const [transactionHash, setTransactionHash] = useState<string>("");
  const isWrongChain = useMemo(() => !(chainId === +BIRD_CHAIN_ID), [chainId]);

  const approveBirdToken = useCallback(async () => {
    if (!BIRD_TOKEN_CONTRACT || !account) {
      toast.error("Fail to load contract or account is not connected");
      return;
    }
    setLoadingApprove(true);

    try {
      const contract = getContract(
        BIRD_TOKEN_CONTRACT,
        BIRD_ABI,
        library,
        account,
      );
      if (contract) {
        const transaction = await contract.approve(BETTING_CONTRACT, MAX_INT);

        setTransactionHash(transaction.hash);
        await transaction.wait(1);

        // console.log("approved", transaction.hash);

        setLoadingApprove(false);
      }
    } catch (error) {
      console.log("approveBirdToken", error);
      setLoadingApprove(false);
    }
  }, [library, account]);

  const getBirdBalance = async (address: string | undefined) => {
    if (isWrongChain) {
      console.log("Wrong Chain");
      return;
    }
    if (!BIRD_TOKEN_CONTRACT || !address || !account) {
      toast.error("Fail to load contract or account is not connected");
      return;
    }
    let balanceString = "0";
    try {
      const contract = getContract(
        BIRD_TOKEN_CONTRACT,
        BIRD_ABI,
        library,
        account,
      );
      if (contract) {
        const balance = await contract.balanceOf(address);
        balanceString = convertHexToStringNumber(balance);
      }
    } catch (error) {
      console.log("getBirdBalance", error);
    }
    return balanceString;
  };

  const getBirdAllowance = async (address: string | undefined) => {
    if (isWrongChain) {
      console.log("Wrong Chain");
      return;
    }
    if (!BIRD_TOKEN_CONTRACT || !address || !account) {
      toast.error("Fail to load contract or account is not connected");
      return;
    }
    let balanceString = "0";
    try {
      const contract = getContract(
        BIRD_TOKEN_CONTRACT,
        BIRD_ABI,
        library,
        account,
      );
      if (contract) {
        const balance = await contract.allowance(address, BETTING_CONTRACT);
        balanceString = convertHexToStringNumber(balance);
      }
    } catch (error) {
      console.log("getBirdAllowance", error);
    }
    return balanceString;
  };

  return {
    loadingApprove,
    transactionHash,
    approveBirdToken,
    getBirdBalance,
    getBirdAllowance,
  };
};

export default useBirdToken;
