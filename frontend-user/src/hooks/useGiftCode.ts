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

  //   const [isClaimSuccess, setIsClaimSuccess] = useState<boolean>(false);

  //   const { checkClaimed } = useBettingContract();

  const claimToken = useCallback(
    async (
      _code: string | undefined,
      _amount: any | undefined,
      _signMessage: any,
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
          const transaction = await contract.useCode(
            _code,
            _amount,
            _signMessage,
          );
          //   setTransactionHash(transaction?.hash);
          await transaction.wait(1);
          setLoadingClaim(false);

          toast.success("You are successfully claimed $BIRD with gift code.");
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
      }
    },
    [library, account],
  );

  const handleClaimToken = async (code: string) => {
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

        console.log(
          "signMessage",
          signMessage,
          BigNumber.from(5000).toString(),
        );
        await claimToken(code, 5000, signMessage);
        // setIsClaimSuccess(claimed);

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
    // isClaimSuccess,
    handleClaimToken,
  };
};

export default useGiftCode;
