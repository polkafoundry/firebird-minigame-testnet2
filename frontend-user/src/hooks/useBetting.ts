import { useWeb3React } from "@web3-react/core";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import BETTING_ABI from "../abi/SBirdBetting.json";
import { BETTING_CONTRACT } from "../constants";
import { sendDataLogging } from "../requests/getMyHistory";
import { getContract } from "../utils/contract";
import { encryptData } from "../utils/encryptData";
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
      _signMessage: any,
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
            _signMessage,
          );
          setTransactionHash(transaction?.hash);
          await transaction.wait(1);
          setLoadingBetting(false);

          toast.success("Submit answer successful");

          // logging success data to api
          const dataLogging = encryptData({
            status: "success",
            type: "bet",
            user_address: account || "",
            match_id: _matchId,
            bet_type: _betType,
            amount: _amount,
          });
          sendDataLogging(dataLogging);

          return true;
        }
        return;
      } catch (error: any) {
        console.log("ERR betting: ", error?.message);
        toast.error(getErrorMessage(error, "Fail to Submit answer"));
        setLoadingBetting(false);

        // logging error data to api
        const dataLogging = encryptData({
          status: "error",
          type: "bet",
          user_address: account || "",
          match_id: _matchId,
          bet_type: _betType,
          amount: _amount,
          errorText: "ERR betting: " + error?.message,
        });
        sendDataLogging(dataLogging);

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
