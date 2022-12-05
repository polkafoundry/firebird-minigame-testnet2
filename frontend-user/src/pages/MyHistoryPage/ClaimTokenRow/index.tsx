import useClaimToken from "../../../hooks/useClaimToken";

type ClaimTokenRowProps = {
  account: string;
  data: any;
  isCorrect: boolean;
};

const ClaimTokenRow = (props: ClaimTokenRowProps) => {
  const { data, isCorrect } = props;

  const { isClaimed, loadingClaim, handleClaimToken } = useClaimToken(
    data,
    isCorrect,
  );

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
