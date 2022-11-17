import {
  MAX_DEPOSIT_AMOUNT,
  NUMBER_PATTERN,
  URLS,
} from "../../../../../../constants";

type DepositAmountProps = {
  depositAmount: string;
  handleChangeDepositAmount: any;
  errors?: string[];
  isFullBetting?: boolean;
  winRate?: string;
  optionWhoWin: number;
  birdBalance: string;
};

const DepositAmount = (props: DepositAmountProps) => {
  const {
    depositAmount,
    handleChangeDepositAmount,
    isFullBetting = false,
    winRate,
    optionWhoWin,
    birdBalance,
  } = props;

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

  return (
    <>
      <div className="mt-3 bg-[#F2F2F2] px-3 py-5 rounded-lg font-inter">
        <div className="flex justify-between max-w-[340px]">
          <span className="font-bold text-12/18">Deposit Amount:</span>
          <span className="text-12/16 opacity-70">
            Balance: <span className="font-bold">{birdBalance || 0} $BIRD</span>
          </span>
        </div>
        <div className="flex items-start mt-2">
          <div className="flex items-center max-w-[340px] border p-1 bg-white rounded-lg">
            <input
              type="text"
              className="flex-1 outline-none text-14-24 pl-2.5 min-w-0"
              value={depositAmount}
              onChange={onChange}
              placeholder="Enter"
            />
            <span className="mr-2 font-semibold font-tthoves text-14/20">
              $BIRD
            </span>
            <button
              className="px-8 py-2.5 bg-black font-tthoves text-14/20 text-white rounded-lg"
              onClick={handleSelectMax}
            >
              Max
            </button>
          </div>

          <ul className="text-12/16 pl-8 list-disc">
            {!depositAmount && (
              <li>Please enter the number of $BIRD you want to deposit.</li>
            )}
            {depositAmount && (
              <>
                <li className="opacity-70 mt-1.5">
                  <span className="font-bold">Correct Prediction:</span> You
                  will claim{" "}
                  {[0, 1, 2].includes(optionWhoWin)
                    ? (Number(depositAmount) * Number(winRate)).toFixed(2)
                    : ""}{" "}
                  $BIRD (including your deposit amount).
                </li>
                <li className="opacity-70 mt-1.5">
                  <span className="font-bold">Wrong Prediction:</span> You will
                  lose your deposit amount.
                </li>
                {isFullBetting && (
                  <li className="opacity-70 mt-1.5">
                    If the total number of goals scored is 2, you will get your
                    deposit back of 100$ BIRD.
                  </li>
                )}
              </>
            )}
          </ul>
        </div>
        <p className="text-12/16 mt-2">
          Maximum is 1,000 BIRD/question.{" "}
          <a
            href={URLS.FIREFLY_TESTNET}
            target={"_blank"}
            rel="norefferer"
            className="text-[#0085FF] ml-5"
          >
            Don’t have BIRD token?
          </a>
        </p>
      </div>
      {/* {errors?.length ? (
        <ul className="mt-10">
          {errors?.map((error: any) => (
            <li key={error} className="text-red-600 font-semibold mt-2">
              {error}
            </li>
          ))}
        </ul>
      ) : null} */}
    </>
  );
};

export default DepositAmount;
