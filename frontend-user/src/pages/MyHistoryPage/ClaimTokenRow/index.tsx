import { useEffect, useState } from "react";
import useBettingContract from "../../../hooks/useBettingContract";
import useClaimToken from "../../../hooks/useClaimToken";

type ClaimTokenRowProps = {
  account: string;
  data: any;
  isCorrect: boolean;
};

const ClaimTokenRow = (props: ClaimTokenRowProps) => {
  const { data, isCorrect } = props;

  const { isClaimSuccess, loadingClaim, handleClaimToken } = useClaimToken(
    data,
    isCorrect,
  );

  const [isClaimed, setIsClaimed] = useState<boolean>(false);

  const { checkClaimed } = useBettingContract();

  // update Claim Button
  useEffect(() => {
    if (isClaimSuccess) {
      setIsClaimed(true);
    }
  }, [isClaimSuccess]);

  useEffect(() => {
    const checkUserClaimed = async () => {
      const claimed = await checkClaimed(data?.match_id, data?.bet_type);
      setIsClaimed(claimed);
    };

    checkUserClaimed();
  }, [data]);

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
