import { useWeb3React } from "@web3-react/core";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import BETTING_ABI from "../abi/SBirdBetting.json";
import { BETTING_CONTRACT } from "../constants";
import { getContract } from "../utils/contract";
import { getErrorMessage } from "../utils/getErrorMessage";

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
        console.log("ERR predicting: ", error?.message);
        toast.error(getErrorMessage(error, "Fail to Submit answer"));
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
