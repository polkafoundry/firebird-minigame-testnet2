import { useWeb3React } from "@web3-react/core";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import BETTING_ABI from "../abi/SBirdBetting.json";
import { BETTING_CONTRACT } from "../constants";
import { getContract } from "../utils/contract";

const useClaimToken = () => {
  const { library, account } = useWeb3React();

  const [transactionHash, setTransactionHash] = useState<string>("");
  const [loadingClaim, setLoadingClaim] = useState<boolean>(false);

  const claimToken = useCallback(
    async (
      _matchId: string | undefined,
      _betType: string | undefined,
      _amount: string | undefined,
      _signMessage: any,
    ) => {
      if (!BETTING_CONTRACT || !account) {
        toast.error("Fail to load contract or account is not connected");
        return;
      }

      setLoadingClaim(true);
      try {
        const contract = getContract(
          BETTING_CONTRACT,
          BETTING_ABI,
          library,
          account,
        );

        if (contract) {
          const transaction = await contract.tokenClaim(
            _matchId,
            _betType,
            _amount,
            _signMessage,
          );
          setTransactionHash(transaction?.hash);
          await transaction.wait(1);
          setLoadingClaim(false);

          toast.success("Claim token successful");
        }
      } catch (error: any) {
        console.log("ERR claiming: ", error?.message);
        toast.error("Fail to Claim token");
        setLoadingClaim(false);
      }
    },
    [library, account],
  );

  return {
    claimToken,
    loadingClaim,
    transactionHash,
  };
};

export default useClaimToken;
