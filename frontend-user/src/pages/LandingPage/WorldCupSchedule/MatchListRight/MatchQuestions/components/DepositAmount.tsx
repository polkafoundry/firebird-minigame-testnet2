import {
  MAX_DEPOSIT_AMOUNT,
  NUMBER_PATTERN,
} from "../../../../../../constants";
import { useMyWeb3 } from "../../../../../../hooks/useMyWeb3";

type DepositAmountProps = {
  depositAmount: string;
  handleChangeDepositAmount: any;
  errors: string[];
  isFullBetting?: boolean;
  winRate?: string;
};

const DepositAmount = (props: DepositAmountProps) => {
  const {
    depositAmount,
    handleChangeDepositAmount,
    errors,
    isFullBetting = false,
    winRate,
  } = props;
  const { birdBalance } = useMyWeb3();

  const onChange = (e: any) => {
    const valueInput = e.target.value;
    if (NUMBER_PATTERN.test(valueInput) || valueInput === "") {
      const amount =
        valueInput > MAX_DEPOSIT_AMOUNT ? MAX_DEPOSIT_AMOUNT : valueInput;
      handleChangeDepositAmount(amount);
    }
  };

  const handleSelectMax = () => {
    const maxValue =
      +birdBalance > MAX_DEPOSIT_AMOUNT ? MAX_DEPOSIT_AMOUNT : birdBalance;
    handleChangeDepositAmount(maxValue);
  };

  // console.log("depositAmount, ", depositAmount, winRate);

  return (
    <>
      <div className="mt-10">
        <div className="flex justify-between">
          <span className="font-semibold text-xl">Deposit Amount:</span>
          <span>Balance: {birdBalance || 0} $BIRD</span>
        </div>
        <p>
          Maximum is 1,000 BIRD/question. Don’t have BIRD token? Click{" "}
          <span>
            <a href="" className="underline font-semibold">
              here
            </a>
          </span>{" "}
          to faucet.
        </p>
        <div className="flex items-center border mt-5 py-2 px-5">
          <input
            type="text"
            className="flex-1 outline-none"
            value={depositAmount}
            onChange={onChange}
            placeholder="Enter Number"
          />
          <span className="mr-5 font-semibold">$BIRD</span>
          <button
            className="px-10 py-1 bg-yellow-400"
            onClick={handleSelectMax}
          >
            Max
          </button>
        </div>
      </div>
      {depositAmount && (
        <ul className="mt-10 p-3 bg-yellow-200 pl-10 list-disc">
          <li>
            Correct Prediction: You will claim{" "}
            {(Number(depositAmount) * Number(winRate)).toFixed(2)} $BIRD
            (including your deposit amount).
          </li>
          <li>Wrong Prediction: You will lose your deposit amount.</li>
          {isFullBetting && (
            <li>
              If the total number of goals scored is 2, you will get your
              deposit back of 100$ BIRD.
            </li>
          )}
        </ul>
      )}
      {errors?.length ? (
        <ul className="mt-10">
          {errors?.map((error: any) => (
            <li key={error} className="text-red-600 font-semibold mt-2">
              {error}
            </li>
          ))}
        </ul>
      ) : null}
    </>
  );
};

export default DepositAmount;
