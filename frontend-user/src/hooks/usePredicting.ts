import { useCallback, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { getContract } from "../utils/contract";
import { BETTING_CONTRACT } from "../constants";
import BETTING_ABI from "../abi/SBirdBetting.json";
import { toast } from "react-toastify";

const usePredicting = () => {
  const { library, account } = useWeb3React();

  const [transactionHash, setTransactionHash] = useState<string>("");
  const [loadingPredicting, setLoadingPredicting] = useState<boolean>(false);

  const predicting = useCallback(
    async (
      _matchId: string | undefined,
      _homeScore: string | undefined,
      _awayScore: string | undefined,
    ) => {
      if (!BETTING_CONTRACT || !account) {
        toast.error("Fail to load contract or account is not connected");
        return;
      }

      setLoadingPredicting(true);
      try {
        const contract = getContract(
          BETTING_CONTRACT,
          BETTING_ABI,
          library,
          account,
        );

        if (contract) {
          const transaction = await contract.predict(
            _matchId,
            _homeScore,
            _awayScore,
          );
          setTransactionHash(transaction?.hash);
          await transaction.wait(1);
          setLoadingPredicting(false);

          toast.success("Submit answer successful");
          return true;
        }
      } catch (error: any) {
        console.log("ERR bettingOdds: ", error?.message);
        toast.error("Fail to submit answer");
        setLoadingPredicting(false);
        return;
      }
    },
    [library, account],
  );

  return {
    predicting,
    transactionHash,
    loadingPredicting,
  };
};

export default usePredicting;
