import { useWeb3React } from "@web3-react/core";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import BETTING_ABI from "../abi/SBirdBetting.json";
import { BETTING_CONTRACT } from "../constants";
import { getContract } from "../utils/contract";

const useBettingContract = () => {
  const { library, account } = useWeb3React();

  const [loadingBetting, setLoadingBetting] = useState<boolean>(false);

  const checkClaimed = useCallback(
    async (_matchId: string | undefined, _betType: string | undefined) => {
      if (!BETTING_CONTRACT || !account) {
        toast.error("Fail to load contract or account is not connected");
        return false;
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
          const res = await contract.userBettingInMatch(
            account,
            _matchId,
            _betType,
          );
          return res?.isClaimed;
        }
      } catch (error: any) {
        console.log("ERR betting: ", error?.message);
        setLoadingBetting(false);
        return false;
      }
    },
    [library, account],
  );

  const getBettingUpdate = useCallback(
    async (_matchId: string | undefined, _betType: string | undefined) => {
      if (!BETTING_CONTRACT || !account) {
        toast.error("Fail to load contract or account is not connected");
        return false;
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
          const res = await contract.userBettingInMatch(
            account,
            _matchId,
            _betType,
          );
          return res;
        }
      } catch (error: any) {
        console.log("ERR getResultUpdate: ", error?.message);
        setLoadingBetting(false);
        return false;
      }
    },
    [library, account],
  );

  return {
    checkClaimed,
    getBettingUpdate,
    loadingBetting,
  };
};

export default useBettingContract;
