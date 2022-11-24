import { useWeb3React } from "@web3-react/core";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import BETTING_ABI from "../abi/SBirdBetting.json";
import { API_BASE_URL, BETTING_CONTRACT } from "../constants";
import { BIRD_CHAIN_ID } from "../constants/networks";
import { sendPostRequest } from "../requests/getMyHistory";
import { getContract } from "../utils/contract";
import { encryptData } from "../utils/encryptData";
import { getErrorMessage } from "../utils/getErrorMessage";
import useBettingContract from "./useBettingContract";
import { fetcher } from "./useFetch";

const useClaimToken = (data?: any, isCorrect?: boolean) => {
  const { library, account } = useWeb3React();

  const [transactionHash, setTransactionHash] = useState<string>("");
  const [loadingClaim, setLoadingClaim] = useState<boolean>(false);

  const [isClaimed, setIsClaimed] = useState<boolean>(false);
  const [recheckClaim, setRecheckClaim] = useState<boolean>(false); // using after user claim successful

  const { checkClaimed } = useBettingContract();
  const { chainId } = useWeb3React();
  const isWrongChain = useMemo(() => !(chainId === +BIRD_CHAIN_ID), [chainId]);

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
      let dataLogging;

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

          // logging success data to api
          dataLogging = encryptData({
            status: "success",
            type: "claim",
            user_address: account || "",
            match_id: _matchId,
            bet_type: _betType,
            amount: _amount,
          });
        }
      } catch (error: any) {
        console.log("ERR claiming: ", error);
        toast.error(getErrorMessage(error, "Fail to Claim token"));
        setLoadingClaim(false);

        // logging error data to api
        dataLogging = encryptData({
          status: "error",
          type: "claim",
          user_address: account || "",
          match_id: _matchId,
          bet_type: _betType,
          amount: _amount,
          errorText: "ERR claim: " + error?.message,
        });
      }

      // send data logging to backend
      sendPostRequest("/user/log-error", {
        log_hash: dataLogging,
      });
    },
    [library, account],
  );

  useEffect(() => {
    if (!data || !isCorrect) return;
    if (isWrongChain) return;

    const checkUserClaimed = async () => {
      const claimed = await checkClaimed(data.match_id, data.bet_type);
      setIsClaimed(claimed);
    };

    checkUserClaimed();
  }, [data, recheckClaim]);

  const handleClaimToken = async () => {
    if (!data) {
      toast.error("Question not found!");
      return;
    }

    const payload = {
      match_id: data?.match_id,
      bet_type: data?.bet_type,
      wallet: account,
      amount: data?.total_claim,
    };

    setLoadingClaim(true);

    fetcher(`${API_BASE_URL}/claim/get-sig`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then(async (res) => {
        const { amount, bet_type, match_id } = payload;

        const rawSignature = res?.data;
        const signMessage = {
          deadline: rawSignature?.deadline,
          v: rawSignature?.v,
          r: rawSignature?.r?.data,
          s: rawSignature?.s?.data,
        };

        await claimToken(match_id, bet_type, amount, signMessage);
        setRecheckClaim((prevState) => !prevState);

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
    transactionHash,
    isClaimed,
    handleClaimToken,
  };
};

export default useClaimToken;
