import { useWeb3React } from "@web3-react/core";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import BETTING_ABI from "../abi/SBirdBetting.json";
import { BETTING_CONTRACT } from "../constants";
import { getContract } from "../utils/contract";
import { getErrorMessage } from "../utils/getErrorMessage";

const useBetting = () => {
  const { library, account } = useWeb3React();

  const [transactionHash, setTransactionHash] = useState<string>("");
  const [loadingBetting, setLoadingBetting] = useState<boolean>(false);

  const betting = useCallback(
    async (
      _matchId: string | undefined,
      _amount: string | undefined,
      _betType: string | undefined,
      _betPlace: string | undefined,
    ) => {
      if (!BETTING_CONTRACT || !account) {
        toast.error("Fail to load contract or account is not connected");
        return;
      }

      setLoadingBetting(true);
      try {
        const contract = getContract(
          BETTING_CONTRACT,
          BETTING_ABI,
          library,
          account,
        );

        if (contract) {
          const transaction = await contract.betting(
            _matchId,
            _amount,
            _betType,
            _betPlace,
          );
          setTransactionHash(transaction?.hash);
          await transaction.wait(1);
          setLoadingBetting(false);

          toast.success("Submit answer successful");
          return true;
        }
        return;
      } catch (error: any) {
        console.log("ERR betting: ", error?.message);
        toast.error(getErrorMessage(error, "Fail to Submit answer"));
        setLoadingBetting(false);
        return;
      }
    },
    [library, account],
  );

  return {
    betting,
    loadingBetting,
    transactionHash,
  };
};

export default useBetting;
