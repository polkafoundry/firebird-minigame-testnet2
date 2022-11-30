import { useWeb3React } from "@web3-react/core";
import { BigNumber } from "ethers";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import GIFT_CODE_ABI from "../abi/SBirdGiftCode.json";
import { API_BASE_URL, GIFT_CODE_CONTRACT } from "../constants";
import { getContract } from "../utils/contract";
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

      try {
        const contract = getContract(
          GIFT_CODE_CONTRACT,
          GIFT_CODE_ABI,
          library,
          account,
        );
        if (contract) {
          console.log(_code, _amount, _signature, account);
          const transaction = await contract.useCode(
            _code,
            _amount,
            _signature,
          );
          //   setTransactionHash(transaction?.hash);
          await transaction.wait(1);
          setIsClaimSuccess(true);
          setLoadingClaim(false);

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
        setIsClaimSuccess(false);
        setLoadingClaim(false);
      }
    },
    [library, account],
  );

  const handleClaimToken = async (code: string, reward: number) => {
    if (!code) {
      toast.error("Please enter code!");
      return;
    }

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
        const rawSignature = res?.data;
        const signMessage = {
          deadline: rawSignature?.deadline,
          v: rawSignature?.v,
          r: rawSignature?.r?.data,
          s: rawSignature?.s?.data,
        };

        await claimToken(code, BigNumber.from(reward), signMessage);
        setLoadingClaim(false);
      })
      .catch((err: any) => {
        setLoadingClaim(false);
        setIsClaimSuccess(false);
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
