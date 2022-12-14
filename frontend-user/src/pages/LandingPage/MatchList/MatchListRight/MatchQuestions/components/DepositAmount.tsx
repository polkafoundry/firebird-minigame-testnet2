import { FAUCET_URL, NUMBER_PATTERN } from "../../../../../../constants";
import { formatCurrency } from "../../../../../../utils";

type DepositAmountProps = {
  depositAmount: string;
  handleChangeDepositAmount: any;
  errors?: string[];
  isFullBetting?: boolean;
  winRate?: string;
  optionWhoWin: number;
  birdBalance: string;
  maxDepositAmount: number | undefined;
};

const DepositAmount = (props: DepositAmountProps) => {
  const {
    depositAmount,
    handleChangeDepositAmount,
    isFullBetting = false,
    winRate,
    optionWhoWin,
    birdBalance,
    maxDepositAmount = 1000,
  } = props;

  const onChange = (e: any) => {
    const valueInput = e.target.value;
    if (NUMBER_PATTERN.test(valueInput) || valueInput === "") {
      const amount =
        valueInput > maxDepositAmount ? maxDepositAmount : valueInput;
      handleChangeDepositAmount(amount);
    }
  };

  const handleSelectMax = () => {
    const maxValue =
      +birdBalance > maxDepositAmount ? maxDepositAmount : birdBalance;
    handleChangeDepositAmount(maxValue);
  };

  return (
    <>
      <div className="mt-3 bg-[#F2F2F2] px-3 py-5 rounded-lg font-inter">
        <div className="flex flex-col xs:flex-row justify-between xs:max-w-[340px]">
          <span className="font-bold text-12/18">Deposit Amount:</span>
          <span className="text-12/16 opacity-70">
            Balance: <span className="font-bold">{birdBalance || 0} $BIRD</span>
          </span>
        </div>
        <div className="flex flex-col xs:flex-row md:flex-col 2md:flex-row items-start mt-1.5 xs:mt-2">
          <div style={{ maxWidth: "-webkit-fill-available" }}>
            <div className="flex items-center xs:max-w-[340px] border p-1 bg-white rounded-lg">
              <input
                type="text"
                className="flex-1 outline-none text-14/24 pl-2.5 min-w-0"
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
            <div className="flex flex-col xs:flex-row items-baseline">
              <p className="text-12/18 mt-2">
                {`Maximum is ${formatCurrency(
                  maxDepositAmount,
                )} BIRD/question.`}
              </p>
              <a
                href={FAUCET_URL}
                target={"_blank"}
                rel="norefferer"
                className="text-[#0085FF] mt-1 xs:ml-5 xs:mt-0 text-12/18 "
              >
                Don???t have BIRD token?
              </a>
            </div>
          </div>

          <ul className="mt-5 xs:mt-0 text-12/18 pl-8 list-disc">
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
      </div>
    </>
  );
};

export default DepositAmount;
