import { useWeb3React } from "@web3-react/core";
import { BigNumber } from "ethers";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import GIFT_CODE_ABI from "../abi/SBirdGiftCode.json";
import { API_BASE_URL, GIFT_CODE_CONTRACT } from "../constants";
import { sendDataLogging } from "../requests/getMyHistory";
import { getContract } from "../utils/contract";
import { encryptData } from "../utils/encryptData";
import { getErrorMessage } from "../utils/getErrorMessage";
import { fetcher } from "./useFetch";

const useGiftCode = () => {
  const { library, account } = useWeb3React();
  const [loadingClaim, setLoadingClaim] = useState<boolean>(false);
  const [isClaimSuccess, setIsClaimSuccess] = useState<boolean>(false);

  const claimToken = useCallback(
    async (
      _code: string | undefined,
      _amount: any | undefined,
      _signature: any,
    ) => {
      if (!GIFT_CODE_CONTRACT || !account) {
        toast.error("Fail to load contract or account is not connected");
        return;
      }

      setLoadingClaim(true);
      let dataLogging;

      try {
        const contract = getContract(
          GIFT_CODE_CONTRACT,
          GIFT_CODE_ABI,
          library,
          account,
        );
        if (contract) {
          const transaction = await contract.useCode(
            _code,
            _amount,
            _signature,
          );
          //   setTransactionHash(transaction?.hash);
          await transaction.wait(1);
          setIsClaimSuccess(true);
          setLoadingClaim(false);

          // logging success data to api
          dataLogging = encryptData({
            status: "success",
            type: "gift_code",
            user_address: account || "",
            bet_type: _code,
            amount: _amount.toString(),
          });

          toast.success("You have successfully claimed $BIRD with gift code.");
        }
      } catch (error: any) {
        console.log("ERR claiming: ", error);
        toast.error(
          getErrorMessage(
            error,
            "Fail to claim $BIRD with gift code. Please try again.",
          ),
        );
        setLoadingClaim(false);

        // logging error data to api
        dataLogging = encryptData({
          status: "error",
          type: "gift_code",
          user_address: account || "",
          bet_type: _code,
          amount: _amount.toString(),
          errorText: "ERR claim: " + error?.message,
        });
      }

      // send data logging to backend
      sendDataLogging(dataLogging);
    },
    [library, account],
  );

  const handleClaimToken = async (code: string, reward: number) => {
    if (!code) {
      toast.error("Please enter code!");
      return;
    }

    setIsClaimSuccess(false);
    setLoadingClaim(true);

    fetcher(`${API_BASE_URL}/code/use-code`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_address: account,
        code: code,
      }),
    })
      .then(async (res) => {
        const rawData = res?.data;
        const signMessage = {
          deadline: rawData?.signature?.deadline,
          v: rawData?.signature?.v,
          r: rawData?.signature?.r?.data,
          s: rawData?.signature?.s?.data,
        };

        await claimToken(rawData?.code, BigNumber.from(reward), signMessage);
        setLoadingClaim(false);
      })
      .catch((err: any) => {
        setLoadingClaim(false);
        console.log("ERR get signature: ", err);
      });
  };

  return {
    claimToken,
    loadingClaim,
    isClaimSuccess,
    handleClaimToken,
  };
};

export default useGiftCode;
