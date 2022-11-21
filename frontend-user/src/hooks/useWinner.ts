import { useWeb3React } from "@web3-react/core";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import WINNER_ABI from "../abi/PickWinner.json";
import { PICK_WINNER_CONTRACT } from "../constants";
import { getContract } from "../utils/contract";

const useWinner = () => {
  const { library } = useWeb3React();

  const [loading, setLoading] = useState<boolean>(false);

  const getWinnerByMatchId = useCallback(
    async (_matchId: number | undefined) => {
      if (!PICK_WINNER_CONTRACT) {
        toast.error("Fail to load contract");
        return;
      }

      setLoading(true);
      try {
        const contract = getContract(PICK_WINNER_CONTRACT, WINNER_ABI, library);

        if (contract) {
          const address = await contract.winnerByMatch(_matchId);
          setLoading(false);

          return address;
        }
        return;
      } catch (error: any) {
        console.log("ERR getWinner: ", error?.message);
        toast.error("Fail to get Winner");
        setLoading(false);
        return;
      }
    },
    [library],
  );

  return {
    getWinnerByMatchId,
    loading,
  };
};

export default useWinner;
