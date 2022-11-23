import { useWeb3React } from "@web3-react/core";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import BETTING_ABI from "../abi/SBirdBetting.json";
import { BETTING_CONTRACT } from "../constants";
import { getContract } from "../utils/contract";
import { decryptData, encryptData } from "../utils/encryptData";
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

          // logging success data to api
          const dataLogging = encryptData({
            status: "success",
            type: "predict",
            user_address: account || "",
            match_id: _matchId,
            home_score: +(_homeScore || ""),
            away_score: +(_awayScore || ""),
          });

          console.log("loggingSuccess:", decryptData(dataLogging));
          return true;
        }
      } catch (error: any) {
        console.log("ERR predicting: ", error?.message);
        toast.error(getErrorMessage(error, "Fail to Submit answer"));
        setLoadingPredicting(false);

        // logging error data to api
        if (!error.message?.includes("user rejected transaction")) {
          const dataLogging = encryptData({
            status: "error",
            type: "predict",
            user_address: account || "",
            match_id: _matchId,
            home_score: +(_homeScore || ""),
            away_score: +(_awayScore || ""),
            errorText: "ERR predicting: " + error?.message,
          });

          console.log("loggingError:", decryptData(dataLogging));
        }
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
