import clsx from "clsx";
import { useContext } from "react";
import { quickGuide, URLS } from "../../../../../constants";
import { WalletContext } from "../../../../../context/WalletContext";
import { useMyWeb3 } from "../../../../../hooks/useMyWeb3";
import usePredictConditions from "../../../../../hooks/usePredictConditions";
import { displayWalletAddress, formatCurrency } from "../../../../../utils";
import { scrollToId } from "../../../../../utils/domElement";
import { requestSupportNetwork } from "../../../../../utils/setupNetwork";
import styles from "./matchGuide.module.scss";

const iconCheck = "/images/icon-correct-answer.svg";
const iconUnCheck = "/images/icon-wrong-answer.svg";
const buttonStyles =
  "w-[140px] bg-black text-white text-center py-2 text-14/20 rounded font-tthoves";
const textError = "text-[#FF3E57] text-10/14";

type MatchGuideProps = {
  isDetailGuide?: boolean;
};

const MatchGuide = (props: MatchGuideProps) => {
  const { isDetailGuide = false } = props;
  const { setShowModal } = useContext(WalletContext);
  const { realTimeBalance, nativeCurrency, account, birdBalance } = useMyWeb3();

  const predictConditions = usePredictConditions();

  const handleClickPredictionRule = () => {
    scrollToId("#prediction-rule");
  };

  return (
    <div className="flex flex-col my-5">
      <div className="flex flex-col">
        <span className={styles.title}>Conditions to join</span>
        <div className="py-3 px-8 font-inter">
          <div className="bg-white p-5">
            {!account && (
              <div className="h-[176px] flex justify-center items-center">
                <button
                  className="py-2 px-9 rounded-lg bg-main text-white justify-center font-semibold font-tthoves text-14/20"
                  onClick={() => setShowModal && setShowModal(true)}
                >
                  Connect Wallet
                </button>
              </div>
            )}
            {account && (
              <ul className="flex flex-col gap-3 text-16/24">
                <li className="flex justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      className="w-[14px] h-[14px]"
                      src={account ? iconCheck : iconUnCheck}
                      alt=""
                    />
                    <span>Connet Wallet</span>
                  </div>
                  <p className="m-0 font-semibold font-tthoves">
                    {displayWalletAddress(account)}
                  </p>
                </li>
                <li className="flex justify-between">
                  <div className="flex items-baseline gap-2">
                    <img
                      className="w-[14px] h-[14px]"
                      src={predictConditions.network ? iconCheck : iconUnCheck}
                      alt=""
                    />
                    <div className="flex flex-col">
                      <span>Network</span>
                      {isDetailGuide && !predictConditions.network && (
                        <p className={textError}>
                          You must use Firefly testnet.
                        </p>
                      )}
                    </div>
                  </div>
                  {predictConditions.network ? (
                    <p className="m-0 font-semibold font-tthoves">
                      Firefly Testnet
                    </p>
                  ) : (
                    <div>
                      <div
                        className={clsx(
                          "h-auto cursor-pointer font-semibold text-sm",
                          isDetailGuide && buttonStyles,
                        )}
                        onClick={() => requestSupportNetwork()}
                      >
                        Switch Network
                      </div>
                    </div>
                  )}
                </li>
                <li className="flex justify-between">
                  <div className="flex items-baseline gap-2">
                    <img
                      className="w-[14px] h-[14px]"
                      src={
                        predictConditions.birdToken ? iconCheck : iconUnCheck
                      }
                      alt=""
                    />
                    <div className="flex flex-col">
                      <span>$BIRD to deposit</span>
                      {isDetailGuide && !predictConditions.birdToken && (
                        <p className={textError}>
                          $BIRD is our testnet token. You need to deposit $BIRD
                          to anwser the questions.
                        </p>
                      )}
                    </div>
                  </div>
                  {predictConditions.birdToken ? (
                    <p className="m-0 font-semibold font-tthoves">{`${
                      formatCurrency(birdBalance) || 0
                    } $BIRD`}</p>
                  ) : (
                    <div className="flex flex-col">
                      <a
                        href={URLS.FIREFLY_TESTNET}
                        target={"_blank"}
                        rel="norefferer"
                        className={clsx(
                          "h-auto cursor-pointer font-semibold text-sm",
                          isDetailGuide && buttonStyles,
                        )}
                      >
                        Faucet $BIRD
                      </a>
                    </div>
                  )}
                </li>
                <li className="flex justify-between">
                  <div className="flex items-baseline gap-2">
                    <img
                      className="w-[14px] h-[14px]"
                      src={predictConditions.gasFee ? iconCheck : iconUnCheck}
                      alt=""
                    />
                    <div className="flex flex-col">
                      <span>Gas fee</span>
                      {isDetailGuide && !predictConditions.gasFee && (
                        <p className={textError}>
                          You need $PKF to pay for the gas fee.
                        </p>
                      )}
                    </div>
                  </div>
                  {predictConditions.gasFee ? (
                    <p className="m-0 font-semibold font-tthoves">{`${realTimeBalance} $${nativeCurrency}`}</p>
                  ) : (
                    <div className="flex flex-col">
                      <a
                        href={URLS.FIREFLY_TESTNET}
                        target={"_blank"}
                        rel="norefferer"
                        className={clsx(
                          "h-auto font-semibold text-sm",
                          isDetailGuide && buttonStyles,
                        )}
                      >
                        Faucet $PKF
                      </a>
                    </div>
                  )}
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        <span className={styles.title}>Quick guide</span>
        <div className="py-3 px-8">
          <div className="bg-white flex p-5">
            <div>
              <img src="./images/landing-page/world-cup-guide.png" alt="" />
            </div>
            <ul className="ml-3 flex flex-col gap-3 font-inter">
              {quickGuide.map((item: string, index: number) => (
                <li className="flex gap-2" key={item}>
                  <div className="w-6 h-6 text-14/20 rounded-full bg-[#3A0013] text-white text-center flex justify-center items-center">
                    {index + 1}
                  </div>
                  <span className="text-16/24 flex-1 opacity-80">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          className="w-1/2 py-4 rounded-full bg-main text-white justify-center font-semibold font-tthoves text-16/24"
          onClick={handleClickPredictionRule}
        >
          Prediction Rule
        </button>
      </div>
    </div>
  );
};

export default MatchGuide;
