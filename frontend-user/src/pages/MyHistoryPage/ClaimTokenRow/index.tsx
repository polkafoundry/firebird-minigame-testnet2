import { useWeb3React } from "@web3-react/core";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { API_BASE_URL } from "../../../constants";
import { BIRD_CHAIN_ID } from "../../../constants/networks";
import useBettingContract from "../../../hooks/useBettingContract";
import useClaimToken from "../../../hooks/useClaimToken";
import { fetcher } from "../../../hooks/useFetch";

type ClaimTokenRowProps = {
  account: string;
  data: any;
  isCorrect: boolean;
};

const ClaimTokenRow = (props: ClaimTokenRowProps) => {
  const { account, data, isCorrect } = props;

  const [isClaimed, setIsClaimed] = useState<boolean>(false);
  const [recheckClaim, setRecheckClaim] = useState<boolean>(false); // using after user claim successful
  const [loadingClaim, setLoadingClaim] = useState<boolean>(false);

  const { claimToken } = useClaimToken();
  const { checkClaimed } = useBettingContract();
  const { chainId } = useWeb3React();
  const isWrongChain = useMemo(() => !(chainId === +BIRD_CHAIN_ID), [chainId]);

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

  return (
    <div>
      {isCorrect && (
        <>
          {isClaimed ? (
            "Claimed"
          ) : (
            <button
              className="bg-black text-white px-5 rounded-xl py-2"
              onClick={handleClaimToken}
              disabled={loadingClaim}
            >
              {loadingClaim ? "Loading" : "Claim token"}
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default ClaimTokenRow;
