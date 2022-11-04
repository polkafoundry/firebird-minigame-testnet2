import clsx from "clsx";
import { useContext } from "react";
import Button from "../../../../../components/base/Button";
import { quickGuide } from "../../../../../constants";
import { WalletContext } from "../../../../../context/WalletContext";
import { useMyWeb3 } from "../../../../../hooks/useMyWeb3";
import usePredictConditions from "../../../../../hooks/usePredictConditions";
import { displayWalletAddress } from "../../../../../utils";
import { requestSupportNetwork } from "../../../../../utils/setupNetwork";

const iconCheck = "/images/icon-correct-answer.svg";
const iconUnCheck = "/images/icon-wrong-answer.svg";
const fakeBirdToken = "4000";
const buttonStyles = "w-[150px] bg-black text-white text-center py-2";

type MatchGuideProps = {
  isDetailGuide?: boolean;
};

const MatchGuide = (props: MatchGuideProps) => {
  const { isDetailGuide = false } = props;
  const { setShowModal } = useContext(WalletContext);
  const { realTimeBalance, nativeCurrency, account } = useMyWeb3();

  const predictConditions = usePredictConditions();

  return (
    <div className="flex flex-col p-5">
      <div className="flex flex-col border-b-[1px] border-b-gray-300 pb-5">
        <span className="text-lg font-semibold">Conditions to join</span>
        <ul className="flex flex-col gap-3 mt-4 text-sm">
          <li className="grid grid-cols-2 gap-2">
            <div className="flex items-start gap-2">
              <img
                className="w-5 h-5"
                src={account ? iconCheck : iconUnCheck}
                alt=""
              />
              <span>Connet Wallet</span>
            </div>
            {account ? (
              <p className="m-0 font-semibold">
                {displayWalletAddress(account)}
              </p>
            ) : (
              <div
                className={clsx(
                  "h-auto cursor-pointer rounded-xl font-semibold text-sm",
                  isDetailGuide && buttonStyles,
                )}
                onClick={() => setShowModal && setShowModal(true)}
              >
                Connect wallet
              </div>
            )}
          </li>

          <li className="grid grid-cols-2 gap-2">
            <div className="flex items-start gap-2">
              <img
                className="w-5 h-5"
                src={predictConditions.network ? iconCheck : iconUnCheck}
                alt=""
              />
              <span>Network</span>
            </div>
            {predictConditions.network ? (
              <p className="m-0 font-semibold">Firefly Testnet</p>
            ) : (
              <div>
                <div
                  className={clsx(
                    "h-auto cursor-pointer rounded-xl font-semibold text-sm",
                    isDetailGuide && buttonStyles,
                  )}
                  onClick={() => requestSupportNetwork()}
                >
                  Switch Network
                </div>
                {isDetailGuide && <p>You must use Firefly testnet.</p>}
              </div>
            )}
          </li>

          <li className="grid grid-cols-2 gap-2">
            <div className="flex items-start gap-2">
              <img
                className="w-5 h-5"
                src={predictConditions.birdToken ? iconCheck : iconUnCheck}
                alt=""
              />
              <span>$BIRD to deposit</span>
            </div>
            {predictConditions.birdToken ? (
              <p className="m-0 font-semibold">{`${fakeBirdToken} $BIRD`}</p>
            ) : (
              <div className="flex flex-col">
                <a
                  href="https://faucet.firefly.firebirdchain.com/"
                  target={"_blank"}
                  rel="norefferer"
                  className={clsx(
                    "h-auto cursor-pointer rounded-xl font-semibold text-sm",
                    isDetailGuide && buttonStyles,
                  )}
                >
                  Faucet $BIRD
                </a>
                {isDetailGuide && (
                  <p>
                    $BIRD is our testnet token. You need to deposit $BIRD to
                    anwser the questions.
                  </p>
                )}
              </div>
            )}
          </li>

          <li className="grid grid-cols-2 gap-2">
            <div className="flex items-start gap-2">
              <img
                className="w-5 h-5"
                src={predictConditions.gasFee ? iconCheck : iconUnCheck}
                alt=""
              />
              <span>Gas fee</span>
            </div>
            {predictConditions.gasFee ? (
              <p className="m-0 font-semibold">{`${realTimeBalance} $${nativeCurrency}`}</p>
            ) : (
              <div className="flex flex-col">
                <a
                  href="https://faucet.firefly.firebirdchain.com/"
                  target={"_blank"}
                  rel="norefferer"
                  className={clsx(
                    "h-auto rounded-xl font-semibold text-sm",
                    isDetailGuide && buttonStyles,
                  )}
                >
                  Faucet $PKF
                </a>
                {isDetailGuide && <p>You need $PKF to pay for the gas fee.</p>}
              </div>
            )}
          </li>
        </ul>
      </div>

      <div className="flex flex-col pt-5">
        <span className="text-lg font-semibold">Quick guide</span>
        <ul className="flex flex-col gap-3 mt-4 mb-auto">
          {quickGuide.map((item: string, index: number) => (
            <li className="flex gap-2" key={item}>
              <div className="w-5 h-5 rounded-full bg-gray-800 text-white text-xs text-center flex justify-center items-center">
                {index + 1}
              </div>
              <span className="text-sm">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <Button className="w-1/2 rounded-xl bg-black text-white justify-center font-semibold mt-10">
        Prediction Rule
      </Button>
    </div>
  );
};

export default MatchGuide;
